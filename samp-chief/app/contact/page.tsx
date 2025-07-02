"use client";

import React, { useState, useEffect } from "react";
import { getNames } from "country-list";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

export default function NewsletterSignup() {
  const [showBanner, setShowBanner] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const bottomVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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
        setStatusMessage(data.error?.title || "Something went wrong—please try again.");
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-radikal font-light leading-relaxed text-4xl md:text-5xl mb-6 tracking-wider text-gray-700">
              Join the Community
            </h1>
            <p className="font-radikal font-light mb-8 leading-relaxed text-base md:text-lg lg:text-xl text-gray-700">
              We're a global collective. Our sounds travel across borders, each curation telling a story.
              Join a tribe of music lovers, tastemakers, and cultural connectors shaping the next wave.
            </p>
            <div className="w-16 h-1 bg-[#2E8B57] mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
             {formStatus === "success" && (
              <div className="mb-4 px-4 py-2 bg-[#2E8B57] text-white rounded text-center font-radikal font-light w-50 opacity-90">
                {statusMessage}
              </div>
            )}
            {formStatus === "error" && (
              <div className="mb-4 px-4 py-2 bg-red-100 text-red-800 rounded">
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
                    className="font-radikal font-normal leading-relaxed text-base w-full text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#2E8B57] transition-colors duration-300 group-hover:border-gray-400"
                  />
                </div>
                <div className="relative group">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="font-radikal font-normal leading-relaxed text-base w-full text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#2E8B57] transition-colors duration-300 group-hover:border-gray-400"
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
                  className="font-radikal font-normal leading-relaxed text-base w-full text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#2E8B57] transition-colors duration-300 group-hover:border-gray-400"
                  />
                </div>
                <div className="relative group">
                  <select
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="font-radikal font-normal leading-relaxed text-base w-full text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 focus:outline-none focus:border-[#2E8B57] transition-colors duration-300 group-hover:border-gray-400"
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
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 group-hover:text-[#2E8B57] transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-radikal font-light leading-relaxed text-base bg-transparent border-2 border-gray-800 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center px-6 py-3 text-gray-700"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Joining...</span>
                  ) : (
                    <>
                      Join
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <motion.div
              variants={bottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mt-12 pt-8 border-t border-gray-200"
            >
              <h3 className="font-radikal font-light leading-relaxed text-gray-700 text-xl mb-4">
                Get in Touch
              </h3>
              <p className="font-radikal font-light mb-6 leading-relaxed text-gray-700">
                Curious about what we do or want to collaborate? Hit us up — we’d love to hear from you.
              </p>
              <div className="flex justify-center items-center space-x-2">
                <span className="font-radikal font-light leading-relaxed text-base text-gray-700">
                  Email:
                </span>
                <a
                  href="mailto:contactus@samplechief.com"
                  className="text-[#2E8B57] hover:underline transition-all duration-300 font-radikal font-light leading-relaxed text-base"
                >
                  contactus@samplechief.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Fixed bottom spacing for mobile */}
      <div className="pb-24 md:pb-16" 
           style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }} />
    </div>
  );
}