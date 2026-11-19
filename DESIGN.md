---
name: Meiko Automation R&D
description: Premium Industrial Technology, Advanced Engineering Showcase. Real hardware lit like a product launch, on warm near-black and studio-mist grounds, with one signal accent.
colors:
  ink-0: "#0b0a09"
  ink-1: "#12110f"
  ink-2: "#1b1a17"
  ink-3: "#2a2824"
  ink-4: "#3d3a35"
  mist-0: "#f4f3f0"
  mist-1: "#ebe9e4"
  mist-2: "#dedbd4"
  studio: "#ecebe8"
  stone: "#7c776f"
  stone-d: "#58544d"
  ink-text: "#1b1a17"
  text-d: "#efede8"
  text-d2: "#b9b4ab"
  text-d3: "#8f8a81"
  signal: "#ef5a2a"
  signal-soft: "#ff8a5c"
  signal-ink: "#9c330d"
  board-ground: "#0e130f"
typography:
  display:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 5.25rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 110"
  display-strong:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontWeight: 640
    fontVariation: "'wdth' 110"
  headline:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3.8rem)"
    fontWeight: 300
    lineHeight: 1.03
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 110"
  title:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 620
    lineHeight: 1.2
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "Archivo, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  none: "0"
  sm: "2px"
  board: "6px"
spacing:
  gutter: "clamp(20px, 4vw, 64px)"
  chapter: "clamp(88px, 10vw, 152px)"
  tile-gap: "12px"
  head-gap: "clamp(48px, 6vw, 80px)"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink-0}"
    rounded: "{rounded.sm}"
    padding: "0 26px"
    height: "52px"
  button-signal-hover:
    backgroundColor: "{colors.signal-soft}"
  button-ghost:
    textColor: "{colors.text-d}"
    rounded: "{rounded.sm}"
    padding: "0 26px"
    height: "52px"
  tile-studio:
    backgroundColor: "{colors.studio}"
    rounded: "{rounded.none}"
  tile-dark:
    backgroundColor: "{colors.ink-3}"
    textColor: "{colors.text-d}"
  diagram-node:
    backgroundColor: "#141311"
    textColor: "{colors.text-d}"
---

# Design System: Meiko Automation R&D

## Overview

**Creative North Star: "The Engineering Showcase"**

The page behaves like a product launch for hardware that Meiko designs and builds. Three registers share one system. Dark Cinematic carries the hero and applications: warm near-black grounds with a soft pool of light, a real PCB design floating in 3D perspective with a deep shadow and a single light sweep. Clean Premium carries capabilities and products: studio-mist grounds where photographs sit on a matching backdrop, feathered into it, or fill their frame when they are scene photos. Industrial Intelligence carries solutions: an architecture diagram whose nodes are real photographs, connected by wires that a signal travels along.

Emphasis comes from scale and weight contrast (light 300 display lines paired with 640 bold lines in the same family), large real imagery, and generous space. Every image states what it is: photo, 3D model, CAD model, installation photo or illustration.

**Key Characteristics:**
- Real hardware is the hero; the PCB design render is shown as an object, not a screenshot.
- Two-weight display type (300 + 640) in Archivo at 110% width.
- Alternating dark and mist chapters, each with its own composition: object, plates and process, diagram, mosaic, cinematic photos, form.
- One signal red-orange for action, focus and signal markers.
- Images are never invented; devices without a verified photo get a labelled abstract composition, never a drawn product shape.

## Colors

Warm near-black grounds, a studio-mist counter-tone, one signal accent taken from the AUTOMATION wordmark.

