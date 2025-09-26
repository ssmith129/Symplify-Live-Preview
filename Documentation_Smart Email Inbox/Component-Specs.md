# AI Email Inbox — Component Specifications

## Page Layout
- Wrapper: .page-wrapper > .content (max-width: 1600px; tablet-landscape 1366px cap)
- Grid: two-column responsive layout
  - Main (emails list): col-xl-8 col-lg-7
  - Side (details/suggestions): col-xl-4 col-lg-5 (stacks below on md and below)

## Header Bar (.ai-card__header)
- Title: "AI Inbox" with <span class="ai-badge ai-badge--sm"><i class="fa-solid fa-robot"></i>AI</span>
- Filters: pills (All, Unread, Starred, Categories dropdown), matches .drop-pill style
- Toggles: Smart Sort (switch), Confidence Only (switch) — reuse inputs used in InboxTriageCard
- Bulk actions: Mark All Read, Archive, Delete; disabled when none selected

## Email Row (.ai-list-item.ai-email-row)
- Structure:
  - Priority dot: .ai-list-item__priority--{critical|high|medium|low}
  - Sender/Subject block: sender (fs-14 fw-semibold text-truncate), subject (fs-13 text-muted text-truncate)
  - Meta group: time (fs-12), attachments count, tags; optional confidence chip (ai-badge)
  - Actions (hover/keyboard focus visible): mark read, archive, delete, snooze
- States: unread (fw-semibold), read, selected (checked), focused (outline: var(--ai-accent))
- Accessibility: role="listitem"; aria-selected for selection; buttons with aria-label

## Expanded Preview (.ai-expand)
- Transitions: max-height 0→240px; show body preview, suggested quick replies, metadata
- Quick replies: .ai-btn .ai-btn--secondary with suggestion text

## Sidebar Panel
- Thread details (participants, tags), AI suggestions (smart summarize, propose reply), actions
- Scrollable: max-height fit to viewport minus header

## Loading/Empty/Error
- Skeleton rows (3–6) with shimmer; empty state with AI illustration and CTA; error alert with retry

## Tokens & Utilities
- Use existing AI tokens: colors, spacing, transitions
- Responsive paddings: p-2 (sm), p-3 (md+); gap-2/3

## Keyboard & Shortcuts
- Up/Down navigate; Enter/Space expand/collapse; A archive, Del delete; 1–4 set priority

All classes reference existing patterns from _ai.scss and app utilities for consistent styling.
