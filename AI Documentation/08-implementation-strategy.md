# AI Feature Replacement - Implementation Strategy

## Executive Summary

This document provides a comprehensive strategy for replacing current AI features on the /messages page with new design system-compliant components. The implementation maintains all core messaging functionality while achieving 100% design system compliance and WCAG 2.1 AA accessibility.

---

## 1. Current State Audit

### Existing AI Features Inventory

#### 1.1 Filter Pills (Left Sidebar)
**Current Implementation:**
- Location: Lines 77-160 in `messages.tsx`
- Classes: Custom inline styles + `.figma-*-badge` classes
- Icons: Inline SVG (hard-coded)
- State Management: `activeFilter` useState hook
- Issues:
  - ❌ No filter counts displayed
  - ❌ Inline styles (not maintainable)
  - ❌ Custom `.figma-*` classes (not design system)
  - ❌ Poor accessibility (missing aria-pressed)

**Code Location:**
```tsx
// Lines 77-160
<div className="px-3 pb-2">
  <button onClick={() => setActiveFilter('critical')}>
    <span className="figma-critical-badge">
      <svg>...</svg>
      Critical
    </span>
  </button>
</div>
```

#### 1.2 AI Assistance Toolbar
**Current Implementation:**
- Location: Lines 411-478 in `messages.tsx`
- Buttons: Refresh, Apply, Flag, Analyze, Triage, Escalate
- Icons: Tabler icons (ti ti-*)
- Issues:
  - ❌ Gradient backgrounds (non-design-system colors)
  - ❌ Inconsistent button styling
  - ❌ No visual hierarchy (all equal weight)
  - ❌ Poor loading feedback

**Code Location:**
```tsx
// Lines 411-478
<div className="border-bottom p-3">
  <button data-ai-action="apply" 
          style={{background: 'linear-gradient(...)'}}> // ❌ Custom gradient
    Apply
  </button>
</div>
```

#### 1.3 Priority Badges (Conversation List)
**Current Implementation:**
- Location: Lines 195-350 (multiple instances)
- Classes: `.figma-critical-badge`, `.figma-high-badge`, `.figma-low-badge`
- Icons: Inline SVG
- Issues:
  - ❌ 4 different implementations (inconsistent)
  - ❌ Inline SVG (not icon library)
  - ❌ No standardization

**Code Location:**
```tsx
// Line 196
<span className="figma-critical-badge">
  <svg width="11" height="9">...</svg> // ❌ Inline SVG
  Critical
</span>
```

#### 1.4 Loading Indicator
**Current Implementation:**
- Location: Lines 478-483
- Class: `.ai-loading`
- Issues:
  - ❌ Generic message ("Analyzing conversation…")
  - ❌ No contextual feedback
  - ❌ Hidden by default (d-none)

**Code Location:**
```tsx
// Line 478
<div className="ai-loading d-none">
  <span className="spinner-border spinner-border-sm"/>
  <small>Analyzing conversation…</small> // ❌ Generic message
</div>
```

### Data Dependencies

**State Management:**
```tsx
const [activeFilter, setActiveFilter] = useState<string>('all');
const [selectedUser, setSelectedUser] = useState<string>('mark-smith');
```

**Event Handlers:**
```tsx
useEffect(() => {
  const buttons = document.querySelectorAll("[data-ai-action]");
  const onClick = (e: Event) => {
    // Shows loading for 1.2 seconds
  };
}, []);
```

**No external data dependencies** - All AI features are UI-only (no API calls currently)

---

## 2. Component Replacement Mapping

### 2.1 Filter Pills Replacement

| Current | New | Priority |
|---------|-----|----------|
| Custom inline styles | `.ai-btn` classes | Critical |
| `.figma-*-badge` | `.ai-badge` system | Critical |
| Inline SVG icons | Font Awesome icons | Critical |
| No filter counts | Badge count display | High |
| Basic `activeFilter` state | Enhanced state with counts | Medium |

