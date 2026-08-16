# VISUAL.md — Veymea Design System

> **Single source of truth for the visual identity of Veymea.**
> Before making ANY visual or frontend UI change, read this file in full.
> Never introduce a new visual pattern, colour, spacing convention, typography
> style, border radius, button style, or animation language without checking
> whether the existing system already solves the problem. If the design system
> itself is intentionally modified, update this file in the same change.

---

## 1. Brand principles

Veymea is a sexual-wellness, intimacy, discovery and connection brand.

The site must feel:

- intimate
- sophisticated
- editorial
- tactile
- modern
- sensual without being explicit
- warm
- premium but accessible
- curious rather than provocative
- designed for real people, not a stereotypical sex shop

Reference worlds: **premium fragrance + editorial fashion + boutique wellness +
intimate lifestyle.**

---

## 2. Colour palette

Raw brand colours — defined in `:root` in `app/globals.css`. Do not scatter
these hex values through components. Use the semantic tokens below.

```css
--ink: #180b13;
--plum: #2b1020;
--plum-2: #40192d;
--rose: #c77f87;
--blush: #e8b0ad;
--powder: #f0d0c7;
--cream: #f4eadf;
--paper: #fbf7f1;
```

### Semantic tokens

| Token | Value | Use |
|---|---|---|
| `--color-bg-primary` | `var(--paper)` | Light section backgrounds |
| `--color-bg-dark` | `var(--plum)` | Dark section backgrounds |
| `--color-bg-darker` | `var(--ink)` | Hero / footer backgrounds |
| `--color-bg-soft` | `var(--cream)` | Subtle light alt background |
| `--color-text-primary` | `var(--ink)` | Text on light sections |
| `--color-text-on-dark` | `#ffffff` | Text on dark sections |
| `--color-text-muted` | `#694b59` | Muted text on light sections |
| `--color-text-muted-dark` | `rgba(255,255,255,.68)` | Muted text on dark sections |
| `--color-text-faint-dark` | `rgba(255,255,255,.4)` | Faint text on dark sections |
| `--color-accent` | `var(--rose)` | Small accents, section-label numbers |
| `--color-accent-soft` | `var(--blush)` | Emphasis in `<em>`, result orbs |
| `--color-accent-warm` | `var(--powder)` | Soft warm accent |
| `--color-border` | `rgba(65,27,43,.16)` | Borders on light sections |
| `--color-border-dark` | `rgba(255,255,255,.13)` | Borders on dark sections |
| `--color-border-strong` | `rgba(255,255,255,.52)` | Header outline button |

A section is always fully light or fully dark — never mixed.

---

## 3. Typography

Two families only, loaded via `next/font/google` in `app/layout.tsx`.

### Display / editorial — Cormorant Garamond

CSS variable: `--font-display`

- Weights: 400, 500, 600. Normal + italic.
- Used for: large editorial headlines, quiz questions, result names,
  blockquotes, manifesto copy, section intros, card titles, footer links.

### UI / body — Manrope

CSS variable: `--font-sans`

- Weights: 300, 400, 500, 600, 700.
- Used for: eyebrows, labels, buttons, navigation, inputs, small copy,
  footer bottom bar.

Emphasis inside display headlines uses `<em>` rendered in
`--color-accent-soft` (blush), italic, weight 400.

### Type scale

| Role | Family | Desktop size | Weight | Tracking | Line height |
|---|---|---|---|---|---|
| Hero H1 | display | `clamp(66px, 7vw, 112px)` | 400 | -.045em | .91 |
| Section H2 (xl) | display | `clamp(56px, 6.6vw, 104px)` | 400 | -.045em | .91 |
| Section H2 (l) | display | `clamp(55px, 5.5vw, 88px)` | 400 | -.04em | .92 |
| Quiz question H2 | display | `clamp(48px, 6vw, 80px)` | 400 | -.03em | 1 |
| Result name H2 | display | `clamp(74px, 9vw, 125px)` | 400 | -.04em | 1 |
| Card title H3 | display | 45px | 400 | -.02em | 1 |
| Result subtitle H3 | display | 23px italic | 400 | 0 | 1.2 |
| Lead / intro | display | 19–21px | 400 | 0 | 1.45–1.58 |
| Eyebrow | sans | 10px | 600 | .24em | 1 |
| Section label | sans | 9px | 700 | .22em | 1 |
| Button | sans | 10px | 700 | .15em | 1 |
| Body small | sans | 12px | 400 | 0 | 1.55 |
| Disclaimer | sans | 10px | 400 | 0 | 1.55 |

