# Source ledger

Accessed 04 Sep 2026. Quotes are kept short and paired with the source that supports the corresponding interface claim.

## BDH-CQ report

**Source:** [BDH-CQ: In-Context Learning with Recurrent Latent Reasoning](https://arxiv.org/abs/2608.09888) · [HTML, §3](https://arxiv.org/html/2608.09888v1)

> “Inputs presented at inference time continuously update the model's recurrent memory.”

Supports Panel B's recurrent-memory framing. The report also states that contextual memory changes as evidence is encountered and supports in-context learning (§3.2).

## BDH base paper

**Source:** [The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain](https://arxiv.org/abs/2509.26507) · [HTML, abstract](https://arxiv.org/html/2509.26507v1)

> “The working memory of BDH during inference entirely relies on synaptic plasticity with Hebbian learning using spiking neurons.”

Supports the background distinction between persistent state and ordinary parameter descriptions. This paper is background for BDH; it is not evidence that the toy runs BDH-CQ.

## HRM paper

**Source:** [Hierarchical Reasoning Model](https://arxiv.org/abs/2506.21734) · [HTML, §2](https://arxiv.org/html/2506.21734v3)

> “HRM executes sequential reasoning tasks in a single forward pass ... through two interdependent recurrent modules.”

Supports the two-module recurrent-mechanism note. The paper describes high-level and low-level modules and their hidden states; it does not describe this toy's scripted animation.

## TRM paper

**Source:** [Less is More: Recursive Reasoning with Tiny Networks](https://arxiv.org/html/2510.04871v1) · [§1 Introduction](https://arxiv.org/html/2510.04871v1#S1)

> “We propose Tiny Recursive Model (TRM), a much simpler recursive reasoning approach.”

The same section says TRM recursively updates a latent state and then its answer. It is used here as a comparison point for recursive reasoning, not as a source for the optimization-route toy implementation.

## ARC Prize independent analysis

**Source:** [The Hidden Drivers of HRM's Performance on ARC-AGI](https://arcprize.org/blog/hrm-analysis) · [summary and Finding #4](https://arcprize.org/blog/hrm-analysis#finding-4-pre-training-task-augmentation-is-critical)

> “Pre-training task augmentation is critical, though only 300 augmentations are needed.”

Supports the augmentation-count claim. ARC Prize reports an approximate independent reproduction and ablations; this is independent analysis, not a guarantee of the original HRM result.

## Evidence boundary

- HRM: independently analyzed and approximately reproduced by ARC Prize, with caveats documented in the linked analysis.
- BDH-CQ: developer-reported results and mechanism description in the submitted technical report; no independent reproduction is claimed here.
- This artifact is a deterministic explanatory toy. It does not download checkpoints, run gradients, or reproduce benchmark scores.
