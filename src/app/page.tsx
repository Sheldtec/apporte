import { Navbar, Footer } from '@/components/layout/navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeroCarousel } from '@/components/ui/hero-carousel';

const heroImages = [
  { src: '/hero-1.png', alt: 'Delivery truck on highway', caption: 'Nationwide Delivery Coverage' },
  { src: '/hero-2.png', alt: 'Warehouse operations', caption: 'State-of-the-Art Warehousing' },
  { src: '/hero-3.png', alt: 'Happy customer receiving package', caption: 'Customer Satisfaction First' },
  { src: '/hero-4.png', alt: 'Fleet of delivery vehicles', caption: 'Modern Fleet Ready to Serve' },
];

const stats = [
  { 
    value: '50K+', 
    label: 'Monthly Deliveries',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z" fill="currentColor"/>
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-600'
  },
  { 
    value: '150+', 
    label: 'Cities Covered',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
      </svg>
    ),
    gradient: 'from-emerald-500 to-teal-600'
  },
  { 
    value: '99.2%', 
    label: 'Success Rate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
      </svg>
    ),
    gradient: 'from-blue-500 to-indigo-600'
  },
  { 
    value: '24/7', 
    label: 'Support Available',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z" fill="currentColor"/>
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-600'
  },
];

const whyChooseUs = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" fill="currentColor"/>
      </svg>
    ),
    title: 'Lightning Fast',
    description: 'Same-day and next-day delivery options across Nigeria with express logistics.',
    color: '#FFB11D',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="currentColor"/>
      </svg>
    ),
    title: 'Secure & Insured',
    description: 'Every shipment is fully insured and protected with end-to-end security.',
    color: '#0CC40F',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="currentColor"/>
      </svg>
    ),
    title: 'Real-Time Tracking',
    description: 'GPS-enabled updates at every delivery stage with live notifications.',
    color: '#3B82F6',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/>
      </svg>
    ),
    title: 'Competitive Pricing',
    description: 'Transparent pricing with no hidden fees. Get instant quotes online.',
    color: '#10B981',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" fill="currentColor"/>
      </svg>
    ),
    title: 'Dedicated Support',
    description: '24/7 customer support via phone, email, and live chat assistance.',
    color: '#8B5CF6',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
      </svg>
    ),
    title: 'Wide Coverage',
    description: '150+ cities with reliable last-mile delivery across Nigeria.',
    color: '#EC4899',
  },
];

const services = [
  { icon: '🚀', title: 'Express Delivery', description: '2-4 hours in major cities', accent: '#FFB11D' },
  { icon: '📦', title: 'Standard Shipping', description: '1-3 days nationwide', accent: '#0CC40F' },
  { icon: '🏢', title: 'Business Solutions', description: 'Custom logistics for enterprise', accent: '#FFB11D' },
  { icon: '📋', title: 'Inventory Management', description: 'Warehousing & fulfillment', accent: '#0CC40F' },
];

