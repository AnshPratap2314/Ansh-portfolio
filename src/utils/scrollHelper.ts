/**
 * High-performance, lightning-fast smooth scroll engine.
 * Ensures instant responsiveness, zero layout thrashing, and flawless touch/mobile support.
 */

let activeAnimationId: number | null = null;
let isUserInteracting = false;

// Stop programmatic scroll ONLY if the user manually drags (touchmove), wheels, or presses nav keys
if (typeof window !== "undefined") {
  const cancelScroll = () => {
    if (activeAnimationId !== null) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
  };

  // Only cancel on wheel or actual touch movement (dragging), NOT on touchstart (which fires on every button tap)
  window.addEventListener("wheel", cancelScroll, { passive: true });
  window.addEventListener("touchmove", cancelScroll, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
      cancelScroll();
    }
  }, { passive: true });
}

export const fastScrollTo = (targetId: string, customDuration?: number) => {
  if (typeof window === "undefined") return;

  const cleanId = targetId.replace(/^#/, "");

  // Cancel any prior animation
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }
  isUserInteracting = false;

  // Scroll to top special cases
  if (cleanId === "root" || cleanId === "hero" || cleanId === "top") {
    const startY = window.scrollY || window.pageYOffset;
    if (startY <= 4) return;

    const duration = customDuration ?? 160;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed >= duration) {
        window.scrollTo(0, 0);
        activeAnimationId = null;
        return;
      }
      const progress = elapsed / duration;
      window.scrollTo(0, Math.round(startY * (1 - easeOutCubic(progress))));
      activeAnimationId = requestAnimationFrame(step);
    };

    activeAnimationId = requestAnimationFrame(step);
    return;
  }

  const targetElem = document.getElementById(cleanId);
  if (!targetElem) return;

  // Dynamically calculate header height so it works accurately on mobile and desktop
  const headerElem = document.getElementById("main-header");
  const headerHeight = headerElem ? headerElem.offsetHeight : 68;
  const headerOffset = headerHeight + 12; // Header height plus comfortable breathing room

  const rect = targetElem.getBoundingClientRect();
  const currentScrollY = window.scrollY || window.pageYOffset;
  const rawTargetY = rect.top + currentScrollY - headerOffset;
  const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const targetY = Math.min(Math.max(0, rawTargetY), maxScrollY);
  const startY = currentScrollY;
  const distance = targetY - startY;

  // If already at position, no scroll needed
  if (Math.abs(distance) < 5) return;

  // Snappy timing: 140ms to 220ms max for swift, responsive glide
  const duration = customDuration ?? Math.min(220, Math.max(140, Math.abs(distance) * 0.08));
  const startTime = performance.now();

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    if (elapsed >= duration) {
      window.scrollTo(0, Math.round(targetY));
      activeAnimationId = null;
      return;
    }

    const progress = elapsed / duration;
    const ease = easeOutCubic(progress);
    window.scrollTo(0, Math.round(startY + distance * ease));
    activeAnimationId = requestAnimationFrame(step);
  };

  activeAnimationId = requestAnimationFrame(step);
};
