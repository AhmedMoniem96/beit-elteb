"use client";

import { useEffect } from "react";

export function PublicMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -36px" });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => { observer.disconnect(); root.classList.remove("motion-ready"); };
  }, []);
  return null;
}
