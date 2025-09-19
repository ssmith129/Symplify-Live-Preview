import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadInbox, setFilter } from '../redux/aiSlice';
import type { RootState } from './typesInternal';

const PRIORITY_ICONS: Record<string, string> = {
  critical: 'ti ti-alert-triangle-filled',
  high: 'ti ti-exclamation-circle',
  medium: 'ti ti-info-circle',
  low: 'ti ti-check-circle',
};

export default function InboxTriageCard() {
  const dispatch = useDispatch<any>();
  const { items, loading, error, filter } = useSelector((s: RootState) => s.ai.inbox);

  useEffect(() => {
    dispatch(loadInbox());
  }, [dispatch]);

  const filtered = items.filter((m) => filter === 'all' || m.metadata.category === filter);

  const counts = {
    critical: filtered.filter((m) => m.ai.priority === 'critical').length,
    high: filtered.filter((m) => m.ai.priority === 'high').length,
    medium: filtered.filter((m) => m.ai.priority === 'medium').length,
    low: filtered.filter((m) => m.ai.priority === 'low').length,
  } as const;

  return (
    <div className="card shadow-sm flex-fill w-100">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="fw-bold mb-0 d-flex align-items-center">
          <i className="ti ti-brain me-2 text-primary" /> AI Inbox Triage
        </h5>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success px-2 py-1 fs-11 d-flex align-items-center">
            <i className="ti ti-robot me-1 fs-10"/>ON
          </span>
          <div className="dropdown">
            <button className="btn btn-sm px-2 border shadow-sm btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              {filter === 'all' ? 'All' : filter}
              <i className="ti ti-chevron-down ms-1 fs-12"/>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {['all','emergency','medical','appointment','administrative','follow-up'].map(opt => (
                <li key={opt}><button className="dropdown-item" onClick={() => dispatch(setFilter(opt as any))}>{opt}</button></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-3 py-2 bg-light border-top border-bottom">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
              <span className="priority-dot priority-dot-critical me-1"/>
              <span className="fs-11 fw-medium">{counts.critical}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="priority-dot priority-dot-high me-1"/>
              <span className="fs-11 fw-medium">{counts.high}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="priority-dot priority-dot-medium me-1"/>
              <span className="fs-11 fw-medium">{counts.medium}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="priority-dot priority-dot-low me-1"/>
              <span className="fs-11 fw-medium">{counts.low}</span>
            </div>
          </div>
          <span className="fs-11 text-muted">{filtered.length} total</span>
        </div>
      </div>

      <div className="card-body p-0">
        {loading && (
          <div className="d-flex justify-content-center py-3"><div className="spinner-border spinner-border-sm text-primary" role="status" aria-label="Loading"/></div>
        )}
        {error && (
          <div className="alert alert-danger m-2 py-2 fs-12" role="alert">{error}</div>
        )}
        {!loading && !error && (
          <div className="ai-triage-compact-list overflow-auto">
            {filtered.map((msg) => (
              <div key={msg.id} className="px-3 py-2 border-bottom hover-bg-light cursor-pointer">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center min-width-0 flex-grow-1">
                    <i className={`${PRIORITY_ICONS[msg.ai.priority]} fs-12 priority-icon-${msg.ai.priority} me-2`} />
                    <div className="min-width-0 flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="mb-0 fw-semibold text-dark fs-12 text-truncate">{msg.from}</h6>
                        <div className="d-flex align-items-center gap-1 flex-shrink-0">
                          <span className="fs-10 text-muted">
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          </span>
                          <span className="badge bg-light text-dark px-1 py-0 fs-10">{Math.round(msg.ai.confidence*100)}%</span>
                        </div>
                      </div>
                      <p className="mb-0 fs-11 text-muted text-truncate">{msg.subject}</p>
                      <div className="d-flex align-items-center justify-content-between mt-1">
                        <div className="d-flex align-items-center gap-2">
                          <span className="fs-10 text-muted"><i className="ti ti-bolt me-1 fs-9"/>U{msg.ai.urgency}</span>
                          {msg.ai.actionRequired && (
                            <span className="badge bg-danger-transparent text-danger px-1 py-0 fs-9">ACTION</span>
                          )}
                        </div>
                        <span className="fs-10 text-muted">{msg.ai.estimatedResponseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
