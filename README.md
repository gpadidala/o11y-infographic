# When to *NOT* Use an AI Agent in Observability

> **A Practitioner's Decision Framework for the LGTM+P Observability Stack**
> by **Gopal Rao** · Grafana · Mimir · Loki · Tempo · Pyroscope

A single-file, self-contained infographic that answers a question most "AI for Ops"
content skips: **when should you *not* reach for an autonomous agent?**

In a world rushing to wrap every task in an LLM agent, this poster argues the
opposite discipline — roughly **60%** of observability work is deterministic
scripting, **30%** is orchestrated workflows, and only **~10%** genuinely benefits
from autonomous agents. It gives you the criteria, tests, and anti-patterns to tell
them apart before you over-engineer.

---

## Preview

### Header
![Hero](screenshots/01-hero.png)

### The Decision Matrix — 7 criteria × 3 automation tiers
![Decision Matrix](screenshots/02-decision-matrix.png)

### O11y Signal Decision Flow — Metrics → Logs → Traces → Profiles → Correlate
![Signal Flow](screenshots/03-signal-flow.png)

### Real-World Use Case Mapping — the 60 / 30 / 10 split
![Use Cases](screenshots/04-use-cases.png)

### The Over-Engineering Test — 7 questions
![Over-Engineering Test](screenshots/05-over-engineering-test.png)

### The Automation Spectrum
![Spectrum](screenshots/06-spectrum.png)

### O11y Agent Anti-Patterns
![Anti-Patterns](screenshots/07-anti-patterns.png)

### Quick Decision Tree
![Decision Tree](screenshots/08-decision-tree.png)

### Cost & Complexity Reality
![Cost Comparison](screenshots/09-cost-comparison.png)

> A full-page render is also available at [`screenshots/00-full-page.png`](screenshots/00-full-page.png).

---

## What's Inside

| Section | What it covers |
| --- | --- |
| **The Decision Matrix** | 7 criteria (Goal Clarity, Path Predictability, Tool Selection, Error Handling, State Mgmt, Human Oversight, Blast Radius) mapped across API/Script → Workflow+LLM → Autonomous Agent. |
| **O11y Signal Decision Flow** | Metrics → Logs → Traces → Profiles → Correlate. One signal = script; chaining signals = workflow; *deciding which signal to query* = agent. |
| **Real-World Use Case Mapping** | Concrete Grafana/Mimir/Loki/Tempo/Pyroscope tasks bucketed into the 60% Deterministic / 30% Orchestrated / 10% Autonomous split. |
| **The Over-Engineering Test** | 7 questions that tell you whether you actually built a runbook script, an API wrapper, a workflow — or a real agent. |
| **The Automation Spectrum** | A visual 60/30/10 bar of where O11y automation effort should land. |
| **O11y Agent Anti-Patterns** | Four traps — the Dashboard Reloader, PromQL Parrot, Alert Forwarder, Config Copier — each with the simpler fix. |
| **Quick Decision Tree** | A three-question flow: bash script? → workflow + LLM? → agent (with guardrails)? |
| **Cost & Complexity Reality** | Latency, token cost, debuggability, and reliability compared across the three tiers. |

---

## How to View

No build step, no dependencies, no server required:

```bash
open index.html          # macOS
# or just double-click index.html in your file browser
```

Everything — layout, styling, and content — lives in a single `index.html`.

---

## Tech Stack

- **Pure HTML + CSS** — no frameworks, no build tooling, no runtime dependencies.
- **Inline `<style>`** — CSS grid/flexbox layout, gradient backgrounds, self-contained.
- **Zero JavaScript** for the infographic itself — it's fully static and portable.
- **Dark navy gradient theme** with gold (`#f2c811`) accents, matched to the
  observability brand.

Screenshots in this README are generated with [Playwright](https://playwright.dev/)
(`shoot.js`) at 2× device scale for retina-sharp section captures.

### Regenerating the screenshots

```bash
npm install playwright
npx playwright install chromium
node shoot.js            # writes PNGs into screenshots/
```

---

## Attribution

Created by **Gopal Rao**, built on the Grafana
**LGTM+P** stack (Loki · Grafana · Tempo · Mimir · Pyroscope).

> *"The best O11y architects don't ask 'where can I use agents?' — they ask
> 'where is deterministic automation no longer sufficient?'"*
