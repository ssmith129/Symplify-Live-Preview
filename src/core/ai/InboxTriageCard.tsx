import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { all_routes } from '../../feature-module/routes/all_routes';
import { loadInbox, setFilter, updateMessagePriority, updateMessageCategory, removeMessageById, upsertMessage } from '../redux/aiSlice';
import type { RootState } from './typesInternal';
import type { AIMessage } from '../services/ai/types';

const PRIORITY_ICONS: Record<string, string> = {
  critical: 'ti ti-alert-triangle-filled',
  high: 'ti ti-exclamation-circle',
  medium: 'ti ti-info-circle',
  low: 'ti ti-check-circle',
};

const CATEGORIES = ['emergency','medical','appointment','administrative','follow-up'] as const;

export default function InboxTriageCard() {
  const dispatch = useDispatch<any>();
  const { items, loading, error, filter } = useSelector((s: RootState) => s.ai.inbox);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [confidenceOnly, setConfidenceOnly] = useState(false);
  const [confidenceThreshold] = useState(0.7);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropHover, setDropHover] = useState<string | null>(null);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [undoData, setUndoData] = useState<{ id: string; msg: AIMessage; action: 'archive'|'delete' } | null>(null);
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(loadInbox());
  }, [dispatch]);

  useEffect(() => () => { if (undoTimer.current) clearTimeout(undoTimer.current); }, []);

  const visible = useMemo(() => {
    let arr = items.filter((m) => filter === 'all' || m.metadata.category === filter);
    if (confidenceOnly) arr = arr.filter(m => m.ai.confidence >= confidenceThreshold);
    return arr;
  }, [items, filter, confidenceOnly, confidenceThreshold]);

  const counts = useMemo(() => ({
    critical: visible.filter((m) => m.ai.priority === 'critical').length,
    high: visible.filter((m) => m.ai.priority === 'high').length,
    medium: visible.filter((m) => m.ai.priority === 'medium').length,
    low: visible.filter((m) => m.ai.priority === 'low').length,
  } as const), [visible]);

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
    setDraggingId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDropToCategory = (cat: string, e?: React.DragEvent) => {
    if (e) e.preventDefault();
    const id = draggingId || e?.dataTransfer.getData('text/plain');
    if (id) dispatch(updateMessageCategory({ id, category: cat as any }));
    setDraggingId(null);
    setDropHover(null);
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
          <Link to={all_routes.email} className="text-reset text-decoration-none">AI Inbox Triage</Link>
        </h5>
        <div className="d-flex align-items-center gap-2">
          <div className="form-check form-switch m-0" title="High confidence only">
            <input id="ai-conf-only" className="form-check-input" type="checkbox" role="switch" aria-label="High confidence only" checked={confidenceOnly} onChange={(e)=>setConfidenceOnly(e.target.checked)} />
          </div>
          <div className="dropdown">
            <button className="btn btn-sm px-2 border shadow-sm btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {filter === 'all' ? 'All' : filter}
              <i className="ti ti-chevron-down ms-1 fs-12"/>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {(['all',...CATEGORIES] as const).map(opt => (
                <li key={opt}><button className="dropdown-item" onClick={() => dispatch(setFilter(opt as any))}>{opt}</button></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Drag targets */}
      <div className="px-3 py-2 bg-light border-top d-flex align-items-center flex-wrap gap-2" role="listbox" aria-label="Drop into category">
        {CATEGORIES.map(cat => (
          <span
            key={cat}
            className={`badge rounded-pill bg-light text-dark border drop-pill ${dropHover===cat ? 'active' : ''}`}
            onDragOver={(e)=>{e.preventDefault(); setDropHover(cat);}}
            onDragLeave={()=>setDropHover(null)}
            onDrop={(e)=>onDropToCategory(cat,e)}
            role="option"
            aria-selected={dropHover===cat}
          >
            <i className="ti ti-inbox me-1"/>{cat}
          </span>
        ))}
        <div className="ms-auto d-flex align-items-center gap-2">
          <span className="fs-11 text-muted">{visible.length} total</span>
          {confidenceOnly && (
            <div className="d-flex align-items-center gap-1">
              <i className="ti ti-robot fs-12 text-primary"/>
              <span className="badge bg-light text-dark px-1 py-0 fs-10">≥ {Math.round(confidenceThreshold*100)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Priority summary */}
      <div className="px-3 py-2 bg-white border-top border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center"><span className="priority-dot priority-dot-critical me-1"/><span className="fs-11 fw-medium">{counts.critical}</span></div>
          <div className="d-flex align-items-center"><span className="priority-dot priority-dot-high me-1"/><span className="fs-11 fw-medium">{counts.high}</span></div>
          <div className="d-flex align-items-center"><span className="priority-dot priority-dot-medium me-1"/><span className="fs-11 fw-medium">{counts.medium}</span></div>
          <div className="d-flex align-items-center"><span className="priority-dot priority-dot-low me-1"/><span className="fs-11 fw-medium">{counts.low}</span></div>
        </div>
      </div>

      {undoData && (
        <div className="alert alert-warning m-2 py-2 d-flex align-items-center justify-content-between" role="status">
          <span className="fs-12">{undoData.action === 'archive' ? 'Archived' : 'Deleted'} 1 item</span>
          <button className="btn btn-sm btn-link" onClick={undo} aria-label="Undo last action">Undo</button>
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
                            <span className="ai-badge ai-badge--sm ai-badge--low" title="AI Confidence">{Math.round(msg.ai.confidence*100)}%</span>
                          </div>
                        </div>
                        <p className="mb-0 fs-11 text-muted text-truncate">{msg.subject}</p>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                          <div className="d-flex align-items-center gap-2 ai-meta-inline">
                            <span className="fs-13 text-muted"><i className="ti ti-bolt me-1 fs-9"/>U{msg.ai.urgency}</span>
                            {msg.ai.actionRequired && (
                              <span className="ai-badge ai-badge--critical">⚠️ ACTION</span>
                            )}
                            <span className="fs-13 text-muted d-none d-sm-inline">{msg.metadata.tags.join(', ')}</span>
                            {msg.metadata.attachments>0 && (
                              <span className="fs-13 text-muted" aria-label={`${msg.metadata.attachments} attachments`}><i className="ti ti-paperclip me-1"/>{msg.metadata.attachments}</span>
                            )}
                          </div>
                          <div className="dropdown">
                            <button className="ai-btn ai-btn--sm ai-btn--secondary" data-bs-toggle="dropdown" aria-label="Change priority">
                              {msg.ai.priority}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              {(['critical','high','medium','low'] as const).map(p => (
                                <li key={p}><button className="dropdown-item" onClick={()=>handlePriorityChange(msg.id, p)}>{p}</button></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className={`ai-expand ${isExpanded?'show':''}`}>
                          <div className="mt-2 fs-13 text-muted">{msg.preview}</div>
                          <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                            <button className="ai-btn ai-btn--sm ai-btn--secondary" data-ai-action onClick={()=>handleArchiveOrDelete(msg,'archive')} aria-label="Archive" disabled={proc}>
                              {proc ? <span className="spinner-border spinner-border-sm"/> : <i className="ti ti-archive me-1"/>}
                              Archive
                            </button>
                            <button className="ai-btn ai-btn--sm ai-btn--secondary text-danger" data-ai-action onClick={()=>handleArchiveOrDelete(msg,'delete')} aria-label="Delete" disabled={proc}>
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
