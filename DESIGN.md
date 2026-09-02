# Design notes — AI, Hands On

This site is modelled on the ICCI "AI for Real Life" landing page
(raisinbread42.github.io/icci-ai-introduction-course). This document records
what that page does well, what we kept, what we changed, and the rules for
adding new lesson pages so they stay consistent.

## 1. Review of the reference page

**What it is.** A single `index.html` (about 2,300 lines, CSS inlined) that
serves as the entire course site. No build step, no framework, hosted on
GitHub Pages from the repository root.

**Structure, top to bottom.**

| Section | Purpose | Pattern |
|---|---|---|
| Sticky nav | Brand + anchor links, hamburger under 820px | `position: sticky`, blur backdrop |
| Hero | Eyebrow, big serif headline with one italic accent, pitch, three pill "meta" chips | `clamp()` type, Fraunces at optical size 144 |
| "What you'll build" | Six numbered artifacts in a card | Grid of soft tiles with numbered dots |
| Before you start | Five-item pre-flight checklist | Same tile pattern, dot bullets |
| Journey | Five numbered steps on a gradient line | 5-column grid, collapses to a vertical list |
| Weekly labs | Five `<details>` accordions, each with a two-column body | Left: "Today you will", steps, prompts, ask, fits. Right: tools + take-home aside |
| Tools | Seven link cards | Auto-fit grid, hover lift |
| FAQ / Advanced | More `<details>` disclosures | Serif question, dashed divider, arrow bullets |
| Feedback + footer | Contact names and a short footer | Centred text |

**What makes it work.**

- One consistent rhythm inside every week: *Watch → Try → Adjust → Reflect*.
  Every accordion has the same five blocks in the same order, so students learn
  the page once.
- Three recognisable colour-coded blocks: dark mono **prompt** block (copy
  these), warm orange **ask yourself** block (reflect), soft blue **where this
  fits** block (connect to the arc). Colour carries meaning, not decoration.
- Restraint in type: a display serif (Fraunces) for headings and numerals, a
  humanist sans (Manrope) for body, a mono (JetBrains Mono) for prompts and
  small metadata. Italic accent words in blue or orange do all the emphasis
  work.
- Native `<details>` for every collapsible, so the page works with no
  JavaScript. The only script is the mobile menu and copy buttons.
- Local flavour in the prompts (Cayman topics), which also sets up the
  hallucination and bias lessons later.

**Limits we wanted to address.**

- Everything lives in one file, so a second page would have to copy 1,300
  lines of CSS.
- Weekly content is an accordion summary; there is no full lesson page with
  timings, worksheets, or instructor notes.
- The logo is hot-linked from icci.edu.ky, which can break.
- Colour names are brand-specific (`--icci-blue`), so re-theming means a
  find-and-replace.

## 2. What we built

```
index.html              Landing page (same skeleton as the reference)
assets/css/site.css     Shared stylesheet, sectioned and tokenised
assets/js/site.js       Shared progressive-enhancement script
.nojekyll               Tells GitHub Pages to serve files as-is
```

**Kept from the reference:** the section order, the accordion week pattern
with its five blocks, the three colour-coded blocks, the three typefaces, the
ICCI palette (blue `#0E5C8C`, orange `#E85D1F`, yellow `#F4B41A`), the pill
chips, the tool cards, native `<details>` everywhere.

**Changed:**

- CSS and JS moved to `assets/` so every page shares them. Tokens are named by
  role (`--blue`, `--orange-soft`, `--line`) rather than brand.
- A `.brand-mark` inline monogram replaces the hot-linked logo.
- The journey steps are links that open the matching week accordion (the
  script opens a `<details>` named in the URL hash).
- The FAQ section was dropped; the reference's "Advanced topics" was not carried over.
- A "Useful courses with LinkedIn badges" section for outside courses, using the tool-card grid.
- Accessibility: skip link, `aria-expanded` on the menu button, visible focus
  rings, `<main>` landmark.

## 3. Lesson pages

The site currently has no standalone lesson pages; each week lives in its
accordion on the landing page. The stylesheet still carries the lesson-page
components (`.lesson-hero`, `.plan`, `.steps`, `.worksheet`, `.quiz`,
`.instructor`, `.progress`) and the script still supports the quiz and
progress checklist, so a lesson page can be added later without new CSS.

## 4. Adding things

**A course to "Useful courses with LinkedIn badges":** copy one `.tool-card` in the `#courses`
section of `index.html`. Badge = provider, title = course name, one-line
description, and a meta line for cost or account requirements.

**An article to "Articles worth reading":** same card pattern in the `#articles`
section. Badge = publisher, meta line = cost and reading time.

**A tool:** same as a course, in the `#tools` section, with the week badge.

## 5. Publishing

GitHub Pages, deploy from a branch, root folder. The site has no build step.
The `.nojekyll` file stops Pages from processing the files with Jekyll.
