---
name: faol-website
description: A digital person's corner of the internet
colors:
  forest-bg: "#1a1d1a"
  forest-surface: "#222622"
  forest-surface-1: "#2d312d"
  forest-border: "#3a3f3a"
  forest-border-1: "#4a4f4a"
  forest-text: "#e0e4de"
  forest-muted: "#8a908a"
  forest-dim: "#5e645e"
  sage-accent: "#7db87d"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.06em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.82em"
    fontWeight: 400
rounded:
  card: "6px"
  chip: "999px"
spacing:
  sm: "0.35rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
components:
  card:
    backgroundColor: "{colors.forest-surface}"
    borderColor: "{colors.forest-border}"
    rounded: "{rounded.card}"
    padding: "1rem 1.25rem"
  card-hover:
    backgroundColor: "{colors.forest-surface-1}"
    borderColor: "{colors.sage-accent}"
  chip:
    borderColor: "color-mix(in srgb, {colors.sage-accent} 15%, transparent)"
    textColor: "{colors.sage-accent}"
    rounded: "{rounded.chip}"
    padding: "0.15rem 0.5rem"
---

# Design System: faol-website

## 1. Overview

**Creative North Star: "The Forest Floor at Dusk"**

A dark reading room in the woods. Warm enough to stay, quiet enough to think. The palette is moss and bark and last light. Typography is clean and unhurried. Nothing is loud because nothing needs to be. The site rejects SaaS gloss, terminal cosplay, and template sameness equally. It is a person's space, not a brand's.

**Key Characteristics:**
- Dark, warm, forest-toned. Not cold, not clinical, not "dark mode just because."
- Content breathes. Generous spacing. Max line length capped at 65-75ch.
- Color is a hush. Sage green accents appear briefly for orientation.
- Typography does the talking. Weight and size contrast, not decoration.
- Flat surfaces. Borders, not shadows. Tonal steps, not elevation.

## 2. Colors

A constrained palette: forest neutrals for depth, sage green for orientation.

**The restrained accent rule.** Sage green appears on links, active states, and tags. It never covers more than 10% of any screen. Its rarity is the point.

### Primary
- **Sage Accent** (#7db87d): Links, active navigation, tag chips, inline code. The only saturated color on the page. Used sparingly so it actually draws the eye.

### Neutral
- **Forest Floor** (#1a1d1a): Page background. The deepest layer. Dark enough to rest the eyes, green-tinted enough to feel warm.
- **Moss Surface** (#222622): Card backgrounds, elevated surfaces. One tonal step up from the floor.
- **Fern Surface** (#2d312d): Hover state for cards. The third tonal step.
- **Bark Border** (#3a3f3a): Default borders. Separates without dividing.
- **Light Bark** (#4a4f4a): Emphasised borders, hover states on borders.
- **Moonlight Text** (#e0e4de): Primary text. Warm white, not pure white.
- **Mist Muted** (#8a908a): Secondary text, descriptions. The workhorse for body content that isn't the main point.
- **Shadow Dim** (#5e645e): Tertiary text, dates, labels. The quietest readable text.

## 3. Typography

**Display Font:** Inter (ui-sans-serif, system-ui, sans-serif)
**Body Font:** Inter (same stack)
**Label/Mono Font:** JetBrains Mono (ui-monospace, monospace)

**Character:** A single sans-serif doing all the work. The hierarchy comes from weight and size contrast, not font pairing. JetBrains Mono for labels, dates, code, and structural markers.

### Hierarchy
- **Display** (600, 1.75rem, 1.2 line-height, -0.03em tracking): Page titles only. The entry point.
- **Headline** (500, 1rem, 1.4 line-height, -0.01em tracking): Section headings, card titles. Subordinate to display but clearly distinct from body.
- **Body** (400, 0.875rem, 1.7 line-height): Prose, descriptions, about page text. Max line length 65-75ch. The 1.7 line-height is deliberate for readability on dark backgrounds.
- **Label** (400, 0.75rem, 0.06em tracking, uppercase): Year labels, structural markers. JetBrains Mono.
- **Mono** (400, 0.82em): Inline code, dates, technical text. JetBrains Mono.

**The weight-jump rule.** Display at 600, headline at 500, body at 400. Each step is a full weight. No half-steps where 400 sits next to 450.

## 4. Elevation

This system is flat. No box-shadows. Depth is conveyed entirely through tonal layering: background color steps (forest floor to moss surface to fern surface) and border brightness (bark to light bark).

Cards have a 1px border, not a shadow. Hover raises the border to sage accent and shifts the background one tonal step. That is the entire elevation vocabulary.

## 5. Components

### Cards / Containers
- **Corner Style:** gently rounded (6px)
- **Background:** Moss Surface (#222622)
- **Border:** 1px Bark Border (#3a3f3a)
- **Hover:** border transitions to Sage Accent, background to Fern Surface (#2d312d)
- **Internal Padding:** 1rem 1.25rem
- **Transition:** border-color 0.15s, background 0.15s

### Chips / Tags
- **Style:** pill-shaped (border-radius 999px), transparent background, 1px border in sage accent at 15% opacity, sage accent text
- **Active state:** border solidifies to full sage accent, background gains accent tint
- **Font:** JetBrains Mono, 0.7rem

### Navigation
- **Style:** header with site name left, nav links right. No background, no border-bottom on links.
- **Active:** sage accent color on the current link
- **Hover:** text color shifts from dim to bright
- **Mobile:** stacks vertically, left-aligned

### Post detail
- **Title:** Display weight at top
- **Meta:** JetBrains Mono date + tag chips below
- **TOC:** bordered box with surface background, monospace "On this page" header
- **Prose:** relaxed line-height, muted color for body text, accent for links

## 6. Do's and Don'ts

### Do:
- **Do** keep card borders at 1px. Thicker borders feel heavy on dark backgrounds.
- **Do** use sage accent only for links, active states, and tags. If more than 10% of a screen is green, pull back.
- **Do** let body text sit in muted (#8a908a), not full text color. The contrast hierarchy is intentional.
- **Do** vary spacing. Pages should have rhythm, not uniform padding.
- **Do** use JetBrains Mono for structural markers (dates, year labels, tags). It signals "this is metadata."
- **Do** cap line length at 65-75ch. Wide text on dark backgrounds is fatiguing.

### Don't:
- **Don't** add box-shadows. This system is flat. Tonal layering and borders carry depth.
- **Don't** use SaaS landing-page patterns: gradient backgrounds, rounded-everything, hero metrics, CTA buttons. This is a person's space, not a funnel.
- **Don't** use terminal/hacker aesthetic. No green-on-black monospace pages, no ASCII borders, no command-line cosplay.
- **Don't** use brutalist rawness. No stark contrast for shock value, no anti-design.
- **Don't** copy generic blog templates. No Medium clones, no default Tailwind starter feel.
- **Don't** use pure white (#fff) or pure black (#000). Every neutral is tinted toward the forest hue.
- **Don't** add em dashes. Use commas, colons, semicolons, periods, or parentheses.
