# Adaptation Routes Lab

**One-sentence claim:** A learner can adapt to a brand-new task by changing its weights from demonstrations, or by changing only its recurrent state.

This is a small, no-backend interactive explainer for test-time adaptation. It places two simplified routes beside the same ARC-style toy task: an optimization route that augments examples and runs a visible train-before-predict sequence, and a context route that accumulates each example into recurrent state and predicts forward-only.

## Intended learner and prerequisites

This is for ML students, research engineers, and reviewers who know what a neural-network weight and a forward pass are. No ARC, recurrent-network, or optimization expertise is required.

## Learning objectives

- Distinguish parameter adaptation from recurrent-state adaptation.
- Explain why the optimization route includes a backward-pass step while the context route is forward-only at evaluation.
- Observe how noisy evidence can interfere with accumulated state.
- Separate a toy mechanism visualization from a trained research model.

## Architecture

The app is a static Vite page: `src/main.js` owns the deterministic toy data, state, controls, and rendering; `src/style.css` owns the responsive visual system; `tests/smoke.test.mjs` checks the key interaction hooks. There is no backend, model checkpoint, or runtime dependency on external fonts.

## Run locally

```bash
npm install
npm run dev
```

Use `npm test` for the source smoke checks and `npm run build` for the production bundle. The app is deterministic and runs entirely in the browser.

## What the controls show

- **1–4 demonstration pairs:** changes the amount of evidence shown to both routes.
- **Corrupt / shuffle demos:** visibly changes one demonstration. The optimization route still completes its toy retraining sequence; the context route carries the noisy signal forward and degrades.
- **Share / export:** copies a plain-text summary of the current experiment state to the clipboard.

The 650 ms optimization phase is scripted timing, not gradient descent. The state bars are illustrative values, not a hidden state extracted from a checkpoint. “Correct” means correct under this toy rule only.

## Mechanism notes and inline sources

Panel A is a conceptual optimization route: demonstrations become training signal and a backward pass updates a task-conditioned solution. HRM is described as operating through “two interdependent recurrent modules” in its abstract and technical description ([HRM paper](https://arxiv.org/abs/2506.21734), [HTML §2](https://arxiv.org/html/2506.21734v3)). TRM is included as a recursive-reasoning comparison ([TRM paper §1](https://arxiv.org/html/2510.04871v1#S1)); neither paper claims this toy's animation is their training algorithm.

Panel B is a conceptual context route: inputs update recurrent memory while parameters stay fixed during evaluation. BDH-CQ's report says inference-time inputs “continuously update the model's recurrent memory” ([BDH-CQ report](https://arxiv.org/abs/2608.09888), [HTML §3](https://arxiv.org/html/2608.09888v1)). The BDH base paper supplies architectural background on recurrent associative state and synaptic plasticity ([BDH paper](https://arxiv.org/abs/2509.26507)).

The augmentation framing is supported by ARC Prize's independent analysis, which reports that “pre-training task augmentation is critical” and that 300 augmentations were enough for near-max performance in its experiment ([ARC Prize analysis, summary](https://arcprize.org/blog/hrm-analysis#finding-4-pre-training-task-augmentation-is-critical)). This is an independent analysis with caveats, not a universal law.

## Sources

The complete five-source quote ledger, with exact short quotations and evidence boundaries, is in [SOURCES.md](SOURCES.md).

1. [BDH-CQ: In-Context Learning with Recurrent Latent Reasoning](https://arxiv.org/abs/2608.09888)
2. [The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain](https://arxiv.org/abs/2509.26507)
3. [Hierarchical Reasoning Model](https://arxiv.org/abs/2506.21734)
4. [Less is More: Recursive Reasoning with Tiny Networks (TRM)](https://arxiv.org/html/2510.04871v1)
5. [The Hidden Drivers of HRM's Performance on ARC-AGI](https://arcprize.org/blog/hrm-analysis)

## Evidence and limitations

ARC Prize approximately reproduced HRM's reported numbers and then ran ablations; its analysis also questions how much performance comes from the hierarchical architecture versus the outer loop and augmentation. BDH-CQ's mechanism and benchmark results remain developer-reported in the report; this repository makes no independent reproduction claim. No research checkpoint, gradient computation, or benchmark score is included in this artifact.

## License and disclosure

All code and interface copy are original for this artifact. No third-party images, icons, fonts, or model weights are redistributed. The implementation and explanatory copy were generated with AI assistance and reviewed for toy behavior and source boundaries. MIT License.

## Submission checklist

- Public artifact URL: deploy the Vite `dist/` directory to a static host.
- Public source repo: this repository.
- Concept summary: [concept-summary.html](concept-summary.html), print to PDF as one page.
- Source record: [SOURCES.md](SOURCES.md) and this README.
