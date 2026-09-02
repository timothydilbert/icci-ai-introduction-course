# AI, Hands On — ICCI Introduction to AI

A five-week, no-code introduction to artificial intelligence taught at the
**International College of the Cayman Islands (ICCI)**. Two hours a week,
half explanation and half lab, free browser tools only.

This repository is the course website. It is plain HTML, CSS and a small
script, with no build step, designed to be served by GitHub Pages.

## Contents

| Path | What it is |
|---|---|
| `index.html` | Course landing page: overview, pre-flight checklist, journey map, five weekly labs, tools, useful courses with LinkedIn badges, articles worth reading, contact |
| `assets/css/site.css` | Shared stylesheet for every page |
| `assets/js/site.js` | Mobile menu, copy buttons, accordion deep links |
| `DESIGN.md` | Review of the reference site and the design system |

All five weeks are summarised in the collapsible labs on the landing page.

## Publishing on GitHub Pages

1. Merge this branch into `main`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick
   `main` and the `/ (root)` folder, then save.
4. The site appears at `https://<owner>.github.io/icci-ai-introduction-course/`
   within a few minutes.

The `.nojekyll` file tells Pages to serve the files exactly as they are.

## Working locally

Open `index.html` in a browser, or run a tiny static server so relative
links behave exactly as they do on Pages:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Credits

Modelled on the ICCI "AI for Real Life" course site at
[raisinbread42.github.io/icci-ai-introduction-course](https://raisinbread42.github.io/icci-ai-introduction-course/).
The ELIZA used in Week 1 is Anthony Hay's reconstruction of the original 1966
program.