All eyebrows and labels are `text-transform: uppercase`.

---

## 4. Spacing scale

8px base unit. Common steps: 8, 16, 24, 32, 40, 48, 64, 80, 96, 120, 140.

Section padding (desktop):
- Top: 120–140px
- Bottom: 90–150px
- Horizontal: 7–8vw

Section padding (mobile ≤650px):
- Top: 95px
- Bottom: 70–110px
- Horizontal: 7vw

Inner gaps: 16–32px between related items, 40–70px between blocks.

---

## 5. Grid and max widths

- Max content width: ~1280px for standard content.
- Hero copy: `min(720px, 58vw)`.
- Editorial splits: `1fr 1fr` or `1.35fr .65fr`.
- Sensation grid: 4 columns desktop, 2 columns ≤980px, horizontal scroll ≤650px.
- Footer links: 2 columns, ~46% width, right-aligned.

### Breakpoints

- `max-width: 980px` — tablet / small desktop
- `max-width: 650px` — mobile

No horizontal scrolling at any breakpoint.

---

## 6. Buttons

Sharp corners only. No pill or rounded buttons.

```css
.button {
  border: 0;
  padding: 17px 26px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .15em;
  text-transform: uppercase;
}
.button:hover { transform: translateY(-2px); }

.button.primary { color: var(--ink); background: var(--blush); }
.button.blush   { color: var(--ink); background: var(--powder); }
.button.ghost   { color: #fff; background: transparent;
                   border: 1px solid var(--color-border-strong); }
```

Hover: 2px translateY. No scale, no glow.

---

## 7. Links

Text links use an underline that shifts on hover.

```css
.text-link {
  font-size: 10px; font-weight: 600; letter-spacing: .16em;
  text-transform: uppercase; padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,.34);
}
.text-link.dark { color: var(--plum); border-color: var(--color-border); }
```

Footer links: display serif at 18px, no underline, opacity hover.

---

## 8. Forms

- Inputs: 1px border, transparent background, white text on dark, 16px padding.
- Focus: border becomes `--color-accent-soft`.
- Labels: 10px uppercase, .12em tracking.
- Submit: blush background, ink text, sharp corners.
- Error text: `#f2b3b3`, sans 10px.
- Marketing consent: separate checkbox, never pre-selected.

---

## 9. Image treatment

- Hero / closing: `object-fit: cover`, desaturated
  (`saturate(.78) contrast(1.05)`), heavy vignette overlay.
- Discovery image: `saturate(.6) sepia(.15)`, gradient fade into dark column.
- Always set explicit dimensions or aspect containers to prevent layout shift.
- Lazy-load below-the-fold images (`loading="lazy"`).
- Photographic direction: intimate, warm, tactile, non-explicit. Skin, silk,
  candlelight, hands, texture. Never pornographic.

---

## 10. Dark / light section behaviour

- Light: `--paper` bg, `--ink` text, `--color-border` lines, muted `#694b59`.
- Dark: `--plum` bg, white text, `--color-border-dark` lines,
  muted `rgba(255,255,255,.68)`.
- Hero / footer: `--ink` / `#140911`.
- A section is always fully light or fully dark.

---

## 11. Quiz visual language

- Full-screen modal, radial plum gradient, subtle dot texture overlay.
- Brand mark top center.
- Progress: 1px track, 2px blush fill, animated width.
- Count: `Pergunta 04 / 10` in rose, 9px uppercase.
- Question: display serif, `clamp(48–80px)`.
- Hint: display serif italic, muted.
- Answers: 2-col grid (1-col mobile), bordered buttons, 78px min height,
  letter index + label + arrow.
