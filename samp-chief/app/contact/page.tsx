"use client";

import React, { useState, useEffect } from "react";
import { getNames } from "country-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight} from 'lucide-react';
import { radikalHeavy, radikalLight, radikalRegular } from "../layout";
import clsx from "clsx";

export default function NewsletterSignup() {
  const [showBanner, setShowBanner] = useState(true)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const countries = getNames();

  useEffect(() => {
    const onScroll = () => setShowBanner(window.scrollY < 100)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
    <div>
      <div className={`overflow-hidden bg-[#dcf7cf] rounded-b-2xl transition-all duration-300 ${showBanner ? 'h-auto' : 'h-0'}`}>
        <div className="w-full mx-auto py-8 px-4 md:py-14 md:px-6">
        </div>
      </div>
      
      <div className="w-full px-5 md:px-9 text-gray-800 pt-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={clsx(
              radikalRegular.className, 
              "text-4xl md:text-5xl font-bold mb-6 tracking-wider"
            )}>
              Join the Community
            </h1>
            <p className={clsx(
            radikalRegular.className,"text-sm md:text-sm leading-relaxed mb-8")}>
              We're a global collective. Our sounds travel across borders, each curation telling a story. 
              Join a tribe of music lovers, tastemakers, and cultural connectors shaping the next wave.
            </p>
            <div className="w-16 h-1 bg-[#2E8B57] mx-auto rounded-full"></div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {formStatus === "success" && (
              <div className="px-6 py-4 mb-8 bg-[#2E8B57] bg-opacity-10 border border-[#2E8B57] text-[#2E8B57] rounded-lg text-center">
                {statusMessage}
              </div>
            )}
            {formStatus === "error" && (
              <div className="px-6 py-4 mb-8 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
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
                    className={clsx(
                      radikalRegular.className, "w-full bg-transparent border-0 border-b-2 border-gray-300 py-4 px-0 text-lg focus:outline-none focus:border-[#2E8B57] transition-colors duration-300 group-hover:border-gray-400")}
                  />
                </div>
                <div className="relative group">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={clsx(
                      radikalRegular.className, "w-full bg-transparent border-0 border-b-2 border-gray-300 placeholder-gray-500 py-4 px-0 text-lg focus:outline-none focus:border-[#2E8B57] transition-colors duration-300 group-hover:border-gray-400")}
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
                    className={clsx(
                      radikalRegular.className, "w-full bg-transparent border-0 border-b-2 border-gray-300 py-4 px-0 text-lg focus:outline-none focus:border-[#2E8B57] transition-colors duration-300 group-hover:border-gray-400")}
                  />
                </div>
                <div className="relative group">
                  <select
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className={clsx(
                      radikalRegular.className, "w-full bg-transparent border-0 border-b-2 border-gray-300 py-4 px-0 text-lg focus:outline-none focus:border-[#2E8B57] appearance-none transition-colors duration-300 cursor-pointer group-hover:border-gray-400")}
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
                    <svg className="w-5 h-5 group-hover:text-[#2E8B57] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                 className={clsx(radikalRegular.className, "bg-transparent border-2 border-gray-800 hover:bg-[#2E8B57] hover:border-[#2E8B57] hover:text-white rounded-full text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed")}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Joining...</span>
                  ) : (
                    <>
                      Join
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <h3 className={clsx(radikalRegular.className, "text-xl font-semibold mb-4")}>
                Stay in the Loop
              </h3>
              <p className={clsx(
            radikalRegular.className, "mb-6 leading-relaxed")}> Sign up to get early access to our events, merch drops, and curated discoveries.<br />
            We'll only hit your inbox when there's something worth hearing. </p>
              <div className="flex justify-center items-center space-x-2">
                <span className={clsx(radikalRegular.className,"text-sm")} >Email:</span>
                <a 
                  href="mailto:contactus@samplechief.com" 
                  className="text-[#2E8B57] hover:underline transition-all duration-300 font-medium"
                >
                  contactus@samplechief.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="pb-16 md:pb-32"></div>
    </div>
  )
}