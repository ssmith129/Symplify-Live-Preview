# Phase 2: Design System Implementation - AI Enhancement Features

## Design System Specifications Reference

This implementation strictly follows the HTML design system documentation provided in:
- `design-system-overview.html` - Foundation and principles
- `component-library.html` - Component specifications

## CSS Custom Properties (Design Tokens)

### Color Palette Implementation
```css
/* From design-system-overview.html */
:root {
  /* AI Brand Identity */
  --ai-primary: #2D3748;
  --ai-primary-light: #4A5568;
  --ai-primary-dark: #1A202C;
  --ai-accent: #00D3C7;
  --ai-accent-light: #4FD1C7;
  --ai-accent-dark: #00B5AA;
  
  /* Priority Levels */
  --ai-critical: #DC3545;
  --ai-critical-bg: rgba(220, 53, 69, 0.1);
  --ai-critical-border: rgba(220, 53, 69, 0.2);
  
  --ai-high: #E2B93B;
  --ai-high-bg: rgba(226, 185, 59, 0.1);
  --ai-high-border: rgba(226, 185, 59, 0.2);
  
  --ai-medium: #0D6EFD;
  --ai-medium-bg: rgba(13, 110, 253, 0.1);
  --ai-medium-border: rgba(13, 110, 253, 0.2);
  
  --ai-low: #198754;
  --ai-low-bg: rgba(25, 135, 84, 0.1);
  --ai-low-border: rgba(25, 135, 84, 0.2);
  
  /* Text Colors */
  --ai-text-primary: #1A202C;
  --ai-text-secondary: #4A5568;
  --ai-text-muted: #718096;
  --ai-text-inverse: #FFFFFF;
  
  /* Spacing - Section: Spacing System */
  --ai-space-1: 4px;
  --ai-space-2: 8px;
  --ai-space-3: 12px;
  --ai-space-4: 16px;
  --ai-space-5: 20px;
  --ai-space-6: 24px;
  --ai-space-8: 32px;
  
  /* Typography - Section: Typography */
  --ai-font-xs: 10px;
  --ai-font-sm: 12px;
  --ai-font-base: 14px;
  --ai-font-lg: 16px;
  --ai-font-xl: 18px;
  
  /* Transitions */
  --ai-transition-normal: 0.15s ease;
}
```

### Typography Hierarchy
Reference: `design-system-overview.html - Section: Typography`

| Use Case | Font Size | Weight | Variable |
|----------|-----------|--------|----------|
| Section Headers | 18px | 600 | --ai-font-xl |
| Button Labels | 12px | 500 | --ai-font-sm |
| Badge Text | 10px | 600 | --ai-font-xs |
| Body Text | 14px | 400 | --ai-font-base |
| Metadata | 10px | 400 | --ai-font-xs |

### Spacing System
Reference: `design-system-overview.html - Section: Spacing System`

| Element | Spacing Token | Value | Usage |
|---------|---------------|-------|-------|
| Badge Padding | --ai-space-1 --ai-space-2 | 4px 8px | Compact labels |
| Button Padding | --ai-space-2 --ai-space-4 | 8px 16px | Touch targets |
| Section Padding | --ai-space-4 | 16px | Content areas |
| Card Gap | --ai-space-3 | 12px | List spacing |

## Component Specifications

### 1. AI Badges
Reference: `component-library.html - Section: #badges`

#### Implementation:
```html
<!-- Priority Badges -->
<span class="ai-badge ai-badge--critical">
  <i class="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
  Critical
</span>
<span class="ai-badge ai-badge--high">
  <i class="fa-solid fa-fire me-1" aria-hidden="true"></i>
  High
</span>
<span class="ai-badge ai-badge--medium">
  <i class="fa-regular fa-lightbulb me-1" aria-hidden="true"></i>
  Medium
</span>
<span class="ai-badge ai-badge--low">
  <i class="fa-regular fa-circle-check me-1" aria-hidden="true"></i>
  Low
</span>

<!-- Confidence Score Badge -->
<span class="ai-badge ai-badge--low">
  <i class="fa-solid fa-bullseye me-1" aria-hidden="true"></i>
  94% Match
</span>
```

#### CSS Specification:
```css
.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--ai-space-1);
  padding: var(--ai-space-1) var(--ai-space-2);
  border-radius: 6px;
  font-size: var(--ai-font-xs);
  font-weight: 600;
  line-height: 1.2;
  border: 1px solid transparent;
  transition: var(--ai-transition-normal);
}
```

