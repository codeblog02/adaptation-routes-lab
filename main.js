import './style.css';

const demos = [
  { input: [2, 0, 0, 0, 0], output: [0, 2, 0, 0, 0] },
  { input: [0, 0, 0, 2, 0], output: [0, 0, 0, 0, 2] },
  { input: [0, 2, 0, 0, 0], output: [0, 0, 2, 0, 0] },
  { input: [0, 0, 0, 2, 0], output: [0, 0, 0, 0, 2] }
];
const task = [0, 0, 2, 0, 0];
const truth = [0, 0, 0, 2, 0];
const state = { count: 3, corrupt: false, running: false, progress: 100, timer: null, notice: '' };
const app = document.querySelector('#app');

function grid(cells, kind = '') {
  const expanded = Array(25).fill(0);
  const activeIndex = cells.indexOf(2);
  if (activeIndex >= 0) expanded[10 + activeIndex] = 2;
  return `<div class="grid ${kind}" role="img" aria-label="5 by 5 toy grid">${expanded.map((cell, i) => `<span class="cell c${cell}" style="--i:${i}"></span>`).join('')}</div>`;
}

function pair(demo, index) {
  return `<div class="demo-pair"><span class="pair-label">D${index + 1}</span>${grid(demo.input)}<span class="arrow" aria-hidden="true">&rarr;</span>${grid(demo.output)}</div>`;
}

function bars(corrupt) {
  const values = corrupt ? [42, 68, 25, 55, 31, 18] : [76, 54, 87, 61, 73, 46];
  return values.map((value, index) => `<div class="bar-wrap"><span class="bar-value">${value}</span><span class="bar" style="height:${value}%"></span><small>h${index + 1}</small></div>`).join('');
}

