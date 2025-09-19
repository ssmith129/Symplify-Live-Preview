import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadInbox, setFilter } from '../redux/aiSlice';
import type { RootState } from './typesInternal';
import ImageWithBasePath from '../imageWithBasePath';

const PRIORITY_BADGE: Record<string, string> = {
  critical: 'badge bg-danger fs-10',
  high: 'badge bg-warning fs-10',
  medium: 'badge bg-info fs-10',
  low: 'badge bg-success fs-10',
};

export default function InboxTriageCard() {
  const dispatch = useDispatch<any>();
  const { items, loading, error, filter } = useSelector((s: RootState) => s.ai.inbox);

  useEffect(() => {
    dispatch(loadInbox());
  }, [dispatch]);

  const filtered = items.filter(m => filter === 'all' || m.metadata.category === filter);

  return (
    <div className="position-relative border card rounded-2 shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between py-2">
        <h5 className="fw-bold mb-0 d-flex align-items-center fs-16">
          <i className="ti ti-brain me-2 text-primary fs-18" /> AI Inbox Triage
        </h5>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success px-2 py-1 fs-11 d-flex align-items-center">
            <i className="ti ti-robot me-1 fs-10"/>Active
          </span>
          <div className="dropdown">
            <button className="btn btn-sm btn-outline-primary dropdown-toggle px-2 py-1 fs-12" data-bs-toggle="dropdown">
              {filter === 'all' ? 'All' : filter}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {['all','emergency','medical','appointment','administrative','follow-up'].map(opt => (
                <li key={opt}><button className="dropdown-item fs-13" onClick={() => dispatch(setFilter(opt as any))}>{opt}</button></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {loading && (
          <div className="d-flex justify-content-center py-4"><div className="spinner-border spinner-border-sm text-primary" role="status" aria-label="Loading"/></div>
        )}
        {error && (
          <div className="alert alert-danger m-2 py-2" role="alert">{error}</div>
        )}
        {!loading && !error && (
          <div className="overflow-auto" style={{maxHeight: '400px'}}>
            {filtered.map((msg, index) => (
              <div key={msg.id} className={`d-flex align-items-center p-2 border-bottom ${index === filtered.length - 1 ? '' : ''}`}>
                <div className="me-2 flex-shrink-0">
                  {msg.avatar ? (
                    <ImageWithBasePath src={msg.avatar} className="rounded-circle" style={{width: '32px', height: '32px'}} alt="" />
                  ) : (
                    <span className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle fw-medium fs-12" style={{width: '32px', height: '32px'}}>
                      {msg.from.slice(0,2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-grow-1 min-width-0">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <div className="min-width-0 flex-grow-1">
                      <h6 className="mb-0 fw-semibold text-dark fs-13 text-truncate">{msg.from}</h6>
                      <p className="mb-0 fs-12 text-muted text-truncate" style={{lineHeight: '1.2'}}>{msg.subject}</p>
                    </div>
                    <div className="text-end flex-shrink-0 ms-2">
                      <div className="d-flex align-items-center gap-1 mb-1">
                        <span className={`${PRIORITY_BADGE[msg.ai.priority]} px-1 py-0 text-uppercase fw-medium`} style={{fontSize: '9px', lineHeight: '1.2'}}>
                          {msg.ai.priority}
                        </span>
                        <span className="badge bg-light text-dark px-1 py-0 fs-10">{Math.round(msg.ai.confidence*100)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="text-muted fs-11">
                        <i className="ti ti-clock me-1 fs-10"/>
                        {new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                      </span>
                      <span className="text-muted fs-11">
                        <i className="ti ti-bolt me-1 fs-10"/>
                        {msg.ai.urgency}/5
                      </span>
                      {msg.ai.actionRequired && (
                        <span className="badge bg-danger-transparent text-danger border-0 px-1 py-0 fs-10">Action</span>
                      )}
                    </div>
                    <span className="text-muted fs-11 flex-shrink-0">{msg.ai.estimatedResponseTime}</span>
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
