'use client'
import React, { useState } from 'react'
import { getNames } from 'country-list'
import Image from 'next/image'
import sampleGif from '../public/assets/small.gif'   
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion';


export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'success'|'error'|null>(null)
  const [statusMessage, setStatusMessage] = useState('')
    const [showBanner, setShowBanner] = useState(true);


  const countries = getNames()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)
    setStatusMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          country: address
        })
      })
      const data = await res.json()
      if (res.ok) {
        setFormStatus('success')
        setStatusMessage(data.message || "Thanks for subscribing!")
        if (!data.message?.includes("already subscribed")) {
          setFirstName('')
          setLastName('')
          setEmail('')
          setAddress('')
        }
      } else {
        setFormStatus('error')
        setStatusMessage(data.error?.title || "Something went wrong—please try again.")
      }
    } catch (err) {
      console.error(err)
      setFormStatus('error')
      setStatusMessage("Connection error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
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
        <div className="pb-10">
            <h2 className="leading-none text-[3rem] md:text-[6rem] text-gray-800">
              Newsletter
            </h2>
          </div>
        </div>
      </motion.div>

      <div className="w-full lg:w-4/5 mx-auto px-4 md:px-6 text-gray-800 pt-20 md:pt-40">        
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="max-w-2xl mx-auto rounded-xl bg-white overflow-hidden shadow-lg"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Join our Community</h2>
          </div>

          {formStatus === "success" && (
            <div className="px-6 py-3 bg-green-50 text-green-800">
              {statusMessage}
            </div>
          )}
          {formStatus === "error" && (
            <div className="px-6 py-3 bg-red-50 text-red-800">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <select
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none p-3"
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
                className="whitespace-nowrap p-6 bg-black hover:bg-[#F4C430] text-white font-medium rounded-md disabled:opacity-50"
              >
                {isSubmitting ? "Sending…" : "Subscribe"}
              </Button>
            </div>
          </form>
        </motion.div>

        <p className="text-center py-12">
          <a
            href="mailto:contactus@samplechief.com"
            className="text-[#2E8B57] text-[1rem] md:text-[1.5rem] hover:text-gray-600"
          >
            contactus@samplechief.com
          </a>
        </p>
      </div>

      <div className="pb-30 md:pb-50"></div>
    </div>
  )
}