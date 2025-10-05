# Component Specification Sheet - AI Enhancement Features

## Design System Component Reference

This document provides detailed specifications for all AI components used in the messages page redesign, with explicit references to the HTML design system documentation.

---

## 1. AI Badge Component

### Design System Reference
- **Source:** `component-library.html - Section: #badges`
- **Foundation:** `design-system-overview.html - Section: #colors`

### Component Specification

#### Base Class: `.ai-badge`
```css
.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--ai-space-1);           /* 4px */
  padding: var(--ai-space-1) var(--ai-space-2); /* 4px 8px */
  border-radius: 6px;
  font-size: var(--ai-font-xs);    /* 10px */
  font-weight: 600;
  line-height: 1.2;
  border: 1px solid transparent;
  transition: var(--ai-transition-normal); /* 0.15s ease */
}
```

#### Variants:

**Critical Priority:**
```css
.ai-badge--critical {
  background: var(--ai-critical-bg);      /* rgba(220, 53, 69, 0.1) */
  color: var(--ai-critical);              /* #DC3545 */
  border-color: var(--ai-critical-border); /* rgba(220, 53, 69, 0.2) */
}
```

**High Priority:**
```css
.ai-badge--high {
  background: var(--ai-high-bg);      /* rgba(226, 185, 59, 0.1) */
  color: var(--ai-high);              /* #E2B93B */
  border-color: var(--ai-high-border); /* rgba(226, 185, 59, 0.2) */
}
```

**Medium Priority:**
```css
.ai-badge--medium {
  background: var(--ai-medium-bg);      /* rgba(13, 110, 253, 0.1) */
  color: var(--ai-medium);              /* #0D6EFD */
  border-color: var(--ai-medium-border); /* rgba(13, 110, 253, 0.2) */
}
```

**Low Priority:**
```css
.ai-badge--low {
  background: var(--ai-low-bg);      /* rgba(25, 135, 84, 0.1) */
  color: var(--ai-low);              /* #198754 */
  border-color: var(--ai-low-border); /* rgba(25, 135, 84, 0.2) */
}
```

#### Size Modifiers:
```css
.ai-badge--sm {
  padding: 1px var(--ai-space-1);  /* 1px 4px */
  font-size: 9px;
}

.ai-badge--lg {
  padding: var(--ai-space-2) var(--ai-space-3); /* 8px 12px */
  font-size: var(--ai-font-sm);                 /* 12px */
}
```

#### HTML Examples:
```html
<!-- Priority Badge with Icon -->
<span class="ai-badge ai-badge--critical">
  <i class="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
  Critical
</span>

<!-- Count Badge -->
<span class="ai-badge ai-badge--sm ai-badge--low">5</span>

<!-- Confidence Badge -->
<span class="ai-badge ai-badge--low">
  <i class="fa-solid fa-bullseye me-1" aria-hidden="true"></i>
  94% Match
</span>
```

#### Accessibility Requirements:
- ✅ Minimum 3:1 contrast ratio for borders
- ✅ Icon has `aria-hidden="true"`
- ✅ Text is readable at 200% zoom
- ✅ Color not sole indicator (includes text/icon)

---

## 2. AI Button Component

### Design System Reference
- **Source:** `component-library.html - Section: #buttons`
- **Foundation:** `design-system-overview.html - Section: #colors, #spacing`

### Component Specification

#### Base Class: `.ai-btn`
```css
.ai-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ai-space-2);              /* 8px */
  padding: var(--ai-space-2) var(--ai-space-4); /* 8px 16px */
  border-radius: 6px;
  font-size: var(--ai-font-sm);        /* 12px */
  font-weight: 500;
  line-height: 1.2;
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--ai-transition-normal); /* 0.15s ease */
  min-height: 36px;
  text-decoration: none;
}

.ai-btn:focus {
  outline: 2px solid var(--ai-accent);  /* #00D3C7 */
  outline-offset: 2px;
}
```

#### Variants:

**Primary Button:**
```css
.ai-btn--primary {
  background: var(--ai-primary);        /* #2D3748 */
  color: var(--ai-text-inverse);        /* #FFFFFF */
  border-color: var(--ai-primary);
}

.ai-btn--primary:hover {
  background: var(--ai-primary-dark);   /* #1A202C */
  border-color: var(--ai-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45, 55, 72, 0.15);
}
```

**Secondary Button:**
```css
.ai-btn--secondary {
  background: transparent;
  color: var(--ai-primary);             /* #2D3748 */
  border-color: var(--ai-border-medium); /* #CBD5E0 */
}

.ai-btn--secondary:hover {
  background: var(--ai-bg-secondary);   /* #F7F8FA */
  border-color: var(--ai-primary);
  transform: translateY(-1px);
}
```

