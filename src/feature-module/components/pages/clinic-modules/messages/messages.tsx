import { Link } from "react-router";
import { useEffect } from "react";
import ImageWithBasePath from "../../../../../core/imageWithBasePath";

const Messages = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>("[data-ai-action]");
    const onClick = (e: Event) => {
      const panel = (e.currentTarget as HTMLElement)?.closest(".card");
      const loader = panel?.querySelector<HTMLElement>(".ai-loading");
      if (loader) {
        loader.classList.remove("d-none");
        setTimeout(() => loader.classList.add("d-none"), 1200);
      }
    };
    buttons.forEach((b) => b.addEventListener("click", onClick));
    return () => buttons.forEach((b) => b.removeEventListener("click", onClick));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Page Header */}
        <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
          <div className="flex-grow-1">
            <h4 className="fs-18 fw-semibold mb-0">Message</h4>
          </div>
          <div className="text-end">
            <ol className="breadcrumb m-0 py-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Message</li>
            </ol>
          </div>
        </div>

        {/* AI Inbox Triage: Summary and Quick Actions */}
        <div className="card border-0 mb-3" role="region" aria-label="AI inbox triage summary">
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <span className="smart-sorting-badge" aria-label="AI smart sorting enabled"><i className="ti ti-brain"/> Smart Sorting</span>
                <span className="figma-critical-badge"><i className="ti ti-alert-triangle-filled me-1"/><span>Critical</span></span>
                <span className="figma-high-badge"><i className="ti ti-exclamation-circle"/><span>High: 3</span></span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-outline-primary btn-sm ai-action-btn" data-ai-action="analyze" aria-label="Analyze inbox"><i className="ti ti-robot me-1"/>Analyze</button>
                <button className="btn btn-outline-success btn-sm ai-action-btn" data-ai-action="triage" aria-label="Mark selected as triaged"><i className="ti ti-checks me-1"/>Mark Triaged</button>
                <button className="btn btn-outline-danger btn-sm ai-action-btn" data-ai-action="escalate" aria-label="Escalate critical messages"><i className="ti ti-arrow-up-right me-1"/>Escalate</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-none mb-0">
          <div className="card-body p-0">
            <div className="d-md-flex">
              {/* Left: users */}
              <div className="chat-user-nav">
                <div>
                  <div className="d-flex align-items-center justify-content-between border-bottom p-3">
                    <div className="d-flex align-items-center">
                      <span className="avatar me-2 flex-shrink-0"><ImageWithBasePath src="assets/img/users/user-01.jpg" alt="user"/></span>
                      <div>
                        <h6 className="fs-14 mb-1">James Hong </h6>
                        <p className="mb-0">Admin</p>
                      </div>
                    </div>
                    <button className="btn p-2 btn-primary" aria-label="New Chat"><i className="ti ti-plus"/></button>
                  </div>

                  <div>
                    <div className="input-group w-auto input-group-flat p-4 pb-0">
                      <span className="input-group-text border-end-0"><i className="ti ti-search"/></span>
                      <input type="text" className="form-control" placeholder="Search Keyword"/>
                    </div>
                    <div className="chat-users p-4" data-simplebar>
                      <div className="d-flex flex-column mb-3">
                        <div className="d-flex flex-column">
                          <div className="figma-complete-filter-container d-flex align-items-center gap-2 flex-wrap" role="toolbar" aria-label="Message priority filters">
                            <button type="button" className="figma-smart-sorting-btn btn p-0 border-0" aria-label="AI Smart Sorting enabled"><span className="smart-sorting-badge"><i className="ti ti-brain"/> Smart Sorting</span></button>
                            <button type="button" className="figma-filter-btn btn p-0 border-0 active" data-priority="all" aria-pressed="true"><span className="filter-pill">All</span></button>
                            <button type="button" className="figma-filter-btn btn p-0 border-0" data-priority="critical" aria-pressed="false"><span className="figma-critical-badge"><i className="ti ti-alert-triangle-filled"/><span>Critical</span></span></button>
                            <button type="button" className="figma-filter-btn btn p-0 border-0" data-priority="high" aria-pressed="false"><span className="figma-high-badge"><i className="ti ti-exclamation-circle"/><span>High: 3</span></span></button>
                            <button type="button" className="figma-filter-btn btn p-0 border-0" data-priority="medium" aria-pressed="false"><span className="figma-medium-badge"><i className="ti ti-info-circle"/><span>Medium: 2</span></span></button>
                            <button type="button" className="figma-filter-btn btn p-0 border-0" data-priority="low" aria-pressed="false"><span className="figma-low-badge"><i className="ti ti-check"/><span>Low: 3</span></span></button>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between rounded p-3 user-list active mb-1">
                        <div className="d-flex align-items-center">
                          <span className="avatar me-2 flex-shrink-0"><ImageWithBasePath src="assets/img/users/user-02.jpg" alt="user"/></span>
                          <div>
                            <h6 className="fs-14 mb-1"><a href="#">Mark Smith</a></h6>
                            <div className="d-flex align-items-center gap-1 mt-1" aria-label="AI triage for Mark Smith">
                              <span className="ai-flag ai-flag-critical"><i className="ti ti-alert-triangle-filled"/> Critical</span>
                              <span className="fs-10 ai-confidence">95%</span>
                            </div>
                            <p className="mb-0 text-truncate">Hey Sam! Did you Ch...</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="text-dark d-block">10:10 AM</span>
                          <span className="d-block text-success"><i className="ti ti-checks"/></span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between rounded p-3 user-list mb-1">
                        <div className="d-flex align-items-center">
                          <span className="avatar me-2 flex-shrink-0"><ImageWithBasePath src="assets/img/users/user-03.jpg" alt="user"/></span>
                          <div>
                            <h6 className="fs-14 mb-1"><a href="#">Eugene Sikora</a></h6>
                            <div className="d-flex align-items-center gap-1 mt-1" aria-label="AI triage for Eugene Sikora">
                              <span className="ai-flag ai-flag-warning"><i className="ti ti-exclamation-circle"/> High</span>
                              <span className="fs-10 ai-confidence">82%</span>
                            </div>
                            <p className="mb-0 text-truncate">How are your Today</p>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="text-dark d-block mb-1">08:26 AM</span>
                          <span className="badge ms-auto bg-danger rounded-circle message-count">5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: chat */}
              <div className="flex-fill chat-messages">
                <div className="card border-0 mb-0">
                  <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-3">
                    <div className="d-flex align-items-center">
                      <span className="avatar me-2 flex-shrink-0"><ImageWithBasePath src="assets/img/users/user-10.jpg" alt="user"/></span>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1">Mark Smith</h6>
                        <p className="mb-0 d-inline-flex align-items-center"><i className="ti ti-point-filled text-success"/>Online</p>
                      </div>
                    </div>
                    <div className="gap-2 d-flex align-items-center flex-wrap">
                      <a href="#" className="btn btn-icon btn-light" aria-label="Voice Call"><i className="ti ti-phone"/></a>
                      <a href="#" className="btn btn-icon btn-light" aria-label="Video Call"><i className="ti ti-video"/></a>
                      <a href="#" className="btn btn-icon btn-light" aria-label="Info"><i className="ti ti-info-circle"/></a>
                      <a href="#" className="btn btn-icon btn-light close-chat d-md-none"><i className="ti ti-x"/></a>
                    </div>
                  </div>

                  <section className="ai-suggestions border-top border-bottom p-3" aria-label="AI triage suggestions">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <i className="ti ti-bulb text-primary" aria-hidden="true"/>
                        <h6 className="mb-0 fw-semibold">AI Suggestions</h6>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-light text-dark">Auto</span>
                        <button className="btn btn-outline-secondary btn-sm" data-ai-action="refresh" aria-label="Refresh suggestions"><i className="ti ti-refresh me-1"/>Refresh</button>
                      </div>
                    </div>
                    <div className="ai-suggestion-action-row d-flex align-items-center gap-2 flex-wrap mt-2">
                      <button className="btn btn-primary btn-sm ai-action-btn" data-ai-action="apply-reply" aria-label="Apply suggested reply"><i className="ti ti-send me-1"/>Apply</button>
                      <button className="btn btn-outline-warning btn-sm ai-action-btn" data-ai-action="flag" aria-label="Flag message"><i className="ti ti-flag-3 me-1"/>Flag</button>
                    </div>
                    <div className="mt-2">
                      <ul className="list-unstyled mb-0">
                        <li className="d-flex align-items-start gap-2 py-1"><i className="ti ti-arrow-badge-right text-success mt-1" aria-hidden="true"/><div className="flex-grow-1"><small className="fw-semibold d-block">Send rescheduling link</small><small className="text-muted">Patient requested to reschedule. Include next available slots.</small></div></li>
                        <li className="d-flex align-items-start gap-2 py-1"><i className="ti ti-alert-octagon text-warning mt-1" aria-hidden="true"/><div className="flex-grow-1"><small className="fw-semibold d-block">Flag as needs action</small><small className="text-muted">Requires team response within 2 hours.</small></div></li>
                      </ul>
                    </div>
                    <div className="ai-loading d-none mt-2" aria-live="polite" aria-busy="true">
                      <div className="d-flex align-items-center gap-2">
                        <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"/>
                        <small>Analyzing conversation…</small>
                      </div>
                    </div>
                  </section>

                  <div className="card-body p-0">
                    <div className="message-body p-4" data-simplebar>
                      <div className="chat-list mb-3">
                        <div className="d-flex align-items-start">
                          <span className="avatar online me-2 flex-shrink-0"><ImageWithBasePath src="assets/img/users/user-10.jpg" alt="user"/></span>
                          <div>
                            <div className="d-flex align-items-center mb-1">
                              <h6 className="fs-14 mb-0">Mark Smith</h6>
                              <p className="mb-0 d-inline-flex align-items-center"><i className="ti ti-point-filled mx-2"/>02:39 PM</p>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="message-box receive-message p-3">
                                <p className="mb-0 fs-16">Hey mark! Did you check out the new logo design?</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chat-list ms-auto mb-3">
                        <div className="d-flex align-items-start justify-content-end">
                          <div>
                            <div className="d-flex align-items-center justify-content-end mb-1">
                              <p className="mb-0 d-inline-flex align-items-center"><i className="ti ti-checks text-success me-1"/>02:39 PM<i className="ti ti-point-filled mx-2"/></p>
                              <h6 className="fs-14 fw-semibold mb-0">You</h6>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="message-box sent-message p-3">
                                <p className="mb-0 fs-16">Not yet. Can you send it here?</p>
                              </div>
                            </div>
                          </div>
                          <span className="avatar ms-2 online flex-shrink-0"><ImageWithBasePath src="assets/img/users/user-11.jpg" alt="user"/></span>
                        </div>
                      </div>
                    </div>
                    <div className="message-footer d-flex align-items-center border-top p-3">
                      <div className="flex-fill">
                        <input type="text" className="form-control border-0" placeholder="Type Something..."/>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <a href="#" className="btn btn-icon btn-light"><i className="ti ti-photo-plus"/></a>
                        <a href="#" className="btn btn-icon btn-light"><i className="ti ti-mood-smile-beam"/></a>
                        <div>
                          <a href="#" className="btn btn-icon btn-outline-light" aria-label="more options"><i className="ti ti-dots-vertical"/></a>
                        </div>
                      </div>
                    </div>
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
