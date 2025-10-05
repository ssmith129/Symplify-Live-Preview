import { useMemo } from 'react';
import type { AIInsightSlot } from '../services/ai/types';

/**
 * AppointmentInsights - Design System Compliant
 * 
 * Changes Applied:
 * - Enhanced typography with design system classes (.ai-text-*, .ai-font-*)
 * - Applied consistent spacing with .ai-gap-* utilities
 * - Enhanced accessibility with proper ARIA labels
 * - Improved semantic HTML structure
 * - Maintained all existing functionality
 * - Already using .ai-card, .ai-badge design system components
 */

function genSlots(): AIInsightSlot[] {
  const base = new Date();
  base.setMinutes(0,0,0);
  const slots: AIInsightSlot[] = [];
  
  for (let i = 1; i <= 6; i++) {
    const start = new Date(base.getTime() + i * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const utilization = Math.min(95, 40 + i * 8);
    const noShow = Math.max(3, 20 - i * 3);
    const overbook = Math.max(2, 18 - i * 2);
    const score = Math.round(100 - (noShow * 0.4 + overbook * 0.4 + Math.max(0, utilization - 85) * 0.8));
    
    slots.push({
      id: `slot-${i}`,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      utilizationPct: utilization,
      noShowRiskPct: noShow,
      overbookRiskPct: overbook,
      score: Math.max(0, Math.min(100, score)),
    });
  }
  
  return slots.sort((a, b) => b.score - a.score).slice(0, 3);
}

export default function AppointmentInsights() {
  const slots = useMemo(genSlots, []);
  
  return (
    <div className="ai-card mt-3" role="region" aria-label="AI Scheduling Insights">
      {/* Design System: ai-card__header */}
      <div className="ai-card__header d-flex align-items-center ai-gap-2">
        <i className="ti ti-brain ai-icon-accent" aria-hidden="true" />
        <h6 className="mb-0 ai-font-semibold ai-text-base">AI Scheduling Insights</h6>
      </div>
      
      {/* Design System: ai-card__body */}
      <div className="ai-card__body">
        <div className="row g-3">
          {slots.map(s => {
            const startTime = new Date(s.startISO).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            const endTime = new Date(s.endISO).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            
            return (
              <div className="col-md-4" key={s.id}>
                <div 
                  className="ai-slot-card h-100" 
                  role="article"
                  aria-label={`Time slot ${startTime} to ${endTime}, score ${s.score}`}
                >
                  {/* Header with time and score */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="ai-font-semibold ai-text-sm ai-text-primary">
                      {startTime} - {endTime}
                    </span>
                    <span className="ai-badge ai-badge--accent d-inline-flex align-items-center ai-gap-1">
                      <i className="ti ti-target-arrow" aria-hidden="true" />
                      <span aria-label={`Score ${s.score} out of 100`}>{s.score}</span>
                    </span>
                  </div>
                  
                  {/* Metrics list */}
                  <div className="d-flex flex-column ai-gap-2">
                    <div className="d-flex align-items-center ai-gap-2">
                      <i className="ti ti-activity ai-icon-accent flex-shrink-0" aria-hidden="true" />
                      <span className="ai-text-sm ai-text-muted">
                        Utilization <span className="ai-font-semibold ai-text-primary">{s.utilizationPct}%</span>
                      </span>
                    </div>
                    
                    <div className="d-flex align-items-center ai-gap-2">
                      <i className="ti ti-user-exclamation ai-icon-accent flex-shrink-0" aria-hidden="true" />
                      <span className="ai-text-sm ai-text-muted">
                        No-show risk <span className="ai-font-semibold ai-text-primary">{s.noShowRiskPct}%</span>
                      </span>
                    </div>
                    
                    <div className="d-flex align-items-center ai-gap-2">
                      <i className="ti ti-alert-square-rounded ai-icon-accent flex-shrink-0" aria-hidden="true" />
                      <span className="ai-text-sm ai-text-muted">
                        Overbook risk <span className="ai-font-semibold ai-text-primary">{s.overbookRiskPct}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
