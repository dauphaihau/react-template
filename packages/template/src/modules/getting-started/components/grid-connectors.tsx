import { useState, useEffect } from 'react';

type Rect = {
  left: number; top: number; right: number; bottom: number; cy: number 
};

function getRect(el: HTMLElement, container: HTMLElement): Rect {
  const er = el.getBoundingClientRect();
  const cr = container.getBoundingClientRect();
  const left = er.left - cr.left;
  const top = er.top - cr.top;
  const right = left + er.width;
  const bottom = top + er.height;
  return {
    left, top, right, bottom, cy: (top + bottom) / 2, 
  };
}

export function GridConnectors({
  containerRef,
  refs,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  refs: readonly [
    React.RefObject<HTMLDivElement | null>,
    React.RefObject<HTMLDivElement | null>,
    React.RefObject<HTMLDivElement | null>,
    React.RefObject<HTMLDivElement | null>
  ];
}) {
  const [lines, setLines] = useState<{
    x1: number; y1: number; x2: number; y2: number 
  }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const els = refs.map((ref) => ref.current);
      if (els.some((el) => !el)) return;
      const rects = els.map((el) => getRect(el!, container));
      setLines([
        {
          x1: rects[0].right, y1: rects[0].cy, x2: rects[1].left, y2: rects[1].cy, 
        },
        {
          x1: rects[2].right, y1: rects[2].cy, x2: rects[3].left, y2: rects[3].cy, 
        },
      ]);
    };

    requestAnimationFrame(update);

    const ro = new ResizeObserver(update);
    ro.observe(container);
    refs.forEach((ref) => {
      if (ref.current) ro.observe(ref.current);
    });
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (lines.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 z-10 pointer-events-none overflow-visible hidden w768:block"
      width="100%"
      height="100%"
    >
      {lines.map((line) => (
        <g key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}>
          <line
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="color-mix(in srgb, var(--foreground) 20%, transparent)"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          <circle cx={line.x1} cy={line.y1} r={4} fill="var(--background)" stroke="color-mix(in srgb, var(--foreground) 20%, transparent)" strokeWidth={1} />
          <circle cx={line.x2} cy={line.y2} r={4} fill="var(--background)" stroke="color-mix(in srgb, var(--foreground) 20%, transparent)" strokeWidth={1} />
        </g>
      ))}
    </svg>
  );
}
