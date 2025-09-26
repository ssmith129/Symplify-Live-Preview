# AI Ecosystem Design Audit

## Visual System
- Colors: uses CSS vars in src/style/scss/_ai.scss (examples):
  - --ai-primary, --ai-primary-light, --ai-primary-dark
  - --ai-accent, --ai-accent-light, --ai-accent-dark
  - Background: --ai-bg-primary, --ai-bg-secondary, --ai-bg-tertiary
  - Borders: --ai-border-light/medium/dark
  - Priority tokens: --ai-critical/high/medium/low
- Typography: base scales mapped to utility classes
  - Titles: fs-16/18 with fw-semibold; body: fs-13/14; captions: fs-11/12
- Spacing: "--ai-space-*" (from _ai.scss usage) with Bootstrap gap/padding utilities (gap-2, p-2, p-3).
- Iconography: Tabler Icons (ti ...) and occasional Font Awesome (fa-solid); size via fs-*, color via text-*.

## Components & Patterns
- Cards: .ai-card (rounded, subtle border, hover elevation), sections with __header/__body/__footer.
- Lists: .ai-list-item rows with priority dot modifiers and expandable .ai-expand region.
- Badges: .ai-badge (--sm variants), priority-dot-* indicators.
- Feedback: spinners (spinner-border-sm), hover backgrounds, focus outlines using var(--ai-accent).
- Motion: transition var(--ai-transition-normal); hover lift/translateY(-2px) on cards; collapse/expand uses max-height transitions.

## Interaction & IA
- Compact rows with inline meta: time, confidence, tags; bulk actions in header rows.
- Drop/drag targets styled with .drop-pill.
- Keyboard support: arrow nav, Enter/Space expand, shortcuts (1-4 priority).

## AI Branding & Attribution
- Robot icon or AI badge near titles, confidence shown as percentage chips; consistent use of AI color tokens and subtle accents.

These patterns should be reused verbatim for the AI Email Inbox to ensure ecosystem coherence.
