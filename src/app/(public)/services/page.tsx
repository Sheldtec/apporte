'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: 'Express Delivery',
    description: 'Need it there fast? Our express service delivers within 2-4 hours in major cities. Priority handling ensures your urgent packages get the attention they deserve.',
    features: ['Same-day delivery', '2-4 hour window', 'Real-time tracking', 'Priority handling'],
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <path d="M20 25 L45 25 L35 40 L55 40 L25 65 L35 45 L15 45 Z" fill="#1F2937" />
      </svg>
    ),
  },
  {
    title: 'Standard Shipping',
    description: 'Reliable nationwide delivery for all your regular shipping needs. Affordable rates with full insurance coverage on every package.',
    features: ['1-3 day delivery', 'Nationwide coverage', 'Affordable rates', 'Full insurance'],
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <rect x="15" y="25" width="50" height="35" rx="4" fill="#A78BFA" />
        <rect x="25" y="35" width="30" height="15" rx="2" fill="#8B5CF6" />
      </svg>
    ),
  },
  {
    title: 'Business Solutions',
    description: 'Custom logistics solutions designed for e-commerce and enterprise clients. Scale your operations with a dedicated partner.',
    features: ['Dedicated account manager', 'Custom pricing', 'API integration', 'Analytics dashboard'],
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="25" cy="50" r="18" fill="#A78BFA" />
        <circle cx="55" cy="50" r="18" fill="#A78BFA" />
        <circle cx="40" cy="30" r="12" fill="#8B5CF6" />
      </svg>
    ),
  },
  {
    title: 'Warehousing',
    description: 'Complete warehousing and order fulfillment services. Store, pick, pack, and ship—all under one roof.',
    features: ['Warehouse storage', 'Pick & pack', 'Inventory management', 'Returns handling'],
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <rect x="15" y="35" width="50" height="30" fill="#A78BFA" />
        <polygon points="40,15 70,35 10,35" fill="#8B5CF6" />
      </svg>
    ),
  },
  {
    title: 'Bulk Logistics',
    description: 'Large-scale logistics for manufacturers and distributors. Move volume efficiently with our fleet management.',
    features: ['Volume discounts', 'Fleet management', 'Route optimization', 'Dedicated trucks'],
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="28" fill="none" stroke="#8B5CF6" strokeWidth="8" />
        <circle cx="40" cy="40" r="15" fill="none" stroke="#A78BFA" strokeWidth="6" />
      </svg>
    ),
  },
  {
    title: 'Return Logistics',
    description: 'Seamless returns management for e-commerce businesses. Make returns easy for your customers.',
    features: ['Easy returns portal', 'Quality inspection', 'Restocking', 'Refund processing'],
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <path d="M55 25 L35 25 L45 40 L25 40 L55 65 L45 45 L65 45 Z" fill="#8B5CF6" />
      </svg>
    ),
  },
];

const howItWorks = [
  { step: '01', title: 'Create Account', description: 'Sign up for free in less than 2 minutes' },
  { step: '02', title: 'Book Shipment', description: 'Enter pickup and delivery details' },
  { step: '03', title: 'We Pickup', description: 'Our rider collects your package' },
  { step: '04', title: 'Delivered!', description: 'Track and receive delivery confirmation' },
];

const pricingPlans = [
  { 
    name: 'Individual', 
    price: '₦1,500', 
    unit: '/shipment',
    description: 'For personal shipping needs',
    features: ['Real-time tracking', 'SMS notifications', 'Insurance coverage', 'Proof of delivery'],
    featured: false
  },
  { 
    name: 'Business', 
    price: '₦1,200', 
    unit: '/shipment',
    description: 'For growing businesses',
    features: ['Everything in Individual', '24/7 support', 'API access', 'Volume discounts'],
    featured: true
  },
  { 
    name: 'Enterprise', 
    price: 'Custom', 
    unit: '',
    description: 'For large organizations',
    features: ['Everything in Business', 'Dedicated manager', 'Custom integrations', 'SLA guarantee'],
    featured: false
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* Hero Section - Cream Background */}
      <section className="relative overflow-hidden bg-[#FFF5E6] min-h-[50vh]">
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
            Our Services
          </h1>
          <p className="text-center text-gray-600 text-xl mt-6 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to meet your unique needs.
          </p>
        </div>

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#044D22]" />
      </section>

      {/* Services Grid - Purple Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-[#044D22] inline"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                fontWeight: 700 
              }}
            >
              What We Offer
            </h2>
            <span className="text-gray-400 text-lg ml-4">Delivery solutions for everyone</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="bg-[#EDE9FE] rounded-3xl p-8 flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mb-6">
                  {service.icon}
                </div>
                <h3 
                  className="text-gray-900 text-2xl mb-3"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="text-gray-700 text-sm flex items-center gap-2">
                      <span className="text-[#044D22]">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Dark Green */}
      <section className="py-24 bg-[#044D22] relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-8 right-8 w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center">
          <span className="text-[#FFB11D] text-3xl">★</span>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Steps */}
            <div>
              <h2 
                className="text-white mb-12"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                  fontWeight: 700 
                }}
              >
                How It Works.
              </h2>

              <div className="space-y-6">
                {howItWorks.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`flex items-center gap-4 text-left w-full group transition-colors ${
                      activeStep === i ? '' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-white/40 text-sm font-mono">
                      {item.step}
                    </span>
                    <span 
                      className={`text-2xl lg:text-3xl font-bold transition-colors ${
                        activeStep === i ? 'text-[#FFB11D]' : 'text-white'
                      }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Description */}
            <div>
              <h2 
                className="text-white mb-12"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                  fontWeight: 700 
                }}
              >
                Details.
              </h2>

              <div className="bg-[#FFF5E6] rounded-3xl p-8 lg:p-10">
                <span className="text-[#FFB11D] text-2xl mb-4 block">★</span>
                <h3 
                  className="text-gray-900 text-2xl mb-4"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  {howItWorks[activeStep].title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {howItWorks[activeStep].description}. Our streamlined process ensures your packages 
                  are handled with care from start to finish. We provide real-time updates at every 
                  step so you always know where your shipment is.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-[#044D22] inline"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                fontWeight: 700 
              }}
            >
              Pricing.
            </h2>
            <span className="text-gray-400 text-lg ml-4">Simple, transparent pricing</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`rounded-3xl p-8 ${
                  plan.featured 
                    ? 'bg-[#FFB11D] relative' 
                    : 'bg-gray-50'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-8 px-4 py-1 bg-[#044D22] text-white text-xs font-bold rounded-full">
                    Popular
                  </span>
                )}
                <h3 
                  className="text-gray-900 text-xl mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span 
                    className="text-4xl text-gray-900"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-gray-500">{plan.unit}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="text-gray-700 text-sm flex items-center gap-2">
                      <span className="text-[#044D22]">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                  <Button 
                    className={`w-full ${plan.featured ? 'bg-[#044D22] hover:bg-[#033D1B]' : ''}`}
                    variant={plan.featured ? 'default' : 'outline'}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#044D22]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 
            className="text-white mb-4"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700 
            }}
          >
            Ready to get started?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of businesses using Apporte for their logistics needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-white text-[#044D22] hover:bg-gray-100 px-8 rounded-full"
              >
                Create Free Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 rounded-full"
              >
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
