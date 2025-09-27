# User Flows

1) New Appointment (Smart Mode)
- Select Patient/Doctor/Dept → useSmartScheduling.analyzeTimes → show Priority/Duration badges → pick Date/Time → checkConflicts → if conflicts, show actionable tips → submit.

2) Appointment Calendar
- Toggle AI Suggestions → modal presents ranked slots → click slot → prefill New Appointment or open popover → close with Esc/click-out.

3) Application Calendar
- Click AI Insights → SchedulingInsightPopover shows conflicts/resources/tips + score → optional navigation to r/schedule.

Keyboard & ARIA
- All popovers/modals Esc-close; buttons have aria-haspopup/expanded; regions labeled for SR.
