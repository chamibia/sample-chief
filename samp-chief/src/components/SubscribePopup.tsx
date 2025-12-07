"use client";

import { getNames } from "country-list";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect,useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import popupImage from "../../public/assets/images/popupimage.jpeg";

const countries = getNames();

export default function SubscribePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const hasSeenPopup = localStorage.getItem('subscribePopupSeen');
    const hasSubscribed = localStorage.getItem('hasSubscribed');
    
    if (hasSeenPopup || hasSubscribed) {
      return; // Don't show popup
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitStatus({ type: null, message: "" });

    if (!email.trim() || !country.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Both email and country are required.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, country }),
      });

      const result = await response.json();

      if (response.ok) {
        let successMessage = "";
        if (typeof result.message === "string") {
          successMessage = result.message;
        } else if (result.message && typeof result.message === "object") {
          // if it's some structured object, pick a field or stringify
          successMessage =
            typeof result.message.detail === "string"
              ? result.message.detail
              : JSON.stringify(result.message);
        } else {
          successMessage = "Successfully subscribed to our newsletter!";
        }

        setSubmitStatus({
          type: "success",
          message: successMessage,
        });

        localStorage.setItem('hasSubscribed', 'true');
        setTimeout(() => setIsOpen(false), 2500);
      } else {
        // Normalize error message
        let errorMessage = "";
        if (typeof result.error === "string") {
          errorMessage = result.error;
        } else if (result.error && typeof result.error === "object") {
          // e.g. Next.js might send { title, status, detail, instance }
          if (typeof result.error.detail === "string") {
            errorMessage = result.error.detail;
          } else {
            errorMessage = JSON.stringify(result.error);
          }
        } else {
          errorMessage = "Failed to subscribe. Please try again.";
        }

        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-in fade-in duration-300 ease-in">
      <div className="relative w-full max-w-[280px] sm:max-w-xs rounded-lg bg-white shadow-lg overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-500 ease-in">
        <button
          onClick={() => {
            setIsOpen(false);
            localStorage.setItem('subscribePopupSeen', 'true');
          }}
          className="absolute right-4 top-4 z-10 bg-white border border-black rounded-full p-2 shadow-md transition-colors duration-200 flex items-center justify-center cursor-pointer hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="text-black font-bold" size={15} />
        </button>

        <div className="relative h-64 w-full">
          <Image
            src={popupImage}
            alt="Subscribe"
            fill
            sizes="(max-width: 640px) 100vw, 280px"
            className="object-cover object-top"
            priority
          />
        </div>

        <div className="w-full p-3 sm:p-4 flex flex-col items-center">
          <h2 className="font-ruder mb-4 text-2xl sm:text-3xl font-medium text-center">
            Stay in the loop
          </h2>
          <p className="font-sans mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 text-center">
            We'll only hit your inbox when there's something worth hearing.
          </p>
          {submitStatus.type && (
            <div
              className={`mb-4 w-full rounded-md p-3 text-center ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={onSubmit} className=" font-sans font-light w-full space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-sans font-lightmb-1 text-sm font-medium text-black"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="mb-1 text-sm font-medium text-black font-sans"
              >
                Country
              </label>
              <select
                id="country"
                className="w-full rounded font-light border border-gray-300 bg-white px-3 py-2 font-alte text-gray-700 focus:border-[#2E8B57] focus:outline-none"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={isSubmitting}
                autoComplete="country-name"
              >
                <option className="font-alte" value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full font-sans text-sm sm:text-base text-white bg-[#07693A] hover:bg-[#2E8B57]/90 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
