# Domain docs

This repo uses a single-context layout: `GLOSSARY.md` at the root and architectural decision records in `docs/adr/`.

## Before exploring

- Read root `GLOSSARY.md` if it exists.
- If a root `GLOSSARY-MAP.md` is introduced later, follow its pointers to the glossaries relevant to the task.
- Read ADRs in `docs/adr/` that touch the area being explored.

If these files do not exist, proceed silently. Do not suggest creating them upfront. Domain modeling creates them when terms or decisions are actually resolved.

## Use shared vocabulary

Use terms as defined in `GLOSSARY.md` in issue titles, proposals, hypotheses, tests, and other outputs. Avoid synonyms the glossary explicitly excludes.

If a concept is missing, reconsider whether it belongs to the project's domain; note a real vocabulary gap for domain modeling.

## Surface decision conflicts

If a proposal contradicts an existing ADR, explicitly identify the conflicting ADR and explain why the decision should be reconsidered rather than silently overriding it.