- Hover: blush border, subtle tint, -2px translateY.
- Back button + close (×), both accessible.
- Keyboard: Tab through answers, Enter to select.
- Result: orb, big profile name, italic subtitle, copy, blockquote,
  email gate, then full reveal.

---

## 12. Navigation

- Absolute header over hero, transparent, white text.
- Three-column grid: brand left, nav center, CTA right.
- Desktop nav: 11px uppercase, .22em tracking, .78 opacity → 1 on hover.
- Mobile: hamburger (two lines), full-screen plum overlay, display-serif
  nav links at 38px.
- Header CTA: ghost outline button.

---

## 13. Section patterns

- **Hero:** full-screen, image + vignette, left copy, eyebrow, big H1 with
  `<em>`, lead, two actions, footer triplet, scroll cue.
- **Editorial split (manifesto):** label, big title left, copy column right
  with left border.
- **Discovery split:** image left, dark copy right with benefits list.
- **Sensation grid:** 4 full-bleed cards, tone gradient + orb + number +
  title + copy.
- **Closing:** centered image with overlay, eyebrow, big H2, CTA.
- **Footer:** brand lockup, 2-col links, bottom bar.

Section label pattern: `<span>01</span> Title` — number in `--color-accent`,
title in muted.

---

## 14. Iconography

- Minimal. The Veymea diamond/drop mark `◆` is the only recurring symbol.
- `.drop-mark`: 17px, rose, `scaleX(.68) rotate(45deg)`.
- `.drop-mark.small`: 9px.
- No icon libraries. No emoji. No decorative card icons.
- Arrows (`→`, `↘`, `↓`) for wayfinding only.

---

## 15. Logo usage

- Reuse `/brand/veymea-logo.png`. Do not redesign.
- Header: 158px wide, scaled 1.52× within 66px clipped container.
- Footer: 210px wide.
- Mobile menu / quiz: 170–190px.
- Never stretch, recolor, or add effects.

---

## 16. Motion principles

Motion is restrained, editorial, tactile. Not playful or bouncy.

### Durations

| Pattern | Duration |
|---|---|
| Micro interactions (hover, focus) | 200ms |
| Small reveals | 400ms |
| Text / image reveals | 600–900ms |
| Section scroll reveals | 500–700ms |

### Easing

- `ease` / `ease-out` for most transitions.
- `cubic-bezier(0.22, 1, 0.36, 1)` for premium reveals.

### Patterns

- **Text reveal:** translateY 100% → 0 through overflow mask, stagger lines.
- **Image reveal:** clip-path or scale 1.04 → 1.
- **Scroll reveal:** opacity 0 → 1, translateY 12–20px, controlled stagger.
- **Parallax:** very subtle (≤5% movement).
- **Signature:** diamond/drop mark scale+fade.
- **Hover:** 1–3px translate, subtle image scale, underline movement,
  small opacity change.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

Remove scroll scrubbing, parallax, and large transitions. Preserve usability.

---

## 17. Accessibility

- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Keyboard navigation throughout; visible focus states.
- Dialogs: `role="dialog"`, `aria-modal="true"`, focus management, ESC to close.
- Form labels associated; errors with `role="alert"`.
- Adequate contrast on all text against backgrounds.
- Alt text on meaningful images; empty alt on decorative.
- Quiz fully usable without a mouse.

---

## 18. Forbidden visual patterns

- Purple, indigo, violet hues.
- Rounded / pill buttons.
- Glassmorphism / frosted blur panels.
- Bento grids, card overload.
- Generic SaaS hero (centered trio + 3 feature cards).
- Neon, glow-on-everything, black+pink sex-shop palette.
- Animating every paragraph or element.
- Magnetic cursor effects.
- Fake product prices, fake reviews, fake stock.
- Brazilian Portuguese (use pt-PT).
- Scattering raw hex values in components instead of tokens.
- Generic AI gradients.
