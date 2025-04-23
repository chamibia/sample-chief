'use client'
import React, { useState } from 'react';
import { MapPin, Mail, User, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactForm () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This is where you would integrate with Mailchimp API
      // Example API call (would need your actual endpoint and API key)
      /*
      const DC = "your-data-center"; // Replace with your data center (e.g., us1)
      const LIST_ID = "your-list-id"; // Replace with your actual list ID
      const API_KEY = "your-api-key"; // Replace with your actual API key

      const response = await fetch(`https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('anystring:' + API_KEY)}`
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            NAME: name,
            COUNTRY: country,
            MESSAGE: message
          }
        })
      });
      const data = await response.json();
      */

      // Simulate API call success for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setName('');
      setEmail('');
      setCountry('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryOptions = [
    "United States", "Canada", "United Kingdom", "Australia", 
    "Germany", "France", "Japan", "Brazil", "India", "China",
    "Mexico", "Spain", "Italy", "South Africa", "Netherlands"
  ];

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mb-16">
          <h1 className="text-8xl font-bold brush-title">Contact Us</h1>
        </div>
        

        
        <div className="event-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <div className="contact-info-container">
                <h2 className="contact-section-title">How to Reach Us</h2>
                <p className="mb-8 text-[#4A4A4A] leading-relaxed">
                  Fill out the form and our team will get back to you within 24 hours. We're looking forward to hearing from you!
                </p>
                
                <div className="venue-info mb-8">
                  <div className="flex items-center">
                    <Mail className="icon text-[#006636]" />
                    <span>samplechief@.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7">
              <div className="form-container">
                <h2 className="contact-section-title">Send a Message</h2>
                
                {formStatus === 'success' && (
                  <div className="success-message mb-6 p-4 bg-[#e8f5e9] border border-[#a5d6a7] text-[#2e7d32] rounded-lg">
                    <p className="font-medium">Thank you for reaching out!</p>
                    <p>Your message has been received. We'll get back to you shortly.</p>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="error-message mb-6 p-4 bg-[#ffebee] border border-[#ef9a9a] text-[#c62828] rounded-lg">
                    <p className="font-medium">Something went wrong!</p>
                    <p>There was a problem sending your message. Please try again or contact us directly.</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="country" className="form-label">Country</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="form-input pl-10"
                        required
                      >
                        <option value="" disabled></option>
                        {countryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="ticket-button"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="h-4 w-4 ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SVG Filter for brush effects */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="brush-texture" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence baseFrequency="0.01" numOctaves="3" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
      
      {/* CSS for custom styling */}
      <style jsx global>{`
        /* Import brush font */
        @import url('https://fonts.cdnfonts.com/css/magic-brush');
        
        /* Brushstroke title */
        .brush-title {
          font-family: 'Magic Brush', sans-serif;
          color: #176B2F;
          text-align: right;
          line-height: 0.9;
          position: relative;
          z-index: 1;
        }
        
        /* Event counter styling */
        .event-counter {
          display: flex;
          align-items: center;
          gap: 12px;
          color:  #D72638;
          font-weight: 500;
        }
        
        .event-number {
          background-color: #D72638;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: bold;
        }
        
        /* Event card styling */
        .event-card {
          position: relative;
          padding: 2rem;
          border-radius: 12px;
          background-color: #FFFFFF;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Contact section styling */
        .contact-section-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #F4C430;
          margin-bottom: 1.5rem;
          font-family: 'Magic Brush', sans-serif;
        }
        
        .contact-info-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        /* Venue info */
        .venue-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: black;
        }
        
        .venue-info .icon {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
        
        /* Lineup section */
        .lineup {
          margin-top: 1.5rem;
        }
        
        .lineup-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 0.5rem;
        }
        
        .artist-tag {
          background-color: #F9F9F9;
          border: 1px solid #EEEEEE;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #006636;
        }
        
        /* Form styling */
        .form-container {
          height: 100%;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #1A1A1A;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #E0E0E0;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .form-input:focus {
          border-color: #006636;
          box-shadow: 0 0 0 3px rgba(0, 102, 54, 0.1);
          outline: none;
        }
        
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #E0E0E0;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          resize: vertical;
        }
        
        .form-textarea:focus {
          border-color: #006636;
          box-shadow: 0 0 0 3px rgba(0, 102, 54, 0.1);
          outline: none;
        }
        
        /* Ticket button */
        .ticket-button {
          display: inline-flex;
          align-items: center;
          background-color: #006636;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .ticket-button:hover {
          background-color: #005129;
          transform: translateY(-2px);
        }
        
        .ticket-button:disabled {
          background-color: #84c7a4;
          cursor: not-allowed;
          transform: none;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .brush-title {
            text-align: center;
            font-size: 4rem;
          }
          
          .contact-section-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

