# Agent notes for calebrob6.github.io

Personal academic website (Jekyll, academicpages theme, GitHub Pages). The site
builds automatically on push to `master` and serves at https://calebrob.com.

## Periodic maintenance

- **Refresh GitHub star/contributor counts** in the Demo and Software card
  footers on `_pages/about.md` (`.demo-card__stats` lines). These are baked in
  statically by design — do NOT add client-side API calls. To refresh:

  ```bash
  for r in microsoft/torchgeo torchgeo/torchgeo-bench \
           microsoft/satellite-imagery-labeling-tool calebrob6/vsrecent \
           calebrob6/throughput-bench calebrob6/deltabit calebrob6/sentinel2-paint; do
    s=$(gh api "repos/$r" --jq .stargazers_count)
    c=$(gh api -i "repos/$r/contributors?per_page=1" | grep -i "^link:" \
        | grep -oE 'page=[0-9]+>; rel="last"' | grep -oE '[0-9]+')
    echo "$r: $s stars, ${c:-1} contributors"
  done
  ```

  Format counts >= 1000 as e.g. `4.1k`.

- The **"Last updated" date** in the left sidebar is automatic — it renders
  `site.time` (`_includes/author-profile.html`), which restamps on every
  GitHub Pages build. No action needed.

## Local preview

```bash
docker run -d --name jekyll-preview --network host -v "$PWD":/site -w /site ruby:3.2 \
  bash -c "bundle config set --local path vendor/bundle && bundle install --quiet && \
           bundle exec jekyll serve --host 127.0.0.1 --port 4000"
```

Serves at http://localhost:4000. Bind to `127.0.0.1`, NOT `0.0.0.0` — Jekyll
rewrites absolute asset URLs to the serve host and browsers refuse `0.0.0.0`.
Auto-regenerates on file changes, but `_config.yml` changes need a container
restart. Gems cache in `vendor/bundle` so restarts are fast.

## Conventions and gotchas

- **Co-author names**: use one consistent form site-wide (e.g. "Rahul Dodhia",
  "Gilles Quentin Hacheme", "Girmaw Abebe Tadesse", "Juan M Lavista Ferres"),
  even when a paper prints an initialed variant.
- **Publication metadata**: verify titles/authors/venues against Crossref,
  arXiv, or the publisher before adding entries — never trust hand-written or
  LLM-suggested citations. `publications.bib` must parse with no duplicate keys.
- **Card images** (`assets/images/demos/`): 900x562 JPEG/PNG (16:10), ~100-200KB.
  Cards use `object-fit: cover`, so pre-crop to 16:10.
- **Anchor scrolling** is handled twice: CSS `scroll-margin-top` in
  `_sass/_custom.scss` (native jumps) and the jQuery smoothScroll offset in
  `assets/js/_main.js` (nav clicks). Both must exceed `$masthead-height` (81px);
  currently masthead + 1em ≈ 100px. If you change one, change the other — and
  note `_main.js` edits must also be applied to the minified
  `assets/js/main.min.js` (patch it directly or rebuild via `npm run build:js`).
- **Site-wide style overrides** live in `_sass/_custom.scss` (imported last).
  Card CSS is nested under `.demo-card` on purpose — the theme's
  `.page__content p` rule outranks flat class selectors.
- The **News section** is currently hidden: content lives in `_pages/news.md`
  with `published: false`. Restore by flipping to `true` or pasting back into
  `_pages/about.md`.
- `master.bib`, `needs-review.bib`, `bbl-recovered.bib`, and `bibliography/`
  are a reference-management working set (aggregated from arXiv LaTeX sources
  of Caleb's papers), separate from the site's `publications.bib`.
