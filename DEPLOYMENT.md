# Deployment checklist

## Local verification

- [x] Scrambling visualization changes the displayed evidence.
- [x] `npm test` smoke checks pass.
- [x] `npm run build` creates `dist/`.
- [x] README and one-page summary include the five-source ledger.
- [ ] Regenerate `concept-summary.pdf` from the updated HTML using a browser/PDF renderer before upload. The HTML source is 655 words and is within the 500–950 target.

## Static deployment

The app is a static Vite site. Deploy the contents of `dist/` to Vercel, Netlify, GitHub Pages, or another static host. No server, environment variables, database, or model download is required.

### Vercel

1. Import the repository.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Deploy.

### Netlify

1. Connect the repository.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy site.

## Remaining account actions

Public deployment and pushing to GitHub require a connected hosting/GitHub account and repository remote. Those external actions are intentionally left as handoff steps because credentials and destination URLs are not present in this workspace.

## Live defense prompts

- “Where is the recurrent-memory claim from?” → [BDH-CQ report, §3](https://arxiv.org/html/2608.09888v1).
- “Where are the two HRM modules described?” → [HRM paper, §2](https://arxiv.org/html/2506.21734v3).
- “What is the TRM comparison?” → [TRM paper, §1](https://arxiv.org/html/2510.04871v1#S1).
- “What supports the augmentation claim?” → [ARC Prize analysis, Finding #4](https://arcprize.org/blog/hrm-analysis#finding-4-pre-training-task-augmentation-is-critical).
- “Is BDH-CQ independently reproduced here?” → No. This artifact labels BDH-CQ results as developer-reported.
