import { useState, useEffect } from 'react';
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

  const analyzeOptimalTimes = async () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockSuggestions: SmartSuggestion[] = [
        {
          id: 'sugg-1',
          date: selectedDate || new Date().toISOString().split('T')[0],
          time: '10:30 AM',
          score: 95,
          confidence: 92,
          doctorMatch: 98,
          patientPreference: 85,
          departmentLoad: 30,
          waitTimeMinutes: 5,
          reasons: [
            'Doctor peak performance time',
            'Low no-show risk for this patient',
            'Optimal department capacity'
          ]
        },
        {
          id: 'sugg-2',
          date: selectedDate || new Date().toISOString().split('T')[0],
          time: '2:00 PM',
          score: 87,
          confidence: 88,
          doctorMatch: 90,
          patientPreference: 92,
          departmentLoad: 45,
          waitTimeMinutes: 12,
          reasons: [
            'Patient historical preference',
            'Good doctor availability',
            'Moderate waiting time'
          ]
        },
        {
          id: 'sugg-3',
          date: selectedDate || new Date().toISOString().split('T')[0],
          time: '11:15 AM',
          score: 82,
          confidence: 78,
          doctorMatch: 85,
          patientPreference: 75,
          departmentLoad: 60,
          waitTimeMinutes: 18,
          reasons: [
            'Available slot',
            'Acceptable wait time'
          ],
          warnings: ['Higher than usual department load']
        },
        {
          id: 'sugg-4',
          date: selectedDate || new Date().toISOString().split('T')[0],
          time: '3:45 PM',
          score: 76,
          confidence: 70,
          doctorMatch: 80,
          patientPreference: 68,
          departmentLoad: 75,
          waitTimeMinutes: 25,
          reasons: [
            'Late afternoon availability'
          ],
          warnings: ['Near end of doctor shift', 'Higher wait times expected']
        },
        {
          id: 'sugg-5',
          date: selectedDate || new Date().toISOString().split('T')[0],
          time: '9:00 AM',
          score: 74,
          confidence: 72,
          doctorMatch: 88,
          patientPreference: 60,
          departmentLoad: 40,
          waitTimeMinutes: 8,
          reasons: [
            'Early morning availability',
            'Lower department load'
          ],
          warnings: ['Some patients prefer later times']
        }
      ];

      setSuggestions(mockSuggestions);
      setLastAnalysis(new Date());
      setLoading(false);
    }, 600);
  };

  const checkForConflicts = async () => {
    // Simulate conflict detection
    setTimeout(() => {
      const mockConflicts: ConflictWarning[] = [];
      
      if (selectedTime === '12:00 PM' || selectedTime === '1:00 PM') {
        mockConflicts.push({
          type: 'warning',
          message: 'Doctor lunch break (12:00 PM - 1:00 PM)',
          suggestions: ['Try 11:30 AM', 'Try 1:30 PM']
        });
      }
      
      if (selectedDate === new Date().toISOString().split('T')[0] && selectedTime && selectedTime.includes('AM')) {
        mockConflicts.push({
          type: 'info',
          message: 'Same-day morning appointments have higher no-show rates',
          suggestions: ['Consider afternoon slot', 'Send reminder SMS']
        });
      }

      setConflicts(mockConflicts);
      onConflictDetected(mockConflicts);
    }, 300);
  };

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
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="ti ti-brain fs-48 text-muted mb-3"></i>
            <h6 className="text-muted">AI Recommendations</h6>
            <p className="text-muted fs-13 mb-0">
              Select a patient and doctor to see intelligent time suggestions
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`smart-suggestions-panel ${className}`}>
      {/* AI Recommendations Card */}
      <div className="card mb-3">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h6 className="mb-0 fw-semibold">
            <i className="ti ti-brain me-2 text-primary"></i>
            AI Recommendations
          </h6>
          {lastAnalysis && (
            <small className="text-muted">
              Updated {lastAnalysis.toLocaleTimeString()}
            </small>
          )}
        </div>
        <div className="card-body p-2">
          {loading ? (
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
                    <div className="d-flex align-items-center">
                      <span className={`badge bg-${index === 0 ? 'success' : index === 1 ? 'primary' : 'warning'} rounded-pill me-2 fs-10`}>
                        #{index + 1}
                      </span>
                      <span className="fw-medium">{suggestion.time}</span>
                    </div>
                    <span className={`badge bg-${getScoreColor(suggestion.score)}`}>
                      {formatScore(suggestion.score)}
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
                className="btn btn-outline-primary btn-sm w-100"
                onClick={analyzeOptimalTimes}
                disabled={loading}
              >
                <i className="ti ti-refresh me-1"></i>
                Refresh Suggestions
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="card">
        <div className="card-header">
          <h6 className="mb-0 fw-semibold">
            <i className="ti ti-lightbulb me-2 text-warning"></i>
            AI Insights
          </h6>
        </div>
        <div className="card-body p-2">
          <div className="insight-item d-flex align-items-center mb-2">
            <i className="ti ti-flame fs-18 text-danger me-2"></i>
            <div>
              <div className="fw-medium fs-13">Peak Performance</div>
              <div className="fs-12 text-muted">Doctor performs best 10-11 AM</div>
            </div>
          </div>
          
          <div className="insight-item d-flex align-items-center mb-2">
            <i className="ti ti-user-heart fs-18 text-primary me-2"></i>
            <div>
              <div className="fw-medium fs-13">Patient Preference</div>
              <div className="fs-12 text-muted">Prefers afternoon appointments</div>
            </div>
          </div>
          
          <div className="insight-item d-flex align-items-center">
            <i className="ti ti-clock fs-18 text-success me-2"></i>
            <div>
              <div className="fw-medium fs-13">Wait Time Reduction</div>
              <div className="fs-12 text-muted">Morning slots have 40% less wait</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conflicts Warning */}
      {conflicts.length > 0 && (
        <div className="card mt-3 border-warning">
          <div className="card-header bg-warning-transparent">
            <h6 className="mb-0 fw-semibold text-warning">
              <i className="ti ti-alert-triangle me-2"></i>
              Potential Conflicts
            </h6>
          </div>
          <div className="card-body p-2">
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
