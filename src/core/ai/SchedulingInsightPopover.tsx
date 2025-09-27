import { useEffect, useMemo, useRef } from 'react';

export interface SchedulingAnchor {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface SchedulingInsightProps {
  anchor: SchedulingAnchor;
  dateISO: string;
  title: string;
  onClose: () => void;
}

interface ConflictItem {
  id: string;
  label: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
}

interface ResourceAvailability {
  label: string;
  available: boolean;
  note?: string;
}

interface OptimizationTip {
  id: string;
  icon: string;
  text: string;
  impact: 'high' | 'medium' | 'low';
}

function formatTimeRange(d: Date): string {
  const start = new Date(d);
  const end = new Date(d.getTime() + 45 * 60 * 1000);
  return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function useInsights(dateISO: string) {
  const dt = useMemo(() => new Date(dateISO), [dateISO]);

  const conflicts: ConflictItem[] = useMemo(() => {
    const hour = dt.getHours();
    const day = dt.getDay(); // 0..6
    const items: ConflictItem[] = [];
    if (hour >= 9 && hour <= 11) {
      items.push({ id: 'conf-1', label: 'Clinic room overlap', time: formatTimeRange(dt), severity: 'medium' });
    }
    if (day === 1 || day === 3) {
      items.push({ id: 'conf-2', label: 'Staff shift crossover', time: formatTimeRange(new Date(dt.getTime() + 15 * 60 * 1000)), severity: 'low' });
    }
    return items;
  }, [dt]);

  const resources: ResourceAvailability[] = useMemo(() => {
    const hour = dt.getHours();
    return [
      { label: 'Room A', available: !(hour === 10 || hour === 15), note: hour === 10 || hour === 15 ? 'Booked for procedure' : 'Available' },
      { label: 'Ultrasound', available: hour !== 14, note: hour === 14 ? 'Maintenance window' : 'Ready' },
      { label: 'Nurse (Team B)', available: hour < 12 || hour > 16, note: hour >= 12 && hour <= 16 ? 'On rounds' : 'On-call' },
    ];
  }, [dt]);

  const tips: OptimizationTip[] = useMemo(() => {
    const hour = dt.getHours();
    const items: OptimizationTip[] = [
      { id: 'tip-1', icon: 'ti ti-calendar-time', text: 'Shift start by 15 min to avoid room overlap', impact: 'high' },
      { id: 'tip-2', icon: 'ti ti-users-group', text: 'Pair with related follow-up to minimize travel time', impact: 'medium' },
    ];
    if (hour >= 16) {
      items.push({ id: 'tip-3', icon: 'ti ti-moon', text: 'Consider next-morning slot for higher patient show-up', impact: 'medium' });
    } else if (hour <= 9) {
      items.push({ id: 'tip-3', icon: 'ti ti-sunrise', text: 'Early slot: add 5 min buffer for check-in', impact: 'low' });
    }
    return items;
  }, [dt]);

  const score = useMemo(() => {
    const base = 82;
    const penalty = conflicts.reduce((acc, c) => acc + (c.severity === 'high' ? 12 : c.severity === 'medium' ? 6 : 3), 0);
    const resourceBonus = resources.filter(r => r.available).length * 2;
    return Math.max(0, Math.min(100, Math.round(base - penalty + resourceBonus)));
  }, [conflicts, resources]);

  return { conflicts, resources, tips, score };
}

export default function SchedulingInsightPopover({ anchor, dateISO, title, onClose }: SchedulingInsightProps) {
  const popRef = useRef<HTMLDivElement>(null);
  const { conflicts, resources, tips, score } = useInsights(dateISO);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    function onClick(e: MouseEvent) {
      if (!popRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!popRef.current.contains(e.target)) onClose();
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [onClose]);

  const placementVars = {
    ['--ai-popover-left' as any]: `${Math.round(anchor.left + anchor.width / 2)}px`,
    ['--ai-popover-top' as any]: `${Math.round(anchor.top + anchor.height + 8)}px`,
  } as React.CSSProperties;

  return (
    <div className="ai-schedule-overlay" aria-hidden="false">
      <div ref={popRef} className="ai-schedule-popover shadow" role="dialog" aria-modal="true" aria-label="AI Scheduling Insights" style={placementVars}>
        <div className="ai-schedule-popover__header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 min-width-0">
            <i className="ti ti-brain ai-icon-accent" aria-hidden="true" />
            <div className="min-width-0">
              <div className="fw-semibold text-truncate">🧠 AI Scheduling Insights</div>
              <div className="ai-text-muted ai-text-xs text-truncate" title={title}>{title}</div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <span className="ai-badge ai-badge--low">🎯 Score {score}</span>
            <button type="button" className="ai-btn ai-btn--sm ai-btn--secondary" onClick={onClose} aria-label="Close insights">
              <i className="ti ti-x" />
            </button>
          </div>
        </div>

        <div className="ai-schedule-popover__body">
          <div className="ai-section">
            <div className="ai-section__title"><i className="ti ti-alert-triangle me-1" />⚠️ Conflicts</div>
            {conflicts.length === 0 ? (
              <div className="ai-text-muted ai-text-xs">✅ No direct conflicts detected for this slot.</div>
            ) : (
              <ul className="list-unstyled mb-0 ai-list">
                {conflicts.map(c => (
                  <li key={c.id} className={`ai-list__item ai-list__item--${c.severity}`}>
                    <span className="ai-dot" aria-hidden="true" />
                    <span className="ai-list__label">{c.label}</span>
                    <span className="ai-list__time ms-auto">{c.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="ai-section">
            <div className="ai-section__title"><i className="ti ti-bulb me-1" />💡 Optimization</div>
            <ul className="list-unstyled mb-0 ai-list">
              {tips.map(t => (
                <li key={t.id} className={`ai-list__item ai-list__item--${t.impact}`}>
                  <i className={`${t.icon} ai-icon-accent me-2`} aria-hidden="true" />
                  <span className="ai-list__label">{t.text}</span>
                  <span className="ai-badge ai-badge--sm ai-badge--medium ms-auto">{t.impact.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ai-section">
            <div className="ai-section__title"><i className="ti ti-building-hospital me-1" />🏥 Resources</div>
            <ul className="list-unstyled mb-0 ai-list">
              {resources.map((r, idx) => (
                <li key={`${r.label}-${idx}`} className="ai-list__item">
                  <i className={`ti ${r.available ? 'ti-circle-check text-success' : 'ti-circle-x text-danger'} me-2`} aria-hidden="true" />
                  <span className="ai-list__label">{r.label}</span>
                  {r.note && <span className="ai-text-muted ms-2 ai-text-xs">{r.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ai-schedule-popover__footer d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <span className="ai-badge ai-badge--low ai-badge--sm">✨ Suggested</span>
            <span className="ai-confidence-badge">🤖 Confidence {Math.max(65, Math.min(95, score))}%</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <a href="/appointments" className="ai-btn ai-btn--sm ai-btn--secondary" data-ai-action>
              <i className="ti ti-calendar-stats me-1" />📊 View
            </a>
            <a href="/new-appointment" className="ai-btn ai-btn--sm ai-btn--primary" data-ai-action>
              <i className="ti ti-calendar-check me-1" />📅 Reschedule
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