**Accent Button (Primary Action):**
```css
.ai-btn--accent {
  background: var(--ai-accent);         /* #00D3C7 */
  color: var(--ai-text-inverse);        /* #FFFFFF */
  border-color: var(--ai-accent);
}

.ai-btn--accent:hover {
  background: var(--ai-accent-dark);    /* #00B5AA */
  border-color: var(--ai-accent-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 211, 199, 0.25);
}
```

#### Size Modifiers:
```css
.ai-btn--sm {
  min-height: 32px;
  padding: var(--ai-space-1) var(--ai-space-3); /* 4px 12px */
  font-size: var(--ai-font-xs);                 /* 10px */
}

.ai-btn--lg {
  min-height: 44px;
  padding: var(--ai-space-3) var(--ai-space-6); /* 12px 24px */
  font-size: var(--ai-font-base);               /* 14px */
}

.ai-btn--icon {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
}
```

#### HTML Examples:
```html
<!-- Primary Action Button -->
<button class="ai-btn ai-btn--accent" aria-label="Apply AI suggestion">
  <i class="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
  Apply
</button>

<!-- Secondary Action Button -->
<button class="ai-btn ai-btn--secondary" aria-label="Analyze with AI">
  <i class="fa-solid fa-brain me-2" aria-hidden="true"></i>
  Analyze
</button>

<!-- Icon-only Button -->
<button class="ai-btn ai-btn--secondary ai-btn--icon" aria-label="Refresh">
  <i class="fa-solid fa-rotate" aria-hidden="true"></i>
</button>

<!-- Small Button with Badge -->
<button class="ai-btn ai-btn--sm ai-btn--secondary">
  Critical
  <span class="ai-badge ai-badge--sm ai-badge--critical ms-2">3</span>
</button>
```

#### Accessibility Requirements:
- ✅ Minimum 44x44px touch target (mobile)
- ✅ Clear focus indicator (2px outline)
- ✅ `aria-label` for icon-only buttons
- ✅ Disabled state with `aria-disabled`
- ✅ Loading state with `aria-busy`

#### Button Hierarchy:
1. **Accent (.ai-btn--accent):** Primary AI action (Apply, Submit)
2. **Primary (.ai-btn--primary):** Important actions (Filter active state)
3. **Secondary (.ai-btn--secondary):** Supporting actions (Analyze, Refresh, Triage)

---

## 3. AI Card Component

### Design System Reference
- **Source:** `component-library.html - Section: #cards`
- **Foundation:** `design-system-overview.html - Section: #colors, #spacing`

### Component Specification

#### Base Class: `.ai-card`
```css
.ai-card {
  background: var(--ai-bg-primary);    /* #FFFFFF */
  border: 1px solid var(--ai-border-light); /* #E2E8F0 */
  border-radius: 8px;
  transition: var(--ai-transition-normal); /* 0.15s ease */
  overflow: hidden;
}

.ai-card:hover {
  border-color: var(--ai-border-medium); /* #CBD5E0 */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
```

#### Card Sections:
```css
.ai-card__header {
  padding: var(--ai-space-4);           /* 16px */
  border-bottom: 1px solid var(--ai-border-light);
  background: var(--ai-bg-secondary);   /* #F7F8FA */
  font-weight: 600;
}

.ai-card__body {
  padding: var(--ai-space-4);           /* 16px */
}

.ai-card__footer {
  padding: var(--ai-space-4);           /* 16px */
  border-top: 1px solid var(--ai-border-light);
  background: var(--ai-bg-secondary);   /* #F7F8FA */
}
```

#### HTML Examples:
```html
<!-- AI Insight Card -->
<div class="ai-card">
  <div class="ai-card__header">
    <i class="fa-solid fa-brain me-2" aria-hidden="true"></i>
    AI Assistance
  </div>
  <div class="ai-card__body">
    <!-- Card content -->
  </div>
  <div class="ai-card__footer">
    <button class="ai-btn ai-btn--sm ai-btn--accent">Apply</button>
  </div>
</div>

<!-- Compact Card (no header/footer) -->
<div class="ai-card">
  <div class="ai-card__body">
    <div class="d-flex justify-content-between">
      <span>Email Priority</span>
      <span class="ai-badge ai-badge--high">High</span>
    </div>
  </div>
</div>
```

---

## 4. AI List Item Component

### Design System Reference
- **Source:** `component-library.html - Section: #lists`
- **Foundation:** `design-system-overview.html - Section: #colors, #spacing`

### Component Specification

#### Base Class: `.ai-list-item`
```css
.ai-list-item {
  display: flex;
  align-items: flex-start;
  gap: var(--ai-space-3);               /* 12px */
  padding: var(--ai-space-3);           /* 12px */
  border-bottom: 1px solid var(--ai-border-light);
  transition: var(--ai-transition-normal);
  cursor: pointer;
}

.ai-list-item:hover {
  background: var(--ai-bg-secondary);   /* #F7F8FA */
}

.ai-list-item:focus {
  outline: 2px solid var(--ai-accent);
  outline-offset: -2px;
}
```

