import { useMemo } from 'react';
import type { AIInsightSlot } from '../services/ai/types';

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
    <div className="ai-card mt-3">
      <div className="ai-card__header d-flex align-items-center">
        <h6 className="mb-0 fw-semibold"><i className="ti ti-brain me-2 ai-icon-accent"/>AI Scheduling Insights</h6>
      </div>
      <div className="ai-card__body">
        <div className="row g-3">
          {slots.map(s => (
            <div className="col-md-4" key={s.id}>
              <div className="ai-slot-card h-100">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-semibold ai-text-primary">{new Date(s.startISO).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - {new Date(s.endISO).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                  <span className="ai-badge ai-badge--accent d-inline-flex align-items-center gap-1"><i className="ti ti-target-arrow" aria-hidden="true" />Score {s.score}</span>
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="ai-text-sm ai-text-muted d-flex align-items-center"><i className="ti ti-activity ai-icon-accent me-2" aria-hidden="true" />Utilization {s.utilizationPct}%</span>
                  <span className="ai-text-sm ai-text-muted d-flex align-items-center"><i className="ti ti-user-exclamation ai-icon-accent me-2" aria-hidden="true" />No-show risk {s.noShowRiskPct}%</span>
                  <span className="ai-text-sm ai-text-muted d-flex align-items-center"><i className="ti ti-alert-square-rounded ai-icon-accent me-2" aria-hidden="true" />Overbook risk {s.overbookRiskPct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
