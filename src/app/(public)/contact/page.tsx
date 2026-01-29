'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const contactMethods = [
  {
    title: 'Email',
    value: 'hello@apporte.ng',
    description: 'For general inquiries',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Phone',
    value: '+234 800 277 6783',
    description: '24/7 customer support',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Office',
    value: '123 Victoria Island, Lagos',
    description: 'Mon - Fri, 8am - 6pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const faqs = [
  { q: 'How quickly can I expect a response?', a: 'We typically respond within 2 hours during business hours. For urgent matters, call our support line directly.' },
  { q: 'Do you offer partnerships?', a: 'Yes! We partner with businesses of all sizes. Select "Partnership" in the subject dropdown to get in touch with our partnerships team.' },
  { q: 'I have a complaint about a delivery', a: 'We\'re sorry to hear that. Please include your waybill number in your message so we can investigate and resolve the issue quickly.' },
  { q: 'What are your business hours?', a: 'Our offices are open Monday to Friday, 8am to 6pm. However, our customer support line is available 24/7.' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-[#FFF5E6]">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#044D22] flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 
            className="text-3xl text-[#044D22] mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}
          >
            Message Sent!
          </h1>
          <p className="text-gray-600 mb-8">
            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)} className="rounded-full px-8">
            Send Another Message
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section - Cream Background */}
      <section className="relative overflow-hidden bg-[#FFF5E6] min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
          <h1 
            className="text-center text-[#044D22]"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(3rem, 8vw, 6rem)', 
              fontWeight: 700, 
              lineHeight: 1,
              letterSpacing: '-0.03em'
            }}
          >
            Get in Touch
          </h1>
          <p className="text-center text-gray-600 text-xl mt-6 max-w-xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#044D22]" />
      </section>

      {/* Contact Methods - Purple Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, i) => (
              <div 
                key={i} 
                className="bg-[#EDE9FE] rounded-3xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white">
                  {method.icon}
                </div>
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                  {method.title}
                </p>
                <p 
                  className="text-xl text-gray-900 mb-1"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  {method.value}
                </p>
                <p className="text-gray-500 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section - Dark Green */}
      <section className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12">
            {/* Left Side - Dark Green */}
            <div className="lg:col-span-4 bg-[#044D22] p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-3 h-3 rounded-full bg-[#FFB11D]" />
                <span className="text-white font-semibold text-lg">Contact Form</span>
              </div>

              <h2 
                className="text-white mb-6"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                  fontWeight: 700 
                }}
              >
                Send us a message
              </h2>

              <p className="text-white/70 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              {/* Social Links */}
              <div className="mt-auto pt-12">
                <p className="text-white/50 text-sm uppercase tracking-widest mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {['X', 'IG', 'FB', 'LI'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors text-sm font-medium"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - White Form */}
            <div className="lg:col-span-8 bg-white p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      placeholder="Your Company (optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#044D22] focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="careers">Careers</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#044D22] focus:border-transparent resize-none"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-12 rounded-full" 
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Questions */}
            <div>
              <h2 
                className="text-[#044D22] mb-12"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                  fontWeight: 700 
                }}
              >
                FAQs.
              </h2>

              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFaq(i)}
                    className={`flex items-center justify-between w-full p-5 rounded-2xl text-left transition-all ${
                      activeFaq === i 
                        ? 'bg-gray-100' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`font-medium ${activeFaq === i ? 'text-gray-900' : 'text-gray-600'}`}>
                      {faq.q}
                    </span>
                    {activeFaq === i && (
                      <span className="text-[#044D22] text-xl">★</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Answer */}
            <div>
              <h2 
                className="text-[#044D22] mb-12"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                  fontWeight: 700 
                }}
              >
                Ans.
              </h2>

              <div className="bg-[#FFB11D] rounded-3xl p-8 lg:p-10">
                <span className="text-[#044D22] text-2xl mb-4 block">★</span>
                <p className="text-gray-900 text-lg leading-relaxed">
                  {faqs[activeFaq].a}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
