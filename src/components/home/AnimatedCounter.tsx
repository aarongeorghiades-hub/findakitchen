"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// The final figure is what renders on the server, so it is present in the HTML
// for crawlers and for anyone browsing without JavaScript. On the client the
// value is reset to zero before the first paint and then counted up when it
// scrolls into view — so the animation looks the same as it always did, but it
// is now a progressive enhancement rather than the only way to see the number.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Only blank the figure if we can actually count it back up. If
  // IntersectionObserver is missing or the visitor prefers reduced motion, the
  // server-rendered figure is left exactly as it is.
  const canAnimate = () =>
    typeof IntersectionObserver !== "undefined" &&
    !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useIsomorphicLayoutEffect(() => {
    if (canAnimate()) setCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}
