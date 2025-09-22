# AI Email Application - Unified Design System Specifications

## Design System Overview

This document establishes the unified design standards for all AI-powered features within the email application, ensuring visual consistency and optimal user experience across all interfaces.

## 1. Color Palette

### Primary AI Brand Colors
```scss
:root {
  /* AI Brand Identity */
  --ai-primary: #2D3748;
  --ai-primary-light: #4A5568;
  --ai-primary-dark: #1A202C;
  --ai-accent: #00D3C7;
  --ai-accent-light: #4FD1C7;
  --ai-accent-dark: #00B5AA;
  
  /* AI Background Colors */
  --ai-bg-primary: #FFFFFF;
  --ai-bg-secondary: #F7F8FA;
  --ai-bg-tertiary: #E2E8F0;
  
  /* AI Border Colors */
  --ai-border-light: #E2E8F0;
  --ai-border-medium: #CBD5E0;
  --ai-border-dark: #A0AEC0;
}
```

### Status & Priority Colors
```scss
:root {
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
  
  /* Semantic Colors */
  --ai-success: #198754;
  --ai-success-bg: rgba(25, 135, 84, 0.1);
  --ai-warning: #FFC107;
  --ai-warning-bg: rgba(255, 193, 7, 0.1);
  --ai-info: #0DCAF0;
  --ai-info-bg: rgba(13, 202, 240, 0.1);
  --ai-danger: #DC3545;
  --ai-danger-bg: rgba(220, 53, 69, 0.1);
}
```

### Text Colors
```scss
:root {
  /* Text Colors */
  --ai-text-primary: #1A202C;
  --ai-text-secondary: #4A5568;
  --ai-text-muted: #718096;
  --ai-text-light: #A0AEC0;
  --ai-text-inverse: #FFFFFF;
}
```

## 2. Typography

### Font Weights
```scss
:root {
  --ai-font-weight-light: 300;
  --ai-font-weight-normal: 400;
  --ai-font-weight-medium: 500;
  --ai-font-weight-semibold: 600;
  --ai-font-weight-bold: 700;
}
```

### Font Sizes
```scss
:root {
  --ai-font-xs: 10px;
  --ai-font-sm: 12px;
  --ai-font-base: 14px;
  --ai-font-lg: 16px;
  --ai-font-xl: 18px;
  --ai-font-2xl: 20px;
  --ai-font-3xl: 24px;
}
```

### Line Heights
```scss
:root {
  --ai-line-height-tight: 1.2;
  --ai-line-height-normal: 1.4;
  --ai-line-height-relaxed: 1.6;
}
```

### Typography Classes
```scss
.ai-text-xs { font-size: var(--ai-font-xs); }
.ai-text-sm { font-size: var(--ai-font-sm); }
.ai-text-base { font-size: var(--ai-font-base); }
.ai-text-lg { font-size: var(--ai-font-lg); }
.ai-text-xl { font-size: var(--ai-font-xl); }

.ai-font-light { font-weight: var(--ai-font-weight-light); }
.ai-font-normal { font-weight: var(--ai-font-weight-normal); }
.ai-font-medium { font-weight: var(--ai-font-weight-medium); }
.ai-font-semibold { font-weight: var(--ai-font-weight-semibold); }
.ai-font-bold { font-weight: var(--ai-font-weight-bold); }
```

## 3. Spacing System

### Spacing Scale
```scss
:root {
  --ai-space-1: 4px;
  --ai-space-2: 8px;
  --ai-space-3: 12px;
  --ai-space-4: 16px;
  --ai-space-5: 20px;
  --ai-space-6: 24px;
  --ai-space-8: 32px;
  --ai-space-10: 40px;
  --ai-space-12: 48px;
  --ai-space-16: 64px;
}
```

### Spacing Utilities
```scss
.ai-p-1 { padding: var(--ai-space-1); }
.ai-p-2 { padding: var(--ai-space-2); }
.ai-p-3 { padding: var(--ai-space-3); }
.ai-p-4 { padding: var(--ai-space-4); }

.ai-m-1 { margin: var(--ai-space-1); }
.ai-m-2 { margin: var(--ai-space-2); }
.ai-m-3 { margin: var(--ai-space-3); }
.ai-m-4 { margin: var(--ai-space-4); }

.ai-gap-1 { gap: var(--ai-space-1); }
.ai-gap-2 { gap: var(--ai-space-2); }
.ai-gap-3 { gap: var(--ai-space-3); }
.ai-gap-4 { gap: var(--ai-space-4); }
```

## 4. Component Specifications

### 4.1 AI Status Badges

#### Standard Badge
```scss
.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--ai-space-1);
  padding: var(--ai-space-1) var(--ai-space-2);
  border-radius: 6px;
  font-size: var(--ai-font-xs);
  font-weight: var(--ai-font-weight-semibold);
  line-height: var(--ai-line-height-tight);
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.ai-badge--critical {
  background: var(--ai-critical-bg);
  color: var(--ai-critical);
  border-color: var(--ai-critical-border);
}

.ai-badge--high {
  background: var(--ai-high-bg);
  color: var(--ai-high);
  border-color: var(--ai-high-border);
}

.ai-badge--medium {
  background: var(--ai-medium-bg);
  color: var(--ai-medium);
  border-color: var(--ai-medium-border);
}

.ai-badge--low {
  background: var(--ai-low-bg);
  color: var(--ai-low);
  border-color: var(--ai-low-border);
}
```

