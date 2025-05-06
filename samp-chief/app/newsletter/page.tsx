"use client";

import React, { useState } from "react";
import { getNames } from "country-list";
import Image from "next/image";
import sampleGif from "/public/assets/small.gif";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  const countries = getNames();

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
    <div className="overflow-y-auto">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: showBanner ? 1 : 0,
          height: showBanner ? "auto" : "0px",
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-[#e7fedc] rounded-b-3xl border-b-2 border-black"
      >
        <div className="w-full lg:w-4/5 mx-auto py-8 px-4 md:py-14 md:px-6">
          <h2 className="leading-none text-[3rem] md:text-[6rem] text-gray-800">
            Newsletter
          </h2>
        </div>
      </motion.div>

      <div className="relative w-full lg:w-4/5 mx-auto px-4 md:px-6 pt-20 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-4 py-8 bg-transparent backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
            Join our Community
          </h2>

          {formStatus === "success" && (
            <div className="px-4 py-2 mb-4 bg-green-600 bg-opacity-50 text-white rounded">
              {statusMessage}
            </div>
          )}
          {formStatus === "error" && (
            <div className="px-4 py-2 mb-4 bg-red-600 bg-opacity-50 text-white rounded">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className=""
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="newsletter"
              />
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <select
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border-b-2 border-gray-400 bg-transparent p-2 placeholder-gray-300 focus:border-yellow-400 focus:outline-none"
            >
              <option value="" disabled>
                Country
              </option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-wide hover:scale-105 transition-transform disabled:opacity-50"
            >
              {isSubmitting ? "Sending…" : "Subscribe"}
            </Button>
          </form>

          <p className="text-center mt-6">
            <a
              href="mailto:contactus@samplechief.com"
              className="text-[#2E8B57] hover:underline"
            >
              contactus@samplechief.com
            </a>
          </p>
        </motion.div>
      </div>

      <div className="pb-30 md:pb-60"></div>
    </div>
  );
}