**Implementation:**
```tsx
// OLD (Remove):
<button style={{background: activeFilter === 'all' ? '#2D3748' : 'transparent'}}>
  <span className="figma-critical-badge">
    <svg>...</svg>
    Critical
  </span>
</button>

// NEW (Replace with):
<button 
  className={`ai-btn ai-btn--sm ${activeFilter === 'critical' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
  onClick={() => setActiveFilter('critical')}
  aria-pressed={activeFilter === 'critical'}
  aria-label="Show critical priority messages (1)"
>
  <i className="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
  Critical
  <span className="ai-badge ai-badge--sm ai-badge--critical ms-2">1</span>
</button>
```

### 2.2 AI Assistance Toolbar Replacement

| Current | New | Priority |
|---------|-----|----------|
| Gradient background (Apply) | `.ai-btn--accent` | Critical |
| Custom border colors | Design system variants | Critical |
| No button hierarchy | Clear primary/secondary | Critical |
| Basic loading (1.2s timeout) | Contextual states | High |
| No error handling | Error/success alerts | High |

**Implementation:**
```tsx
// OLD (Remove):
<button 
  style={{
    background: 'linear-gradient(113deg, #0D6EFD 0%, #4A5568 100%)',
    color: '#fff'
  }}
  data-ai-action="apply"
>
  <i className="ti ti-send"/>
  Apply
</button>

// NEW (Replace with):
<button
  className="ai-btn ai-btn--sm ai-btn--accent"
  onClick={() => handleAiAction('Apply')}
  disabled={aiProcessing}
  aria-label="Apply AI suggestion"
>
  <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
  Apply
</button>
```

### 2.3 Priority Badges Replacement

| Current | New | Priority |
|---------|-----|----------|
| `.figma-critical-badge` | `.ai-badge--critical` | Critical |
| Inline SVG (5 instances) | Font Awesome icons | Critical |
| Inconsistent spacing | Design tokens | Medium |

**Implementation:**
```tsx
// OLD (Remove):
<span className="figma-critical-badge">
  <svg width="11" height="9">...</svg>
  Critical
</span>

// NEW (Replace with):
<span className="ai-badge ai-badge--critical">
  <i className="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
  Critical
</span>
```

### 2.4 Loading States Replacement

| Current | New | Priority |
|---------|-----|----------|
| `.ai-loading` with timeout | Proper state management | Critical |
| Generic message | Contextual feedback | High |
| No progress indicator | Action-specific messages | Medium |

**Implementation:**
```tsx
// OLD (Remove):
<div className="ai-loading d-none">
  <span className="spinner-border"/>
  <small>Analyzing conversation…</small>
</div>

// NEW (Replace with):
{aiProcessing && (
  <div className="ai-alert ai-alert--info mt-3" role="status" aria-live="polite">
    <div className="d-flex align-items-center gap-2">
      <div className="spinner-border spinner-border-sm" aria-hidden="true"></div>
      <span>AI {aiAction} in progress...</span>
    </div>
  </div>
)}
```

---

## 3. Step-by-Step Implementation Plan

### Phase 1: Foundation Setup (Week 1, Day 1-2)

#### Step 1.1: Create Backup
```bash
# Backup current implementation
cp src/feature-module/components/pages/clinic-modules/messages/messages.tsx \
   src/feature-module/components/pages/clinic-modules/messages/messages.backup.tsx
```

#### Step 1.2: Add State Management
```tsx
// Add new state variables (after line 6)
const [aiProcessing, setAiProcessing] = useState(false);
const [aiAction, setAiAction] = useState<string>('');
const [filterCounts] = useState({
  all: 8,
  critical: 1,
  high: 3,
  medium: 2,
  low: 3
});
```

#### Step 1.3: Create AI Action Handler
```tsx
// Replace useEffect (lines 9-18) with:
const handleAiAction = (action: string) => {
  setAiAction(action);
  setAiProcessing(true);
  
  // Announce to screen readers
  announceToScreenReader(`${action} in progress`);
  
  // Simulate AI processing
  setTimeout(() => {
    setAiProcessing(false);
    setAiAction('');
    announceToScreenReader(`${action} completed successfully`);
  }, 1500);
};

const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'visually-hidden';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
};
```

### Phase 2: Filter Pills Replacement (Week 1, Day 3)

#### Step 2.1: Replace "All" Filter
```tsx
// Replace lines 86-98 with:
<button
  type="button"
  className={`ai-btn ai-btn--sm ${activeFilter === 'all' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
  onClick={() => setActiveFilter('all')}
  aria-label={`Show all messages (${filterCounts.all})`}
  aria-pressed={activeFilter === 'all'}
>
  All
  <span className="ai-badge ai-badge--sm ai-badge--low ms-2">{filterCounts.all}</span>
</button>
```

#### Step 2.2: Replace "Critical" Filter
```tsx
// Replace lines 100-112 with:
<button
  type="button"
  className={`ai-btn ai-btn--sm ${activeFilter === 'critical' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
  onClick={() => setActiveFilter('critical')}
  aria-label={`Show critical priority messages (${filterCounts.critical})`}
  aria-pressed={activeFilter === 'critical'}
>
  <i className="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
  Critical
  <span className="ai-badge ai-badge--sm ai-badge--critical ms-2">{filterCounts.critical}</span>
</button>
```

#### Step 2.3: Replace "High" Filter
```tsx
// Replace lines 114-127 with:
<button
  type="button"
  className={`ai-btn ai-btn--sm ${activeFilter === 'high' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
  onClick={() => setActiveFilter('high')}
  aria-label={`Show high priority messages (${filterCounts.high})`}
  aria-pressed={activeFilter === 'high'}
>
  <i className="fa-solid fa-fire me-1" aria-hidden="true"></i>
  High
  <span className="ai-badge ai-badge--sm ai-badge--high ms-2">{filterCounts.high}</span>
</button>
```

#### Step 2.4: Replace "Medium" Filter
```tsx
// Replace lines 129-149 with:
<button
  type="button"
  className={`ai-btn ai-btn--sm ${activeFilter === 'medium' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
  onClick={() => setActiveFilter('medium')}
  aria-label={`Show medium priority messages (${filterCounts.medium})`}
  aria-pressed={activeFilter === 'medium'}
>
  <i className="fa-regular fa-lightbulb me-1" aria-hidden="true"></i>
  Medium
  <span className="ai-badge ai-badge--sm ai-badge--medium ms-2">{filterCounts.medium}</span>
</button>
```

#### Step 2.5: Replace "Low" Filter
```tsx
// Replace lines 151-160 with:
<button
  type="button"
  className={`ai-btn ai-btn--sm ${activeFilter === 'low' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
  onClick={() => setActiveFilter('low')}
  aria-label={`Show low priority messages (${filterCounts.low})`}
  aria-pressed={activeFilter === 'low'}
>
  <i className="fa-regular fa-circle-check me-1" aria-hidden="true"></i>
  Low
  <span className="ai-badge ai-badge--sm ai-badge--low ms-2">{filterCounts.low}</span>
</button>
```

### Phase 3: Priority Badges Replacement (Week 1, Day 4)

#### Step 3.1: Replace Critical Badge (5 instances)
```tsx
// Find and replace ALL instances of:
<span className="figma-critical-badge">
  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
    <path d="..." fill="#DC3545"/>
  </svg>
  Critical
</span>

// Replace with:
<span className="ai-badge ai-badge--critical">
  <i className="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
  Critical
</span>
```

**Locations to update:**
- Line 196 (Mark Smith conversation)
- Line 100 (Filter pill - already updated in Phase 2)

#### Step 3.2: Replace High Badge (3 instances)
```tsx
// Find and replace ALL instances at lines: 234, 272
<span className="figma-high-badge">
  <svg>...</svg>
  High
</span>

// Replace with:
<span className="ai-badge ai-badge--high">
  <i className="fa-solid fa-fire me-1" aria-hidden="true"></i>
  High
</span>
```

#### Step 3.3: Replace Low Badge (2 instances)
```tsx
// Find and replace ALL instances at lines: 310, 349
<span className="figma-low-badge">
  <svg>...</svg>
  Low
</span>

// Replace with:
<span className="ai-badge ai-badge--low">
  <i className="fa-regular fa-circle-check me-1" aria-hidden="true"></i>
  Low
</span>
```

### Phase 4: AI Assistance Toolbar Replacement (Week 1, Day 5)

#### Step 4.1: Update Toolbar Header
```tsx
// Replace lines 413-420 with:
<div className="d-flex align-items-center justify-content-between mb-3">
  <div className="d-flex align-items-center gap-2">
    <i className="fa-solid fa-brain" style={{color: 'var(--ai-accent)'}} aria-hidden="true"></i>
    <h6 className="mb-0 fw-semibold" style={{fontSize: 'var(--ai-font-lg)'}}>
      AI Assistance
    </h6>
  </div>
  {/* Primary actions moved here */}
</div>
```

#### Step 4.2: Replace Primary Actions
```tsx
// Replace lines 421-448 with:
<div className="d-flex align-items-center gap-2">
  <button
    className="ai-btn ai-btn--sm ai-btn--accent"
    onClick={() => handleAiAction('Apply')}
    disabled={aiProcessing}
    aria-label="Apply AI suggestion"
  >
    <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
    Apply
  </button>
  <button
    className="ai-btn ai-btn--sm ai-btn--secondary"
    onClick={() => handleAiAction('Refresh')}
    disabled={aiProcessing}
    aria-label="Refresh AI suggestions"
  >
    <i className="fa-solid fa-rotate me-2" aria-hidden="true"></i>
    Refresh
  </button>
</div>
```

#### Step 4.3: Replace Secondary Actions
```tsx
// Replace lines 450-476 with:
<div className="d-flex align-items-center gap-2 flex-wrap">
  <button
    className="ai-btn ai-btn--sm ai-btn--secondary"
    onClick={() => handleAiAction('Analyze')}
    disabled={aiProcessing}
    aria-label="Analyze message with AI"
  >
    <i className="fa-solid fa-brain me-2" aria-hidden="true"></i>
    Analyze
  </button>
  <button
    className="ai-btn ai-btn--sm ai-btn--secondary"
    onClick={() => handleAiAction('Triage')}
    disabled={aiProcessing}
    aria-label="Auto-categorize message"
  >
    <i className="fa-regular fa-chart-bar me-2" aria-hidden="true"></i>
    Triage
  </button>
  <button
    className="ai-btn ai-btn--sm ai-btn--secondary"
    onClick={() => handleAiAction('Escalate')}
    disabled={aiProcessing}
    aria-label="Escalate message priority"
  >
    <i className="fa-solid fa-arrow-up-right me-2" aria-hidden="true"></i>
    Escalate
  </button>
  <button
    className="ai-btn ai-btn--sm ai-btn--secondary"
    onClick={() => handleAiAction('Flag')}
    disabled={aiProcessing}
    aria-label="Flag message for review"
  >
    <i className="fa-solid fa-flag me-2" aria-hidden="true"></i>
    Flag
  </button>
</div>
```

#### Step 4.4: Replace Loading State
```tsx
// Replace lines 478-483 with:
{aiProcessing && (
  <div className="ai-alert ai-alert--info mt-3" role="status" aria-live="polite" aria-busy="true">
    <div className="d-flex align-items-center gap-2">
      <div className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></div>
      <span>AI {aiAction} in progress...</span>
    </div>
  </div>
)}
```

### Phase 5: Testing & Validation (Week 2, Day 1-2)

#### Step 5.1: Visual Regression Testing
```bash
# Take screenshots before/after
npm run test:visual
```

#### Step 5.2: Accessibility Testing
```bash
# Run axe-core automated tests
npm run test:a11y
```

#### Step 5.3: Manual Testing Checklist
- [ ] All filter pills clickable
- [ ] Filter counts display correctly
- [ ] AI buttons have proper states (hover, active, disabled)
- [ ] Loading indicator shows for each action
- [ ] Screen reader announcements work
- [ ] Keyboard navigation functions
- [ ] Mobile responsive (< 576px)
- [ ] Tablet responsive (576px - 991px)
- [ ] Desktop display (> 992px)

---

## 4. Data Migration & Compatibility

### 4.1 State Migration

**No database changes required** - All changes are UI-only

**State structure remains compatible:**
```tsx
// Existing state (keep)
const [activeFilter, setActiveFilter] = useState<string>('all');
const [selectedUser, setSelectedUser] = useState<string>('mark-smith');

// New state (add)
const [aiProcessing, setAiProcessing] = useState(false);
const [aiAction, setAiAction] = useState<string>('');
const [filterCounts] = useState({...});
```

### 4.2 Event Handler Migration

**Before:**
```tsx
useEffect(() => {
  const buttons = document.querySelectorAll("[data-ai-action]");
  buttons.forEach(b => b.addEventListener("click", onClick));
  return () => buttons.forEach(b => b.removeEventListener("click", onClick));
}, []);
```

**After:**
```tsx
const handleAiAction = (action: string) => {
  setAiAction(action);
  setAiProcessing(true);
  // ... processing logic
};

// Direct onClick handlers in JSX
<button onClick={() => handleAiAction('Apply')}>Apply</button>
```

### 4.3 Backward Compatibility

**CSS Classes:**
- Old: `.figma-*-badge` → New: `.ai-badge--*`
- Old: Inline styles → New: Design system classes
- Migration path: Both classes can coexist during transition

**Icons:**
- Old: Inline SVG → New: Font Awesome
- Migration: Update all at once (atomic change)

---

## 5. Testing Checklist

### 5.1 Functional Testing

#### Filter Pills:
- [ ] All filter clicks filter conversations correctly
- [ ] Active state displays properly (primary button style)
- [ ] Filter counts are accurate
- [ ] Icons display correctly (Font Awesome)
- [ ] aria-pressed updates on click

#### AI Assistance Toolbar:
- [ ] Apply button triggers action
- [ ] Refresh button triggers action
- [ ] Analyze, Triage, Escalate, Flag all work
- [ ] Buttons disable during processing
- [ ] Loading indicator shows with correct message
- [ ] Actions complete successfully

#### Priority Badges:
- [ ] All priority badges display correctly
- [ ] Icons match design system
- [ ] Colors match specification
- [ ] Badges visible in conversation list

### 5.2 Accessibility Testing

#### Keyboard Navigation:
- [ ] Tab through all filters (logical order)
- [ ] Tab through all AI buttons (logical order)
- [ ] Enter/Space activate buttons
- [ ] Focus indicators visible (2px outline)
- [ ] No keyboard traps

#### Screen Reader:
- [ ] Filter labels announced correctly
- [ ] Button purposes clear
- [ ] Loading states announced (aria-live)
- [ ] Priority badges announced
- [ ] No redundant announcements

#### Color Contrast:
- [ ] All text meets 4.5:1 ratio
- [ ] Badge colors verified (WebAIM tool)
- [ ] Button states have sufficient contrast
- [ ] Focus indicators visible

### 5.3 Responsive Testing

#### Mobile (< 576px):
- [ ] Filter pills scroll horizontally
- [ ] Touch targets minimum 44x44px
- [ ] AI toolbar stacks vertically
- [ ] Text readable at mobile size
- [ ] No horizontal scroll

#### Tablet (576px - 991px):
- [ ] Filter pills wrap to 2 rows
- [ ] AI toolbar buttons wrap appropriately
- [ ] Layout remains functional
- [ ] Touch targets adequate

#### Desktop (> 992px):
- [ ] All features display inline
- [ ] Hover states work
- [ ] Proper spacing maintained
- [ ] Visual hierarchy clear

### 5.4 Performance Testing

- [ ] Page load time < 3 seconds
- [ ] No layout shift (CLS < 0.1)
- [ ] Smooth animations (60fps)
- [ ] No memory leaks
- [ ] React DevTools profiling clean

---

## 6. Rollback Plan

### 6.1 Quick Rollback (< 5 minutes)

**If critical issues arise:**

```bash
# Restore backup
cp src/feature-module/components/pages/clinic-modules/messages/messages.backup.tsx \
   src/feature-module/components/pages/clinic-modules/messages/messages.tsx

# Restart dev server
npm run dev
```

### 6.2 Partial Rollback

**Roll back specific features:**

#### Rollback Filter Pills Only:
```tsx
// Restore lines 77-160 from backup
// Keep other changes
```

#### Rollback AI Toolbar Only:
```tsx
// Restore lines 411-478 from backup
// Keep other changes
```

### 6.3 Git Rollback

**Using version control:**

```bash
# Create safety branch before starting
git checkout -b ai-redesign-implementation

# If issues arise, revert
git checkout main
git branch -D ai-redesign-implementation
```

### 6.4 Rollback Triggers

**Initiate rollback if:**
- [ ] Critical functionality broken (messaging doesn't work)
- [ ] Accessibility regression (WCAG failures)
- [ ] Performance degradation (> 5s load time)
- [ ] Visual breaking changes on production
- [ ] Data loss or corruption
- [ ] User-reported critical bugs (> 10 reports/hour)

---

## 7. Code Snippets for Key Replacements

### 7.1 Complete Filter Pills Implementation

```tsx
{/* AI Filter Pills - Design System Compliant */}
<div className="px-3 pb-2">
  <div 
    className="d-flex align-items-center gap-2 flex-wrap mb-3" 
    role="toolbar" 
    aria-label="Message priority filters"
  >
    {/* All Filter */}
    <button
      type="button"
      className={`ai-btn ai-btn--sm ${activeFilter === 'all' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
      onClick={() => setActiveFilter('all')}
      aria-label={`Show all messages (${filterCounts.all})`}
      aria-pressed={activeFilter === 'all'}
    >
      All
      <span className="ai-badge ai-badge--sm ai-badge--low ms-2">{filterCounts.all}</span>
    </button>

    {/* Critical Filter */}
    <button
      type="button"
      className={`ai-btn ai-btn--sm ${activeFilter === 'critical' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
      onClick={() => setActiveFilter('critical')}
      aria-label={`Show critical priority messages (${filterCounts.critical})`}
      aria-pressed={activeFilter === 'critical'}
    >
      <i className="fa-solid fa-triangle-exclamation me-1" aria-hidden="true"></i>
      Critical
      <span className="ai-badge ai-badge--sm ai-badge--critical ms-2">{filterCounts.critical}</span>
    </button>

    {/* High Filter */}
    <button
      type="button"
      className={`ai-btn ai-btn--sm ${activeFilter === 'high' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
      onClick={() => setActiveFilter('high')}
      aria-label={`Show high priority messages (${filterCounts.high})`}
      aria-pressed={activeFilter === 'high'}
    >
      <i className="fa-solid fa-fire me-1" aria-hidden="true"></i>
      High
      <span className="ai-badge ai-badge--sm ai-badge--high ms-2">{filterCounts.high}</span>
    </button>

    {/* Medium Filter */}
    <button
      type="button"
      className={`ai-btn ai-btn--sm ${activeFilter === 'medium' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
      onClick={() => setActiveFilter('medium')}
      aria-label={`Show medium priority messages (${filterCounts.medium})`}
      aria-pressed={activeFilter === 'medium'}
    >
      <i className="fa-regular fa-lightbulb me-1" aria-hidden="true"></i>
      Medium
      <span className="ai-badge ai-badge--sm ai-badge--medium ms-2">{filterCounts.medium}</span>
    </button>

    {/* Low Filter */}
    <button
      type="button"
      className={`ai-btn ai-btn--sm ${activeFilter === 'low' ? 'ai-btn--primary' : 'ai-btn--secondary'}`}
      onClick={() => setActiveFilter('low')}
      aria-label={`Show low priority messages (${filterCounts.low})`}
      aria-pressed={activeFilter === 'low'}
    >
      <i className="fa-regular fa-circle-check me-1" aria-hidden="true"></i>
      Low
      <span className="ai-badge ai-badge--sm ai-badge--low ms-2">{filterCounts.low}</span>
    </button>
  </div>
</div>
```

### 7.2 Complete AI Assistance Toolbar Implementation

```tsx
{/* AI Assistance Section - Design System Compliant */}
<div className="ai-card__header">
  <div className="d-flex align-items-center justify-content-between mb-3">
    <div className="d-flex align-items-center gap-2">
      <i className="fa-solid fa-brain" style={{color: 'var(--ai-accent)'}} aria-hidden="true"></i>
      <h6 className="mb-0 fw-semibold" style={{fontSize: 'var(--ai-font-lg)'}}>
        AI Assistance
      </h6>
    </div>
    
    {/* Primary Actions */}
    <div className="d-flex align-items-center gap-2">
      <button
        className="ai-btn ai-btn--sm ai-btn--accent"
        onClick={() => handleAiAction('Apply')}
        disabled={aiProcessing}
        aria-label="Apply AI suggestion"
      >
        <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
        Apply
      </button>
      <button
        className="ai-btn ai-btn--sm ai-btn--secondary"
        onClick={() => handleAiAction('Refresh')}
        disabled={aiProcessing}
        aria-label="Refresh AI suggestions"
      >
        <i className="fa-solid fa-rotate me-2" aria-hidden="true"></i>
        Refresh
      </button>
    </div>
  </div>

  {/* Secondary Actions */}
  <div className="d-flex align-items-center gap-2 flex-wrap">
    <button
      className="ai-btn ai-btn--sm ai-btn--secondary"
      onClick={() => handleAiAction('Analyze')}
      disabled={aiProcessing}
      aria-label="Analyze message with AI"
    >
      <i className="fa-solid fa-brain me-2" aria-hidden="true"></i>
      Analyze
    </button>
    <button
      className="ai-btn ai-btn--sm ai-btn--secondary"
      onClick={() => handleAiAction('Triage')}
      disabled={aiProcessing}
      aria-label="Auto-categorize message"
    >
      <i className="fa-regular fa-chart-bar me-2" aria-hidden="true"></i>
      Triage
    </button>
    <button
      className="ai-btn ai-btn--sm ai-btn--secondary"
      onClick={() => handleAiAction('Escalate')}
      disabled={aiProcessing}
      aria-label="Escalate message priority"
    >
      <i className="fa-solid fa-arrow-up-right me-2" aria-hidden="true"></i>
      Escalate
    </button>
    <button
      className="ai-btn ai-btn--sm ai-btn--secondary"
      onClick={() => handleAiAction('Flag')}
      disabled={aiProcessing}
      aria-label="Flag message for review"
    >
      <i className="fa-solid fa-flag me-2" aria-hidden="true"></i>
      Flag
    </button>
  </div>

  {/* AI Processing State */}
  {aiProcessing && (
    <div 
      className="ai-alert ai-alert--info mt-3" 
      role="status" 
      aria-live="polite" 
      aria-busy="true"
    >
      <div className="d-flex align-items-center gap-2">
        <div className="spinner-border spinner-border-sm text-primary" 
             role="status" 
             aria-hidden="true"></div>
        <span>AI {aiAction} in progress...</span>
      </div>
    </div>
  )}
</div>
```

### 7.3 Priority Badge Replacement (Reusable)

```tsx
{/* Reusable Priority Badge Component */}
const PriorityBadge = ({ priority }: { priority: 'critical' | 'high' | 'medium' | 'low' }) => {
  const config = {
    critical: { 
      icon: 'fa-solid fa-triangle-exclamation', 
      label: 'Critical' 
    },
    high: { 
      icon: 'fa-solid fa-fire', 
      label: 'High' 
    },
    medium: { 
      icon: 'fa-regular fa-lightbulb', 
      label: 'Medium' 
    },
    low: { 
      icon: 'fa-regular fa-circle-check', 
      label: 'Low' 
    }
  };

  const { icon, label } = config[priority];

  return (
    <span className={`ai-badge ai-badge--${priority}`}>
      <i className={`${icon} me-1`} aria-hidden="true"></i>
      {label}
    </span>
  );
};

// Usage in conversation list:
<PriorityBadge priority="critical" />
```

---

## 8. Risk Assessment & Mitigation

### 8.1 High Risk Areas

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Breaking existing functionality | Medium | High | Comprehensive testing + backup |
| Accessibility regression | Low | High | Automated a11y tests + manual review |
| Visual inconsistency | Low | Medium | Design system compliance checks |
| Performance degradation | Low | Medium | Performance profiling before/after |
| User confusion | Medium | Low | Gradual rollout + user training |

### 8.2 Mitigation Strategies

**1. Comprehensive Testing:**
- Unit tests for all components
- Integration tests for user flows
- E2E tests for critical paths
- Visual regression tests

**2. Phased Rollout:**
- Phase 1: Internal team (Day 1-2)
- Phase 2: Beta users (Day 3-4)
- Phase 3: All users (Day 5+)

**3. Monitoring:**
- Error tracking (Sentry)
- User analytics (behavior changes)
- Performance metrics (Core Web Vitals)
- Accessibility audits (weekly)

**4. Rollback Readiness:**
- Backup files maintained
- Git branches for easy revert
- Quick rollback procedures documented
- Team trained on rollback process

---

## 9. Success Metrics

### 9.1 Technical Metrics

**Design System Compliance:**
- ✅ 100% CSS custom properties usage
- ✅ 0 inline styles
- ✅ 0 `.figma-*` classes
- ✅ 100% Font Awesome icons

**Accessibility:**
- ✅ 100% WCAG 2.1 AA compliance
- ✅ All interactive elements keyboard accessible
- ✅ All dynamic content announced

**Performance:**
- ✅ Page load < 3 seconds
- ✅ CLS < 0.1
- ✅ FID < 100ms
- ✅ LCP < 2.5s

### 9.2 User Experience Metrics

- Filter usage increase (baseline vs. post-launch)
- AI action usage (which actions used most)
- Task completion time (compare before/after)
- User satisfaction (survey/feedback)
- Error rate reduction

---

## 10. Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **Backup & Setup** | 4 hours | Backup files, new state management |
| **Filter Pills** | 8 hours | All filters replaced with design system |
| **Priority Badges** | 4 hours | All badges replaced across page |
| **AI Toolbar** | 8 hours | Complete toolbar redesign |
| **Testing** | 16 hours | Full QA + accessibility audit |
| **Fixes** | 8 hours | Address any issues found |
| **Total** | **48 hours (6 days)** | Production-ready implementation |

---

## 11. Post-Implementation

### 11.1 Documentation Updates
- [ ] Update component documentation
- [ ] Record video walkthrough
- [ ] Create developer guide
- [ ] Update style guide

### 11.2 Team Training
- [ ] Present changes to team
- [ ] Demonstrate new features
- [ ] Share best practices
- [ ] Q&A session

### 11.3 Monitoring Plan
- Week 1: Daily monitoring
- Week 2-4: Weekly reviews
- Month 2+: Monthly audits

---

## Conclusion

This implementation strategy provides a comprehensive roadmap for replacing existing AI features with new design system-compliant components. By following this step-by-step approach, we ensure:

✅ **Zero data loss** - All changes are UI-only
✅ **Seamless transition** - Backward compatible during migration
✅ **Quality assurance** - Comprehensive testing at every phase
✅ **Risk mitigation** - Clear rollback procedures
✅ **Design compliance** - 100% adherence to design system
✅ **Accessibility** - WCAG 2.1 AA compliant throughout

**Next Steps:**
1. Review and approve this strategy
2. Create implementation branch
3. Begin Phase 1 (Backup & Setup)
4. Execute according to timeline
5. Monitor and iterate based on feedback
