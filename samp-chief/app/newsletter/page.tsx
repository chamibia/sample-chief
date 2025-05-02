'use client'
import React, { useState } from 'react'
import { getNames } from 'country-list'
import Image from 'next/image'
import sampleGif from '../public/assets/small.gif'   

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'success'|'error'|null>(null)
  const [statusMessage, setStatusMessage] = useState('')

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
    <div className="flex flex-col items-center px-8 py-16 bg-[#e7fedc]">
      <div className="mb-12">
        <Image
          src="/assets/small.gif"
          alt="Newsletter"
          width={400}
          height={150}
          className="mx-auto rounded-lg"
        />
      </div>

    <div className='pt-10'>
      <div className="w-full max-w-2xl rounded-xl bg-white overflow-hidden">
        {/* header bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold"> NEWSLETTER</h2>
        </div>

        {/* messages */}
        {formStatus === 'success' && (
          <div className="px-6 py-3 bg-green-50 text-green-800">
            {statusMessage}
          </div>
        )}
        {formStatus === 'error' && (
          <div className="px-6 py-3 bg-red-50 text-red-800">
            {statusMessage}
          </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
          {/* Email */}
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Country + Subscribe button */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <select
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="" disabled>Country</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className="whitespace-nowrap px-6 py-3 bg-black hover:bg-white text-white font-medium rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Sending…' : 'Subscribe'}
            </button>
          </div>
        </form>
      </div>
      </div>
      <div className="pb-30 md:pb-45"></div>
    </div>
  )
}
