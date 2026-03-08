# futureself-landing — Claude Code Rules

## Project Context
This is the marketing landing page for **FutureSelf** — a Chrome extension that blocks distracting websites during sleep hours, including work tools and AI tools.
Live at: GetFutureSelf.com
Stack: Static HTML, CSS, vanilla JS. No frameworks. No build step.
Brand name: **FutureSelf** (never SleepShield).
Tagline: "Tomorrow will thank you."

Target audience: Founders and creators who doom-scroll (and fake-productivity-scroll) at night.
Core message: Fake productivity is a sleep killer. FutureSelf blocks everything — including your work tools.
Pricing: $19 lifetime, Founding Member deal.

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or design/copy decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Write detailed specs upfront before touching HTML or CSS

### 2. Subagent Strategy
- Use subagents for research, copy exploration, or design comparisons
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction: update `tasks/lessons.md` with the pattern
- Write rules that prevent the same mistake from recurring
- Review lessons at session start

### 4. Verification Before Done
- Never mark a task complete without visually confirming it in a browser
- Check mobile responsiveness for every layout change
- Ask yourself: "Would a senior designer approve this?"
- Verify CTAs are visible above the fold on both desktop and mobile

### 5. Demand Elegance
- For non-trivial changes: pause and ask "is there a more elegant way?"
- Landing pages should feel fast and focused — cut anything that slows the eye
- Don't over-engineer interactions — simple CSS transitions over complex JS animations

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Check layout issues in both Chrome and Safari before marking done
- Fix broken fonts, spacing, or alignment without asking for confirmation

---

## Task Management

1. **Plan First** — Write plan to `tasks/todo.md` with checkable items
2. **Verify Plans** — Check in before starting implementation
3. **Track Progress** — Mark items complete as you go
4. **Summarize** — High-level summary at each step
5. **Document Results** — Add review section to `tasks/todo.md`
6. **Capture Lessons** — Update `tasks/lessons.md` after any correction

---

## Core Principles

- **Simplicity First** — Static HTML/CSS/JS only. No React, no Tailwind, no build tools.
- **No Laziness** — Find root causes of visual bugs. No quick hacks.
- **Minimal Impact** — Copy and layout changes should be surgical, not wholesale rewrites.
- **Conversion First** — Every section exists to move the reader toward the CTA.
- **Crisp Copy** — Short is better. If a sentence can be cut, cut it.

---

## Landing Page Structure (Do Not Reorder Without Asking)
1. Hero — tagline, sub-headline, CTA
2. Problem — why evenings are broken for founders
3. Reframe — fake productivity as the real sleep killer
4. How It Works — sleep math, set once, forget forever
5. Intercept Screen — Question Gate preview
6. What We Block — full block list including work/AI tools
7. vs. Competitors — why FutureSelf wins
8. Pricing — $19 lifetime, Founding Member
9. Coming Soon — daytime focus, Pomodoro, custom schedules
10. Final CTA

---

## Copy Rules
- Tone: direct, founder-to-founder, warm but not soft
- Never preachy, never clinical, never corporate
- The "fake productivity" angle must be present and prominent
- Don't bury the work tools / AI tools differentiator — it's the hook
- Tagline: "Tomorrow will thank you." (always with the period)
- Product name: **FutureSelf** (capital F, capital S, always)
- Never: SleepShield, Sleep Shield, or any old brand variation

---

## Brand Rules
- Dark theme — don't introduce light backgrounds without explicit approval
- Typography and spacing should feel premium and focused
- CTAs should be high-contrast and impossible to miss
- Mobile-first — most visitors will be on phones
