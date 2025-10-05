import { Link } from "react-router";
import { useState } from "react";
import ImageWithBasePath from "../../../../../core/imageWithBasePath";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState<string>('mark-smith');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiAction, setAiAction] = useState<string>('');

  // AI Action handler with proper feedback
  const handleAiAction = (action: string) => {
    setAiAction(action);
    setAiProcessing(true);
    
    // Announce to screen readers
    announceToScreenReader(`${action} in progress`);
    
    // Simulate AI processing
    setTimeout(() => {
      setAiProcessing(false);
      setAiAction('');
      announceToScreenReader(`${action} completed successfully`);
    }, 1500);
  };

  // Screen reader announcement utility
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Page Header */}
        <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
          <div className="flex-grow-1">
            <h4 className="fs-18 fw-semibold mb-0">Messages</h4>
          </div>
          <div className="text-end">
            <ol className="breadcrumb m-0 py-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Messages</li>
            </ol>
          </div>
        </div>

        {/* Messages Interface */}
        <div className="ai-card shadow-none mb-0">
          <div className="card-body p-0">
            <div className="d-md-flex">
              {/* Left: Chat User Navigation */}
              <div className="chat-user-nav border-end" style={{width: '350px', minWidth: '350px'}}>
                {/* User Profile Header */}
                <div className="d-flex align-items-center justify-content-between border-bottom p-3">
                  <div className="d-flex align-items-center">
                    <span className="avatar me-2 flex-shrink-0">
                      <ImageWithBasePath src="assets/img/users/user-01.jpg" alt="James Hong" className="rounded" style={{width: '40px', height: '40px'}}/>
                    </span>
                    <div>
                      <h6 className="mb-1 ai-text-sm ai-font-medium">James Hong</h6>
                      <p className="mb-0 ai-text-sm ai-text-muted">Admin</p>
                    </div>
                  </div>
                  <button className="ai-btn ai-btn--primary ai-btn--icon" aria-label="New Chat">
                    <i className="ti ti-plus" aria-hidden="true"/>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="p-3">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <i className="ti ti-search" aria-hidden="true"/>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 ps-0"
                      placeholder="Search conversations..."
                      aria-label="Search conversations"
                      style={{boxShadow: 'none'}}
                    />
                  </div>
                </div>


                {/* User List */}
                <div className="chat-users" data-simplebar style={{height: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                  {/* Mark Smith - Selected/Active */}
                  <div
                    className={`ai-list-item ${selectedUser === 'mark-smith' ? 'active' : ''}`}
                    onClick={() => setSelectedUser('mark-smith')}
                    role="button"
                    tabIndex={0}
                    aria-label="Conversation with Mark Smith, Critical priority, last message at 10:10 AM"
                  >
                    <span className="avatar flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}
                            aria-label="Online"></span>
                    </span>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="mb-0 ai-text-sm ai-font-medium">Mark Smith</h6>
                        <span className="ai-badge ai-badge--critical" style={{backgroundColor: 'rgba(220, 53, 69, 0.5)'}}>
                          <i className="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
                          Critical
                        </span>
                      </div>
                      <p className="mb-0 text-truncate ai-text-sm ai-text-muted">
                        Hey Sam! Did you Ch...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <small className="ai-text-xs ai-text-muted">10:10 AM</small>
                        <i className="ti ti-checks text-success" aria-label="Message read"></i>
                      </div>
                    </div>
                  </div>

                  {/* Eugene Sikora */}
                  <div
                    className={`ai-list-item ${selectedUser === 'eugene-sikora' ? 'active' : ''}`}
                    onClick={() => setSelectedUser('eugene-sikora')}
                    role="button"
                    tabIndex={0}
                    aria-label="Conversation with Eugene Sikora, High priority, 5 unread messages"
                  >
                    <span className="avatar flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/users/user-03.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                    </span>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="mb-0 ai-text-sm ai-font-medium">Eugene Sikora</h6>
                        <span className="ai-badge ai-badge--high" style={{backgroundColor: 'rgba(226, 185, 60, 0.5)'}}>
                          <i className="fa-solid fa-fire me-1" aria-hidden="true"></i>
                          High
                        </span>
                      </div>
                      <p className="mb-0 text-truncate ai-text-sm ai-text-muted">
                        How are your Today
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <small className="ai-text-xs ai-text-muted">08:26 AM</small>
                        <span className="ai-badge ai-badge--critical" aria-label="5 unread messages">5</span>
                      </div>
                    </div>
                  </div>

                  {/* Robert Fassett */}
                  <div
                    className={`ai-list-item ${selectedUser === 'robert-fassett' ? 'active' : ''}`}
                    onClick={() => setSelectedUser('robert-fassett')}
                    role="button"
                    tabIndex={0}
                    aria-label="Conversation with Robert Fassett, High priority"
                  >
                    <span className="avatar flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/users/user-04.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                    </span>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="mb-0 ai-text-sm ai-font-medium">Robert Fassett</h6>
                        <span className="ai-badge ai-badge--high" style={{backgroundColor: 'rgba(226, 185, 59, 0.5)'}}>
                          <i className="fa-solid fa-fire me-1" aria-hidden="true"></i>
                          High
                        </span>
                      </div>
                      <p className="mb-0 text-truncate ai-text-sm ai-text-muted">
                        Here are some of ve...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <small className="ai-text-xs ai-text-muted">yesterday</small>
                        <span className="ai-badge ai-badge--critical" aria-label="5 unread messages">5</span>
                      </div>
                    </div>
                  </div>

                  {/* Andrew Fletcher */}
                  <div
                    className={`ai-list-item ${selectedUser === 'andrew-fletcher' ? 'active' : ''}`}
                    onClick={() => setSelectedUser('andrew-fletcher')}
                    role="button"
                    tabIndex={0}
                    aria-label="Conversation with Andrew Fletcher, Low priority"
                  >
                    <span className="avatar flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/users/user-05.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                    </span>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="mb-0 ai-text-sm ai-font-medium">Andrew Fletcher</h6>
                        <span className="ai-badge ai-badge--low" style={{backgroundColor: 'rgba(25, 135, 84, 0.5)'}}>
                          <i className="fa-regular fa-circle-check me-1" aria-hidden="true"></i>
                          Low
                        </span>
                      </div>
                      <p className="mb-0 text-truncate ai-text-sm ai-text-muted">
                        Use tools like Trello...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <small className="ai-text-xs ai-text-muted">yesterday</small>
                      </div>
                    </div>
                  </div>

                  {/* Tyron Derby */}
                  <div
                    className={`ai-list-item ${selectedUser === 'tyron-derby' ? 'active' : ''}`}
                    onClick={() => setSelectedUser('tyron-derby')}
                    role="button"
                    tabIndex={0}
                    aria-label="Conversation with Tyron Derby, Low priority"
                  >
                    <div
                      className="avatar flex-shrink-0 d-flex align-items-center justify-content-center fw-semibold text-purple"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '4.8px',
                        background: '#F9F2F9',
                        color: '#800080',
                        fontSize: '14px'
                      }}
                    >
                      TD
                    </div>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="fs-14 mb-0 fw-medium">Tyron Derby</h6>
                        <span className="ai-badge ai-badge--low" style={{backgroundColor: 'rgba(25, 135, 84, 0.5)'}}>
                          <i className="fa-regular fa-circle-check me-1" aria-hidden="true"></i>
                          Low
                        </span>
                      </div>
                      <p className="mb-0 text-muted text-truncate" style={{fontSize: 'var(--ai-font-sm)'}}>
                        Let's reconvene next...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <small className="text-muted">12:55 PM</small>
                        <i className="ti ti-checks text-success" aria-label="Message read"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Chat Messages */}
              <div className="flex-fill chat-messages">
                {/* Chat Header */}
                <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}
                            aria-label="Online"></span>
                    </span>
                    <div>
                      <h6 className="fs-14 fw-semibold mb-1">Mark Smith</h6>
                      <p className="mb-0 d-flex align-items-center text-muted" style={{fontSize: 'var(--ai-font-sm)'}}>
                        <i className="ti ti-point-filled text-success me-1" aria-hidden="true"/>
                        Online
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="ai-btn ai-btn--secondary ai-btn--icon" aria-label="Voice Call">
                      <i className="ti ti-phone" aria-hidden="true"/>
                    </button>
                    <button className="ai-btn ai-btn--secondary ai-btn--icon" aria-label="Video Call">
                      <i className="ti ti-video" aria-hidden="true"/>
                    </button>
                    <button className="ai-btn ai-btn--secondary ai-btn--icon" aria-label="Information">
                      <i className="ti ti-info-circle" aria-hidden="true"/>
                    </button>
                  </div>
                </div>

                {/* AI Assistance Section - Design System Compliant */}
                <div className="ai-card__header">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa-solid fa-brain" style={{color: 'var(--ai-accent)'}} aria-hidden="true"></i>
                      <h6 className="mb-0 fw-semibold" style={{fontSize: 'var(--ai-font-lg)'}}>
                        AI Assistance
                      </h6>
                    </div>
                    
                    {/* Primary Actions */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="ai-btn ai-btn--sm ai-btn--accent"
                        onClick={() => handleAiAction('Apply')}
                        disabled={aiProcessing}
                        aria-label="Apply AI suggestion"
                      >
                        <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
                        Apply
                      </button>
                      <button
                        className="ai-btn ai-btn--sm ai-btn--secondary"
                        onClick={() => handleAiAction('Refresh')}
                        disabled={aiProcessing}
                        aria-label="Refresh AI suggestions"
                      >
                        <i className="fa-solid fa-rotate me-2" aria-hidden="true"></i>
                        Refresh
                      </button>
                    </div>
                  </div>

                  {/* Secondary Actions */}
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <button
                      className="ai-btn ai-btn--sm ai-btn--secondary"
                      onClick={() => handleAiAction('Analyze')}
                      disabled={aiProcessing}
                      aria-label="Analyze message with AI"
                    >
                      <i className="fa-solid fa-brain me-2" aria-hidden="true"></i>
                      Analyze
                    </button>
                    <button
                      className="ai-btn ai-btn--sm ai-btn--secondary"
                      onClick={() => handleAiAction('Triage')}
                      disabled={aiProcessing}
                      aria-label="Auto-categorize message"
                    >
                      <i className="fa-regular fa-chart-bar me-2" aria-hidden="true"></i>
                      Triage
                    </button>
                    <button
                      className="ai-btn ai-btn--sm ai-btn--secondary"
                      onClick={() => handleAiAction('Escalate')}
                      disabled={aiProcessing}
                      aria-label="Escalate message priority"
                    >
                      <i className="fa-solid fa-arrow-up-right me-2" aria-hidden="true"></i>
                      Escalate
                    </button>
                    <button
                      className="ai-btn ai-btn--sm ai-btn--secondary"
                      onClick={() => handleAiAction('Flag')}
                      disabled={aiProcessing}
                      aria-label="Flag message for review"
                    >
                      <i className="fa-solid fa-flag me-2" aria-hidden="true"></i>
                      Flag
                    </button>
                  </div>

                  {/* AI Processing State */}
                  {aiProcessing && (
                    <div 
                      className="ai-alert ai-alert--info mt-3" 
                      role="status" 
                      aria-live="polite" 
                      aria-busy="true"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div className="spinner-border spinner-border-sm text-primary" 
                             role="status" 
                             aria-hidden="true"></div>
                        <span>AI {aiAction} in progress...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages Area */}
                <div className="flex-fill p-4" style={{height: 'calc(100vh - 400px)', overflowY: 'auto'}}>
                  {/* Message from Mark Smith */}
                  <div className="d-flex align-items-start mb-4">
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}></span>
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h6 className="fs-14 mb-0 fw-medium">Mark Smith</h6>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}} aria-hidden="true"/>
                        <small className="text-muted">02:39 PM</small>
                      </div>
                      <div className="d-flex align-items-start">
                        <div className="p-3 me-2"
                             style={{borderRadius: '0 5px 5px 5px', border: '1px solid #E7E8EB', background: '#FCFDFD', maxWidth: '400px'}}>
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Hey mark! Did you check out the new logo design?</p>
                        </div>
                        <button className="btn p-0 border-0" style={{marginTop: '19px'}} aria-label="Message options">
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}} aria-hidden="true"/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reply from You */}
                  <div className="d-flex align-items-start justify-content-end mb-4">
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="ti ti-checks text-success" style={{fontSize: '14px'}} aria-label="Message read"/>
                        <small className="text-muted">02:39 PM</small>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}} aria-hidden="true"/>
                        <h6 className="fs-14 mb-0 fw-semibold">You</h6>
                      </div>
                      <div className="d-flex align-items-start">
                        <button className="btn p-0 border-0 me-2" style={{marginTop: '19px'}} aria-label="Message options">
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}} aria-hidden="true"/>
                        </button>
                        <div className="p-3"
                             style={{borderRadius: '5px 0 5px 5px', border: '1px solid #E7E8EB', background: '#F7F8FA', maxWidth: '400px'}}>
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Not yet. Can you send it here?</p>
                        </div>
                      </div>
                    </div>
                    <span className="avatar ms-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}></span>
                    </span>
                  </div>

                  {/* Second message from Mark */}
                  <div className="d-flex align-items-start mb-4">
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}></span>
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h6 className="fs-14 mb-0 fw-medium">Mark Smith</h6>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}} aria-hidden="true"/>
                        <small className="text-muted">02:39 PM</small>
                      </div>
                      <div className="d-flex align-items-start">
                        <div className="p-3 me-2"
                             style={{borderRadius: '0 5px 5px 5px', border: '1px solid #E7E8EB', background: '#FCFDFD', maxWidth: '400px'}}>
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Sure! Please check the below logo Attached!!!</p>
                        </div>
                        <button className="btn p-0 border-0" style={{marginTop: '23px'}} aria-label="Message options">
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}} aria-hidden="true"/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Today Separator */}
                  <div className="d-flex justify-content-center mb-4">
                    <div className="px-3 py-1 text-center"
                         style={{background: '#F7F8FA', borderRadius: '800px', color: '#0A1B39', fontSize: '14px', fontWeight: '700', lineHeight: '14px'}}>
                      Today
                    </div>
                  </div>

                  {/* Your reply */}
                  <div className="d-flex align-items-start justify-content-end mb-4">
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="ti ti-checks text-success" style={{fontSize: '14px'}} aria-label="Message read"/>
                        <small className="text-muted">10:00 AM</small>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}} aria-hidden="true"/>
                        <h6 className="fs-14 mb-0 fw-semibold">You</h6>
                      </div>
                      <div className="d-flex align-items-start">
                        <button className="btn p-0 border-0 me-2" style={{marginTop: '19px'}} aria-label="Message options">
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}} aria-hidden="true"/>
                        </button>
                        <div className="p-3"
                             style={{borderRadius: '5px 0 5px 5px', border: '1px solid #E7E8EB', background: '#F7F8FA', maxWidth: '400px'}}>
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Looks clean! I like the font. Maybe try a slightly darker blue?</p>
                        </div>
                      </div>
                    </div>
                    <span className="avatar ms-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}></span>
                    </span>
                  </div>

                  {/* Mark's final reply */}
                  <div className="d-flex align-items-start mb-4">
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}></span>
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h6 className="fs-14 mb-0 fw-medium">Mark Smith</h6>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}} aria-hidden="true"/>
                        <small className="text-muted">10:05 AM</small>
                      </div>
                      <div className="d-flex align-items-start">
                        <div className="p-3 me-2"
                             style={{borderRadius: '0 5px 5px 5px', border: '1px solid #E7E8EB', background: '#FCFDFD', maxWidth: '400px'}}>
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>
                            Perfect! That layout will work great on the landing page.
                            <i className="ti ti-thumb-up ms-1" aria-hidden="true" />
                            <span className="visually-hidden">Thumbs up</span>
                          </p>
                        </div>
                        <button className="btn p-0 border-0" style={{marginTop: '19px'}} aria-label="Message options">
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}} aria-hidden="true"/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Your final reply */}
                  <div className="d-flex align-items-start justify-content-end mb-4">
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="ti ti-checks text-success" style={{fontSize: '14px'}} aria-label="Message read"/>
                        <small className="text-muted">10:00 AM</small>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}} aria-hidden="true"/>
                        <h6 className="fs-14 mb-0 fw-semibold">You</h6>
                      </div>
                      <div className="d-flex align-items-start">
                        <button className="btn p-0 border-0 me-2" style={{marginTop: '19px'}} aria-label="Message options">
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}} aria-hidden="true"/>
                        </button>
                        <div className="p-3"
                             style={{borderRadius: '5px 0 5px 5px', border: '1px solid #E7E8EB', background: '#F7F8FA', maxWidth: '400px'}}>
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Perfect It looks Great!!!</p>
                        </div>
                      </div>
                    </div>
                    <span className="avatar ms-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt=""
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span className="position-absolute rounded-circle border border-2 border-white"
                            style={{width: '11px', height: '11px', background: '#27AE60', bottom: '0', right: '0'}}></span>
                    </span>
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-top p-3">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="ai-input flex-fill"
                      placeholder="Type your message..."
                      aria-label="Message input"
                    />
                    <button className="ai-btn ai-btn--secondary ai-btn--icon" aria-label="Attach file">
                      <i className="ti ti-photo-plus" aria-hidden="true"/>
                    </button>
                    <button className="ai-btn ai-btn--secondary ai-btn--icon" aria-label="Add emoji">
                      <i className="ti ti-mood-smile-beam" aria-hidden="true"/>
                    </button>
                    <button className="ai-btn ai-btn--accent" aria-label="Send message">
                      <i className="ti ti-send" aria-hidden="true"/>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
