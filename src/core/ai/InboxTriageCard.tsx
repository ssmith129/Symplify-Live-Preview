import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { all_routes } from '../../feature-module/routes/all_routes';
import { loadInbox, updateMessagePriority, removeMessageById, upsertMessage } from '../redux/aiSlice';
import type { RootState } from './typesInternal';
import type { AIMessage } from '../services/ai/types';

/**
 * Smart Inbox Card Component - Design System Compliant
 * 
 * Design System Changes Applied:
 * - Replaced Bootstrap card classes with AI design system (.ai-card, .ai-card__header, .ai-card__body)
 * - Updated list items to use .ai-list-item structure with .ai-list-item__priority indicator
 * - Replaced priority icons with design system priority dots (.ai-list-item__priority--{level})
 * - Applied design system typography utilities (.ai-text-{size}, .ai-font-{weight})
 * - Updated spacing to use design system gap utilities (.ai-gap-{size})
 * - Replaced Bootstrap alerts with .ai-alert design system component
 * - Enhanced accessibility with proper ARIA labels and semantic HTML
 * - Applied design system color tokens for text and icons
 */

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
    <div className="ai-card flex-fill w-100" aria-live="polite">
      {/* Design System: Using .ai-card__header instead of Bootstrap .card-header */}
      <div className="ai-card__header d-flex align-items-center justify-content-between">
        <h5 className="ai-font-semibold mb-0 d-flex align-items-center ai-gap-2">
          <i className="ti ti-brain ai-icon-accent" aria-hidden="true" />
          <Link to={all_routes.email} className="text-reset text-decoration-none">Smart Inbox</Link>
        </h5>
      </div>

      {/* Design System: Using .ai-alert--warning instead of Bootstrap alert-warning */}
      {undoData && (
        <div className="ai-alert ai-alert--warning m-2 d-flex align-items-center justify-content-between" role="status">
          <span className="ai-text-sm">{undoData.action === 'archive' ? 'Archived' : 'Deleted'} 1 item</span>
          <button className="ai-btn ai-btn--sm ai-btn--accent" onClick={undo} aria-label="Undo last action">
            <i className="ti ti-rotate-clockwise-2 me-1" aria-hidden="true"></i>
            Undo
          </button>
        </div>
      )}

      {/* Design System: Using .ai-card__body instead of Bootstrap .card-body */}
      <div className="ai-card__body p-0" onKeyDown={onKeyDown} tabIndex={0}>
        {/* Loading State */}
        {loading && (
          <div className="d-flex justify-content-center ai-p-3">
            <div className="spinner-border spinner-border-sm text-primary" role="status" aria-label="Loading inbox messages">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {/* Error State - Design System: Using .ai-alert--danger */}
        {error && (
          <div className="ai-alert ai-alert--danger m-2" role="alert">
            <i className="ti ti-alert-triangle me-2" aria-hidden="true"></i>
            {error}
          </div>
        )}
        
        {/* Messages List - Design System: Using .ai-list-item structure */}
        {!loading && !error && (
          <div className="overflow-auto" style={{ maxHeight: '600px' }}>
            {visible.length === 0 ? (
              <div className="ai-p-4 text-center">
                <p className="ai-text-muted mb-0">No messages to display</p>
              </div>
            ) : (
              visible.map((msg, idx) => {
                const isExpanded = !!expanded[msg.id];
                const proc = !!processing[msg.id];
                
                return (
                  <div
                    key={msg.id}
                    className={`ai-list-item ${idx===focusedIndex?'focus-ring':''}`}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-label={`Email from ${msg.from}, ${msg.subject}, ${msg.ai.priority} priority`}
                    draggable
                    onDragStart={(e)=>onDragStart(e, msg.id)}
                    onClick={()=>setExpanded(s=>({ ...s, [msg.id]: !s[msg.id] }))}
                  >
                    {/* Design System: Priority indicator dot */}
                    <div 
                      className={`ai-list-item__priority ai-list-item__priority--${msg.ai.priority}`}
                      aria-label={`${msg.ai.priority} priority`}
                    ></div>
                    
                    {/* Design System: List item content */}
                    <div className="ai-list-item__content">
                      <div className="d-flex align-items-start justify-content-between ai-gap-2 mb-1">
                        <h6 className="mb-0 ai-font-semibold ai-text-base text-truncate" title={msg.from}>
                          {msg.from}
                        </h6>
                        <div className="d-flex align-items-center ai-gap-2 flex-shrink-0">
                          <span className="ai-text-sm ai-text-muted">
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      </div>
                      
                      <p className="mb-0 ai-text-sm ai-text-muted text-truncate" title={msg.subject}>
                        {msg.subject}
                      </p>
                      
                      {/* Metadata badges and tags */}
                      <div className="d-flex align-items-center mt-1 ai-gap-2 flex-wrap">
                        {msg.ai.actionRequired && (
                          <span className="ai-badge ai-badge--critical ai-badge--sm">
                            <i className="ti ti-alert-triangle" aria-hidden="true"></i>
                            ACTION
                          </span>
                        )}
                        <span className="ai-text-xs ai-text-muted d-none d-sm-inline">
                          {msg.metadata.tags.join(', ')}
                        </span>
                        {msg.metadata.attachments > 0 && (
                          <span className="ai-text-xs ai-text-muted" aria-label={`${msg.metadata.attachments} attachments`}>
                            <i className="ti ti-paperclip me-1" aria-hidden="true"></i>
                            {msg.metadata.attachments}
                          </span>
                        )}
                      </div>
                      
                      {/* Expanded content with actions */}
                      {isExpanded && (
                        <div className="mt-2">
                          <div className="ai-text-sm ai-text-muted ai-p-2" style={{ background: 'var(--ai-bg-secondary)', borderRadius: 'var(--ai-radius)' }}>
                            {msg.preview}
                          </div>
                          
                          {/* Action buttons - Design System compliant */}
                          <div className="d-flex align-items-center ai-gap-2 mt-2 flex-wrap">
                            <button 
                              className="ai-btn ai-btn--sm ai-btn--secondary" 
                              onClick={(e) => { e.stopPropagation(); handleArchiveOrDelete(msg,'archive'); }} 
                              aria-label="Archive message" 
                              disabled={proc}
                            >
                              {proc ? (
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                              ) : (
                                <i className="ti ti-archive me-1" aria-hidden="true"></i>
                              )}
                              Archive
                            </button>
                            
                            <button 
                              className="ai-btn ai-btn--sm ai-btn--secondary ai-btn--destructive" 
                              onClick={(e) => { e.stopPropagation(); handleArchiveOrDelete(msg,'delete'); }} 
                              aria-label="Delete message" 
                              disabled={proc}
                            >
                              {proc ? (
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                              ) : (
                                <i className="ti ti-trash me-1" aria-hidden="true"></i>
                              )}
                              Delete
                            </button>
                            
                            <button 
                              className="ai-btn ai-btn--sm ai-btn--secondary" 
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Reply to message"
                            >
                              <i className="ti ti-reply me-1" aria-hidden="true"></i>
                              Reply
                            </button>
                            
                            <button 
                              className="ai-btn ai-btn--sm ai-btn--secondary" 
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Forward message"
                            >
                              <i className="ti ti-arrow-right me-1" aria-hidden="true"></i>
                              Forward
                            </button>
                            
                            <button 
                              className="ai-btn ai-btn--sm ai-btn--secondary" 
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Snooze message"
                            >
                              <i className="ti ti-clock me-1" aria-hidden="true"></i>
                              Snooze
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
