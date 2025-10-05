# AI Components Design System Migration Plan

## Executive Summary
This document outlines the comprehensive design system migration for all AI-powered components across the application. The goal is to achieve 100% design system compliance while maintaining all existing functionality.

## Files Analyzed

### Core AI Components (src/core/ai/)
1. ✅ **InboxTriageCard.tsx** - Already compliant (previously updated)
2. 🔄 **SchedulingInsightPopover.tsx** - Requires major updates
3. ✅ **EmailAIEnhancer.tsx** - Minor updates needed
4. ✅ **AppointmentInsights.tsx** - Already mostly compliant

### Page Integration Components
5. 📄 **email.tsx** - Integration point for EmailAIEnhancer
6. 📄 **appointmentCalendar.tsx** - Integration point for AppointmentInsights
7. 📄 **notifications.tsx** - To be analyzed
8. 📄 **newAppointment.tsx** - To be analyzed
9. 📄 **calendar.tsx** - To be analyzed

## Design System Audit Results

### SchedulingInsightPopover.tsx - MAJOR UPDATES REQUIRED
**Current Issues:**
- Uses custom CSS classes: `.ai-schedule-overlay`, `.ai-schedule-popover`, `.ai-schedule-popover__header/body/footer`
- Custom section classes: `.ai-section`, `.ai-section__title`
- Custom list classes: `.ai-list`, `.ai-list__item`, `.ai-dot`
- Mixes Bootstrap and custom styling

**Required Changes:**
- Replace `.ai-schedule-popover` structure with `.ai-card` + `.ai-card__header/body/footer`
- Replace custom overlay with design system modal/popover pattern
- Update list items to use `.ai-list-item` structure
- Replace custom badges with `.ai-badge` system
- Apply design system spacing utilities (`.ai-gap-*`, `.ai-p-*`)
- Use design system typography (`.ai-text-*`, `.ai-font-*`)
- Apply design system color tokens (`.ai-icon-accent`, `.ai-text-muted`)

### EmailAIEnhancer.tsx - MINOR UPDATES
**Current State:** Already uses AI design system classes
**Required Changes:**
- Ensure consistent badge usage
- Apply proper spacing utilities
- Add ARIA labels for accessibility

### AppointmentInsights.tsx - ALREADY COMPLIANT
**Current State:** Uses `.ai-card`, `.ai-badge`, design system utilities
**Required Changes:**
- Minor typography consistency updates
- Enhanced accessibility attributes

### Integration Components - TO BE REVIEWED
**email.tsx, appointmentCalendar.tsx, notifications.tsx, newAppointment.tsx, calendar.tsx**
- Review AI component integration points
- Ensure consistent styling around AI features
- Update any custom AI-related UI elements

## Implementation Strategy

### Phase 1: Core AI Component Updates (Priority: HIGH)
1. Update SchedulingInsightPopover.tsx to use `.ai-card` structure
2. Refactor custom popover positioning to use design system utilities
3. Update internal list items to use `.ai-list-item` pattern
4. Apply design system color, spacing, and typography tokens

### Phase 2: Component Enhancement (Priority: MEDIUM)
1. Enhance EmailAIEnhancer with better accessibility
2. Update AppointmentInsights typography consistency
3. Verify InboxTriageCard compliance (already done)

### Phase 3: Integration Point Updates (Priority: LOW)
1. Review and update email.tsx integration
2. Review appointmentCalendar.tsx integration
3. Update any custom AI UI in page components

## Design System Mapping

### Component Structure Mappings
| Old Pattern | New Design System Pattern |
|------------|---------------------------|
| `.ai-schedule-popover` | `.ai-card` |
| `.ai-schedule-popover__header` | `.ai-card__header` |
| `.ai-schedule-popover__body` | `.ai-card__body` |
| `.ai-schedule-popover__footer` | `.ai-card__footer` |
| `.ai-section` | `.ai-list-item__content` or custom semantic div |
| `.ai-section__title` | `.ai-font-semibold .ai-text-base` |
| `.ai-list` | Direct children of `.ai-card__body` |
| `.ai-list__item` | `.ai-list-item` |
| Custom badges | `.ai-badge .ai-badge--{variant}` |

### Typography Mappings
| Old Style | New Design System Class |
|-----------|------------------------|
| `.fw-semibold` | `.ai-font-semibold` |
| `.fs-12` | `.ai-text-sm` |
| `.fs-10` | `.ai-text-xs` |
| `.text-muted` | `.ai-text-muted` |
| Custom font sizes | `.ai-text-{xs\|sm\|base\|lg\|xl}` |

### Spacing Mappings
| Old Pattern | New Design System |
|------------|-------------------|
| `.gap-2` | `.ai-gap-2` |
| `.mb-2`, `.mt-2` | `.ai-m-2` |
| `.p-3` | `.ai-p-3` |
| Custom spacing | Design system scale: 4px, 8px, 12px, 16px |

### Color/Icon Mappings
| Old Pattern | New Design System |
|------------|-------------------|
| `.text-primary` | `.ai-text-primary` |
| `.text-accent` | `.ai-icon-accent` (for icons) |
| Custom colors | CSS custom properties: `var(--ai-*)` |

## Quality Assurance Checklist

### Functionality Testing
- [ ] All AI features continue to work without regression
- [ ] Event handlers and interactions preserved
- [ ] State management unchanged
- [ ] API calls/data flow unaffected

### Visual Consistency
- [ ] Consistent spacing across all AI components
- [ ] Uniform typography scale
- [ ] Proper color token usage
- [ ] Responsive behavior maintained

### Accessibility
- [ ] All ARIA labels preserved/enhanced
- [ ] Keyboard navigation functional
- [ ] Screen reader announcements correct
- [ ] Focus indicators visible

### Code Quality
- [ ] TypeScript types preserved
- [ ] Component composition improved
- [ ] No hardcoded values (use design tokens)
- [ ] Consistent naming conventions

## Expected Outcomes

### Before Migration
- Inconsistent styling across AI components
- Custom CSS classes requiring maintenance
- Mixed design patterns (Bootstrap + custom)
- Potential accessibility gaps

### After Migration
- 100% design system compliance
- Unified visual language
- Easier maintenance with design tokens
- Enhanced accessibility
- Improved code reusability
- Better developer experience

## Next Steps
1. Execute Phase 1: Update SchedulingInsightPopover.tsx
2. Execute Phase 2: Enhance other core AI components
3. Execute Phase 3: Review and update integration points
4. Conduct comprehensive QA testing
5. Update documentation
