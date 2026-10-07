# Graph Report - snapshot  (2026-10-06)

## Corpus Check
- Corpus is ~1,771 words - fits in a single context window. You may not need a graph.

## Summary
- 27 nodes · 30 edges · 5 communities (3 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Hero, reloj y escena
- Layout y metadatos
- Interacciones del portafolio
- Datos personales y proyectos

## God Nodes (most connected - your core abstractions)
1. `Portfolio()` - 7 edges
2. `LiveClock()` - 3 edges
3. `SceneSlot()` - 3 edges
4. `SectionLabel()` - 2 edges
5. `ProjectVisual()` - 2 edges
6. `metadata` - 1 edges
7. `Project` - 1 edges
8. `sections` - 1 edges
9. `links` - 1 edges
10. `contact` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio()` --calls--> `LiveClock()`  [EXTRACTED]
  components/portfolio.tsx → components/live-clock.tsx
- `Portfolio()` --calls--> `SceneSlot()`  [EXTRACTED]
  components/portfolio.tsx → components/scene-slot.tsx

## Import Cycles
- None detected.

## Communities (5 total, 2 thin omitted)

### Community 0 - "Hero, reloj y escena"
Cohesion: 0.31
Nodes (4): LiveClock(), Project, sections, SceneSlot()

### Community 2 - "Interacciones del portafolio"
Cohesion: 0.40
Nodes (3): Portfolio(), ProjectVisual(), SectionLabel()

### Community 3 - "Datos personales y proyectos"
Cohesion: 0.40
Nodes (4): contact, links, projects, stack

## Knowledge Gaps
- **7 isolated node(s):** `metadata`, `Project`, `sections`, `links`, `contact` (+2 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 15 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Portfolio()` connect `Interacciones del portafolio` to `Hero, reloj y escena`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **What connects `metadata`, `Project`, `sections` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `LiveClock()` connect `Hero, reloj y escena` to `Interacciones del portafolio`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `SceneSlot()` connect `Hero, reloj y escena` to `Interacciones del portafolio`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
## Snapshot and redesign constraints

This graph describes a frozen pre-redesign source snapshot. SHA-256 hashes are in snapshot-manifest.json. Six TypeScript/TSX files (1,771 words) were extracted structurally; globals.css is present in the snapshot but is not a supported AST corpus file. No semantic extraction was performed. Input/output semantic token cost: 0/0.

The extraction has one dangling endpoint and two undirected same-endpoint collapses. The collapsed pairs combine contains/calls for Portfolioâ†’close and Portfolioâ†’destination. External refs include unresolved @ aliases; this graph alone does not fully resolve pageâ†’Portfolio and Portfolioâ†’lib/portfolio imports. Preserve these confirmed source-level imports during redesign.

- app/page.tsx imports components/portfolio.tsx and renders Portfolio.
- Portfolio imports contact, links, projects and stack from lib/portfolio.ts, and the independent LiveClock and SceneSlot components.
- LiveClock uses America/Santiago for both time and the dynamic UTC offset, updates each second, and clears its interval on unmount. Keep initial client hydration stable.
- All verified personal destinations live in links/contact. CV is null and opens an honest pending destination state. Preserve target=_blank and noopener noreferrer for external GitHub/LinkedIn actions.
- Project cards set selected. The shared native dialog synchronizes selected/pending with showModal()/close(), handles Escape through onCancel, backdrop clicks, and its close button. ProjectVisual is reused in grid and detail.
- Project details depend on id, category, title, visual, detail, challenge, scope and tags. Preserve all six records and avoid inventing results or repository links.
- Hero anchors and section navigation rely on index/profile/work/stack/experience/education/contact IDs. Preserve skip navigation and Spanish document language.
