import { useEffect } from 'react';
import useSmartScheduling from './hooks/useSmartScheduling';

export interface SmartSuggestion {
  id: string;
  date: string;
  time: string;
  score: number;
  confidence: number;
  doctorMatch: number;
  patientPreference: number;
  departmentLoad: number;
  waitTimeMinutes: number;
  reasons: string[];
  warnings?: string[];
}

export interface ConflictWarning {
  type: 'warning' | 'error' | 'info';
  message: string;
  suggestions?: string[];
}

interface SmartSuggestionsPanelProps {
  patientId?: string;
  doctorId?: string;
  departmentId?: string;
  selectedDate?: string;
  selectedTime?: string;
  onSuggestionSelect: (suggestion: SmartSuggestion) => void;
  onConflictDetected: (conflicts: ConflictWarning[]) => void;
  className?: string;
}

const SmartSuggestionsPanel: React.FC<SmartSuggestionsPanelProps> = ({
  patientId,
  doctorId,
  departmentId,
  selectedDate,
  selectedTime,
  onSuggestionSelect,
  onConflictDetected,
  className = ''
}) => {
  const {
    suggestions,
    conflicts,
    loading,
    error,
    lastUpdated,
    analyzeTimes,
    checkConflicts,
    clearCache,
    retry
  } = useSmartScheduling({
    enableCaching: true,
    debounceMs: 300,
    maxRetries: 3
  });

  useEffect(() => {
    if (patientId && doctorId) {
      analyzeTimes(patientId, doctorId, departmentId);
    }
  }, [patientId, doctorId, departmentId, selectedDate, analyzeTimes]);

  useEffect(() => {
    if (selectedDate && selectedTime && doctorId) {
      checkConflicts(selectedDate, selectedTime, doctorId);
    }
  }, [selectedDate, selectedTime, doctorId, checkConflicts]);

  useEffect(() => {
    onConflictDetected(conflicts);
  }, [conflicts, onConflictDetected]);

  // Default suggestions shown when patient/doctor not yet selected
  const defaultSuggestions: SmartSuggestion[] = [
    {
      id: 'def-1',
      date: new Date().toISOString().split('T')[0],
      time: '10:30 AM',
      score: 94,
      confidence: 90,
      doctorMatch: 90,
      patientPreference: 85,
      departmentLoad: 28,
      waitTimeMinutes: 6,
      reasons: ['Morning peak performance', 'Low no-show risk'],
    },
    {
      id: 'def-2',
      date: new Date().toISOString().split('T')[0],
      time: '2:00 PM',
      score: 86,
      confidence: 88,
      doctorMatch: 88,
      patientPreference: 92,
      departmentLoad: 42,
      waitTimeMinutes: 12,
      reasons: ['High patient preference', 'Balanced department load'],
    },
    {
      id: 'def-3',
      date: new Date().toISOString().split('T')[0],
      time: '11:15 AM',
      score: 81,
      confidence: 79,
      doctorMatch: 84,
      patientPreference: 74,
      departmentLoad: 58,
      waitTimeMinutes: 18,
      reasons: ['Acceptable wait time', 'Available slot'],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'primary';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  const formatScore = (score: number) => {
    return Math.round(score);
  };

  const handleSuggestionClick = (suggestion: SmartSuggestion) => {
    onSuggestionSelect(suggestion);
  };

  if (!patientId || !doctorId) {
    return (
      <div className={`smart-suggestions-panel ${className}`}>
        <div className="ai-card mb-3">
          <div className="ai-card__header d-flex align-items-center justify-content-between">
            <h6 className="mb-0 fw-semibold">
              <i className="fa-solid fa-brain me-2"></i>
              AI Recommendations
            </h6>
            <span className="ai-badge ai-badge--low fs-11">Default view</span>
          </div>
          <div className="ai-card__body" style={{padding: 'var(--ai-space-2)'}}>
            <div className="suggestions-list">
              {defaultSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className="suggestion-item border rounded p-2 mb-2 hover-bg-light"
                  style={{ cursor: 'default' }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className={`ai-badge ai-badge--${index === 0 ? 'low' : index === 1 ? 'medium' : 'high'}`}>
                        <i className="fa-solid fa-trophy me-1"></i>#{index + 1}
                      </span>
                      <span className="fw-medium">{suggestion.time}</span>
                    </div>
                    <div className="text-end">
                      <span className={`ai-badge ai-badge--${getScoreColor(suggestion.score) === 'success' ? 'low' : getScoreColor(suggestion.score) === 'warning' ? 'high' : 'critical'} me-1`}>
                        {formatScore(suggestion.score)}% Match
                      </span>
                      <span className="ai-badge ai-badge--sm ai-badge--low">{suggestion.confidence}%</span>
                    </div>
                  </div>
                  <div className="row g-1 mb-2">
                    <div className="col-4 text-center">
                      <div className="fs-11 text-muted">Doctor</div>
                      <div className="fs-12 fw-medium">{suggestion.doctorMatch}%</div>
                    </div>
                    <div className="col-4 text-center">
                      <div className="fs-11 text-muted">Patient</div>
                      <div className="fs-12 fw-medium">{suggestion.patientPreference}%</div>
                    </div>
                    <div className="col-4 text-center">
                      <div className="fs-11 text-muted">Wait</div>
                      <div className="fs-12 fw-medium">{suggestion.waitTimeMinutes}m</div>
                    </div>
                  </div>
                  <div className="fs-12 text-muted">
                    {suggestion.reasons.slice(0,2).map((reason, idx) => (
                      <div key={idx} className="d-flex align-items-center">
                        <i className="ti ti-check text-success me-1"></i>
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted fs-12 mb-0 mt-2">
              Select a patient and doctor to personalize these suggestions
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`smart-suggestions-panel ${className}`}>
      {/* AI Recommendations Card */}
      <div className="ai-card mb-3">
        <div className="ai-card__header d-flex align-items-center justify-content-between">
          <h6 className="mb-0 fw-semibold">
            🎯 AI Recommendations
          </h6>
          {lastUpdated && (
            <small className="ai-badge ai-badge--sm ai-badge--low">
              Updated {lastUpdated.toLocaleTimeString()}
            </small>
          )}
        </div>
        <div className="ai-card__body" style={{padding: 'var(--ai-space-2)'}}>
          {error ? (
            <div className="text-center py-3">
              <div className="text-danger mb-2">
                <i className="fa-solid fa-circle-exclamation fs-24"></i>
              </div>
              <p className="text-muted fs-13 mb-2">{error}</p>
              <button
                type="button"
                className="ai-btn ai-btn--sm ai-btn--accent"
                onClick={retry}
              >
                <i className="fa-solid fa-rotate-right me-1"></i>Try Again
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Analyzing...</span>
              </div>
              <p className="text-muted fs-13 mt-2 mb-0">Analyzing optimal times...</p>
            </div>
          ) : (
            <div className="suggestions-list">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className="suggestion-item border rounded p-2 mb-2 cursor-pointer hover-bg-light"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className={`ai-badge ai-badge--${index === 0 ? 'low' : index === 1 ? 'medium' : 'high'}`}>
                        <i className="fa-solid fa-trophy me-1"></i>#{index + 1}
                      </span>
                      <span className="fw-medium">{suggestion.time}</span>
                    </div>
                    <span className={`ai-badge ai-badge--${getScoreColor(suggestion.score) === 'success' ? 'low' : getScoreColor(suggestion.score) === 'warning' ? 'high' : 'critical'}`}>
                      {formatScore(suggestion.score)}% Match
                    </span>
                  </div>
                  
                  <div className="row g-1 mb-2">
                    <div className="col-4 text-center">
                      <div className="fs-11 text-muted">Doctor</div>
                      <div className="fs-12 fw-medium">{suggestion.doctorMatch}%</div>
                    </div>
                    <div className="col-4 text-center">
                      <div className="fs-11 text-muted">Patient</div>
                      <div className="fs-12 fw-medium">{suggestion.patientPreference}%</div>
                    </div>
                    <div className="col-4 text-center">
                      <div className="fs-11 text-muted">Wait</div>
                      <div className="fs-12 fw-medium">{suggestion.waitTimeMinutes}m</div>
                    </div>
                  </div>

                  <div className="fs-12 text-muted">
                    <div className="d-flex align-items-center">
                      <i className="ti ti-check text-success me-1"></i>
                      {suggestion.reasons[0]}
                    </div>
                    {suggestion.reasons[1] && (
                      <div className="d-flex align-items-center">
                        <i className="ti ti-check text-success me-1"></i>
                        {suggestion.reasons[1]}
                      </div>
                    )}
                  </div>

                  {suggestion.warnings && suggestion.warnings.length > 0 && (
                    <div className="mt-1">
                      {suggestion.warnings.map((warning, idx) => (
                        <div key={idx} className="fs-12 text-warning">
                          <i className="ti ti-alert-triangle me-1"></i>
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                className="ai-btn ai-btn--sm ai-btn--primary w-100"
                onClick={() => {
                  clearCache();
                  if (patientId && doctorId) {
                    analyzeTimes(patientId, doctorId, departmentId);
                  }
                }}
                disabled={loading}
              >
                <i className="fa-solid fa-rotate-right me-1"></i>Refresh Suggestions
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="ai-card">
        <div className="ai-card__header">
          <h6 className="mb-0 fw-semibold">
            <i className="fa-regular fa-lightbulb me-2"></i>
            AI Insights
          </h6>
        </div>
        <div className="ai-card__body" style={{padding: 'var(--ai-space-2)'}}>
          <div className="insight-item d-flex align-items-center mb-2">
            <i className="fa-solid fa-fire fs-18 text-danger me-2"></i>
            <div>
              <div className="fw-medium fs-13">Peak Performance</div>
              <div className="fs-12 text-muted">Doctor performs best 10-11 AM</div>
            </div>
          </div>
          
          <div className="insight-item d-flex align-items-center mb-2">
            <i className="fa-solid fa-heart fs-18 text-primary me-2"></i>
            <div>
              <div className="fw-medium fs-13">Patient Preference</div>
              <div className="fs-12 text-muted">Prefers afternoon appointments</div>
            </div>
          </div>
          
          <div className="insight-item d-flex align-items-center">
            <i className="fa-regular fa-clock fs-18 text-success me-2"></i>
            <div>
              <div className="fw-medium fs-13">Wait Time Reduction</div>
              <div className="fs-12 text-muted">Morning slots have 40% less wait</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conflicts Warning */}
      {conflicts.length > 0 && (
        <div className="ai-card mt-3" style={{borderColor: 'var(--ai-high-border)'}}>
          <div className="ai-card__header" style={{background: 'var(--ai-high-bg)', color: 'var(--ai-high)'}}>
            <h6 className="mb-0 fw-semibold">
              <i className="fa-solid fa-triangle-exclamation me-2"></i>
              Potential Conflicts
            </h6>
          </div>
          <div className="ai-card__body" style={{padding: 'var(--ai-space-2)'}}>
            {conflicts.map((conflict, index) => (
              <div key={index} className="conflict-item mb-2">
                <div className={`text-${conflict.type === 'error' ? 'danger' : conflict.type === 'warning' ? 'warning' : 'info'} fw-medium fs-13`}>
                  {conflict.message}
                </div>
                {conflict.suggestions && (
                  <div className="fs-12 text-muted mt-1">
                    Suggestions: {conflict.suggestions.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSuggestionsPanel;