#### Priority Indicator:
```css
.ai-list-item__priority {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: var(--ai-space-2);        /* 8px */
}

.ai-list-item__priority--critical { background: var(--ai-critical); }
.ai-list-item__priority--high     { background: var(--ai-high); }
.ai-list-item__priority--medium   { background: var(--ai-medium); }
.ai-list-item__priority--low      { background: var(--ai-low); }
```

#### Content Container:
```css
.ai-list-item__content {
  flex: 1;
  min-width: 0; /* Allows text truncation */
}
```

#### HTML Examples:
```html
<!-- Conversation List Item -->
<div class="ai-list-item" role="button" tabindex="0" 
     aria-label="Conversation with Mark Smith, Critical priority">
  <div class="ai-list-item__priority ai-list-item__priority--critical"
       aria-label="Critical priority"></div>
  <div class="ai-list-item__content">
    <div class="d-flex justify-content-between align-items-start">
      <h6 class="mb-1">Mark Smith</h6>
      <span class="ai-badge ai-badge--critical">Critical</span>
    </div>
    <p class="mb-0 text-muted">Emergency consultation needed</p>
    <small class="text-muted">89% confidence</small>
  </div>
</div>

<!-- Triage List Item -->
<div class="ai-list-item">
  <div class="ai-list-item__priority ai-list-item__priority--high"></div>
  <div class="ai-list-item__content">
    <div class="d-flex justify-content-between">
      <span>Patient appointment request</span>
      <span class="ai-badge ai-badge--high">High</span>
    </div>
  </div>
</div>
```

---

## 5. AI Progress Indicator Component

### Design System Reference
- **Source:** `component-library.html - Section: #progress`
- **Foundation:** `design-system-overview.html - Section: #colors`

### Component Specification

#### Base Class: `.ai-progress`
```css
.ai-progress {
  width: 100%;
  height: 4px;
  background: var(--ai-bg-tertiary);    /* #E2E8F0 */
  border-radius: 2px;
  overflow: hidden;
  margin: var(--ai-space-2) 0;          /* 8px 0 */
}

.ai-progress__bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}
```

#### Variants:
```css
.ai-progress__bar--success { background: var(--ai-low); }    /* #198754 */
.ai-progress__bar--warning { background: var(--ai-high); }   /* #E2B93B */
.ai-progress__bar--danger  { background: var(--ai-critical); } /* #DC3545 */
.ai-progress__bar--primary { background: var(--ai-primary); } /* #2D3748 */
```

#### HTML Examples:
```html
<!-- Confidence Level Indicator -->
<div class="d-flex justify-content-between mb-1">
  <span style="font-size: var(--ai-font-sm);">High Confidence</span>
  <span style="font-size: var(--ai-font-sm);">94%</span>
</div>
<div class="ai-progress">
  <div class="ai-progress__bar ai-progress__bar--success" 
       style="width: 94%"
       role="progressbar" 
       aria-valuenow="94" 
       aria-valuemin="0" 
       aria-valuemax="100"></div>
</div>

<!-- Processing Progress -->
<div class="ai-progress">
  <div class="ai-progress__bar ai-progress__bar--primary" 
       style="width: 60%"></div>
</div>
```

---

## 6. AI Alert Component

### Design System Reference
- **Source:** `component-library.html - Section: #alerts`
- **Foundation:** `design-system-overview.html - Section: #colors`

### Component Specification

#### Base Class: `.ai-alert`
```css
.ai-alert {
  padding: var(--ai-space-3) var(--ai-space-4); /* 12px 16px */
  border-radius: 6px;
  border: 1px solid;
  margin: var(--ai-space-3) 0;                  /* 12px 0 */
}
```

#### Variants:
```css
.ai-alert--info {
  background: var(--ai-medium-bg);      /* rgba(13, 110, 253, 0.1) */
  border-color: var(--ai-medium-border); /* rgba(13, 110, 253, 0.2) */
  color: var(--ai-medium);              /* #0D6EFD */
}

.ai-alert--warning {
  background: var(--ai-high-bg);
  border-color: var(--ai-high-border);
  color: var(--ai-high);
}

.ai-alert--danger {
  background: var(--ai-critical-bg);
  border-color: var(--ai-critical-border);
  color: var(--ai-critical);
}

.ai-alert--success {
  background: var(--ai-low-bg);
  border-color: var(--ai-low-border);
  color: var(--ai-low);
}
```

