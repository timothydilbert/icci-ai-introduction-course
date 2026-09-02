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
lessons/week-1.html     Full lesson page, the template for the other four
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
- Week 1 has a "Open the full lesson" button; other weeks say "coming soon"
  until their pages exist.
- The FAQ section was dropped; the reference's "Advanced topics" was not carried over.
- A "Useful courses with LinkedIn badges" section for outside courses, using the tool-card grid.
- Accessibility: skip link, `aria-expanded` on the menu button, visible focus
  rings, `<main>` landmark.

## 3. The lesson page template

`lessons/week-1.html` is the model for Weeks 2 to 5. Every lesson page has
the same parts, in this order:

1. **Lesson hero** — eyebrow "Week N of 5 · topic", title with one italic
   accent, two-sentence lede, chips (duration, device, tools, no coding).
2. **Objectives** — three or four "you can…" statements, each testable.
3. **Session plan** — a timed list covering the full two hours, each row tagged
   Watch / Try / Adjust / Reflect. Include the break.
4. **Part 1 · Warm-up** — short activity with a worksheet (`.worksheet`).
5. **Part 2 · Watch** — the explanation, in `.reading` prose, with one SVG
   figure (`figure.fig`), a key-terms grid (`dl.terms`) and, if useful, a
   comparison table (`table.compare`).
6. **Part 3 · Try** — numbered `.steps`, a `.prompts` block with a copy
   button, and the main worksheet.
7. **Adjust** — one deliberate change to the lab and what to look for.
8. **Part 4 · Reflect** — `.ask` questions, a four-question `.quiz`, the
   `.fits` block that connects to the course arc, and the take-home callout.
9. **Instructor notes** — the dark `.instructor` card: set-up, timing traps,
   discussion prompts, what good looks like.
10. **Sidebar** — progress checklist (saved in `localStorage` under
    `progress:week-N`), on-this-page links, tools, take-home, print button.
11. **Pager** — back to the overview, forward to the next week.

Rules of thumb:

- Every step a student takes should produce something they can keep. Name it
  in the take-home callout and in the sidebar.
- Prompts are copied exactly. Put them in a `.prompts` block with an `id` and a
  `data-copy-from="#id"` button; the script joins each `.pline` with newlines.
- Use the three colour blocks for the same meaning every time: dark = paste
  this, orange = think about this, blue = how this connects.
- Keep local references (George Town, Cayman Brac, cruise ship days). They make
  the hallucination and bias lessons land.
- Worksheets must print: the page has a print stylesheet that hides the nav,
  sidebar and instructor card and gives fill cells more height.

## 4. Adding things

**A new lesson page:** copy `lessons/week-1.html`, change the hero, the
`data-progress-key`, the checklist ids, and the pager links, then swap the
content. On the landing page, replace the week's "coming soon" note with an
"Open the full lesson" button.

**A course to "Useful courses with LinkedIn badges":** copy one `.tool-card` in the `#courses`
section of `index.html`. Badge = provider, title = course name, one-line
description, and a meta line for cost or account requirements.

**An article to "Articles worth reading":** same card pattern in the `#articles`
section. Badge = publisher, meta line = cost and reading time.

**A tool:** same as a course, in the `#tools` section, with the week badge.

## 5. Publishing

GitHub Pages, deploy from a branch, root folder. The site has no build step.
The `.nojekyll` file stops Pages from processing the files with Jekyll.
