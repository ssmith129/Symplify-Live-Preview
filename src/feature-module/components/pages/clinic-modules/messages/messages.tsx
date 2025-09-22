import { Link } from "react-router";
import { useEffect, useState } from "react";
import ImageWithBasePath from "../../../../../core/imageWithBasePath";

const Messages = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<string>('mark-smith');

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

        
        {/* Messages Interface */}
        <div className="card shadow-none mb-0 border" style={{borderRadius: '5px'}}>
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
                      <h6 className="fs-14 mb-1 fw-medium">James Hong</h6>
                      <p className="mb-0 text-muted fs-14">Admin</p>
                    </div>
                  </div>
                  <button className="btn btn-primary d-flex align-items-center justify-content-center" style={{width: '31px', height: '30px', borderRadius: '5px'}} aria-label="New Chat">
                    <i className="ti ti-plus fs-12"/>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="p-3">
                  <div className="input-group border rounded-start" style={{borderRadius: '6px 0 0 6px'}}>
                    <span className="input-group-text border-end-0 bg-transparent" style={{borderRadius: '6px 0 0 6px'}}>
                      <i className="ti ti-search text-dark"/>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search Keyword"
                      style={{borderRadius: '0 5px 5px 0'}}
                    />
                  </div>
                </div>

                {/* AI Filter Pills */}
                <div className="px-3 pb-2">
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-3" role="toolbar" aria-label="Message priority filters">
                    <button
                      type="button"
                      className={`btn p-0 border-0 ${activeFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('all')}
                      aria-label="All"
                      style={{
                        background: activeFilter === 'all' ? '#2D3748' : 'transparent',
                        borderRadius: '5px',
                        padding: '3px 7px',
                        border: activeFilter === 'all' ? 'none' : '1px solid rgba(0,0,0,0.1)',
                        boxShadow: activeFilter === 'all' ? '0 2px 4px 0 rgba(0,0,0,0.1)' : 'none'
                      }}
                    />

                    <button
                      type="button"
                      className="btn p-0 border-0"
                      onClick={() => setActiveFilter('critical')}
                      style={{background: 'transparent'}}
                    >
                      <span className="figma-critical-badge">
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none" className="me-1">
                          <path d="M0.855469 8.39583L5.50045 0.375L10.1454 8.39583H0.855469ZM5.50045 7.16189C5.60533 7.16189 5.69325 7.1264 5.76422 7.05544C5.83518 6.98447 5.87067 6.89655 5.87067 6.79167C5.87067 6.68678 5.83518 6.59886 5.76422 6.5279C5.69325 6.45693 5.60533 6.42145 5.50045 6.42145C5.39557 6.42145 5.30764 6.45693 5.23668 6.5279C5.16571 6.59886 5.13023 6.68678 5.13023 6.79167C5.13023 6.89655 5.16571 6.98447 5.23668 7.05544C5.30764 7.1264 5.39557 7.16189 5.50045 7.16189ZM5.1567 5.96311H5.8442V3.67145H5.1567V5.96311Z" fill="#DC3545"/>
                        </svg>
                        Critical
                      </span>
                    </button>

                    <button
                      type="button"
                      className="btn p-0 border-0"
                      onClick={() => setActiveFilter('high')}
                      style={{background: 'transparent'}}
                    >
                      <span className="figma-high-badge d-none">
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" className="me-1">
                          <path d="M4.70182 6.66861C4.8067 6.66861 4.89463 6.63312 4.96559 6.56216C5.03656 6.49119 5.07204 6.40327 5.07204 6.29839C5.07204 6.19351 5.03656 6.10558 4.96559 6.03462C4.89463 5.96373 4.8067 5.92828 4.70182 5.92828C4.59694 5.92828 4.50902 5.96373 4.43805 6.03462C4.36709 6.10558 4.3316 6.19351 4.3316 6.29839C4.3316 6.40327 4.36709 6.49119 4.43805 6.56216C4.50902 6.63312 4.59694 6.66861 4.70182 6.66861ZM4.35807 4.99397H5.04557V2.24397H4.35807V4.99397ZM4.70262 8.85451C4.10037 8.85451 3.53429 8.74023 3.00439 8.51168C2.47448 8.28312 2.01354 7.97295 1.62159 7.58115C1.22964 7.18935 0.919312 6.72861 0.690604 6.19893C0.461972 5.66925 0.347656 5.10332 0.347656 4.50115C0.347656 3.8989 0.461934 3.33282 0.69049 2.80291C0.919045 2.273 1.22922 1.81207 1.62102 1.42012C2.01282 1.02817 2.47356 0.717835 3.00324 0.489127C3.53292 0.260495 4.09885 0.146179 4.70102 0.146179C5.30327 0.146179 5.86935 0.260457 6.39926 0.489012C6.92917 0.717568 7.3901 1.02775 7.78205 1.41954C8.174 1.81134 8.48433 2.27208 8.71304 2.80176C8.94167 3.33144 9.05599 3.89737 9.05599 4.49954C9.05599 5.10179 8.94171 5.66787 8.71316 6.19778C8.4846 6.72769 8.17442 7.18862 7.78262 7.58058C7.39083 7.97253 6.93009 8.28286 6.40041 8.51156C5.87073 8.7402 5.3048 8.85451 4.70262 8.85451ZM4.70182 8.16701C5.72543 8.16701 6.59245 7.8118 7.30286 7.10139C8.01328 6.39097 8.36849 5.52396 8.36849 4.50035C8.36849 3.47673 8.01328 2.60972 7.30286 1.8993C6.59245 1.18889 5.72543 0.833679 4.70182 0.833679C3.67821 0.833679 2.8112 1.18889 2.10078 1.8993C1.39036 2.60972 1.03516 3.47673 1.03516 4.50035C1.03516 5.52396 1.39036 6.39097 2.10078 7.10139C2.8112 7.8118 3.67821 8.16701 4.70182 8.16701Z" fill="#E2B93B"/>
                        </svg>
                        High: 3
                      </span>
                    </button>

                    <button
                      type="button"
                      className="btn p-0 border-0 d-none"
                      onClick={() => setActiveFilter('medium')}
                      style={{background: 'transparent'}}
                    >
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 6px',
                        borderRadius: '5px',
                        background: '#4A5568',
                        color: '#00D3C7',
                        fontSize: '10px',
                        fontWeight: '600',
                        lineHeight: '15px'
                      }}>
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" className="me-1">
                          <path d="M4.55339 6.67709H5.24089V4.04168H4.55339V6.67709ZM4.89714 3.25724C5.00202 3.25724 5.08994 3.22176 5.16091 3.15079C5.23187 3.07983 5.26735 2.9919 5.26735 2.88702C5.26735 2.78214 5.23187 2.69422 5.16091 2.62325C5.08994 2.55236 5.00202 2.51692 4.89714 2.51692C4.79225 2.51692 4.70433 2.55236 4.63336 2.62325C4.5624 2.69422 4.52692 2.78214 4.52692 2.88702C4.52692 2.9919 4.5624 3.07983 4.63336 3.15079C4.70433 3.22176 4.79225 3.25724 4.89714 3.25724ZM4.89794 8.85418C4.29569 8.85418 3.72961 8.7399 3.1997 8.51134C2.66979 8.28279 2.20886 7.97261 1.81691 7.58081C1.42495 7.18901 1.11462 6.72827 0.885917 6.19859C0.657285 5.66891 0.542969 5.10299 0.542969 4.50081C0.542969 3.89856 0.657247 3.33248 0.885802 2.80257C1.11436 2.27266 1.42453 1.81173 1.81633 1.41978C2.20813 1.02783 2.66887 0.7175 3.19855 0.488791C3.72823 0.260159 4.29416 0.145844 4.89633 0.145844C5.49858 0.145844 6.06466 0.260121 6.59457 0.488677C7.12448 0.717232 7.58541 1.02741 7.97736 1.41921C8.36932 1.81101 8.67965 2.27175 8.90835 2.80143C9.13699 3.33111 9.2513 3.89703 9.2513 4.49921C9.2513 5.10146 9.13702 5.66754 8.90847 6.19745C8.67991 6.72736 8.36974 7.18829 7.97794 7.58024C7.58614 7.97219 7.1254 8.28252 6.59572 8.51123C6.06604 8.73986 5.50011 8.85418 4.89794 8.85418ZM4.89714 8.16668C5.92075 8.16668 6.78776 7.81147 7.49818 7.10105C8.20859 6.39063 8.5638 5.52362 8.5638 4.50001C8.5638 3.4764 8.20859 2.60939 7.49818 1.89897C6.78776 1.18855 5.92075 0.833343 4.89714 0.833343C3.87352 0.833343 3.00651 1.18855 2.29609 1.89897C1.58568 2.60939 1.23047 3.4764 1.23047 4.50001C1.23047 5.52362 1.58568 6.39063 2.29609 7.10105C3.00651 7.81147 3.87352 8.16668 4.89714 8.16668Z" fill="#00D3C7"/>
                        </svg>
                        Medium: 2
                      </span>
                    </button>

                    <button
                      type="button"
                      className="btn p-0 border-0"
                      onClick={() => setActiveFilter('low')}
                      style={{background: 'transparent'}}
                    >
                      <span className="figma-low-badge">
                        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" className="me-1">
                          <path d="M3.30389 7L0.398438 4.06396L1.23099 3.22265L3.30389 5.31737L8.56589 0L9.39844 0.841314L3.30389 7Z" fill="#198754"/>
                        </svg>
                        Low: 3
                      </span>
                    </button>
                  </div>
                </div>

                {/* User List */}
                <div className="chat-users" data-simplebar style={{height: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                  {/* Mark Smith - Selected/Active */}
                  <div
                    className={`d-flex align-items-center p-3 user-list mb-1 ${selectedUser === 'mark-smith' ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedUser === 'mark-smith' ? '#FCFDFD' : 'transparent',
                      borderRadius: '4.8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedUser('mark-smith')}
                  >
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt="Mark Smith"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                    <div className="flex-grow-1">
                      <h6 className="fs-14 mb-1 fw-medium">Mark Smith</h6>
                      <div className="d-flex align-items-center gap-1 mb-1">
                        <span className="figma-critical-badge">
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M0.855469 8.39583L5.50045 0.375L10.1454 8.39583H0.855469ZM5.50045 7.16189C5.60533 7.16189 5.69325 7.1264 5.76422 7.05544C5.83518 6.98447 5.87067 6.89655 5.87067 6.79167C5.87067 6.68678 5.83518 6.59886 5.76422 6.5279C5.69325 6.45693 5.60533 6.42145 5.50045 6.42145C5.39557 6.42145 5.30764 6.45693 5.23668 6.5279C5.16571 6.59886 5.13023 6.68678 5.13023 6.79167C5.13023 6.89655 5.16571 6.98447 5.23668 7.05544C5.30764 7.1264 5.39557 7.16189 5.50045 7.16189ZM5.1567 5.96311H5.8442V3.67145H5.1567V5.96311Z" fill="#DC3545"/>
                          </svg>
                          Critical
                        </span>
                      </div>
                      <p className="mb-0 text-muted text-truncate fs-14">Hey Sam! Did you Ch...</p>
                    </div>
                    <div className="text-end">
                      <small className="text-dark">10:10 AM</small>
                      <div className="mt-1">
                        <i className="ti ti-checks text-success"/>
                      </div>
                    </div>
                  </div>

                  {/* Eugene Sikora */}
                  <div
                    className={`d-flex align-items-center p-3 user-list mb-1 ${selectedUser === 'eugene-sikora' ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedUser === 'eugene-sikora' ? '#FCFDFD' : 'transparent',
                      borderRadius: '4.8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedUser('eugene-sikora')}
                  >
                    <span className="avatar me-2 flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/users/user-03.jpg"
                        alt="Eugene Sikora"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                    </span>
                    <div className="flex-grow-1">
                      <h6 className="fs-14 mb-1 fw-medium">Eugene Sikora</h6>
                      <div className="d-flex align-items-center gap-1 mb-1">
                        <span className="figma-high-badge d-none">
                          <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                            <path d="M4.70182 6.66861C4.8067 6.66861 4.89463 6.63312 4.96559 6.56216C5.03656 6.49119 5.07204 6.40327 5.07204 6.29839C5.07204 6.19351 5.03656 6.10558 4.96559 6.03462C4.89463 5.96373 4.8067 5.92828 4.70182 5.92828C4.59694 5.92828 4.50902 5.96373 4.43805 6.03462C4.36709 6.10558 4.3316 6.19351 4.3316 6.29839C4.3316 6.40327 4.36709 6.49119 4.43805 6.56216C4.50902 6.63312 4.59694 6.66861 4.70182 6.66861ZM4.35807 4.99397H5.04557V2.24397H4.35807V4.99397ZM4.70262 8.85451C4.10037 8.85451 3.53429 8.74023 3.00439 8.51168C2.47448 8.28312 2.01354 7.97295 1.62159 7.58115C1.22964 7.18935 0.919312 6.72861 0.690604 6.19893C0.461972 5.66925 0.347656 5.10332 0.347656 4.50115C0.347656 3.8989 0.461934 3.33282 0.69049 2.80291C0.919045 2.273 1.22922 1.81207 1.62102 1.42012C2.01282 1.02817 2.47356 0.717835 3.00324 0.489127C3.53292 0.260495 4.09885 0.146179 4.70102 0.146179C5.30327 0.146179 5.86935 0.260457 6.39926 0.489012C6.92917 0.717568 7.3901 1.02775 7.78205 1.41954C8.174 1.81134 8.48433 2.27208 8.71304 2.80176C8.94167 3.33144 9.05599 3.89737 9.05599 4.49954C9.05599 5.10179 8.94171 5.66787 8.71316 6.19778C8.4846 6.72769 8.17442 7.18862 7.78262 7.58058C7.39083 7.97253 6.93009 8.28286 6.40041 8.51156C5.87073 8.7402 5.3048 8.85451 4.70262 8.85451ZM4.70182 8.16701C5.72543 8.16701 6.59245 7.8118 7.30286 7.10139C8.01328 6.39097 8.36849 5.52396 8.36849 4.50035C8.36849 3.47673 8.01328 2.60972 7.30286 1.8993C6.59245 1.18889 5.72543 0.833679 4.70182 0.833679C3.67821 0.833679 2.8112 1.18889 2.10078 1.8993C1.39036 2.60972 1.03516 3.47673 1.03516 4.50035C1.03516 5.52396 1.39036 6.39097 2.10078 7.10139C2.8112 7.8118 3.67821 8.16701 4.70182 8.16701Z" fill="#E2B93B"/>
                          </svg>
                          High
                        </span>
                      </div>
                      <p className="mb-0 text-muted text-truncate fs-14">How are your Today</p>
                    </div>
                    <div className="text-end">
                      <small className="text-dark">08:26 AM</small>
                      <div className="mt-1">
                        <span className="message-count badge bg-danger rounded-circle">5</span>
                      </div>
                    </div>
                  </div>

                  {/* Robert Fassett */}
                  <div
                    className={`d-flex align-items-center p-3 user-list mb-1 ${selectedUser === 'robert-fassett' ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedUser === 'robert-fassett' ? '#FCFDFD' : 'transparent',
                      borderRadius: '4.8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedUser('robert-fassett')}
                  >
                    <span className="avatar me-2 flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/users/user-04.jpg"
                        alt="Robert Fassett"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                    </span>
                    <div className="flex-grow-1">
                      <h6 className="fs-14 mb-1 fw-medium">Robert Fassett</h6>
                      <div className="d-flex align-items-center gap-1 mb-1">
                        <span className="figma-high-badge d-none">
                          <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                            <path d="M4.70182 6.66861C4.8067 6.66861 4.89463 6.63312 4.96559 6.56216C5.03656 6.49119 5.07204 6.40327 5.07204 6.29839C5.07204 6.19351 5.03656 6.10558 4.96559 6.03462C4.89463 5.96373 4.8067 5.92828 4.70182 5.92828C4.59694 5.92828 4.50902 5.96373 4.43805 6.03462C4.36709 6.10558 4.3316 6.19351 4.3316 6.29839C4.3316 6.40327 4.36709 6.49119 4.43805 6.56216C4.50902 6.63312 4.59694 6.66861 4.70182 6.66861ZM4.35807 4.99397H5.04557V2.24397H4.35807V4.99397ZM4.70262 8.85451C4.10037 8.85451 3.53429 8.74023 3.00439 8.51168C2.47448 8.28312 2.01354 7.97295 1.62159 7.58115C1.22964 7.18935 0.919312 6.72861 0.690604 6.19893C0.461972 5.66925 0.347656 5.10332 0.347656 4.50115C0.347656 3.8989 0.461934 3.33282 0.69049 2.80291C0.919045 2.273 1.22922 1.81207 1.62102 1.42012C2.01282 1.02817 2.47356 0.717835 3.00324 0.489127C3.53292 0.260495 4.09885 0.146179 4.70102 0.146179C5.30327 0.146179 5.86935 0.260457 6.39926 0.489012C6.92917 0.717568 7.3901 1.02775 7.78205 1.41954C8.174 1.81134 8.48433 2.27208 8.71304 2.80176C8.94167 3.33144 9.05599 3.89737 9.05599 4.49954C9.05599 5.10179 8.94171 5.66787 8.71316 6.19778C8.4846 6.72769 8.17442 7.18862 7.78262 7.58058C7.39083 7.97253 6.93009 8.28286 6.40041 8.51156C5.87073 8.7402 5.3048 8.85451 4.70262 8.85451ZM4.70182 8.16701C5.72543 8.16701 6.59245 7.8118 7.30286 7.10139C8.01328 6.39097 8.36849 5.52396 8.36849 4.50035C8.36849 3.47673 8.01328 2.60972 7.30286 1.8993C6.59245 1.18889 5.72543 0.833679 4.70182 0.833679C3.67821 0.833679 2.8112 1.18889 2.10078 1.8993C1.39036 2.60972 1.03516 3.47673 1.03516 4.50035C1.03516 5.52396 1.39036 6.39097 2.10078 7.10139C2.8112 7.8118 3.67821 8.16701 4.70182 8.16701Z" fill="#E2B93B"/>
                          </svg>
                          High
                        </span>
                      </div>
                      <p className="mb-0 text-muted text-truncate fs-14">Here are some of ve...</p>
                    </div>
                    <div className="text-end">
                      <small className="text-dark">yesterday</small>
                      <div className="mt-1">
                        <span className="message-count badge bg-danger rounded-circle">5</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional users... */}
                  <div
                    className={`d-flex align-items-center p-3 user-list mb-1 ${selectedUser === 'andrew-fletcher' ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedUser === 'andrew-fletcher' ? '#FCFDFD' : 'transparent',
                      borderRadius: '4.8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedUser('andrew-fletcher')}
                  >
                    <span className="avatar me-2 flex-shrink-0">
                      <ImageWithBasePath
                        src="assets/img/users/user-05.jpg"
                        alt="Andrew Fletcher"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                    </span>
                    <div className="flex-grow-1">
                      <h6 className="fs-14 mb-1 fw-medium">Andrew Fletcher</h6>
                      <div className="d-flex align-items-center gap-1 mb-1">
                        <span className="figma-low-badge">
                          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                            <path d="M3.30389 7L0.398438 4.06396L1.23099 3.22265L3.30389 5.31737L8.56589 0L9.39844 0.841314L3.30389 7Z" fill="#198754"/>
                          </svg>
                          Low
                        </span>
                      </div>
                      <p className="mb-0 text-muted text-truncate fs-14">Use tools like Trello...</p>
                    </div>
                    <div className="text-end">
                      <small className="text-dark">yesterday</small>
                    </div>
                  </div>

                  <div
                    className={`d-flex align-items-center p-3 user-list mb-1 ${selectedUser === 'tyron-derby' ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedUser === 'tyron-derby' ? '#FCFDFD' : 'transparent',
                      borderRadius: '4.8px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedUser('tyron-derby')}
                  >
                    <div
                      className="avatar me-2 flex-shrink-0 d-flex align-items-center justify-content-center fw-semibold text-purple"
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
                    <div className="flex-grow-1">
                      <h6 className="fs-14 mb-1 fw-medium">Tyron Derby</h6>
                      <div className="d-flex align-items-center gap-1 mb-1">
                        <span className="figma-low-badge">
                          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                            <path d="M3.30389 7L0.398438 4.06396L1.23099 3.22265L3.30389 5.31737L8.56589 0L9.39844 0.841314L3.30389 7Z" fill="#198754"/>
                          </svg>
                          Low
                        </span>
                      </div>
                      <p className="mb-0 text-muted text-truncate fs-14">Let's reconvene next...</p>
                    </div>
                    <div className="text-end">
                      <small className="text-dark">12:55 PM</small>
                      <div className="mt-1">
                        <i className="ti ti-checks text-success"/>
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
                        alt="Mark Smith"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                    <div>
                      <h6 className="fs-14 fw-semibold mb-1">Mark Smith</h6>
                      <p className="mb-0 d-flex align-items-center text-muted fs-14">
                        <i className="ti ti-point-filled text-success me-1"/>Online
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-light btn-icon" style={{width: '38px', height: '38px'}} aria-label="Voice Call">
                      <i className="ti ti-phone fs-12"/>
                    </button>
                    <button className="btn btn-light btn-icon" style={{width: '38px', height: '38px'}} aria-label="Video Call">
                      <i className="ti ti-video fs-12"/>
                    </button>
                    <button className="btn btn-light btn-icon" style={{width: '38px', height: '38px'}} aria-label="Info">
                      <i className="ti ti-info-circle fs-12"/>
                    </button>
                  </div>
                </div>

                {/* AI Assistance Section */}
                <div className="border-bottom p-3" style={{background: '#fff'}}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
                        <path d="M7.71435 0.748731C7.76562 0.466938 7.9066 0.274807 8.1373 0.172338C8.36799 0.0698679 8.59869 0.0762722 8.82938 0.191551C9.07289 0.294021 9.22669 0.479747 9.29077 0.748731C9.30359 0.812774 9.31 0.998501 9.31 1.30591C9.31 1.60051 9.30359 1.77984 9.29077 1.84388C9.27795 1.95916 9.2331 2.06803 9.1562 2.1705C9.0024 2.38825 8.78452 2.49712 8.50256 2.49712C8.2206 2.49712 8.00272 2.38825 7.84893 2.1705C7.77203 2.06803 7.72717 1.95916 7.71435 1.84388C7.70154 1.77984 7.69513 1.60051 7.69513 1.30591C7.69513 0.998501 7.70154 0.812774 7.71435 0.748731ZM2.58138 2.99667C2.58138 2.76611 2.65187 2.57398 2.79285 2.42027C2.93384 2.26657 3.1389 2.18971 3.40804 2.18971C3.54902 2.18971 3.67078 2.22174 3.77331 2.28578C3.87584 2.34982 4.02964 2.48432 4.2347 2.68925C4.43976 2.8942 4.57433 3.0479 4.63842 3.15037C4.7025 3.25284 4.73454 3.38093 4.73454 3.53463C4.73454 3.76519 4.65764 3.95732 4.50384 4.11103C4.35005 4.26473 4.1578 4.34158 3.92711 4.34158C3.77331 4.34158 3.64515 4.30956 3.54261 4.24552C3.44008 4.18147 3.27988 4.04698 3.062 3.84204C2.85694 3.62429 2.72236 3.47059 2.65828 3.38093C2.60702 3.27846 2.58138 3.15037 2.58138 2.99667ZM13.078 4.34158C12.8473 4.34158 12.6551 4.26473 12.5013 4.11103C12.3475 3.95732 12.2706 3.76519 12.2706 3.53463C12.2706 3.38093 12.2962 3.25924 12.3475 3.16958C12.4116 3.07992 12.559 2.91981 12.7897 2.68925C13.0203 2.4587 13.1741 2.3178 13.251 2.26657C13.3408 2.21533 13.4753 2.18971 13.6548 2.18971C13.8342 2.18971 14.0008 2.25376 14.1546 2.38185C14.334 2.54836 14.4237 2.7533 14.4237 2.99667C14.4237 3.15037 14.3917 3.27846 14.3276 3.38093C14.2764 3.47059 14.1418 3.62429 13.9239 3.84204C13.7188 4.04698 13.565 4.18147 13.4625 4.24552C13.36 4.30956 13.2318 4.34158 13.078 4.34158ZM3.73486 7.43489C3.87584 6.58952 4.17703 5.85301 4.63842 5.22539C5.03573 4.68742 5.54197 4.25192 6.15716 3.91889C6.68263 3.6371 7.24015 3.45138 7.8297 3.36171C8.35517 3.27205 8.81016 3.26565 9.19465 3.3425C10.0021 3.47059 10.739 3.79081 11.4055 4.30316C12.0719 4.8027 12.5718 5.43033 12.905 6.18604C13.2639 7.0058 13.3856 7.87039 13.2703 8.77981C13.1677 9.38182 12.9691 9.94541 12.6743 10.4706C12.3923 10.9829 12.0335 11.4184 11.5977 11.7771C11.2901 12.0204 11.0851 12.3214 10.9825 12.6801C10.9185 12.885 10.8864 13.154 10.8864 13.487C10.8864 13.8841 10.88 14.1211 10.8672 14.1979C10.7903 14.5566 10.6301 14.896 10.3866 15.2162C9.92518 15.8054 9.29077 16.1 8.48334 16.1C7.86815 16.1 7.33627 15.8951 6.8877 15.4852C6.51602 15.1394 6.2661 14.7103 6.13794 14.1979C6.12512 14.1211 6.11871 13.9097 6.11871 13.5639C6.11871 13.1796 6.08667 12.885 6.02259 12.6801C5.93287 12.3342 5.72781 12.0332 5.4074 11.7771C4.52307 11.0342 3.97196 10.0543 3.75408 8.83745C3.72845 8.67094 3.70923 8.44038 3.69641 8.14578C3.69641 7.83837 3.70923 7.60141 3.73486 7.43489ZM8.25264 4.91798C7.58619 4.9564 7.00304 5.18696 6.5032 5.60965C6.01618 6.00672 5.67014 6.51266 5.46508 7.12748C5.26001 7.7423 5.24079 8.35072 5.4074 8.95273C5.58683 9.61878 5.96491 10.1824 6.54165 10.6435C6.64418 10.7331 6.72108 10.81 6.77235 10.874C6.86206 10.9637 6.98382 11.111 7.13762 11.3159H9.86751C10.0982 11.0213 10.3545 10.746 10.6365 10.4898C10.7903 10.3489 10.8992 10.2336 10.9633 10.1439C11.0915 9.99024 11.2196 9.7917 11.3478 9.54833C11.4503 9.33059 11.5336 9.08082 11.5977 8.79902C11.7131 8.29948 11.7195 7.81916 11.617 7.35804C11.476 6.73041 11.1363 6.17964 10.598 5.70571C10.3417 5.48796 10.0533 5.30864 9.73294 5.16775C9.42534 5.02685 9.11775 4.95 8.81016 4.93719L8.56024 4.91798H8.25264ZM1.12031 7.31961C1.17158 7.30681 1.3446 7.3004 1.63938 7.3004C1.94697 7.3004 2.14563 7.30681 2.23534 7.31961C2.35069 7.33242 2.45963 7.37725 2.56216 7.45411C2.78004 7.60781 2.88898 7.82556 2.88898 8.10735C2.88898 8.38914 2.78004 8.60689 2.56216 8.7606C2.45963 8.83745 2.35069 8.88228 2.23534 8.89509C2.17126 8.9079 1.98542 8.9143 1.67783 8.9143C1.38305 8.9143 1.20362 8.9079 1.13954 8.89509C0.870394 8.83105 0.684556 8.68374 0.582025 8.45319C0.479494 8.22263 0.473086 7.99207 0.5628 7.76152C0.665332 7.53096 0.851169 7.38366 1.12031 7.31961ZM14.1161 8.10735C14.1161 7.82556 14.2187 7.60781 14.4237 7.45411C14.5391 7.37725 14.648 7.33242 14.7506 7.31961C14.8146 7.30681 15.0005 7.3004 15.3081 7.3004C15.6285 7.3004 15.8143 7.30681 15.8656 7.31961C16.1475 7.38366 16.3334 7.53096 16.4231 7.76152C16.5256 7.99207 16.5256 8.22263 16.4231 8.45319C16.3206 8.68374 16.1347 8.83105 15.8656 8.89509C15.8015 8.9079 15.6157 8.9143 15.3081 8.9143C15.0133 8.9143 14.8339 8.9079 14.7698 8.89509C14.6544 8.88228 14.5455 8.83745 14.443 8.7606C14.2251 8.60689 14.1161 8.38914 14.1161 8.10735ZM7.73358 13.4294V13.9481C7.78484 14.089 7.85533 14.2043 7.94505 14.294C8.08603 14.4221 8.27187 14.4861 8.50256 14.4861C8.65636 14.4861 8.79093 14.4541 8.90628 14.39C9.08571 14.3004 9.20747 14.1531 9.27155 13.9481V12.9106H7.73358V13.4294Z" fill="#2E37A4"/>
                      </svg>
                      <h6 className="mb-0 fw-semibold fs-16">AI Assistance</h6>
                    </div>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <button
                        className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                        style={{height: '32px', padding: '7px 11px', borderRadius: '5px', border: '1px solid #00D3C7', background: '#fff', color: '#00D3C7'}}
                      >
                        <i className="ti ti-refresh" style={{fontSize: '13px'}}/>
                      </button>
                      <button
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{
                          height: '32px',
                          padding: '6px 10px',
                          borderRadius: '5px',
                          background: 'linear-gradient(113deg, #0D6EFD 0%, #4A5568 100%)',
                          color: '#fff',
                          border: 'none'
                        }}
                        data-ai-action="apply"
                      >
                        <i className="ti ti-send" style={{fontSize: '13px'}}/>
                        Apply
                      </button>
                      <button
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{height: '32px', padding: '7px 11px', borderRadius: '5px', border: '1px solid #E2B93B', background: '#fff', color: '#E2B93B'}}
                        data-ai-action="flag"
                      >
                        <i className="ti ti-flag-3" style={{fontSize: '13px'}}/>
                        Flag
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <button
                      className="btn btn-sm d-flex align-items-center gap-1"
                      style={{height: '32px', padding: '7px 9px', borderRadius: '5px', border: '1px solid #2E37A4', background: '#fff', color: '#2E37A4'}}
                      data-ai-action="analyze"
                    >
                      <i className="ti ti-robot" style={{fontSize: '13px'}}/>
                      Analyze
                    </button>
                    <button
                      className="btn btn-sm d-flex align-items-center gap-1"
                      style={{height: '32px', padding: '7px 9px', borderRadius: '5px', border: '1px solid #27AE60', background: '#fff', color: '#27AE60'}}
                      data-ai-action="triage"
                    >
                      <i className="ti ti-checks" style={{fontSize: '13px'}}/>
                      Triage
                    </button>
                    <button
                      className="btn btn-sm d-flex align-items-center gap-1"
                      style={{height: '32px', padding: '7px 9px', borderRadius: '5px', border: '1px solid #EF1E1E', background: '#fff', color: '#EF1E1E'}}
                      data-ai-action="escalate"
                    >
                      <i className="ti ti-arrow-up-right" style={{fontSize: '13px'}}/>
                      Escalate
                    </button>
                  </div>
                  <div className="ai-loading d-none mt-2" aria-live="polite" aria-busy="true">
                    <div className="d-flex align-items-center gap-2">
                      <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"/>
                      <small>Analyzing conversation…</small>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-fill" style={{height: 'calc(100vh - 400px)', overflowY: 'auto', padding: '24px'}}>
                  {/* Message from Mark Smith */}
                  <div className="d-flex align-items-start mb-4">
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt="Mark Smith"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h6 className="fs-14 mb-0 fw-medium">Mark Smith</h6>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}}/>
                        <small className="text-muted">02:39 PM</small>
                      </div>
                      <div className="d-flex align-items-start">
                        <div
                          className="p-3 me-2"
                          style={{
                            borderRadius: '0 5px 5px 5px',
                            border: '1px solid #E7E8EB',
                            background: '#FCFDFD',
                            maxWidth: '400px'
                          }}
                        >
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Hey mark! Did you check out the new logo design?</p>
                        </div>
                        <button className="btn p-0 border-0" style={{marginTop: '19px'}}>
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}}/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reply from You */}
                  <div className="d-flex align-items-start justify-content-end mb-4">
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="ti ti-checks text-success" style={{fontSize: '14px'}}/>
                        <small className="text-muted">02:39 PM</small>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}}/>
                        <h6 className="fs-14 mb-0 fw-semibold">You</h6>
                      </div>
                      <div className="d-flex align-items-start">
                        <button className="btn p-0 border-0 me-2" style={{marginTop: '19px'}}>
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}}/>
                        </button>
                        <div
                          className="p-3"
                          style={{
                            borderRadius: '5px 0 5px 5px',
                            border: '1px solid #E7E8EB',
                            background: '#F7F8FA',
                            maxWidth: '400px'
                          }}
                        >
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Not yet. Can you send it here?</p>
                        </div>
                      </div>
                    </div>
                    <span className="avatar ms-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt="You"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                  </div>

                  {/* Second message from Mark */}
                  <div className="d-flex align-items-start mb-4">
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt="Mark Smith"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h6 className="fs-14 mb-0 fw-medium">Mark Smith</h6>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}}/>
                        <small className="text-muted">02:39 PM</small>
                      </div>
                      <div className="d-flex align-items-start">
                        <div
                          className="p-3 me-2"
                          style={{
                            borderRadius: '0 5px 5px 5px',
                            border: '1px solid #E7E8EB',
                            background: '#FCFDFD',
                            maxWidth: '400px'
                          }}
                        >
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Sure! Please check the below logo Attached!!!</p>
                        </div>
                        <button className="btn p-0 border-0" style={{marginTop: '23px'}}>
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}}/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Today Separator */}
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="px-3 py-1 text-center"
                      style={{
                        background: '#F7F8FA',
                        borderRadius: '800px',
                        color: '#0A1B39',
                        fontSize: '14px',
                        fontWeight: '700',
                        lineHeight: '14px'
                      }}
                    >
                      Today
                    </div>
                  </div>

                  {/* Your reply */}
                  <div className="d-flex align-items-start justify-content-end mb-4">
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="ti ti-checks text-success" style={{fontSize: '14px'}}/>
                        <small className="text-muted">10:00 AM</small>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}}/>
                        <h6 className="fs-14 mb-0 fw-semibold">You</h6>
                      </div>
                      <div className="d-flex align-items-start">
                        <button className="btn p-0 border-0 me-2" style={{marginTop: '19px'}}>
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}}/>
                        </button>
                        <div
                          className="p-3"
                          style={{
                            borderRadius: '5px 0 5px 5px',
                            border: '1px solid #E7E8EB',
                            background: '#F7F8FA',
                            maxWidth: '400px'
                          }}
                        >
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Looks clean! I like the font. Maybe try a slightly darker blue?</p>
                        </div>
                      </div>
                    </div>
                    <span className="avatar ms-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt="You"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                  </div>

                  {/* Mark's final reply */}
                  <div className="d-flex align-items-start mb-4">
                    <span className="avatar me-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-02.jpg"
                        alt="Mark Smith"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h6 className="fs-14 mb-0 fw-medium">Mark Smith</h6>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}}/>
                        <small className="text-muted">10:05 AM</small>
                      </div>
                      <div className="d-flex align-items-start">
                        <div
                          className="p-3 me-2"
                          style={{
                            borderRadius: '0 5px 5px 5px',
                            border: '1px solid #E7E8EB',
                            background: '#FCFDFD',
                            maxWidth: '400px'
                          }}
                        >
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Perfect! That layout will work great on the landing page. 👍</p>
                        </div>
                        <button className="btn p-0 border-0" style={{marginTop: '19px'}}>
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}}/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Your final reply */}
                  <div className="d-flex align-items-start justify-content-end mb-4">
                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className="ti ti-checks text-success" style={{fontSize: '14px'}}/>
                        <small className="text-muted">10:00 AM</small>
                        <i className="ti ti-point-filled text-muted mx-1" style={{fontSize: '8px'}}/>
                        <h6 className="fs-14 mb-0 fw-semibold">You</h6>
                      </div>
                      <div className="d-flex align-items-start">
                        <button className="btn p-0 border-0 me-2" style={{marginTop: '19px'}}>
                          <i className="ti ti-dots-vertical text-dark" style={{fontSize: '14px'}}/>
                        </button>
                        <div
                          className="p-3"
                          style={{
                            borderRadius: '5px 0 5px 5px',
                            border: '1px solid #E7E8EB',
                            background: '#F7F8FA',
                            maxWidth: '400px'
                          }}
                        >
                          <p className="mb-0 fs-16" style={{color: '#6C7688'}}>Perfect It looks Great!!!</p>
                        </div>
                      </div>
                    </div>
                    <span className="avatar ms-2 flex-shrink-0 position-relative">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt="You"
                        className="rounded"
                        style={{width: '40px', height: '40px'}}
                      />
                      <span
                        className="position-absolute rounded-circle border border-2 border-white"
                        style={{
                          width: '11px',
                          height: '11px',
                          background: '#27AE60',
                          bottom: '0',
                          right: '0'
                        }}
                      />
                    </span>
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-top p-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="flex-fill">
                      <input
                        type="text"
                        className="form-control border-0 bg-white"
                        placeholder="Type Something..."
                        style={{borderRadius: '5px', padding: '10px 12px', height: '37px'}}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-light btn-icon" style={{width: '38px', height: '38px'}}>
                        <i className="ti ti-photo-plus fs-12"/>
                      </button>
                      <button className="btn btn-light btn-icon" style={{width: '38px', height: '38px'}}>
                        <i className="ti ti-mood-smile-beam fs-12"/>
                      </button>
                      <button className="btn btn-outline-light btn-icon" style={{width: '38px', height: '38px'}}>
                        <i className="ti ti-dots-vertical fs-12"/>
                      </button>
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