function render() {
  const evidence = state.corrupt
    ? demos.map((demo, index) => index === 1 ? { ...demo, output: [0, 0, 2, 0, 0] } : demo)
    : demos;
  const shown = evidence.slice(0, state.count);
  const correct = !state.corrupt;
  const contextOutput = correct ? truth : [0, 0, 2, 0, 0];
  app.innerHTML = `
    <header class="topbar"><div class="brand"><span class="brand-mark" aria-hidden="true">&nearr;</span><span>ADAPTATION <b>ROUTES</b></span></div><span class="edition">INTERACTIVE FIELD NOTE / 01</span></header>
    <main>
      <section class="intro"><div class="kicker">A toy experiment in test-time adaptation</div><h1>Two ways to learn<br><em>the next puzzle.</em></h1><p class="claim">A learner can adapt by changing its weights, or by changing only its recurrent state.</p><div class="source-chip">Claim grounded in HRM / TRM / BDH-CQ mechanisms</div></section>
      <section class="controls" aria-label="Experiment controls"><div><span class="control-label">Demonstration pairs</span><div class="segmented" role="group" aria-label="Number of demonstration pairs">${[1, 2, 3, 4].map(n => `<button class="segment ${state.count === n ? 'active' : ''}" data-count="${n}" aria-pressed="${state.count === n}">${n}</button>`).join('')}</div></div><label class="toggle-control"><span class="control-label">Corrupt / shuffle demos</span><input id="corrupt" type="checkbox" ${state.corrupt ? 'checked' : ''}/><span class="toggle" aria-hidden="true"><i></i></span></label><span class="control-note">Same evidence &rarr; different adaptation path</span><button class="reset-button" id="reset" type="button">Reset experiment</button><button class="reset-button" id="share" type="button">Share / export</button></section>
      <section class="task-strip"><div><span class="eyebrow">UNSEEN TASK</span><strong>Move the colored cell one step right.</strong></div>${grid(task)}<span class="arrow big" aria-hidden="true">&rarr;</span><div class="truth"><span class="eyebrow">GROUND TRUTH</span>${grid(truth, 'truth-grid')}</div></section>
      <section class="experiment-grid">
        <article class="panel optimization"><div class="panel-head"><div><span class="route-tag" title="Adapts by updating model parameters">ROUTE A / OPTIMIZATION</span><h2>Train, then predict</h2></div><span class="route-number">01</span></div><p class="panel-copy">Demonstrations become augmented training data. A backward pass updates the task-conditioned weights before the unseen task is attempted.</p><div class="pipeline"><div class="pipeline-step done"><span>01</span><b>Augment pairs</b><small>${state.count} pairs &times; 4 views</small></div><div class="pipeline-line"></div><div class="pipeline-step ${state.running ? 'live' : 'done'}"><span>02</span><b>Backward pass</b><small>${state.running ? 'updating gradients...' : 'weights updated'}</small></div><div class="pipeline-line"></div><div class="pipeline-step ${state.running ? '' : 'done'}"><span>03</span><b>Predict</b><small>${state.running ? 'waiting...' : 'ready'}</small></div></div><div class="demo-stack">${shown.map(pair).join('')}</div><div class="status ${state.running ? 'working' : 'ready'}" aria-live="polite"><span class="status-dot"></span>${state.running ? `Optimizing from scratch · ${state.progress}%` : 'Weights updated · prediction ready'}${state.running ? `<span class="progress-track"><i style="width:${state.progress}%"></i></span>` : ''}</div><div class="estimate"><div><span class="eyebrow">ESTIMATE</span><strong>${state.running ? '...' : 'Correct'}</strong></div>${grid(state.running ? [0, 0, 0, 0, 0] : truth, 'prediction')}</div><span class="simplification">Illustrative toy process · not a trained HRM/TRM model</span></article>
        <article class="panel context"><div class="panel-head"><div><span class="route-tag" title="Adapts by updating only temporary hidden state">ROUTE B / CONTEXT</span><h2>Read, then predict</h2></div><span class="route-number">02</span></div><p class="panel-copy">Each pair is read once. Its signal is accumulated into a recurrent state; no parameter update is needed at evaluation time.</p><div class="state-box" title="A temporary representation that carries evidence across the examples"><div class="state-title"><span>RECURRENT STATE h</span><span class="live-label">&bull; LIVE</span></div><div class="bars">${bars(state.corrupt)}</div><div class="state-equation">h <span>&larr;</span> h + encode(demo)</div></div><div class="read-log">${shown.map((_, i) => `<div class="log-row"><span class="log-dot"></span><b>demo ${i + 1}</b><span>encoded into h</span><strong>+${state.corrupt ? '0.' + (3 + i) : '1.' + (i + 2)}</strong></div>`).join('')}</div><div class="status ready"><span class="status-dot"></span>No weights updated · forward-only adaptation</div><div class="estimate"><div><span class="eyebrow">ESTIMATE</span><strong class="${correct ? '' : 'degraded'}">${correct ? 'Correct' : 'Degraded'}</strong></div>${grid(contextOutput, 'prediction context-prediction')}</div><span class="simplification">Illustrative toy state · not the BDH-CQ checkpoint</span></article>
      </section>
      <section class="takeaway"><div class="takeaway-mark" aria-hidden="true">&crarr;</div><div><span class="eyebrow">WHAT TO NOTICE</span><h2>Both see the same demos. Only one needs a new set of weights.</h2></div><p>Toggle corruption: the context route carries evidence forward, so noisy evidence degrades its guess. The optimization route starts over and retrains on whatever it receives.</p></section>
      <footer><span>ADAPTATION ROUTES LAB</span><span>Sources &amp; method in <a href="README.md">README.md</a> · <a href="concept-summary.html">one-page summary</a></span></footer>
    </main>`;
  document.querySelectorAll('[data-count]').forEach(button => button.addEventListener('click', () => { state.count = Number(button.dataset.count); animateOptimization(); }));
  document.querySelector('#corrupt').addEventListener('change', event => { state.corrupt = event.target.checked; render(); });
  document.querySelector('#reset').addEventListener('click', () => { if (state.timer) window.clearInterval(state.timer); state.count = 3; state.corrupt = false; state.running = false; state.progress = 100; state.notice = ''; render(); });
  document.querySelector('#share').addEventListener('click', async event => {
    const summary = `Adaptation Routes Lab — ${state.count} demos, corruption ${state.corrupt ? 'on' : 'off'}. Optimization: correct. Context: ${correct ? 'correct' : 'degraded'}.`;
    try { await navigator.clipboard.writeText(summary); event.currentTarget.textContent = 'Copied'; }
    catch { event.currentTarget.textContent = 'Copy unavailable'; }
    window.setTimeout(() => { if (document.querySelector('#share')) document.querySelector('#share').textContent = 'Share / export'; }, 1400);
  });
}

function animateOptimization() {
  if (state.timer) window.clearInterval(state.timer);
  state.running = true;
  state.progress = 8;
  render();
  state.timer = window.setInterval(() => {
    state.progress = Math.min(100, state.progress + 18);
    if (state.progress === 100) { window.clearInterval(state.timer); state.timer = null; state.running = false; }
    render();
  }, 110);
}

render();
