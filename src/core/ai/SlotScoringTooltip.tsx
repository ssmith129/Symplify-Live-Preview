import { useState, useEffect, useRef } from 'react';

export interface SlotScore {
  score: number;
  confidence: number;
  factors: {
    doctorAvailability: number;
    patientPreference: number;
    departmentLoad: number;
    historicalData: number;
  };
  reasons: string[];
  warnings?: string[];
  recommendations?: string[];
}

interface SlotScoringTooltipProps {
  isVisible: boolean;
  position: { x: number; y: number };
  slotData: SlotScore;
  onClose: () => void;
}

const SlotScoringTooltip: React.FC<SlotScoringTooltipProps> = ({
  isVisible,
  position,
  slotData,
  onClose
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Position next to the triggering element with some offset
      const offset = 10;
      let newX = position.x + offset;
      let newY = position.y;

      // Check if popup would go outside viewport on the right, if so position to the left
      if (newX + rect.width > viewportWidth - 20) {
        newX = position.x - rect.width - offset;
      }

      // Check if popup would go outside viewport on the bottom, if so position above
      if (newY + rect.height > viewportHeight - 20) {
        newY = position.y - rect.height - offset;
      }

      // Ensure popup doesn't go off the left edge
      if (newX < 20) {
        newX = 20;
      }

      // Ensure popup doesn't go off the top edge
      if (newY < 20) {
        newY = 20;
      }

      setAdjustedPosition({ x: newX, y: newY });
    }
  }, [isVisible, position]);

  useEffect(() => {
    if (!isVisible) return;
    const onResizeOrScroll = () => {
      if (!tooltipRef.current) return;
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Recalculate position relative to triggering element
      const offset = 10;
      let newX = position.x + offset;
      let newY = position.y;

      // Check viewport boundaries and adjust accordingly
      if (newX + rect.width > viewportWidth - 20) {
        newX = position.x - rect.width - offset;
      }

      if (newY + rect.height > viewportHeight - 20) {
        newY = position.y - rect.height - offset;
      }

      if (newX < 20) {
        newX = 20;
      }

      if (newY < 20) {
        newY = 20;
      }

      setAdjustedPosition({ x: newX, y: newY });
    };
    window.addEventListener('resize', onResizeOrScroll);
    window.addEventListener('scroll', onResizeOrScroll, true);
    return () => {
      window.removeEventListener('resize', onResizeOrScroll);
      window.removeEventListener('scroll', onResizeOrScroll, true);
    };
  }, [isVisible, position]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'primary';
    if (score >= 40) return 'warning';
    return 'danger';
  };

  const getFactorIcon = (factor: string) => {
    switch (factor) {
      case 'doctorAvailability': return 'ti-stethoscope';
      case 'patientPreference': return 'ti-user-heart';
      case 'departmentLoad': return 'ti-building-hospital';
      case 'historicalData': return 'ti-chart-line';
      default: return 'ti-info-circle';
    }
  };

  const formatFactorName = (factor: string) => {
    switch (factor) {
      case 'doctorAvailability': return 'Doctor Availability';
      case 'patientPreference': return 'Patient Preference';
      case 'departmentLoad': return 'Department Load';
      case 'historicalData': return 'Historical Data';
      default: return factor;
    }
  };

  return (
    <>
      <div className="ai-schedule-overlay" onClick={onClose}></div>
      <div
        ref={tooltipRef}
        className="ai-schedule-popover"
        style={{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
          zIndex: 1070
        }}
        role="tooltip"
        aria-live="polite"
      >
        <div className="ai-schedule-popover__header">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0 fw-semibold">
              <i className="ti ti-target me-2 text-primary"></i>
              Slot Analysis
            </h6>
            <div className="d-flex align-items-center">
              <span className={`badge bg-${getScoreColor(slotData.score)} me-2`}>
                Score: {slotData.score}
              </span>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
          </div>
        </div>

        <div className="ai-schedule-popover__body">
          {/* Confidence Score */}
          <div className="ai-section">
            <div className="ai-section__title">Confidence Level</div>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <div className="progress progress-sm">
                  <div
                    className={`progress-bar bg-${getScoreColor(slotData.confidence)}`}
                    style={{ width: `${slotData.confidence}%` }}
                  ></div>
                </div>
              </div>
              <span className="ms-2 fw-medium">{slotData.confidence}%</span>
            </div>
          </div>

          {/* Contributing Factors */}
          <div className="ai-section">
            <div className="ai-section__title">Contributing Factors</div>
            <div className="ai-list">
              {Object.entries(slotData.factors).map(([factor, value]) => (
                <div key={factor} className="ai-list__item">
                  <i className={`${getFactorIcon(factor)} text-muted`}></i>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="ai-list__label">{formatFactorName(factor)}</span>
                      <span className={`badge badge-soft-${getScoreColor(value)}`}>{value}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reasons */}
          {slotData.reasons.length > 0 && (
            <div className="ai-section">
              <div className="ai-section__title">Why This Score?</div>
              <ul className="list-unstyled mb-0">
                {slotData.reasons.map((reason, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <i className="ti ti-check text-success me-2 mt-1 fs-12"></i>
                    <span className="fs-13 text-muted">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {slotData.warnings && slotData.warnings.length > 0 && (
            <div className="ai-section">
              <div className="ai-section__title text-warning">
                <i className="ti ti-alert-triangle me-1"></i>
                Potential Issues
              </div>
              <ul className="list-unstyled mb-0">
                {slotData.warnings.map((warning, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <i className="ti ti-exclamation text-warning me-2 mt-1 fs-12"></i>
                    <span className="fs-13 text-muted">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {slotData.recommendations && slotData.recommendations.length > 0 && (
            <div className="ai-section">
              <div className="ai-section__title text-primary">
                <i className="ti ti-bulb me-1"></i>
                Recommendations
              </div>
              <ul className="list-unstyled mb-0">
                {slotData.recommendations.map((rec, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <i className="ti ti-arrow-right text-primary me-2 mt-1 fs-12"></i>
                    <span className="fs-13 text-muted">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="ai-schedule-popover__footer">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={onClose}
            >
              <i className="ti ti-x me-1"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotScoringTooltip;