#### Confidence Badge
```scss
.ai-confidence-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px var(--ai-space-2);
  background: var(--ai-bg-secondary);
  color: var(--ai-text-secondary);
  border-radius: 4px;
  font-size: var(--ai-font-xs);
  font-weight: var(--ai-font-weight-medium);
  border: 1px solid var(--ai-border-light);
}
```

### 4.2 AI Buttons

#### Primary AI Button
```scss
.ai-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ai-space-2);
  padding: var(--ai-space-2) var(--ai-space-4);
  border-radius: 6px;
  font-size: var(--ai-font-sm);
  font-weight: var(--ai-font-weight-medium);
  line-height: var(--ai-line-height-tight);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 36px;
  text-decoration: none;
}

.ai-btn:focus {
  outline: 2px solid var(--ai-accent);
  outline-offset: 2px;
}

.ai-btn--primary {
  background: var(--ai-primary);
  color: var(--ai-text-inverse);
  border-color: var(--ai-primary);
}

.ai-btn--primary:hover {
  background: var(--ai-primary-dark);
  border-color: var(--ai-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 55, 72, 0.15);
}

.ai-btn--secondary {
  background: transparent;
  color: var(--ai-primary);
  border-color: var(--ai-border-medium);
}

.ai-btn--secondary:hover {
  background: var(--ai-bg-secondary);
  border-color: var(--ai-primary);
  transform: translateY(-1px);
}

.ai-btn--accent {
  background: var(--ai-accent);
  color: var(--ai-text-inverse);
  border-color: var(--ai-accent);
}

.ai-btn--accent:hover {
  background: var(--ai-accent-dark);
  border-color: var(--ai-accent-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 211, 199, 0.25);
}
```

#### Icon Button
```scss
.ai-btn--icon {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
}

.ai-btn--sm {
  min-height: 32px;
  padding: var(--ai-space-1) var(--ai-space-3);
  font-size: var(--ai-font-xs);
}

.ai-btn--lg {
  min-height: 44px;
  padding: var(--ai-space-3) var(--ai-space-6);
  font-size: var(--ai-font-base);
}
```

### 4.3 AI Cards

#### Base Card
```scss
.ai-card {
  background: var(--ai-bg-primary);
  border: 1px solid var(--ai-border-light);
  border-radius: 8px;
  transition: all 0.2s ease;
  overflow: hidden;
}

.ai-card:hover {
  border-color: var(--ai-border-medium);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.ai-card__header {
  padding: var(--ai-space-4);
  border-bottom: 1px solid var(--ai-border-light);
  background: var(--ai-bg-secondary);
}

.ai-card__body {
  padding: var(--ai-space-4);
}

.ai-card__footer {
  padding: var(--ai-space-4);
  border-top: 1px solid var(--ai-border-light);
  background: var(--ai-bg-secondary);
}
```

#### Suggestion Card
```scss
.ai-suggestion-card {
  @extend .ai-card;
  cursor: pointer;
  position: relative;
}

.ai-suggestion-card:hover {
  border-color: var(--ai-accent);
  box-shadow: 0 4px 16px rgba(0, 211, 199, 0.15);
}

.ai-suggestion-card--selected {
  border-color: var(--ai-accent);
  background: var(--ai-accent-light);
}

.ai-suggestion-card__rank {
  position: absolute;
  top: var(--ai-space-2);
  left: var(--ai-space-2);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--ai-accent);
  color: var(--ai-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--ai-font-xs);
  font-weight: var(--ai-font-weight-bold);
}
```

### 4.4 AI Lists

#### Triage List Item
```scss
.ai-list-item {
  display: flex;
  align-items: flex-start;
  gap: var(--ai-space-3);
  padding: var(--ai-space-3);
  border-bottom: 1px solid var(--ai-border-light);
  transition: all 0.15s ease;
  cursor: pointer;
}

.ai-list-item:hover {
  background: var(--ai-bg-secondary);
}

.ai-list-item:focus {
  outline: 2px solid var(--ai-accent);
  outline-offset: -2px;
}

.ai-list-item__priority {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: var(--ai-space-2);
}

.ai-list-item__priority--critical {
  background: var(--ai-critical);
}

.ai-list-item__priority--high {
  background: var(--ai-high);
}

.ai-list-item__priority--medium {
  background: var(--ai-medium);
}

.ai-list-item__priority--low {
  background: var(--ai-low);
}

.ai-list-item__content {
  flex: 1;
  min-width: 0;
}

.ai-list-item__meta {
  display: flex;
  align-items: center;
  gap: var(--ai-space-2);
  flex-shrink: 0;
}
```

