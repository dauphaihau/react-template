# Responsive Breakpoints

Breakpoints use explicit pixel-width names instead of Tailwind's default aliases (`sm`, `md`, etc.), so the intent is self-documenting at the point of use.

## Breakpoints

| Prefix    | Width  |
|-----------|--------|
| `w640:`   | 640px  |
| `w768:`   | 768px  |
| `w1024:`  | 1024px |
| `w1280:`  | 1280px |
| `w1536:`  | 1536px |

## Definition

Defined in `packages/template/src/app/styles/styles.css` via Tailwind v4's `@theme` block:

```css
@theme {
  --breakpoint-w640: 40rem;
  --breakpoint-w768: 48rem;
  --breakpoint-w1024: 64rem;
  --breakpoint-w1280: 80rem;
  --breakpoint-w1536: 96rem;
}
```

Tailwind's defaults (`sm`, `md`, `lg`, `xl`, `2xl`) are reset to `initial` in the same block so only the pixel-named variants are available.

## Usage

```tsx
<h1 className="text-4xl w640:text-5xl w1024:text-6xl">Hello</h1>
<div className="flex-col w768:flex-row">...</div>
```