#### HTML Examples:
```html
<!-- Success Alert -->
<div class="ai-alert ai-alert--success" role="alert">
  <i class="fa-regular fa-circle-check me-2" aria-hidden="true"></i>
  <strong>AI Analysis Complete</strong> - Message categorized with 94% confidence.
</div>

<!-- Warning Alert -->
<div class="ai-alert ai-alert--warning" role="alert">
  <i class="fa-solid fa-triangle-exclamation me-2" aria-hidden="true"></i>
  <strong>Low Confidence</strong> - Manual review recommended.
</div>

<!-- Processing Alert -->
<div class="ai-alert ai-alert--info" role="status" aria-live="polite">
  <div class="d-flex align-items-center gap-2">
    <div class="spinner-border spinner-border-sm" aria-hidden="true"></div>
    <span>AI processing in progress...</span>
  </div>
</div>
```

---

## 7. Icon System

### Design System Reference
- **Source:** `design-system-overview.html - Section: #icons`
- **Library:** Font Awesome 6.5.1

### Icon Mapping:

| Feature | Icon Class | Usage |
|---------|-----------|--------|
| AI Intelligence | `fa-solid fa-brain` | AI branding, analysis |
| AI Robot | `fa-solid fa-robot` | AI status, automation |
| Insights | `fa-regular fa-lightbulb` | Suggestions, tips |
| Accuracy | `fa-solid fa-bullseye` | Confidence scores |
| Critical Alert | `fa-solid fa-triangle-exclamation` | Critical priority |
| High Priority | `fa-solid fa-fire` | High priority |
| Medium Priority | `fa-regular fa-lightbulb` | Medium priority |
| Low Priority | `fa-regular fa-circle-check` | Low/complete |
| Apply/Magic | `fa-solid fa-wand-magic-sparkles` | Apply action |
| Refresh | `fa-solid fa-rotate` | Refresh/reload |
| Flag | `fa-solid fa-flag` | Flag/mark |
| Analytics | `fa-regular fa-chart-bar` | Triage/analyze |
| Escalate | `fa-solid fa-arrow-up-right` | Escalate priority |

### Implementation:
```html
<!-- Icon with proper accessibility -->
<i class="fa-solid fa-brain" aria-hidden="true"></i>
<span class="visually-hidden">AI Intelligence</span>

<!-- Icon in button -->
<button aria-label="Analyze with AI">
  <i class="fa-solid fa-brain me-2" aria-hidden="true"></i>
  Analyze
</button>
```

---

## Design Token Reference

### Color Tokens:
```css
/* Primary Colors */
--ai-primary: #2D3748;
--ai-accent: #00D3C7;

/* Priority Colors */
--ai-critical: #DC3545;
--ai-high: #E2B93B;
--ai-medium: #0D6EFD;
--ai-low: #198754;

/* Background Colors */
--ai-bg-primary: #FFFFFF;
--ai-bg-secondary: #F7F8FA;

/* Border Colors */
--ai-border-light: #E2E8F0;
--ai-border-medium: #CBD5E0;
```

### Spacing Tokens:
```css
--ai-space-1: 4px;
--ai-space-2: 8px;
--ai-space-3: 12px;
--ai-space-4: 16px;
--ai-space-6: 24px;
```

### Typography Tokens:
```css
--ai-font-xs: 10px;
--ai-font-sm: 12px;
--ai-font-base: 14px;
--ai-font-lg: 16px;
```

---

## Responsive Specifications

### Breakpoints:
```css
/* Mobile */
@media (max-width: 575px) {
  .ai-btn { min-height: 44px; }
  .ai-badge { font-size: 9px; }
}

/* Tablet */
@media (min-width: 576px) and (max-width: 768px) {
  .ai-btn { flex: 1 1 auto; }
}

/* Desktop */
@media (min-width: 769px) {
  .ai-btn { min-height: 36px; }
}
```

---

## Component Usage Matrix

| Component | Messages Page | Email Page | Calendar | Dashboard |
|-----------|--------------|------------|----------|-----------|
| AI Badge | ✅ Used | ✅ | ✅ | ✅ |
| AI Button | ✅ Used | ✅ | ✅ | ✅ |
| AI Card | ✅ Used | ✅ | - | ✅ |
| AI List Item | ✅ Used | ✅ | - | - |
| AI Progress | ✅ Used | ✅ | ✅ | ✅ |
| AI Alert | ✅ Used | ✅ | ✅ | ✅ |

---

## Implementation Checklist

### For Each Component:
- [ ] Uses design system CSS classes
- [ ] No inline styles
- [ ] Proper ARIA labels
- [ ] Keyboard accessible
- [ ] Touch-friendly (44px minimum)
- [ ] Color contrast verified
- [ ] Responsive behavior tested
- [ ] Screen reader tested
- [ ] Icon library used (no inline SVG)
- [ ] Design tokens applied
