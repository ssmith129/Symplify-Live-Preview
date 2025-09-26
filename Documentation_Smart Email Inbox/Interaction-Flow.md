# Interaction Flow — AI Email Inbox

1) Load
- Show header + filters; list area renders skeleton rows; sidebar placeholder
- When data resolves, hydrate list; preserve scroll and focus

2) Navigate & Select
- Arrow keys move focus across .ai-email-row; Home/End jump; Shift+Click or Shift+Arrow selects range
- Space/Enter toggles expand; Esc collapses

3) Smart Actions
- Smart Sort toggle reorders by AI priority, mirrors triage behavior
- Confidence Only filters; category chips filter list; breadcrumbs show active filters

4) Row Actions
- Hover or Tab focus reveals actions: mark read, archive, delete, snooze
- Action shows inline spinner (spinner-border-sm) then toast/snackbar confirmation

5) Expand Panel
- .ai-expand animates open; shows preview, AI quick replies (buttons), key metadata (tags, attachments)
- Choosing a quick reply opens composer with prefilled text

6) Sidebar
- Selecting a row populates thread details; suggestions update contextually (summarize, next steps)

7) Empty/Error
- Empty: AI illustration + "No messages matched" and reset filters
- Error: alert-danger with retry button

8) Accessibility
- Roles: list/listitem, aria-live for toast updates; visible focus outlines; labels on all buttons

This flow mirrors existing Inbox Triage interactions to preserve consistency.