### Primary
- **Signal** (#ef5a2a): primary buttons, focus rings, diagram wires and pulses, active filter and language underline, reference tags on dark.
- **Signal Soft** (#ff8a5c): button hover, small signal text on dark grounds where Signal would miss contrast.
- **Signal Ink** (#9c330d): small signal text on mist grounds (role labels, reference tags).

### Neutral
- **Ink 0–4** (#0b0a09 to #3d3a35): header, hero, solutions, applications, footer, ODM tile, dark product tile.
- **Mist 0–2** (#f4f3f0, #ebe9e4, #dedbd4): capabilities, products, contact grounds; illustration tiles.
- **Studio** (#ecebe8): the backdrop that studio photographs are normalised to, so product and tile read as one surface.
- **Text on dark** (#efede8, #b9b4ab, #8f8a81) and **text on mist** (#1b1a17, #58544d).
- **Board Ground** (#0e130f): the dark base under the 3D PCB render.

### Named Rules
**The One Voice Rule.** Signal marks action and signal flow only. If something else wants to be orange, it is not an action.

**The Matching Backdrop Rule.** A studio photo sits on a ground that matches its normalised backdrop and is feathered at the edges; a scene photo fills its frame with a dark gradient under the caption. Never paste a photo as a visible rectangle on a different ground.

## Typography

**Display / Body Font:** Archivo (variable, width 75–125), fallback Segoe UI, system sans
**Label Font:** JetBrains Mono (codes, image-type labels, figure captions, reference tags)

**Character:** Engineered and calm. Display lines pair a light 300 statement with a 640 conclusion in the same family; on phones the two run together as one line of text with a real space between them.

### Hierarchy
- **Display** (300 / 640, clamp(2.6rem, 5.4vw, 5.25rem), 1.0): the hero statement only.
- **Headline** (300 / 640, clamp(2.1rem, 4vw, 3.8rem), 1.03): one per chapter.
- **Title** (620, 1.35rem, 1.2): process steps, solution groups, application titles; product names grow to 1.8–3rem inside tiles.
- **Body** (400, 1.0625rem, 1.6): leads capped at 52–54ch.
- **Label** (400, 0.75rem, 0.08em, uppercase mono): image-type chips, FIG captions, G1–G4 and 01–04 references, product roles.

### Named Rules
**The Two-Weight Rule.** Display and headline text are set as a light line followed by a bold line; never two bold lines, never all light.

## Layout

A 1440px maximum wrap with a 20–64px fluid gutter and 88–152px chapter padding. Chapter heads are a 7/5 split (headline left, lead right, bottom aligned). The hero is full height minus the header, with copy left, the 3D board bleeding off the right edge, and a five-column capability rail at its foot. Capabilities use a 12-column plate grid (CAD plate 7 columns, PCB plate 5) above a four-step process and a source-attributed facts row. Solutions are a 5/7 split: group list left, diagram right. Products are a 12-column mosaic with a 7×2 feature tile, explicit placements for the rest, and a full-width ODM tile; filtering switches the mosaic to an even three-up grid. Applications pair one tall cinematic photo with two stacked photos. Below 1080px the menu collapses and everything stacks; below 640px the diagram becomes a vertical sequence with a signal line.

## Elevation & Depth

Depth is lighting, not cards. The hero board carries a long soft shadow and a perspective tilt; diagram nodes carry a soft drop shadow (0 30px 60px -30px black) to lift them off the dark ground. Light tiles are flat; dark tiles and scene photos use a bottom gradient to seat their captions.

### Named Rules
**The Lit-Object Rule.** Shadows belong to objects that are meant to feel physical (the board, diagram nodes). Containers stay flat.

## Shapes

Square corners everywhere except buttons (2px) and the PCB board (6px, its real corner radius in the render). Hairlines are 1px at low opacity on dark (#ffffff12–1c) and #dedbd4 on mist.

## Components

### Buttons
- **Signal:** #ef5a2a fill, ink text, 52px tall, 2px radius, arrow icon; hover lightens to #ff8a5c and widens the arrow gap.
- **Ghost (dark):** 1px white 20% border, light text; hover strengthens the border.

### Navigation
- Dark sticky bar (76px) with the logo rendered white, quiet links that gain a signal underline on hover, mono VI / EN / JP switch. Collapses to a Menu panel below 1080px.

### Product tiles
- Studio tiles: matching backdrop, feathered photo, role + name + description, hover reveals Details / Consult. Dark tile: 3D board in perspective. Scene tiles: full-bleed photo with bottom gradient. Illustration tiles: abstract SVG on mist with the chip "Hình minh họa · chưa có ảnh".

### Diagram nodes
- Dark card with a photo or illustration, a signal step label breaking the top edge, title and image-type label in the footer. Wires are drawn at runtime between real node positions; a signal pulse travels each wire (static under reduced motion).

### Inputs
- Transparent with a bottom line; focus turns it signal-ink with a matching underline; invalid fields keep a signal-ink line and are announced in the status line.

## Do's and Don'ts

### Do:
- **Do** show real hardware large and lit, and label every image by type.
- **Do** normalise studio photos to the Studio backdrop and feather them; let scene photos fill the frame.
- **Do** pair a light line with a bold line for every display heading, with a real space between them.
- **Do** keep signal orange for action and signal flow.

### Don't:
- **Don't** show grey empty frames; use a labelled abstract composition for devices without photos.
- **Don't** draw or generate a product shape, or use AI renders that carry invented specifications.
- **Don't** paste photos as visible rectangles on a mismatched ground.
- **Don't** animate every section; the hero entrance and the diagram pulses are the motion.
- **Don't** publish a number, customer or certification without a source.
