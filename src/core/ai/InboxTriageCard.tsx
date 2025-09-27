import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { all_routes } from '../../feature-module/routes/all_routes';
import { loadInbox, updateMessagePriority, removeMessageById, upsertMessage } from '../redux/aiSlice';
import type { RootState } from './typesInternal';
import type { AIMessage } from '../services/ai/types';

const PRIORITY_ICONS: Record<string, string> = {
  critical: 'ti ti-alert-triangle-filled',
  high: 'ti ti-exclamation-circle',
  medium: 'ti ti-info-circle',
  low: 'ti ti-check-circle',
};

export default function InboxTriageCard() {
  const dispatch = useDispatch<any>();
  const { items, loading, error, filter } = useSelector((s: RootState) => s.ai.inbox);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [undoData, setUndoData] = useState<{ id: string; msg: AIMessage; action: 'archive'|'delete' } | null>(null);
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(loadInbox());
  }, [dispatch]);

  useEffect(() => () => { if (undoTimer.current) clearTimeout(undoTimer.current); }, []);

  const visible = useMemo(() => {
    return items.filter((m) => filter === 'all' || m.metadata.category === filter);
  }, [items, filter]);

  const handlePriorityChange = (id: string, p: 'critical'|'high'|'medium'|'low') => {
    dispatch(updateMessagePriority({ id, priority: p }));
  };

  const handleArchiveOrDelete = (msg: AIMessage, action: 'archive'|'delete') => {
    setProcessing((s) => ({ ...s, [msg.id]: true }));
    setTimeout(() => {
      setProcessing((s) => ({ ...s, [msg.id]: false }));
      dispatch(removeMessageById(msg.id));
      setUndoData({ id: msg.id, msg, action });
      if (undoTimer.current) clearTimeout(undoTimer.current);
      undoTimer.current = setTimeout(() => setUndoData(null), 5000);
    }, 300);
  };

  const undo = () => {
    if (!undoData) return;
    dispatch(upsertMessage(undoData.msg));
    setUndoData(null);
    if (undoTimer.current) clearTimeout(undoTimer.current);
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!visible.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIndex((i) => Math.min(i + 1, visible.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIndex((i) => Math.max(i - 1, 0)); }
    const current = visible[focusedIndex];
    if (!current) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); setExpanded((s) => ({ ...s, [current.id]: !s[current.id] }));
    }
    if (e.key.toLowerCase() === 'a') { e.preventDefault(); handleArchiveOrDelete(current, 'archive'); }
    if (e.key === 'Delete') { e.preventDefault(); handleArchiveOrDelete(current, 'delete'); }
    if (/^[1-4]$/.test(e.key)) {
      const map: any = { '1': 'low', '2': 'medium', '3': 'high', '4': 'critical' };
      handlePriorityChange(current.id, map[e.key]);
    }
  };

  return (
    <div className="card shadow-sm flex-fill w-100" aria-live="polite">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="fw-bold mb-0 d-flex align-items-center">
          <i className="ti ti-brain me-2 text-primary" />
          <Link to={all_routes.email} className="text-reset text-decoration-none">Smart Inbox</Link>
        </h5>
      </div>

      {undoData && (
        <div className="alert alert-warning m-2 py-2 d-flex align-items-center justify-content-between" role="status">
          <span className="fs-12">{undoData.action === 'archive' ? 'Archived' : 'Deleted'} 1 item</span>
          <button className="ai-btn ai-btn--sm ai-btn--accent" onClick={undo} aria-label="Undo last action">↶ Undo</button>
        </div>
      )}

      <div className="card-body p-0" onKeyDown={onKeyDown} tabIndex={0}>
        {loading && (
          <div className="d-flex justify-content-center py-3"><div className="spinner-border spinner-border-sm text-primary" role="status" aria-label="Loading"/></div>
        )}
        {error && (
          <div className="alert alert-danger m-2 py-2 fs-12" role="alert">{error}</div>
        )}
        {!loading && !error && (
          <div className="ai-triage-compact-list overflow-auto">
            {visible.map((msg, idx) => {
              const isExpanded = !!expanded[msg.id];
              const proc = !!processing[msg.id];
              return (
                <div
                  key={msg.id}
                  className={`px-3 py-2 border-bottom hover-bg-light cursor-pointer ai-triage-row ${idx===focusedIndex?'focus-ring':''}`}
                  role="button"
                  aria-expanded={isExpanded}
                  draggable
                  onDragStart={(e)=>onDragStart(e, msg.id)}
                  onClick={()=>setExpanded(s=>({ ...s, [msg.id]: !s[msg.id] }))}
                >
                  <div className="d-flex align-items-start justify-content-between gap-2">
                    <div className="d-flex align-items-start min-width-0 flex-grow-1">
                      <i className={`${PRIORITY_ICONS[msg.ai.priority]} fs-14 priority-icon-${msg.ai.priority} me-2 mt-1`} />
                      <div className="min-width-0 flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="mb-0 fw-semibold text-dark fs-14 text-truncate" title={msg.subject}>{msg.from}</h6>
                          <div className="d-flex align-items-center gap-1 flex-shrink-0">
                            <span className="fs-13 text-muted">
                              {new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                        </div>
                        <p className="mb-0 fs-11 text-muted text-truncate">{msg.subject}</p>
                        <div className="d-flex align-items-center mt-1 ai-triage-meta">
                          <div className="d-flex align-items-center gap-2 ai-meta-inline">
                            {msg.ai.actionRequired && (
                              <span className="ai-badge ai-badge--critical ai-badge--sm">ACTION</span>
                            )}
                            <span className="fs-13 text-muted d-none d-sm-inline">{msg.metadata.tags.join(', ')}</span>
                            {msg.metadata.attachments>0 && (
                              <span className="fs-13 text-muted" aria-label={`${msg.metadata.attachments} attachments`}>
                                <i className="ti ti-paperclip me-1"/>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`ai-expand ${isExpanded?'show':''}`}>
                          <div className="mt-2 fs-13 text-muted">{msg.preview}</div>
                          <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                            <button className="ai-btn ai-btn--sm ai-btn--secondary" data-ai-action onClick={()=>handleArchiveOrDelete(msg,'archive')} aria-label="Archive" disabled={proc}>
                              {proc ? <span className="spinner-border spinner-border-sm"/> : <i className="ti ti-archive me-1"/>}
                              Archive
                            </button>
                            <button className="ai-btn ai-btn--sm ai-btn--secondary ai-btn--destructive" data-ai-action onClick={()=>handleArchiveOrDelete(msg,'delete')} aria-label="Delete" disabled={proc}>
                              {proc ? <span className="spinner-border spinner-border-sm"/> : <i className="ti ti-trash me-1"/>}
                              Delete
                            </button>
                            <button className="ai-btn ai-btn--sm ai-btn--secondary" data-ai-action aria-label="Reply">
                              <i className="ti ti-reply me-1"/>Reply
                            </button>
                            <button className="ai-btn ai-btn--sm ai-btn--secondary" data-ai-action aria-label="Forward">
                              <i className="ti ti-arrow-right me-1"/>Forward
                            </button>
                            <button className="ai-btn ai-btn--sm ai-btn--secondary" data-ai-action aria-label="Snooze">
                              <i className="ti ti-alarm me-1"/>Snooze
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