const locations = [
  { city: 'Lagos', address: 'Victoria Island HQ', type: 'Headquarters' },
  { city: 'Abuja', address: 'Garki District', type: 'Regional Hub' },
  { city: 'Port Harcourt', address: 'GRA Phase 2', type: 'Regional Hub' },
  { city: 'Kano', address: 'Sabon Gari', type: 'Service Center' },
  { city: 'Ibadan', address: 'Ring Road', type: 'Service Center' },
  { city: 'Enugu', address: 'Independence Layout', type: 'Service Center' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FFFBF5]">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-64 h-64 border-[12px] border-[#FFB11D]/20 rounded-full hidden lg:block" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#0CC40F]/10 rounded-full hidden lg:block" />
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-[#FFB11D] rounded-full hidden lg:block animate-float" />
          
          <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border-2 border-gray-200 shadow-sm mb-8">
                  <span className="w-3 h-3 rounded-full bg-[#0CC40F]"></span>
                  <span className="text-sm font-bold uppercase tracking-wide text-gray-700">Nigeria&apos;s #1 Logistics Partner</span>
                </div>
                
                {/* Headline */}
                <h1 className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                  Delivering <span className="text-[#FFB11D]">Excellence</span> Across Nigeria
                </h1>
                
                {/* Subheadline */}
                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                  Fast, reliable, and secure logistics solutions for businesses and individuals. 
                  Track your shipments in real-time, anywhere, anytime.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Shipping
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/track">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Track Shipment
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-8 flex-wrap">
                  {['Fully Insured', 'GPS Tracking', '24/7 Support'].map((badge) => (
                    <div key={badge} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#0CC40F] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-bold text-gray-700">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Carousel */}
              <div className="relative mt-10 lg:mt-0">
                <HeroCarousel images={heroImages} interval={4000} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Feature Cards - Left Side */}
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 order-last lg:order-first">
                {/* Easy Booking */}
                <div>
                  <div className="w-14 h-14 mb-5">
                    <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
                      {/* Clipboard base */}
                      <rect x="10" y="8" width="36" height="44" rx="4" fill="#E8F5E9" stroke="#0A2E3C" strokeWidth="2"/>
                      {/* Clipboard clip */}
                      <rect x="18" y="4" width="20" height="10" rx="3" fill="#0A2E3C"/>
                      <rect x="22" y="6" width="12" height="6" rx="2" fill="#E8F5E9"/>
                      {/* Lines */}
                      <path d="M18 26h20M18 34h16M18 42h12" stroke="#0A2E3C" strokeWidth="2" strokeLinecap="round"/>
                      {/* Check badge */}
                      <circle cx="44" cy="16" r="10" fill="#0CC40F"/>
                      <path d="M39 16l3 3 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2E3C] mb-3">Easy Booking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We have an unmatched portfolio of bespoke logistics solutions. We can help you move your goods from any point.
                  </p>
                </div>

                {/* Live Tracking */}
                <div>
                  <div className="w-14 h-14 mb-5">
                    <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
                      {/* Outer ring */}
                      <circle cx="28" cy="24" r="18" fill="#E8F5E9" stroke="#0CC40F" strokeWidth="2"/>
                      {/* Middle ring */}
                      <circle cx="28" cy="24" r="12" stroke="#0CC40F" strokeWidth="2" strokeDasharray="4 2"/>
                      {/* Center dot */}
                      <circle cx="28" cy="24" r="6" fill="#0CC40F"/>
                      <circle cx="28" cy="24" r="3" fill="white"/>
                      {/* Stand */}
                      <path d="M28 42v8M22 50h12" stroke="#0A2E3C" strokeWidth="2.5" strokeLinecap="round"/>
                      {/* Signal waves */}
                      <path d="M42 10c3 3 5 7 5 12" stroke="#0CC40F" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M46 6c4 4 7 10 7 16" stroke="#0CC40F" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2E3C] mb-3">Live Tracking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Watch your items go from pick up to delivery in real time. We provide real-time tracking and up-to-the-minute status reports.
                  </p>
                </div>

                {/* Seamless Delivery */}
                <div>
                  <div className="w-14 h-14 mb-5">
                    <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
                      {/* Truck body */}
                      <rect x="4" y="16" width="32" height="24" rx="3" fill="#E8F5E9" stroke="#0A2E3C" strokeWidth="2"/>
                      {/* Truck cabin */}
                      <path d="M36 24h10l6 10v6a2 2 0 01-2 2h-14V24z" fill="#0A2E3C" stroke="#0A2E3C" strokeWidth="2"/>
                      {/* Window */}
                      <path d="M40 26h6l4 6h-10v-6z" fill="#E8F5E9"/>
                      {/* Wheels */}
                      <circle cx="14" cy="42" r="6" fill="#0CC40F" stroke="#0A2E3C" strokeWidth="2"/>
                      <circle cx="14" cy="42" r="2" fill="white"/>
                      <circle cx="44" cy="42" r="6" fill="#0CC40F" stroke="#0A2E3C" strokeWidth="2"/>
                      <circle cx="44" cy="42" r="2" fill="white"/>
                      {/* Package */}
                      <rect x="12" y="22" width="16" height="12" rx="1" fill="#FFB11D" stroke="#0A2E3C" strokeWidth="1.5"/>
                      <path d="M20 22v12M12 28h16" stroke="#0A2E3C" strokeWidth="1"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2E3C] mb-3">Seamless Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We offer a full range of delivery solutions. We work with reliable partners to ensure prompt and consistent deliveries.
                  </p>
                </div>

                {/* Dedicated Support */}
                <div>
                  <div className="w-14 h-14 mb-5">
                    <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
                      {/* Chat bubble */}
                      <path d="M28 6C15 6 4 15 4 26c0 4 1.5 7.5 4 10.5L4 48l12-4c3.5 2 8 3 12 3 13 0 24-9 24-21S41 6 28 6z" fill="#E8F5E9" stroke="#0CC40F" strokeWidth="2"/>
                      {/* Headset */}
                      <path d="M18 28c0-6 4.5-10 10-10s10 4 10 10" stroke="#0A2E3C" strokeWidth="2.5" strokeLinecap="round"/>
                      {/* Left ear */}
                      <rect x="14" y="26" width="6" height="10" rx="3" fill="#0A2E3C"/>
                      {/* Right ear */}
                      <rect x="36" y="26" width="6" height="10" rx="3" fill="#0A2E3C"/>
                      {/* Mic */}
                      <path d="M28 38v4M24 42h8" stroke="#0CC40F" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2E3C] mb-3">Dedicated Support</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We provide dedicated support during business hours to assist with your delivery inquiries and ensure the best experience.
                  </p>
                </div>
              </div>

              {/* Delivery Rider Image - Right Side */}
              <div className="flex items-center justify-center order-first lg:order-last">
                <img 
                  src="/delivery-rider.png" 
                  alt="Apporte Delivery Rider" 
                  className="w-full max-w-lg h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Minimal Artistic Design */}
        <section className="relative py-28 lg:py-32 overflow-hidden">
          {/* Minimal Deep Green Background */}
          <div className="absolute inset-0 bg-[#044D22]">
            {/* Subtle Grain Texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            
            {/* Artistic Single Curve */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="30%" stopColor="white" stopOpacity="0.08" />
                  <stop offset="70%" stopColor="white" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Elegant Flowing Curve */}
              <path 
                d="M-100,400 C200,100 400,500 720,250 S1200,400 1540,200" 
                fill="none" 
                stroke="url(#curveGrad)" 
                strokeWidth="1" 
              />
              <path 
                d="M-100,450 C250,150 450,550 750,300 S1250,450 1540,250" 
                fill="none" 
                stroke="url(#curveGrad)" 
                strokeWidth="0.5" 
              />
            </svg>
            
            {/* Single Accent Circle */}
            <div className="absolute -bottom-40 -right-40 w-80 h-80 border border-white/[0.04] rounded-full" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Clean Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block text-[#FFB11D] text-sm font-semibold uppercase tracking-[0.3em] mb-4">Our Impact</span>
              
              <h2 className="text-white mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Numbers That Define Us
              </h2>
              
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Trusted by businesses across Nigeria
              </p>
            </div>

            {/* Minimal Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 mx-auto group-hover:bg-white/15 transition-colors`}>
                    {stat.icon}
                  </div>
                  
                  {/* Value */}
                  <div 
                    className="text-5xl lg:text-6xl font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-white/50 font-medium text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Minimal Bottom Line */}
            <div className="mt-16 flex justify-center">
              <div className="flex items-center gap-4 text-white/40">
                <div className="w-12 h-px bg-white/20" />
                <span className="text-sm font-medium">Since 2020</span>
                <div className="w-12 h-px bg-white/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="w-20 h-1 bg-[#FFB11D] mx-auto mb-6" />
              <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive logistics solutions tailored to your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <Card key={i} hover elevated>
                  <CardContent className="p-8 text-center">
                    <div 
                      className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg"
                      style={{ backgroundColor: `${service.accent}20` }}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Premium Creative Design */}
        <section className="relative py-24 bg-gradient-to-b from-[#FFFBF5] to-white overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-20 right-10 w-64 h-64 border-[20px] border-[#FFB11D]/5 rounded-full" />
            <div className="absolute bottom-40 left-10 w-40 h-40 bg-[#0CC40F]/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#FFB11D]/5 to-transparent rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-lg shadow-gray-100 border border-gray-100 mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FFB11D] to-[#FF8C00] animate-pulse" />
                <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">Why Choose Us</span>
              </div>
              
              <h2 className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2 }}>
                The <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB11D] to-[#FF8C00]">Apporte</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path d="M0 7 Q 50 0, 100 7" stroke="#FFB11D" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span> Advantage
              </h2>
              
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Discover why thousands of businesses trust us with their logistics needs
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {whyChooseUs.map((item, i) => (
                <div 
                  key={i} 
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2">
                    {/* Number Badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center font-bold text-white shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      0{i + 1}
                    </div>
                    
                    {/* Icon Container */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Bottom Accent Line */}
                    <div 
                      className="absolute bottom-0 left-8 right-8 h-1 rounded-t-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner */}
            <div className="mt-20">
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB11D]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0CC40F]/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      Ready to experience the difference?
                    </h3>
                    <p className="text-gray-400">
                      Join 10,000+ satisfied customers shipping with Apporte
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFB11D] to-[#FF8C00] text-black font-bold hover:shadow-lg hover:shadow-[#FFB11D]/30 transition-all duration-300 hover:-translate-y-1">
                      Get Started
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Track Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gray-900 rounded-3xl p-12 md:p-20 relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB11D]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <h2 className="text-white mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>Track Your Shipment</h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Enter your waybill number to get real-time updates on your package location.
                  </p>
                  
                  <form className="flex flex-col sm:flex-row gap-4" action="/track">
                    <input
                      type="text"
                      name="waybill"
                      placeholder="Enter waybill number"
                      className="flex-1 h-14 px-6 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FFB11D] text-lg font-medium"
                    />
                    <Button size="lg" className="h-14 px-8">
                      Track Now
                    </Button>
                  </form>

                  <p className="text-gray-500 text-sm mt-4 font-medium">
                    Example: AWB240128ABCDEF
                  </p>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-gray-800 rounded-2xl p-8 border-2 border-gray-700">
                    <div className="space-y-5">
                      {['Package Received', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i < 3 ? 'bg-[#0CC40F] text-white' : 'bg-gray-700 text-gray-500'}`}>
                            {i < 3 ? '✓' : i + 1}
                          </div>
                          <span className={`font-medium ${i < 3 ? 'text-white' : 'text-gray-500'}`}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-24 bg-[#FFFBF5]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="w-20 h-1 bg-[#FFB11D] mx-auto mb-6" />
              <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>Our Locations</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Strategically located across Nigeria to serve you better
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#FFB11D] hover:shadow-lg transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#FFB11D] flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-[#FFB11D] font-bold uppercase tracking-wide">{location.type}</span>
                      <h3 className="text-xl font-bold text-gray-900">{location.city}</h3>
                      <p className="text-gray-500">{location.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#FFB11D]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-black mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
              Ready to Start Shipping?
            </h2>
            <p className="text-xl text-black/70 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses and individuals who trust Apporte for their logistics needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-black text-white hover:bg-gray-900 px-10">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white px-10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
