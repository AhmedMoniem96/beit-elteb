"use client";

import { useEffect } from "react";

export function PublicMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
    if (reducedMotion) {
      counters.forEach((counter) => { counter.textContent = counter.dataset.counter ?? counter.textContent; });
      return;
    }
    root.classList.add("motion-ready");
    let frame = 0;
    const animateCounters = (container: Element) => {
      container.querySelectorAll<HTMLElement>("[data-counter]").forEach((counter) => {
        const finalValue = Number(counter.dataset.counter);
        if (!Number.isFinite(finalValue)) return;
        const startedAt = performance.now();
        const duration = 1000;
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = String(Math.round(finalValue * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else counter.textContent = String(finalValue);
        };
        counter.textContent = "0";
        frame = requestAnimationFrame(tick);
      });
    };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.matches("[data-counter-group]")) animateCounters(entry.target);
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -36px" });
    document.querySelectorAll(".reveal, [data-counter-group]").forEach((item) => observer.observe(item));
    return () => { observer.disconnect(); cancelAnimationFrame(frame); root.classList.remove("motion-ready"); };
  }, []);
  return null;
}
