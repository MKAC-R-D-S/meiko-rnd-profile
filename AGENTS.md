# Project instructions

## graphify

- **graphify** (`~/.Codex/skills/graphify/SKILL.md`) — any input to knowledge graph. Trigger: `/graphify`.
- When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

## Agent skills

### Issue tracker

Track specs and issues as local Markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage roles, recorded as a `Status:` line in each issue. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context layout: root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.
