import { useEffect, useMemo, useState } from 'react';
import { classify, category as detectCategory } from '../services/ai/classifier';

function annotateItem(el: HTMLElement) {
  const subjectEl = el.querySelector('h6, .fw-semibold') as HTMLElement | null;
  const previewEl = el.querySelector('p') as HTMLElement | null;
  const subject = subjectEl?.textContent || '';
  const preview = previewEl?.textContent || '';
  const text = `${subject} ${preview}`.trim();
  const cat = detectCategory(text);
  const ai = classify(text);

  const container = el.querySelector('.d-flex.align-items-center.mb-2') as HTMLElement | null;
  if (!container) return;

  let badgeRow = el.querySelector('.ai-email-badges') as HTMLElement | null;
  if (!badgeRow) {
    badgeRow = document.createElement('div');
    badgeRow.className = 'ai-email-badges d-flex align-items-center gap-2 mt-1';
    container.appendChild(badgeRow);
  }
  badgeRow.innerHTML = '';
  const pri = document.createElement('span');
  pri.className = `ai-badge ai-badge--${ai.priority}`;
  const priorityIcons: Record<'critical'|'high'|'medium'|'low', string> = {
    critical: 'ti ti-alert-triangle-filled',
    high: 'ti ti-flame',
    medium: 'ti ti-chart-bar',
    low: 'ti ti-circle-check'
  };
  pri.innerHTML = `<i class="${priorityIcons[ai.priority as 'critical'|'high'|'medium'|'low']} me-1"></i>${ai.priority.toUpperCase()}`;
  const catEl = document.createElement('span');
  catEl.className = 'ai-badge ai-badge--medium ai-badge--sm';
  catEl.innerHTML = '<i class="ti ti-folder me-1"></i>' + cat;
  const conf = document.createElement('span');
  conf.className = 'ai-confidence-badge';
  conf.innerHTML = `<i class="ti ti-robot me-1"></i>${Math.round(ai.confidence*100)}%`;
  badgeRow.appendChild(pri);
  badgeRow.appendChild(catEl);
  badgeRow.appendChild(conf);

  el.setAttribute('data-ai-category', cat);
  el.setAttribute('data-ai-priority', ai.priority);
}

export default function EmailAIEnhancer() {
  const [filter, setFilter] = useState<'all'|'critical'|'high'|'medium'|'low'>('all');
  const filters = useMemo(() => ['all','critical','high','medium','low'] as const, []);

  useEffect(() => {
    const list = document.querySelector('.mails-list');
    if (!list) return;
    const items = Array.from(list.querySelectorAll('.list-group-item')) as HTMLElement[];
    items.forEach(annotateItem);
    const mo = new MutationObserver(() => {
      const els = Array.from(list.querySelectorAll('.list-group-item')) as HTMLElement[];
      els.forEach(annotateItem);
    });
    mo.observe(list, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const list = document.querySelector('.mails-list');
    if (!list) return;
    const items = Array.from(list.querySelectorAll('.list-group-item')) as HTMLElement[];
    items.forEach(el => {
      const pri = el.getAttribute('data-ai-priority') as typeof filter | null;
      if (filter === 'all' || pri === filter) {
        el.classList.remove('ai-dim');
      } else {
        el.classList.add('ai-dim');
      }
    });
  }, [filter]);

  return (
    <div className="d-flex align-items-center gap-2 flex-wrap">
      <span className="ai-badge ai-badge--low"><i className="ti ti-robot me-1"/>AI Active</span>
      {filters.map(f => (
        <button key={f} className={`ai-btn ai-btn--sm ${filter===f? 'ai-btn--primary' : 'ai-btn--secondary'}`} onClick={() => setFilter(f as any)}>
          {f === 'all' ? 'All' : f.charAt(0).toUpperCase()+f.slice(1)}
        </button>
      ))}
    </div>
  );
}