### 4.5 AI Progress and Indicators

#### Progress Bar
```scss
.ai-progress {
  width: 100%;
  height: 4px;
  background: var(--ai-bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
}

.ai-progress__bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.ai-progress__bar--success { background: var(--ai-success); }
.ai-progress__bar--warning { background: var(--ai-warning); }
.ai-progress__bar--danger { background: var(--ai-danger); }
.ai-progress__bar--info { background: var(--ai-info); }
.ai-progress__bar--primary { background: var(--ai-primary); }
```

#### Score Indicator
```scss
.ai-score {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: var(--ai-font-sm);
  font-weight: var(--ai-font-weight-bold);
  color: var(--ai-text-inverse);
}

.ai-score--high { background: var(--ai-success); }
.ai-score--medium { background: var(--ai-warning); }
.ai-score--low { background: var(--ai-danger); }
```

## 5. Icon System

### Icon Guidelines
```scss
.ai-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.ai-icon--sm { width: 12px; height: 12px; }
.ai-icon--lg { width: 20px; height: 20px; }
.ai-icon--xl { width: 24px; height: 24px; }

/* Standard AI Icon Colors */
.ai-icon--primary { color: var(--ai-primary); }
.ai-icon--accent { color: var(--ai-accent); }
.ai-icon--muted { color: var(--ai-text-muted); }
.ai-icon--critical { color: var(--ai-critical); }
.ai-icon--success { color: var(--ai-success); }
.ai-icon--warning { color: var(--ai-warning); }
```

### Standard AI Icons
- **Brain**: `ti-brain` - Primary AI indicator
- **Robot**: `ti-robot` - AI status/active
- **Lightbulb**: `ti-lightbulb` - Insights/suggestions
- **Target**: `ti-target` - Scoring/analysis
- **Alert Triangle**: `ti-alert-triangle` - Warnings
- **Check Circle**: `ti-check-circle` - Success/completed
- **Clock**: `ti-clock` - Time-related metrics
- **Chart Line**: `ti-chart-line` - Analytics/trends

## 6. Animation and Transitions

### Standard Transitions
```scss
:root {
  --ai-transition-fast: 0.1s ease;
  --ai-transition-normal: 0.15s ease;
  --ai-transition-slow: 0.2s ease;
  --ai-transition-bounce: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.ai-transition { transition: all var(--ai-transition-normal); }
.ai-transition--fast { transition: all var(--ai-transition-fast); }
.ai-transition--slow { transition: all var(--ai-transition-slow); }
.ai-transition--bounce { transition: all var(--ai-transition-bounce); }
```

### Hover Effects
```scss
.ai-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.ai-hover-scale:hover {
  transform: scale(1.02);
}

.ai-hover-glow:hover {
  box-shadow: 0 0 0 4px rgba(0, 211, 199, 0.2);
}
```

## 7. Responsive Breakpoints

```scss
:root {
  --ai-breakpoint-sm: 576px;
  --ai-breakpoint-md: 768px;
  --ai-breakpoint-lg: 992px;
  --ai-breakpoint-xl: 1200px;
}

@media (max-width: 575px) {
  .ai-btn { min-height: 44px; } /* Touch-friendly */
  .ai-card { margin: var(--ai-space-2); }
  .ai-list-item { padding: var(--ai-space-4); }
}
```

## 8. Accessibility Guidelines

### Focus Management
```scss
.ai-focus:focus {
  outline: 2px solid var(--ai-accent);
  outline-offset: 2px;
}

.ai-focus--within:focus-within {
  outline: 2px solid var(--ai-accent);
  outline-offset: 2px;
}
```

### Screen Reader Support
```scss
.ai-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### High Contrast Mode
```scss
@media (prefers-contrast: high) {
  .ai-badge,
  .ai-btn,
  .ai-card {
    border-width: 2px;
  }
}
```

### Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  .ai-transition,
  .ai-transition--fast,
  .ai-transition--slow,
  .ai-transition--bounce {
    transition: none;
  }
  
  .ai-hover-lift:hover,
  .ai-hover-scale:hover {
    transform: none;
  }
}
```

## 9. Implementation Priority

### Phase 1 (High Priority)
1. Color palette implementation
2. Badge system standardization
3. Button component unification

### Phase 2 (Medium Priority)
1. Card component standardization
2. Typography system implementation
3. Icon system standardization

### Phase 3 (Low Priority)
1. Animation system implementation
2. Advanced interaction patterns
3. Responsive optimizations

## 10. Quality Assurance Checklist

- [ ] All components use unified color palette
- [ ] Typography scale is consistent across components
- [ ] Spacing system is properly implemented
- [ ] Accessibility requirements are met (WCAG 2.1 AA)
- [ ] Components are responsive across all breakpoints
- [ ] Focus states are clearly visible
- [ ] Color contrast ratios meet accessibility standards
- [ ] Components work with keyboard navigation
- [ ] Screen reader compatibility is verified
- [ ] High contrast mode is supported
- [ ] Reduced motion preferences are respected
