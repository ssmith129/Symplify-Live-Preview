import React, { useState } from 'react';

/**
 * AI Design System Showcase Component
 * 
 * This component demonstrates all the updated AI design system components
 * following the unified design standards. It serves as both documentation
 * and a testing ground for the AI components.
 */

interface AIDesignSystemShowcaseProps {
  className?: string;
}

const AIDesignSystemShowcase: React.FC<AIDesignSystemShowcaseProps> = ({
  className = ''
}) => {
  const [activeSection, setActiveSection] = useState('badges');

  const mockSuggestion = {
    id: 'demo-1',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 AM',
    score: 94,
    confidence: 89,
    reasons: ['Doctor peak performance time', 'Low no-show risk'],
    doctorMatch: 95,
    patientPreference: 88,
    departmentLoad: 25,
  };

  const mockMetrics = [
    {
      id: 'optimal-slots',
      title: 'Optimal Slots',
      value: '92%',
      percentage: 92,
      color: 'success',
      trend: 'up' as const,
      trendValue: '+5%',
      description: 'Appointments scheduled during peak efficiency times'
    },
    {
      id: 'wait-time',
      title: 'Avg Wait Time',
      value: '15min',
      percentage: 25,
      color: 'info',
      description: 'Average patient waiting time'
    }
  ];

  const sections = [
    { id: 'badges', name: '🏷️ AI Priority Badges', description: 'Standardized priority and status indicators' },
    { id: 'buttons', name: '🔘 AI Action Buttons', description: 'Consistent button system for AI operations' },
    { id: 'cards', name: '🃏 AI Cards & Layouts', description: 'Unified card components for AI insights' },
    { id: 'lists', name: '📋 AI Triage Lists', description: 'Structured list components for data display' },
    { id: 'dashboard', name: '📊 AI Dashboard', description: 'Smart dashboard metrics and visualizations' }
  ];

  return (
    <div className={`ai-design-showcase ${className}`}>
      {/* Header */}
      <div className="ai-card mb-4">
        <div className="ai-card__header">
          <h3 className="mb-0 fw-bold ai-text-primary">
            <i className="fa-solid fa-swatchbook me-2"></i>
            AI Design System Showcase
          </h3>
          <p className="mb-0 mt-2 ai-fs-sm ai-text-secondary-token">
            Unified components following the AI design system standards
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="ai-card mb-4">
        <div className="ai-card__body">
          <div className="d-flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                className={`ai-btn ai-btn--sm ${activeSection === section.id ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="row g-4">
        <div className="col-12">
          <div className="ai-card">
            <div className="ai-card__header">
              <h5 className="mb-0 fw-semibold">
                {sections.find(s => s.id === activeSection)?.name}
              </h5>
              <p className="mb-0 mt-1 ai-fs-sm text-muted">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>
            <div className="ai-card__body">
              
              {/* AI Priority Badges Section */}
              {activeSection === 'badges' && (
                <div className="row g-4">
                  <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 ai-text-primary">Priority Levels</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="ai-badge ai-badge--critical">⚠️ Critical</span>
                      <span className="ai-badge ai-badge--high">🔥 High</span>
                      <span className="ai-badge ai-badge--medium">📊 Medium</span>
                      <span className="ai-badge ai-badge--low">✅ Low</span>
                    </div>
                    
                    <h6 className="fw-semibold mb-3 ai-text-primary">Size Variants</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="ai-badge ai-badge--sm ai-badge--low">Small Badge</span>
                      <span className="ai-badge ai-badge--low">Default Badge</span>
                      <span className="ai-badge ai-badge--lg ai-badge--low">Large Badge</span>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 ai-text-primary">Status Indicators</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="ai-badge ai-badge--low">🤖 AI Active</span>
                      <span className="ai-badge ai-badge--sm ai-badge--low">89% Confidence</span>
                      <span className="ai-badge ai-badge--medium">94% Match</span>
                    </div>
                    
                    <div className="ai-list-item">
                      <div className="ai-list-item__priority ai-list-item__priority--critical"></div>
                      <div className="ai-list-item__content">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-medium">Priority Indicator Example</span>
                          <span className="ai-badge ai-badge--critical">Action Required</span>
                        </div>
                        <p className="mb-0 ai-fs-sm text-muted">
                          Shows how priority dots work with content
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Action Buttons Section */}
              {activeSection === 'buttons' && (
                <div className="row g-4">
                  <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 ai-text-primary">Button Variants</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <button className="ai-btn ai-btn--primary">🧠 AI Analyze</button>
                      <button className="ai-btn ai-btn--secondary">📊 View Details</button>
                      <button className="ai-btn ai-btn--accent">✨ Apply Suggestion</button>
                    </div>
                    
                    <h6 className="fw-semibold mb-3 ai-text-primary">Action Buttons</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <button className="ai-btn ai-btn--sm ai-btn--secondary">🗂️ Archive</button>
                      <button className="ai-btn ai-btn--sm ai-btn--secondary">💬 Reply</button>
                      <button className="ai-btn ai-btn--sm ai-btn--secondary">➡️ Forward</button>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="fw-semibold mb-3 ai-text-primary">Size Variants</h6>
                    <div className="d-flex flex-column gap-2 mb-3 align-items-start">
                      <button className="ai-btn ai-btn--sm ai-btn--primary">Small Button</button>
                      <button className="ai-btn ai-btn--primary">Default Button</button>
                      <button className="ai-btn ai-btn--lg ai-btn--primary">Large Button</button>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Cards Section */}
              {activeSection === 'cards' && (
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="ai-card">
                      <div className="ai-card__header">
                        <h6 className="mb-0 fw-semibold">🎯 AI Recommendation</h6>
                      </div>
                      <div className="ai-card__body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>Schedule for {mockSuggestion.time}</span>
                          <span className="ai-badge ai-badge--low">{mockSuggestion.score}% Match</span>
                        </div>
                        <p className="mb-2 ai-fs-sm text-muted">
                          Based on doctor availability and patient preferences
                        </p>
                        <div className="ai-progress">
                          <div className="ai-progress__bar ai-progress__bar--success ai-progress-bar" style={{ ['--ai-progress' as any]: `${mockSuggestion.score}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="ai-card ai-border-high">
                      <div className="ai-card__header ai-bg-high ai-color-high">
                        <h6 className="mb-0 fw-semibold">⚠️ Conflict Warning</h6>
                      </div>
                      <div className="ai-card__body">
                        <p className="mb-2" style={{color: 'var(--ai-high)'}}>
                          Doctor has another appointment nearby
                        </p>
                        <p className="mb-0 ai-fs-sm text-muted">
                          Suggestions: Consider 15min buffer or reschedule
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Lists Section */}
              {activeSection === 'lists' && (
                <div className="ai-card p-0">
                  <div className="ai-list-item">
                    <div className="ai-list-item__priority ai-list-item__priority--critical"></div>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">Dr. Sarah Johnson</h6>
                          <p className="mb-0 ai-fs-sm text-muted">
                            Emergency patient consultation needed
                          </p>
                        </div>
                        <div className="text-end">
                          <span className="ai-badge ai-badge--critical">Critical</span>
                          <div className="text-muted ai-fs-xs">89% confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ai-list-item">
                    <div className="ai-list-item__priority ai-list-item__priority--high"></div>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">Patient Records System</h6>
                          <p className="mb-0 ai-fs-sm text-muted">
                            Appointment rescheduling request
                          </p>
                        </div>
                        <div className="text-end">
                          <span className="ai-badge ai-badge--high">High</span>
                          <div className="text-muted ai-fs-xs">76% confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ai-list-item">
                    <div className="ai-list-item__priority ai-list-item__priority--low"></div>
                    <div className="ai-list-item__content">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">Follow-up Reminder</h6>
                          <p className="mb-0 ai-fs-sm text-muted">
                            Routine follow-up appointment scheduled
                          </p>
                        </div>
                        <div className="text-end">
                          <span className="ai-badge ai-badge--low">Low</span>
                          <div className="text-muted ai-fs-xs">95% confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Dashboard Section */}
              {activeSection === 'dashboard' && (
                <div className="row g-3">
                  {mockMetrics.map((metric) => (
                    <div key={metric.id} className="col-md-6">
                      <div className="ai-card h-100">
                        <div className="ai-card__body ai-p-3">
                          <div className="d-flex align-items-center">
                            <div className={`me-3 flex-shrink-0 smart-dashboard-icon ${metric.color === 'success' ? 'ai-metric-success' : 'ai-metric-info'}`}>
                              {metric.color === 'success' ? '✅' : '⏰'}
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center justify-content-between mb-1">
                                <p className="mb-0 ai-caption">
                                  {metric.title}
                                </p>
                                {metric.trend && (
                                  <span className="ai-badge ai-badge--low ai-fs-xs">
                                    ↗ {metric.trendValue}
                                  </span>
                                )}
                              </div>
                              <h4 className="mb-1 fw-bold ai-text-primary">
                                {metric.value}
                              </h4>
                              <div className="ai-progress">
                                <div
                                  className={`ai-progress__bar ai-progress__bar--${metric.color === 'success' ? 'success' : 'primary'}`}
                                  style={{ ['--ai-progress' as any]: `${metric.percentage}%` }}
                                ></div>
                              </div>
                              {metric.description && (
                                <p className="mb-0 mt-1 ai-caption">
                                  {metric.description}
                                </p>
                              )}
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
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="ai-card mt-4 ai-border-accent">
        <div className="ai-card__header ai-bg-accent ai-color-inverse">
          <h6 className="mb-0 fw-semibold">🚀 Implementation Notes</h6>
        </div>
        <div className="ai-card__body">
          <div className="row g-4">
            <div className="col-md-6">
              <h6 className="fw-semibold ai-text-primary">Key Improvements</h6>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  <span className="ai-badge ai-badge--low me-2">✨</span>
                  Unified color palette with semantic meaning
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="ai-badge ai-badge--low me-2">✨</span>
                  Consistent spacing using design tokens
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="ai-badge ai-badge--low me-2">✨</span>
                  WCAG 2.1 AA compliant contrast ratios
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="ai-badge ai-badge--low me-2">✨</span>
                  Enhanced touch targets (36px minimum)
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="fw-semibold ai-text-primary">Design Tokens</h6>
              <div className="d-flex flex-wrap gap-1 mb-2">
                <code className="ai-code-token">--ai-primary</code>
                <code className="ai-code-token">--ai-accent</code>
                <code className="ai-code-token">--ai-space-*</code>
              </div>
              <p className="mb-0 ai-fs-sm text-muted">
                All components use standardized CSS custom properties for consistent theming and easy maintenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDesignSystemShowcase;
