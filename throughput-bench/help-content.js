// Editable copy for the About / help modal.
// Change the HTML below — it's rendered verbatim into the modal body.
// Inline styles and `<a href>` links are fine; keep tags balanced.

export const HELP_TITLE = "About Throughput Bench";

export const HELP_REPO_URL = "https://github.com/calebrob6/throughput-bench";

export const HELP_BODY_HTML = /* html */ `
  <p>
    <b>Throughput Bench — Globe Race</b> is an interactive visualization of how
    fast different deep-learning vision backbones can grind through satellite
    imagery. Pick two models and watch them race to map Earth's land area.
  </p>
  <p>
    The dots on the globe are <b>not</b> individual image patches — at a
    <code>224 × 224</code> window and 10 m GSD there are ~<b>30 million</b>
    such patches to be run on, far more than any screen can show. They're
    an evenly-spaced sampling used as a progress proxy: the fraction of
    dots filled in equals the fraction of Earth's land area (~149M km²)
    each model has processed so far.
  </p>
  <p>
    <b>Why race model architectures over Earth?</b> Planetary-scale remote
    sensing — land-cover mapping, deforestation monitoring, disaster
    response, crop-yield forecasting — routinely means running inference
    over <i>continents</i> of imagery. At that scale, architecture choice is
    the difference between a job that finishes in hours and one that takes
    weeks or costs orders of magnitude more in GPU-hours. Benchmarking concrete
    img/s on real hardware — rather than comparing parameter counts or
    FLOPs — is what lets you make that trade-off honestly.
  </p>
  <p>
    Throughput numbers come from <b>real benchmarking experiments</b>
    checked into the <code>results/</code> folder of this repo, measured
    under <b>ideal conditions</b>: fixed-shape synthetic tensors already on
    the GPU, no disk I/O, no decoding, no augmentation. That means these
    numbers are an <b>upper bound</b>. In a real pipeline, dataloader
    overhead (reading COGs, tiling, reprojection, host→device transfer)
    can dominate — sometimes leaving the GPU idle more than half the time.
    Use the GPU dropdown to switch architectures (H100 and V100 for now),
    <b>Explore data</b> for throughput vs. compute-cost plots, or
    <b>List data</b> for a sortable cross-GPU table.
  </p>
  <p style="color: var(--muted);">
    Press <kbd>Esc</kbd> to close any modal. Source &amp; methodology:
    <a href="__REPO_URL__" id="help-repo-link"
       style="color: var(--accent); text-decoration: none;">GitHub repo</a>.
  </p>
`;
