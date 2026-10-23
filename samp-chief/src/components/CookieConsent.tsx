"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import GoogleAnalytics from "@/components/GoogleAnalytics";

const CONSENT_KEY = "sample-chief-cookie-consent";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

type ConsentChoice = "accepted" | "declined";

export default function CookieConsent() {
  // null = not yet determined (avoids a flash of the banner on first paint
  // before localStorage has been read)
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
    setHasChecked(true);
  }, []);

  function choose(choice: ConsentChoice) {
    localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  }

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}

      {hasChecked && consent === null && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[60] bg-[#202020] text-white px-5 py-4 md:py-5"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="font-sans font-light text-sm text-center md:text-left flex-1">
              We use cookies to understand how visitors use this site and improve your experience.
              See our{" "}
              <Link href="/privacy" className="underline hover:text-gray-300">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => choose("declined")}
                className="font-sans font-medium text-sm px-5 py-2 rounded-full border border-white/40 hover:border-white transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => choose("accepted")}
                className="font-sans font-medium text-sm px-5 py-2 rounded-full bg-white text-[#202020] hover:bg-gray-200 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