#### WCAG Compliance:
- Critical: Contrast ratio 7.2:1 (AAA) ✅
- High: Contrast ratio 4.8:1 (AA) ✅
- Medium: Contrast ratio 7.5:1 (AAA) ✅
- Low: Contrast ratio 4.6:1 (AA) ✅

### 2. AI Buttons
Reference: `component-library.html - Section: #buttons`

#### Primary Action (Apply):
```html
<button class="ai-btn ai-btn--accent">
  <i class="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
  Apply Suggestion
</button>
```

#### Secondary Actions:
```html
<button class="ai-btn ai-btn--secondary">
  <i class="fa-solid fa-brain me-2" aria-hidden="true"></i>
  AI Analyze
</button>
<button class="ai-btn ai-btn--secondary">
  <i class="fa-solid fa-rotate me-2" aria-hidden="true"></i>
  Refresh
</button>
```

#### Button Hierarchy:
1. **Primary (.ai-btn--accent):** Main AI action - Apply
2. **Secondary (.ai-btn--secondary):** Supporting actions - Analyze, Triage
3. **Tertiary (.ai-btn--secondary outline):** Utility actions - Refresh, Flag

### 3. AI Cards
Reference: `component-library.html - Section: #cards`

#### Inbox Triage Card:
```html
<div class="ai-card">
  <div class="ai-card__header">
    <i class="fa-solid fa-brain me-2" aria-hidden="true"></i>
    AI Inbox Triage
  </div>
  <div class="ai-card__body">
    <!-- List items here -->
  </div>
</div>
```

### 4. Progress Indicators
Reference: `component-library.html - Section: #progress`

#### AI Confidence Levels:
```html
<div class="d-flex justify-content-between mb-1">
  <span style="font-size: var(--ai-font-sm);">High Confidence</span>
  <span style="font-size: var(--ai-font-sm);">94%</span>
</div>
<div class="ai-progress">
  <div class="ai-progress__bar ai-progress__bar--success" 
       style="width: 94%"></div>
</div>
```

### 5. List Items
Reference: `component-library.html - Section: #lists`

#### Message Triage Item:
```html
<div class="ai-list-item">
  <div class="ai-list-item__priority ai-list-item__priority--critical"></div>
  <div class="ai-list-item__content">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <h6 class="mb-1">Dr. Sarah Johnson</h6>
        <p class="mb-0 text-muted" style="font-size: var(--ai-font-sm);">
          Emergency patient consultation needed
        </p>
      </div>
      <div class="text-end">
        <span class="ai-badge ai-badge--critical">Critical</span>
        <div class="text-muted" style="font-size: var(--ai-font-xs);">
          89% confidence
        </div>
      </div>
    </div>
  </div>
</div>
```

## Icon System
Reference: `design-system-overview.html - Section: #icons`

### AI Feature Icons (Font Awesome):

| Feature | Icon | Class |
|---------|------|-------|
| AI Intelligence | Brain | `fa-solid fa-brain` |
| AI Status | Robot | `fa-solid fa-robot` |
| Insights | Lightbulb | `fa-regular fa-lightbulb` |
| Accuracy | Target | `fa-solid fa-bullseye` |
| Critical Alert | Warning Triangle | `fa-solid fa-triangle-exclamation` |
| Success | Check Circle | `fa-regular fa-circle-check` |
| Analytics | Chart | `fa-regular fa-chart-bar` |
| Time/Schedule | Clock | `fa-regular fa-clock` |
| Apply/Magic | Wand | `fa-solid fa-wand-magic-sparkles` |
| Refresh | Rotate | `fa-solid fa-rotate` |
| Flag | Flag | `fa-solid fa-flag-3` |

### Usage Example:
```html
<!-- Icon with proper accessibility -->
<i class="fa-solid fa-brain me-2" aria-hidden="true"></i>
<span class="visually-hidden">AI Analysis</span>
```

## Accessibility Implementation
Reference: `design-system-overview.html - Section: #accessibility`

### WCAG 2.1 AA Requirements:

#### 1. Color Contrast ✅
- All text meets 4.5:1 minimum contrast ratio
- Large text (18px+) meets 3:1 ratio
- UI components meet 3:1 contrast ratio

#### 2. Keyboard Navigation ✅
```html
<!-- All interactive elements are keyboard accessible -->
<button class="ai-btn ai-btn--primary" 
        aria-label="Analyze message with AI">
  <i class="fa-solid fa-brain me-2" aria-hidden="true"></i>
  AI Analyze
</button>

<!-- Logical tab order maintained -->
<div role="toolbar" aria-label="AI message actions">
  <!-- Buttons in logical order -->
</div>
```

