import { useEffect, useRef } from "react";

/** Thin coral bar pinned to the top that tracks page scroll depth. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="fixed left-0 top-0 z-60 h-[3px] w-0 bg-primary" />
  );
}
