# Design Specifications

Behaviors & Triggers
- analyzeTimes: fires on patient/doctor/department change (debounced 250ms)
- checkConflicts: fires on date/time/doctor change (debounced 250ms)
- Appointment Calendar: click inside calendar triggers SlotScoringTooltip with top suggestion mapping
- Application Calendar: header button opens SchedulingInsightPopover anchored to trigger

Visual Patterns
- Buttons and badges follow existing tokens; AI classes use .ai-* utilities
- Tooltip/popover use .ai-schedule-popover styles (light/dark supported)

Interaction & Micro-animations
- Hover elevation on cards; subtle translateY; respects prefers-reduced-motion

Error Handling & Fallbacks
- AbortController cancels stale requests; retry helper available
- Inline error messages; components continue to function without AI

Performance
- Caching for 5 minutes; debouncing; retry with backoff; view-port aware positioning

Accessibility
- aria-label/role on interactive regions; Esc-close; focus management via native buttons
- High-contrast and reduced-motion supported via existing CSS

HIPAA
- No PHI persisted; mock data only; future real integrations must use server-side redaction and encrypted transit.
