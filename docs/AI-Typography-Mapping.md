# AI Typography Standardization — Mapping (Before → After)

This document maps the AI design system typography to the main design system (Inter).

## Main Design System (reference)
- Font family: Inter, sans-serif
- Font weights: 400 (Normal), 500 (Medium), 600 (Semibold), 700 (Bold)
- Base font-size: 0.875rem (14px)
- Utilities: .fs-12 (12px), .fs-13 (13px)
- Headings (from _reboot.scss):
  - H1: 32px, 500
  - H2: 28px, 500
  - H3: 24px, 500
  - H4: 20px, 500
  - H5: 18px, 500
  - H6: 16px, 500

## AI Design System — Before
- Font family: Inherit (varied)
- Tokens:
  - --ai-font-xs: 10px
  - --ai-font-sm: 12px
  - --ai-font-base: 14px
  - --ai-font-lg: 16px
  - --ai-font-xl: 18px
- Line-height/letter-spacing: Not standardized
- Text colors: Custom hex values, not mapped to main variables

## AI Design System — After (Aligned)
- Font family: Inter, sans-serif (via $font-family-base)
- Tokens (src/style/scss/_ai.scss):
  - --ai-font-xs: 0.75rem  (12px)  → matches .fs-12
  - --ai-font-sm: 0.8125rem (13px) → matches .fs-13
  - --ai-font-base: 0.875rem (14px) → $font-size-base
  - --ai-font-lg: 1rem (16px)
  - --ai-font-xl: 1.125rem (18px)
  - --ai-line-tight: 1.25
  - --ai-line-normal: 1.5
  - --ai-letter-tight: -0.01em
  - --ai-letter-normal: 0
- Text colors mapped to main:
  - --ai-text-primary: var(--heading-color)
  - --ai-text-secondary: var(--body-color)
  - --ai-text-muted: var(--gray-500)
  - --ai-text-light: var(--gray-400)

## Element-specific application
- Headings: utility classes
  - .ai-heading-1 → 32px/1.25, 500, letter -0.01em
  - .ai-heading-2 → 28px/1.25, 500
  - .ai-heading-3 → 24px/1.25, 500
  - .ai-heading-4 → 20px/1.25, 500
  - .ai-heading-5 → 18px/1.5, 500
  - .ai-heading-6 → 16px/1.5, 500
- Body text
  - .ai-text-body → 14px/1.5, color var(--body-color)
  - .ai-text-secondary → 13px/1.5, color var(--gray-500)
  - .ai-caption → 12px/1.25, color var(--gray-500)
- Buttons
  - .ai-btn → font-size var(--ai-font-sm) (13px), weight 500, lh 1.5
- Forms
  - .ai-card__body/default → var(--ai-font-base), lh 1.5; labels inherit main .form-label
- Navigation
  - Inherit main system (sidebar/header already use $menu-item-heading/$body-color)

## Discrepancies resolved
- Unified Inter across AI components
- Normalized sizes to rem aligned with main utilities
- Introduced line-height/letter-spacing tokens
- Mapped AI text colors to main system CSS variables

## Accessibility
- Base body size 14px minimum
- Headings maintain hierarchy and contrast through var(--heading-color)
- Secondary/caption text uses >= 12px with sufficient contrast

## Visual Comparison (where to see)
- AI cards, badges, lists, and dashboard now inherit Inter & main sizes
- Use AIDesignSystemShowcase (if present) to toggle typography classes for verification
