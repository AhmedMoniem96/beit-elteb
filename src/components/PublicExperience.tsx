"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

export function PublicExperience({
  locale,
  logoUrl,
}: {
  locale: Locale;
  logoUrl?: string | null;
}) {
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const progressTimer = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const visited = window.sessionStorage.getItem("bait-alteeb-entry");
    if (!visited && !reduced) {
      window.sessionStorage.setItem("bait-alteeb-entry", "seen");
      setShowLoader(true);
      const timer = window.setTimeout(() => setShowLoader(false), 980);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const startProgress = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        link.target === "_blank" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname
      )
        return;
      setProgress(true);
      if (progressTimer.current) window.clearTimeout(progressTimer.current);
      progressTimer.current = window.setTimeout(() => setProgress(false), 700);
    };
    document.addEventListener("click", startProgress);
    return () => {
      document.removeEventListener("click", startProgress);
      if (progressTimer.current) window.clearTimeout(progressTimer.current);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`route-progress${progress ? " is-running" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`entry-loader${showLoader ? " is-active" : ""}`}
        aria-hidden={!showLoader}
      >
        <div className="entry-loader-inner">
          <div className="entry-logo">
            <img
              src={logoUrl?.trim() || "/brand/bait-alteeb-logo.png"}
              alt=""
            />
          </div>
          <svg className="entry-ecg" viewBox="0 0 240 32" aria-hidden="true">
            <path d="M1 17h64l9-1 7-12 12 26 10-20 8 7h128" />
          </svg>
        </div>
      </div>
      <div
        className={`mobile-booking-dock${nearFooter ? " is-near-footer" : ""}`}
      >
        <Link
          href={`/${locale}/book-appointment`}
          aria-label={locale === "ar" ? "احجز موعدك" : "Book Appointment"}
        >
          <span aria-hidden="true">+</span>
          {locale === "ar" ? "احجز موعدك" : "Book Appointment"}
          <b aria-hidden="true">{locale === "ar" ? "←" : "→"}</b>
        </Link>
      </div>
    </>
  );
}
