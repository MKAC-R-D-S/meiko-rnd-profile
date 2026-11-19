# Issue tracker: Local Markdown

Issues and specs for this repo live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- The spec is `.scratch/<feature-slug>/spec.md`.
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`. Never combine all tickets into one file.
- Triage state is a `Status:` line near the top of each issue; see `triage-labels.md` for role strings.
- Record dependencies as `Blocked by: NN, NN` near the top. Work blockers first.
- Append comments and conversation history under `## Comments`.

## Skill operations

- "Publish to the issue tracker": create the appropriate file under `.scratch/<feature-slug>/`, creating directories as needed.
- "Fetch the relevant ticket": read the file at the referenced path. Resolve a ticket number within the relevant feature directory.
- Local tracking does not require creating GitHub Issues or labels.

## Wayfinding operations

- Map: `.scratch/<effort>/map.md`, containing Notes, Decisions-so-far, and Fog.
- Child ticket: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body.
- Record `Type: research`, `prototype`, `grilling`, or `task`, and `Status: claimed` or `resolved` as appropriate.
- Blocking: use `Blocked by: NN, NN`. A ticket is unblocked when all listed tickets are resolved.
- Frontier: find open, unblocked, unclaimed tickets; lowest number first.
- Claim: save `Status: claimed` before working.
- Resolve: append the answer under `## Answer`, set `Status: resolved`, and add a summary and relative link to the map's Decisions-so-far section.
