import { useEffect, useMemo, useRef } from 'react';

/**
 * SchedulingInsightPopover - Design System Compliant
 * 
 * Changes Applied:
 * - Replaced custom .ai-schedule-popover with .ai-card structure
 * - Updated header/body/footer to use .ai-card__header/body/footer
 * - Replaced custom list items with .ai-list-item pattern
 * - Applied design system typography (.ai-text-*, .ai-font-*)
 * - Applied design system spacing (.ai-gap-*, .ai-p-*)
 * - Used design system color tokens (.ai-icon-accent, .ai-text-muted)
 * - Enhanced accessibility with proper ARIA attributes
 * - Maintained all positioning and interaction logic
 */

export interface SchedulingAnchor {
  top: number;
  left: number;
  width: number;
  height: number;
  calendarBounds?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
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
    const day = dt.getDay();
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

  // Enhanced positioning logic with viewport boundary detection
  const placementVars = useMemo(() => {
    const popoverWidth = 360;
    const gap = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const bounds = anchor.calendarBounds ?? {
      left: scrollX,
      top: scrollY,
      width: viewportWidth,
      height: viewportHeight,
    };

    const containerLeft = bounds.left;
    const containerRight = bounds.left + bounds.width;
    const containerTop = bounds.top;
    const containerBottom = bounds.top + bounds.height;

    const spaceOnLeft = anchor.left - scrollX;
    const spaceOnRight = viewportWidth - (anchor.left + anchor.width - scrollX);

    let left: number;
    const preferRight = spaceOnRight >= popoverWidth + gap;
    const preferLeft = spaceOnLeft >= popoverWidth + gap;

    if (preferRight) {
      left = anchor.left + anchor.width + gap;
    } else if (preferLeft) {
      left = anchor.left - popoverWidth - gap;
    } else {
      left = anchor.left + anchor.width / 2 - popoverWidth / 2;
    }

    left = Math.max(containerLeft + gap, Math.min(left, containerRight - popoverWidth - gap));

    const spaceBelow = viewportHeight - (anchor.top + anchor.height - scrollY);
    const spaceAbove = anchor.top - scrollY;
    const estimatedPopoverHeight = 400;

    let top: number;
    if (spaceBelow >= estimatedPopoverHeight + gap) {
      top = anchor.top + anchor.height + gap;
    } else if (spaceAbove >= estimatedPopoverHeight + gap) {
      top = anchor.top - estimatedPopoverHeight - gap;
    } else {
      top = anchor.top + anchor.height / 2 - estimatedPopoverHeight / 2;
    }

    top = Math.max(containerTop + gap, Math.min(top, containerBottom - estimatedPopoverHeight - gap));

    return {
      ['--ai-popover-left' as any]: `${Math.round(left)}px`,
      ['--ai-popover-top' as any]: `${Math.round(top)}px`,
    } as React.CSSProperties;
  }, [anchor]);

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100" 
      style={{ zIndex: 1050, pointerEvents: 'none' }}
      aria-hidden="false"
    >
      <div 
        ref={popRef} 
        className="ai-card shadow-lg" 
        role="dialog" 
        aria-modal="true" 
        aria-label="AI Scheduling Insights"
        style={{ 
          ...placementVars, 
          position: 'absolute',
          left: 'var(--ai-popover-left)',
          top: 'var(--ai-popover-top)',
          width: '360px',
          maxHeight: '500px',
          pointerEvents: 'auto',
          overflowY: 'auto'
        }}
      >
        {/* Design System: ai-card__header */}
        <div className="ai-card__header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center ai-gap-2 min-width-0 flex-grow-1">
            <i className="ti ti-brain ai-icon-accent" aria-hidden="true" />
            <div className="min-width-0 flex-grow-1">
              <div className="ai-font-semibold ai-text-base text-truncate">AI Scheduling Insights</div>
              <div className="ai-text-muted ai-text-xs text-truncate" title={title}>{title}</div>
            </div>
          </div>
          <div className="d-flex align-items-center ai-gap-2 flex-shrink-0">
            <span className="ai-badge ai-badge--low d-inline-flex align-items-center ai-gap-1">
              <i className="ti ti-target-arrow" aria-hidden="true" />
              {score}
            </span>
            <button 
              type="button" 
              className="ai-btn ai-btn--sm ai-btn--secondary" 
              onClick={onClose} 
              aria-label="Close insights"
            >
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Design System: ai-card__body */}
        <div className="ai-card__body">
          {/* Conflicts Section */}
          <div className="mb-3">
            <div className="d-flex align-items-center ai-gap-1 mb-2">
              <i className="ti ti-alert-triangle ai-icon-accent" aria-hidden="true" />
              <span className="ai-font-semibold ai-text-sm">Conflicts</span>
            </div>
            {conflicts.length === 0 ? (
              <div className="ai-text-muted ai-text-xs d-flex align-items-center ai-gap-1">
                <i className="ti ti-circle-check ai-icon-accent" aria-hidden="true" />
                No direct conflicts detected for this slot.
              </div>
            ) : (
              <div className="d-flex flex-column ai-gap-2">
                {conflicts.map(c => (
                  <div key={c.id} className="ai-list-item">
                    <div 
                      className={`ai-list-item__priority ai-list-item__priority--${c.severity === 'high' ? 'critical' : c.severity}`}
                      aria-label={`${c.severity} priority`}
                    ></div>
                    <div className="ai-list-item__content">
                      <div className="d-flex align-items-start justify-content-between ai-gap-2">
                        <span className="ai-text-sm ai-text-primary">{c.label}</span>
                        <span className="ai-text-xs ai-text-muted flex-shrink-0">{c.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optimization Tips Section */}
          <div className="mb-3">
            <div className="d-flex align-items-center ai-gap-1 mb-2">
              <i className="ti ti-bulb ai-icon-accent" aria-hidden="true" />
              <span className="ai-font-semibold ai-text-sm">Optimization</span>
            </div>
            <div className="d-flex flex-column ai-gap-2">
              {tips.map(t => (
                <div key={t.id} className="ai-list-item">
                  <i className={`${t.icon} ai-icon-accent`} aria-hidden="true" />
                  <div className="ai-list-item__content">
                    <div className="d-flex align-items-start justify-content-between ai-gap-2">
                      <span className="ai-text-sm ai-text-primary">{t.text}</span>
                      <span className={`ai-badge ai-badge--sm ai-badge--${t.impact === 'high' ? 'high' : t.impact === 'medium' ? 'medium' : 'low'}`}>
                        {t.impact.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <div className="d-flex align-items-center ai-gap-1 mb-2">
              <i className="ti ti-building-hospital ai-icon-accent" aria-hidden="true" />
              <span className="ai-font-semibold ai-text-sm">Resources</span>
            </div>
            <div className="d-flex flex-column ai-gap-2">
              {resources.map((r, idx) => (
                <div key={`${r.label}-${idx}`} className="ai-list-item">
                  <i 
                    className={`ti ${r.available ? 'ti-circle-check' : 'ti-circle-x'} ${r.available ? 'text-success' : 'text-danger'}`}
                    aria-hidden="true"
                  />
                  <div className="ai-list-item__content">
                    <div className="d-flex align-items-center justify-content-between ai-gap-2">
                      <span className="ai-text-sm ai-text-primary">{r.label}</span>
                      {r.note && <span className="ai-text-xs ai-text-muted">{r.note}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design System: ai-card__footer */}
        <div className="ai-card__footer d-flex align-items-center justify-content-end ai-gap-2">
          <a 
            href="/appointments" 
            className="ai-btn ai-btn--sm ai-btn--secondary" 
            onClick={(e) => { e.preventDefault(); /* Handle navigation */ }}
          >
            <i className="ti ti-calendar-stats me-1" aria-hidden="true" />
            View
          </a>
          <a 
            href="/new-appointment" 
            className="ai-btn ai-btn--sm ai-btn--accent" 
            onClick={(e) => { e.preventDefault(); /* Handle navigation */ }}
          >
            <i className="ti ti-calendar-check me-1" aria-hidden="true" />
            Reschedule
          </a>
        </div>
      </div>
    </div>
  );
}
