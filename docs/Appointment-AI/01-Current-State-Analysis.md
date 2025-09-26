# Current State Analysis

This document audits AI features currently present in Symplify and their alignment with scheduling workflows.

- AI Inbox Triage (Email) with priority badges, confidence, keyboard support.
- Smart Dashboard (appointments) exposing AI mode toggle and insights.
- Smart Suggestions Panel and Modal surfacing recommended time slots, conflict detection, and reasons.
- Scheduling Insight Popover and Slot Scoring Tooltip components implemented in core/ai.

Gaps for appointment workflows:
- Calendar page lacks inline AI context and quick scoring overlays.
- New Appointment form had suggestions panel but no hook-driven conflict checks.
- Appointment Calendar lacked interactive per-slot analysis.

Remediation in this update:
- Inline AppointmentInsights on calendar page + popover for contextual analysis.
- Hook-driven suggestions/conflicts wired to form fields with live badges.
- Slot-scoring tooltip and AI suggestions modal in appointment calendar.

Compliance & Accessibility baseline:
- No PHI is persisted; suggestions are ephemeral in-memory.
- Keyboard/Escape to close, ARIA roles on interactive AI elements.
- Dark mode and reduced-motion supported via existing tokens.
