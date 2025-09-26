# High-Fidelity Mockups

States covered: idle, loading, success, error, disabled.

- Idle: Buttons visible, no popovers; badges hidden until first analysis.
- Loading: Inline "Analyzing…" text with spinner in suggestions panel/tooltip fallback.
- Success: Priority/Duration badges show computed values; tooltip displays factors, reasons, warnings.
- Error: Inline red text with retry guidance; popovers avoid rendering heavy animations (reduced-motion).
- Disabled: Smart Mode toggle off hides AI panel; ARIA state reflects collapsed content.

See implemented components in repo for pixel-accurate reference.
