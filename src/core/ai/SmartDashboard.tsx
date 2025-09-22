import { useState, useEffect } from 'react';

interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  percentage: number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  trend?: 'up' | 'down';
  trendValue?: string;
  description?: string;
}

interface SmartDashboardProps {
  className?: string;
  showToggle?: boolean;
  isAiMode?: boolean;
  onAiModeChange?: (enabled: boolean) => void;
}

const SmartDashboard: React.FC<SmartDashboardProps> = ({ 
  className = '', 
  showToggle = true,
  isAiMode = true,
  onAiModeChange 
}) => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI data fetch
    const timer = setTimeout(() => {
      setMetrics([
        {
          id: 'optimal-slots',
          title: 'Optimal Slots',
          value: '92%',
          percentage: 92,
          icon: 'ti-calendar-check',
          color: 'success',
          trend: 'up',
          trendValue: '+5%',
          description: 'Appointments scheduled during peak efficiency times'
        },
        {
          id: 'no-show-risk',
          title: 'Avg No-Show Risk',
          value: '8%',
          percentage: 8,
          icon: 'ti-user-exclamation',
          color: 'warning',
          trend: 'down',
          trendValue: '-2%',
          description: 'Predicted likelihood of patient no-shows'
        },
        {
          id: 'wait-time',
          title: 'Avg Wait Time',
          value: '15min',
          percentage: 25,
          icon: 'ti-clock',
          color: 'info',
          description: 'Average patient waiting time'
        },
        {
          id: 'schedule-efficiency',
          title: 'Schedule Efficiency',
          value: '96%',
          percentage: 96,
          icon: 'ti-chart-line',
          color: 'primary',
          trend: 'up',
          trendValue: '+8%',
          description: 'Overall scheduling optimization score'
        }
      ]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAiToggle = () => {
    if (onAiModeChange) {
      onAiModeChange(!isAiMode);
    }
  };

  if (loading) {
    return (
      <div className={`smart-dashboard-loading ${className}`}>
        <div className="row g-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="col-xl-3 col-md-6">
              <div className="card border-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center">
                    <div className="placeholder-glow">
                      <div className="placeholder col-3 rounded me-3" style={{ height: '40px' }}></div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="placeholder-glow">
                        <div className="placeholder col-6 mb-2"></div>
                        <div className="placeholder col-8"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isAiMode) {
    return null;
  }

  return (
    <div className={`smart-dashboard ${className}`}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <h6 className="mb-0 fw-semibold" style={{color: 'var(--ai-text-primary)'}}>
            🧠 Smart Scheduling Dashboard
          </h6>
        </div>
        {showToggle && (
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="aiModeToggle"
              checked={isAiMode}
              onChange={handleAiToggle}
            />
            <label className="form-check-label fw-medium" htmlFor="aiModeToggle">
              AI Insights {isAiMode ? 'On' : 'Off'}
            </label>
          </div>
        )}
      </div>

      <div className="row g-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="col-xl-3 col-md-6">
            <div className="card border-0 h-100 dashboard-metric-card">
              <div className="card-body p-3">
                <div className="d-flex align-items-center">
                  <div className={`avatar avatar-md rounded-circle bg-${metric.color}-transparent me-3 flex-shrink-0 smart-dashboard-icon`}>
                    <i className={`${metric.icon} text-${metric.color}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <p className="text-muted mb-0 fs-13">{metric.title}</p>
                      {metric.trend && (
                        <span className={`badge badge-soft-${metric.trend === 'up' ? 'success' : 'danger'} fs-11`}>
                          <i className={`ti ti-arrow-${metric.trend} me-1`}></i>
                          {metric.trendValue}
                        </span>
                      )}
                    </div>
                    <h4 className="mb-1 fw-bold text-dark">{metric.value}</h4>
                    <div className="progress progress-sm">
                      <div
                        className={`progress-bar bg-${metric.color}`}
                        role="progressbar"
                        style={{ width: `${metric.percentage}%` }}
                        aria-valuenow={metric.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    {metric.description && (
                      <p className="text-muted mb-0 fs-12 mt-1" title={metric.description}>
                        {metric.description.length > 40 
                          ? `${metric.description.substring(0, 40)}...` 
                          : metric.description
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartDashboard;