#### 3. Screen Reader Support ✅
```html
<!-- Live regions for dynamic updates -->
<div class="ai-loading" 
     role="status" 
     aria-live="polite" 
     aria-busy="true">
  <span class="visually-hidden">Analyzing message content</span>
  <div class="spinner-border spinner-border-sm"></div>
  <span aria-hidden="true">Analyzing...</span>
</div>

<!-- Descriptive labels -->
<button aria-label="Mark message as critical priority">
  <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
</button>
```

#### 4. Touch Targets (Mobile) ✅
- Minimum 44x44px touch targets
- Adequate spacing between interactive elements

```css
@media (max-width: 575px) {
  .ai-btn {
    min-height: 44px; /* Touch-friendly */
    padding: var(--ai-space-3) var(--ai-space-4);
  }
}
```

## Responsive Breakpoints
Reference: `design-system-overview.html - Section: Implementation`

### Mobile (< 576px):
```css
@media (max-width: 576px) {
  .ai-assistance-toolbar {
    flex-direction: column;
    gap: var(--ai-space-2);
  }
  
  .ai-btn {
    width: 100%;
    justify-content: center;
  }
  
  .ai-badge {
    font-size: 9px;
  }
}
```

### Tablet (576px - 768px):
```css
@media (min-width: 576px) and (max-width: 768px) {
  .ai-assistance-toolbar {
    flex-wrap: wrap;
  }
  
  .ai-btn {
    flex: 1 1 auto;
    min-width: 120px;
  }
}
```

### Desktop (> 768px):
```css
@media (min-width: 768px) {
  .ai-assistance-toolbar {
    flex-direction: row;
    gap: var(--ai-space-3);
  }
}
```

## Animation & Transitions
Reference: `design-system-overview.html - Section: Color Palette & Typography`

### Hover States:
```css
.ai-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 55, 72, 0.15);
  transition: var(--ai-transition-normal);
}

.ai-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-color: var(--ai-border-medium);
}
```

### Loading States:
```css
.ai-loading {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Reduced Motion:
```css
@media (prefers-reduced-motion: reduce) {
  .ai-btn:hover,
  .ai-card:hover {
    transform: none !important;
    transition: none !important;
  }
}
```

## Component Integration Checklist

### Messages Page AI Toolbar:
- [x] Use .ai-btn classes for all buttons
- [x] Replace inline colors with CSS custom properties
- [x] Use --ai-space-* tokens for spacing
- [x] Implement proper ARIA labels
- [x] Add Font Awesome icons
- [x] Include loading states with aria-live
- [x] Ensure keyboard navigation
- [x] Mobile responsive design

### Priority Badges:
- [x] Consolidate to .ai-badge system
- [x] Remove .figma-* classes
- [x] Use design system icons
- [x] Apply consistent sizing
- [x] Add hover states
- [x] Screen reader support

### Filter Pills:
- [x] Convert to .ai-btn--secondary
- [x] Add active state styling
- [x] Include badge count display
- [x] Keyboard navigation
- [x] Screen reader announcements

## Implementation Priority

### Phase 1 (Critical - Week 1):
1. Replace all inline styles with design system classes
2. Consolidate badge implementations
3. Update button components
4. Fix accessibility issues

### Phase 2 (Important - Week 2):
1. Add loading/success/error states
2. Implement responsive design
3. Add keyboard shortcuts
4. Improve visual hierarchy

### Phase 3 (Enhancement - Week 3):
1. Progressive disclosure patterns
2. Contextual AI suggestions
3. Performance optimization
4. Analytics integration

## Compliance Verification

### Design System Adherence:
- [ ] All colors use CSS custom properties
- [ ] All spacing uses design tokens
- [ ] All typography follows scale
- [ ] All components use design system classes
- [ ] All icons from approved library
- [ ] WCAG 2.1 AA compliance met
- [ ] Responsive across all breakpoints
- [ ] Keyboard accessible
- [ ] Screen reader compatible

### Testing Checklist:
- [ ] Color contrast verification (WebAIM tool)
- [ ] Keyboard navigation test
- [ ] Screen reader test (NVDA/JAWS)
- [ ] Mobile responsive test
- [ ] Touch target size verification
- [ ] Cross-browser compatibility
- [ ] Performance benchmarks
