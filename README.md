# Synthesis — Central Dogma & SynBio Simulator

*A calm, beginner-friendly web app for teaching gene expression through synthetic biology.*

**Live app:** https://synthesis-ds.art/  
**Source code:** https://github.com/NYUADiGEM-2025/synthesis-ds

---

## What’s new?
- Three reporter CDS: **EGFP**, **mRFP1**, **mTagBFP2**
- Visual **plasmid workspace** (pSB1C3) with drag-and-drop parts
- Guided run with **status steps**, **progress**, Pause/Reset, and toasts
- Clean **Parts Library** + “How it works” quick start
- Reproducible local setup (Vite + React + TypeScript + Tailwind)

> Note: live step-by-step animation and advanced editing (promoters/RBS/terminators, rare-disease CDS) are in progress.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Reproducibility & Testing](#reproducibility--testing)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

---

## Overview
**Synthesis** makes the central dogma (**DNA → RNA → Protein**) interactive using familiar **synthetic-biology** primitives. Learners drag a coding sequence (CDS) onto a plasmid (**pSB1C3**), then run a guided simulation with clear text that ties actions to transcription and translation. The app is designed for classrooms, workshops, and fast team onboarding.

---

## Features
- **Plasmid canvas** with labeled segments and origin of replication
- **Parts Bin** with color-coded CDS (EGFP/mRFP1/mTagBFP2)
- **Guided run**: progress bar, step text, Pause/Reset, action toasts
- **Target Proteins** panel synced with current selections
- **Accessible UI**: keyboard focus states, high-contrast defaults
- **Zero-install use** at https://synthesis-ds.art/

*Roadmap:* animated molecular steps, promoters/RBS/terminators with strengths, sequence edits, rare-disease module, presets & save/load.

---

## Installation

Prefer the hosted site? Just go to **https://synthesis-ds.art/**.  
For local development, follow the steps below.

### Frontend
```bash
# 1) Clone
git clone <REPO_URL>
cd <REPO_DIR>

# 2) Install deps
npm install

# 3) Run the dev server (Vite)
npm run dev
```
The dev server typically runs at http://localhost:5173 (Vite default).

---

## Usage

1. Open **Simulator** from the navbar (or click **Launch Simulator** on Home).

2. **Drag** a CDS (**EGFP / mRFP1 / mTagBFP2**) from the **Parts Bin** onto the plasmid ring.  
   - The **Start Simulation** button enables when **≥ 1** CDS is present.

3. Click **Start Simulation** to follow the guided steps; use **Pause / Reset** anytime.

4. Add/remove CDS to compare **green/red/blue** reporters.

5. Use **Clear All CDS** to reset the workspace.

---

## Reproducibility & Testing

- All content and logic are versioned in this repo.
- Deterministic UI states for common flows (add, remove, clear, run).
- Manual sanity checks: disabled → enabled button gating, selection sync between panels, consistent labels/colors.
- Build artifacts reproducible via:

```bash
npm ci
npm run build
```
---
## Tech Stack

- **TypeScript + React (TSX)** — app logic and components  
- **Vite** — fast dev server and production bundling  
- **Tailwind CSS** — styles, theming, and responsive layout  
- **shadcn/ui** — accessible React primitives themed with Tailwind  
- **SVG** — plasmid ring, labeled gene segments, subtle ornaments

---
## Contributing

1. **Fork** the repo.

2. **Create a feature branch:**
   ```bash
   git checkout -b feat/your-feature
   ```
3. **Commit with a clear message:**
   ```bash
   git commit -m "feat(simulator): add pause state"
   ```
4. **Push and open a PR:**
   ```bash
   git push origin feat/your-feature
   ```

