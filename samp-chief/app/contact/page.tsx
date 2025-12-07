"use client";

import { getNames } from "country-list";
// Use lighter CSS animations instead of framer-motion for form
import React, { useEffect,useState } from "react";

import { SubmitButton } from "@/components/ui/ProjectButton";

export default function NewsletterSignup() {
  const [showBanner, setShowBanner] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState("");

  const countries = getNames();

  useEffect(() => {
    const onScroll = () => setShowBanner(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When formStatus changes (success or error), clear it after 5s
  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus(null);
        setStatusMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    setStatusMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, country: address }),
      });
      const data = await res.json();

      if (res.ok) {
        setFormStatus("success");
        setStatusMessage(data.message || "Thanks for subscribing!");
        if (!data.message?.includes("already subscribed")) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setAddress("");
        }
      } else {
        setFormStatus("error");
        setStatusMessage(
          data.error?.title || "Something went wrong—please try again."
        );
      }
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setStatusMessage("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full px-5 md:px-9 text-gray-800 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Stacked Layout */}
          <div className="block lg:hidden">
            {/* Stay Connected Section - Mobile */}
            <div className="mb-16 animate-fade-in">
              <div className="text-center mb-12">
                <h1 className="font-ruder font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-[#202020]">
                  Stay Connected
                </h1>
                <p className="font-sans font-light mb-8 leading-relaxed text-base md:text-lg text-[#202020]">
                  Be part of a tribe of music lovers and tastemakers.
                </p>
                <div className="w-16 h-1 bg-[#07693A] mx-auto rounded-full" />
              </div>

              <div className="animate-fade-in-delayed">
                {formStatus === "success" && (
                  <div className="mb-4 px-4 py-2 bg-[#07693A] text-white rounded text-center font-sans font-light w-50 opacity-90">
                    {statusMessage}
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="mb-4 px-4 py-2 bg-red-100 text-[#DA232A] rounded">
                    {statusMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-8">
                    <div className="relative group">
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First Name *"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        id="email"
                        type="email"
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      />
                    </div>
                    <div className="relative group">
                      <select
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      >
                        <option value="" disabled className="bg-white">
                          Select Country *
                        </option>
                        {countries.map((c) => (
                          <option key={c} value={c} className="bg-white">
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <SubmitButton 
                      loading={isSubmitting} 
                      loadingText="Joining..."
                      disabled={isSubmitting}
                    >
                      Join
                    </SubmitButton>
                  </div>
                </form>
              </div>
            </div>

            {/* Get in Touch Section - Mobile */}
            <div className="text-center animate-fade-in-slow">
              <h1 className="font-ruder font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-[#202020]">
                Get in Touch
              </h1>
              <p className="font-sans font-light mb-8 leading-relaxed text-base md:text-lg text-[#202020]">
                Curious about what we do or want to collaborate? Hit us up — we'd love to hear from you.
              </p>
              <div className="w-16 h-1 bg-[#07693A] mx-auto rounded-full mb-8" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:contactus@samplechief.com"
                  className="font-sans font-light leading-relaxed text-base text-[#202020] hover:text-[#07693A] hover:underline transition-all duration-300"
                >
                  CONTACTUS@SAMPLECHIEF.COM
                </a>
              </div>
              
              {/* Video */}
              <div className="mt-8 flex justify-center">
                <video
                  className="w-full max-w-md"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.play().catch(console.error);
                  }}
                >
                  <source src="/assets/videos/sample.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Desktop: 2-Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            {/* Left Column - Stay Connected */}
            <div className="animate-fade-in">
              <div className="mb-12">
                <h1 className="font-ruder font-light leading-relaxed text-4xl xl:text-5xl mb-6 tracking-wider text-[#202020]">
                  Stay Connected
                </h1>
                <p className="font-sans font-light mb-8 leading-relaxed text-base xl:text-lg text-[#202020]">
                  Be part of a tribe of music lovers and tastemakers.
                </p>
                <div className="w-16 h-1 bg-[#07693A] rounded-full" />
              </div>

              <div className="animate-fade-in-delayed">
                {formStatus === "success" && (
                  <div className="mb-4 px-4 py-2 bg-[#07693A] text-white rounded text-center font-sans font-light opacity-90">
                    {statusMessage}
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="mb-4 px-4 py-2 bg-red-100 text-[#DA232A] rounded">
                    {statusMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-8">
                    <div className="relative group">
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First Name *"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        id="email"
                        type="email"
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      />
                    </div>
                    <div className="relative group">
                      <select
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="font-sans font-light leading-relaxed text-base w-full text-[#202020] bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#07693A] transition-colors duration-300 group-hover:border-gray-400"
                      >
                        <option value="" disabled className="bg-white">
                          Select Country *
                        </option>
                        {countries.map((c) => (
                          <option key={c} value={c} className="bg-white">
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none"></div>
                    </div>
                  </div>

                  <div>
                    <SubmitButton 
                      loading={isSubmitting} 
                      loadingText="Joining..."
                      disabled={isSubmitting}
                    >
                      Join
                    </SubmitButton>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Get in Touch */}
            <div className="animate-fade-in-slow flex flex-col h-full">
              <div className="mb-12">
                <h1 className="font-ruder font-light leading-relaxed text-4xl xl:text-5xl mb-6 tracking-wider text-[#202020]">
                  Get in Touch
                </h1>
                <p className="font-sans font-light mb-8 leading-relaxed text-base xl:text-lg text-[#202020]">
                  Curious about what we do or want to collaborate? Hit us up — we'd love to hear from you.
                </p>
                <div className="w-16 h-1 bg-[#07693A] rounded-full" />
              </div>
              
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:contactus@samplechief.com"
                  className="font-sans font-light leading-relaxed text-base text-[#202020] hover:text-[#07693A] hover:underline transition-all duration-300"
                >
                  CONTACTUS@SAMPLECHIEF.COM
                </a>
              </div>
              
              {/* Video positioned at bottom right */}
              <div className="flex-1 flex items-end justify-end mt-8">
                <video
                  className="w-full max-w-md"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.play().catch(console.error);
                  }}
                >
                  <source src="/assets/videos/sample.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom spacing for mobile */}
      <div
        className="pb-24 md:pb-16"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
      />
    </div>
  );
}
