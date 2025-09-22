import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { all_routes } from '../../feature-module/routes/all_routes';

interface TimeSlotSuggestion {
  id: string;
  date: string;
  time: string;
  score: number;
  confidence: number;
  reasons: string[];
  conflicts?: string[];
  doctorMatch: number;
  patientPreference: number;
  departmentLoad: number;
  estimatedWaitTime?: number;
}

interface SmartSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  clickPosition?: { x: number; y: number };
}

const SmartSuggestionsModal: React.FC<SmartSuggestionsModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  clickPosition: _clickPosition
}) => {
  const [suggestions, setSuggestions] = useState<TimeSlotSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setSelectedSuggestion(null);
      
      // Simulate AI analysis delay
      const timer = setTimeout(() => {
        const mockSuggestions: TimeSlotSuggestion[] = [
          {
            id: 'slot-1',
            date: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            time: '10:30 AM',
            score: 95,
            confidence: 92,
            reasons: [
              'Doctor peak performance time',
              'Low historical no-show rate',
              'Optimal department capacity'
            ],
            doctorMatch: 95,
            patientPreference: 88,
            departmentLoad: 25,
            estimatedWaitTime: 5
          },
          {
            id: 'slot-2',
            date: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            time: '2:00 PM',
            score: 87,
            confidence: 89,
            reasons: [
              'Good doctor availability',
              'Moderate department load',
              'Patient preference alignment'
            ],
            doctorMatch: 90,
            patientPreference: 92,
            departmentLoad: 45,
            estimatedWaitTime: 10
          },
          {
            id: 'slot-3',
            date: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            time: '4:15 PM',
            score: 78,
            confidence: 76,
            reasons: [
              'Available slot',
              'Acceptable wait times'
            ],
            conflicts: ['Near doctor lunch break'],
            doctorMatch: 75,
            patientPreference: 70,
            departmentLoad: 65,
            estimatedWaitTime: 20
          }
        ];
        
        setSuggestions(mockSuggestions);
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedDate]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'primary';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  const handleSelectSlot = (suggestion: TimeSlotSuggestion) => {
    setSelectedSuggestion(suggestion.id);
  };

  const handleBookAppointment = (suggestion: TimeSlotSuggestion) => {
    // In a real app, this would pass the selected time to the new appointment form
    const params = new URLSearchParams({
      date: suggestion.date,
      time: suggestion.time,
      score: suggestion.score.toString()
    });
    
    onClose();
    window.location.href = `${all_routes.newAppointment}?${params.toString()}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
        style={{ zIndex: 1040 }}
      ></div>
      
      <div 
        className="modal fade show d-block" 
        style={{ zIndex: 1050 }}
        role="dialog"
        aria-labelledby="smartSuggestionsModalTitle"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fw-semibold" id="smartSuggestionsModalTitle">
                <i className="ti ti-brain me-2 text-primary"></i>
                Smart Time Suggestions
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Analyzing optimal times...</span>
                  </div>
                  <p className="mt-3 text-muted">Analyzing optimal appointment times...</p>
                </div>
              ) : (
                <>
                  <div className="p-3 border-bottom bg-light">
                    <div className="d-flex align-items-center">
                      <i className="ti ti-calendar-event text-primary me-2"></i>
                      <span className="fw-medium">
                        {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'Select a date'}
                      </span>
                    </div>
                    <p className="text-muted mb-0 fs-13 mt-1">
                      Top 3 recommended time slots based on AI analysis
                    </p>
                  </div>

                  <div className="p-3">
                    <div className="row g-3">
                      {suggestions.map((suggestion, index) => (
                        <div key={suggestion.id} className="col-12">
                          <div 
                            className={`card h-100 suggestion-card ${
                              selectedSuggestion === suggestion.id ? 'border-primary shadow-sm' : ''
                            }`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSelectSlot(suggestion)}
                          >
                            <div className="card-body p-3">
                              <div className="d-flex align-items-start justify-content-between mb-3">
                                <div className="d-flex align-items-center gap-2">
                                  <div className={`ai-badge ai-badge--${index === 0 ? 'low' : index === 1 ? 'medium' : 'high'}`}>
                                    🏆 #{index + 1}
                                  </div>
                                  <div>
                                    <h6 className="mb-1 fw-semibold">{suggestion.time}</h6>
                                    <span className="text-muted fs-13">
                                      {suggestion.estimatedWaitTime ? `${suggestion.estimatedWaitTime} min wait` : 'No wait'}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="text-end">
                                  <span className={`ai-badge ai-badge--${getScoreColor(suggestion.score) === 'success' ? 'low' : getScoreColor(suggestion.score) === 'warning' ? 'high' : 'critical'} mb-1`}>
                                    {suggestion.score}% Match
                                  </span>
                                  <div className="ai-badge ai-badge--sm ai-badge--low">
                                    {suggestion.confidence}% confidence
                                  </div>
                                </div>
                              </div>

                              {/* Metrics Row */}
                              <div className="row g-2 mb-3">
                                <div className="col-4">
                                  <div className="text-center">
                                    <div className="text-muted fs-12">Doctor Match</div>
                                    <div className="fw-medium">{suggestion.doctorMatch}%</div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="text-center">
                                    <div className="text-muted fs-12">Patient Pref</div>
                                    <div className="fw-medium">{suggestion.patientPreference}%</div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="text-center">
                                    <div className="text-muted fs-12">Dept Load</div>
                                    <div className="fw-medium">{suggestion.departmentLoad}%</div>
                                  </div>
                                </div>
                              </div>

                              {/* Reasons */}
                              <div className="mb-3">
                                <div className="fw-medium text-success mb-2 fs-13">
                                  <i className="ti ti-check me-1"></i>
                                  Why this time works:
                                </div>
                                <ul className="list-unstyled mb-0">
                                  {suggestion.reasons.map((reason, idx) => (
                                    <li key={idx} className="fs-13 text-muted mb-1">
                                      <i className="ti ti-point text-primary me-1"></i>
                                      {reason}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Conflicts */}
                              {suggestion.conflicts && suggestion.conflicts.length > 0 && (
                                <div className="mb-3">
                                  <div className="fw-medium text-warning mb-2 fs-13">
                                    <i className="ti ti-alert-triangle me-1"></i>
                                    Potential considerations:
                                  </div>
                                  <ul className="list-unstyled mb-0">
                                    {suggestion.conflicts.map((conflict, idx) => (
                                      <li key={idx} className="fs-13 text-muted mb-1">
                                        <i className="ti ti-point text-warning me-1"></i>
                                        {conflict}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="text-end">
                                <button
                                  type="button"
                                  className={`ai-btn ${
                                    selectedSuggestion === suggestion.id
                                      ? 'ai-btn--accent'
                                      : 'ai-btn--secondary'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBookAppointment(suggestion);
                                  }}
                                >
                                  {selectedSuggestion === suggestion.id ? (
                                    <>
                                      ✅ Book This Time
                                    </>
                                  ) : (
                                    '📅 Select Time'
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer border-top">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="text-muted fs-13">
                  <i className="ti ti-info-circle me-1"></i>
                  Suggestions update every 5 minutes
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <Link
                    to={all_routes.newAppointment}
                    className="btn btn-outline-primary"
                    onClick={onClose}
                  >
                    <i className="ti ti-plus me-1"></i>
                    Manual Booking
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartSuggestionsModal;
