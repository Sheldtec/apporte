'use client';

import { useState } from 'react';
import Image from 'next/image';

const coreValues = [
  { 
    title: 'Reliability', 
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="25" cy="50" r="20" fill="#044D22" />
        <circle cx="55" cy="50" r="20" fill="#044D22" />
        <circle cx="40" cy="35" r="15" fill="#066B30" />
      </svg>
    )
  },
  { 
    title: 'Speed', 
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <path d="M20 25 L45 25 L35 40 L55 40 L25 65 L35 45 L15 45 Z" fill="#044D22" />
      </svg>
    )
  },
  { 
    title: 'Transparency', 
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="30" cy="45" r="18" fill="#044D22" />
        <circle cx="50" cy="45" r="18" fill="#066B30" />
      </svg>
    )
  },
  { 
    title: 'Customer First', 
    icon: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#044D22" strokeWidth="8" />
        <circle cx="40" cy="40" r="20" fill="none" stroke="#066B30" strokeWidth="6" />
        <circle cx="40" cy="40" r="10" fill="#044D22" />
      </svg>
    )
  },
];

const teams = [
  { name: 'Operations', description: 'Our Operations team is the backbone of Apporte. They ensure every package moves seamlessly through our network, managing riders, routes, and logistics to deliver on our promise of fast and reliable service.' },
  { name: 'Technology', description: 'The Technology team builds and maintains the systems that power Apporte. From real-time tracking to our mobile apps, they create innovative solutions that make logistics simple and transparent.' },
  { name: 'Customer Success', description: 'Our Customer Success team is dedicated to ensuring every customer has an exceptional experience. They handle inquiries, resolve issues, and gather feedback to continuously improve our service.' },
  { name: 'Growth', description: 'The Growth team drives expansion across Nigeria. They are dedicated to increasing our coverage, penetrating new markets, and building partnerships that extend our reach.' },
];

const faqs = [
  { q: 'What is Apporte?', a: 'Apporte is a technology-driven logistics company that provides delivery services across Nigeria. We connect businesses and individuals with reliable riders to ensure packages are delivered quickly and safely.' },
  { q: 'How do I track my package?', a: 'You can track your package using the waybill number provided when you booked your shipment. Simply visit our Track page and enter your waybill number for real-time updates.' },
  { q: 'What cities do you deliver to?', a: 'We currently deliver to over 150 cities across Nigeria, including Lagos, Abuja, Port Harcourt, Kano, and many more. We\'re constantly expanding our coverage.' },
  { q: 'How long does delivery take?', a: 'Delivery times vary based on the service selected. Express delivery takes 2-4 hours within major cities, while standard shipping takes 1-3 days for nationwide delivery.' },
  { q: 'Is my package insured?', a: 'Yes, all packages are covered by our standard insurance policy. For high-value items, we offer additional insurance options at checkout.' },
];

export default function AboutPage() {
  const [activeTeam, setActiveTeam] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <>
      {/* Hero Section - Chowdeck Style with Artistic Elements */}
      <section className="relative overflow-hidden bg-[#FFF5E6] min-h-[70vh]">
        {/* Wavy cream shape at top */}
        <div className="absolute top-0 left-0 right-0 w-full">
          <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 0H1440V50C1200 90 900 100 720 100C540 100 200 80 0 50V0Z" fill="white" />
          </svg>
        </div>

        {/* Decorative Floating Circles */}
        <div className="absolute top-20 left-[10%] w-20 h-20 rounded-full bg-[#FFB11D]/20 animate-pulse" />
        <div className="absolute top-40 right-[15%] w-12 h-12 rounded-full bg-[#044D22]/10" />
        <div className="absolute top-32 left-[25%] w-8 h-8 rounded-full bg-[#FFB11D]/30" />
        
        {/* Decorative Flowing Curve - Left */}
        <svg className="absolute left-0 top-1/4 w-48 h-64 opacity-20" viewBox="0 0 200 300" fill="none">
          <path d="M0 150C50 50 150 100 100 200C50 300 150 250 200 150" stroke="#044D22" strokeWidth="3" fill="none" />
          <path d="M20 180C70 80 170 130 120 230" stroke="#FFB11D" strokeWidth="2" fill="none" />
        </svg>

        {/* Decorative Dots Pattern - Right */}
        <svg className="absolute right-[20%] top-24 w-32 h-32 opacity-30" viewBox="0 0 100 100">
          <circle cx="10" cy="10" r="3" fill="#044D22" />
          <circle cx="30" cy="10" r="3" fill="#044D22" />
          <circle cx="50" cy="10" r="3" fill="#044D22" />
          <circle cx="10" cy="30" r="3" fill="#044D22" />
          <circle cx="30" cy="30" r="3" fill="#FFB11D" />
          <circle cx="50" cy="30" r="3" fill="#044D22" />
          <circle cx="10" cy="50" r="3" fill="#044D22" />
          <circle cx="30" cy="50" r="3" fill="#044D22" />
          <circle cx="50" cy="50" r="3" fill="#FFB11D" />
        </svg>

        {/* Decorative Wavy Line - Center */}
        <svg className="absolute left-1/2 -translate-x-1/2 bottom-[40%] w-96 h-16 opacity-20" viewBox="0 0 400 60" fill="none">
          <path d="M0 30C100 0 200 60 300 30C350 15 400 30 400 30" stroke="#044D22" strokeWidth="2" strokeDasharray="8 4" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-56 relative">
          {/* Large Heading */}
          <h1 
            className="text-center text-[#044D22]"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(3rem, 9vw, 6.5rem)', 
              fontWeight: 700, 
              lineHeight: 1,
              letterSpacing: '-0.02em'
            }}
          >
            Delivering Excellence
          </h1>
        </div>

        {/* Rider Illustration - Left Side */}
        <div className="absolute bottom-4 left-[2%] sm:left-[5%] lg:left-[8%] z-10">
          <Image 
            src="/images/rider-illustration.png" 
            alt="Delivery Rider" 
            width={180} 
            height={140}
            className="object-contain w-20 sm:w-28 lg:w-44 h-auto"
          />
        </div>

        {/* Trees Illustration - Right Side */}
        <div className="absolute bottom-0 right-[2%] sm:right-[3%] lg:right-[5%]">
          <Image 
            src="/images/trees-illustration.png" 
            alt="Trees" 
            width={400} 
            height={200}
            className="object-contain w-32 sm:w-48 lg:w-96 h-auto"
          />
        </div>

        {/* Green Ground Line */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#044D22]" />
      </section>

      {/* Founder's Story Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12">
            {/* Left Side - Dark Green */}
            <div className="lg:col-span-4 bg-[#044D22] p-8 lg:p-12 relative">
              {/* Label with dot */}
              <div className="flex items-center gap-3 mb-12">
                <span className="w-3 h-3 rounded-full bg-[#FFB11D]" />
                <span className="text-white font-semibold text-lg">Founder&apos;s Story</span>
              </div>

              {/* Founder Image Placeholder */}
              <div className="aspect-[3/4] max-w-[280px] mx-auto rounded-3xl bg-gray-300 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              {/* Founder Name */}
              <div className="text-center mt-8">
                <p className="text-white font-bold text-xl">Adaeze Okonkwo</p>
                <p className="text-white/60 text-sm uppercase tracking-widest mt-1">CEO / FOUNDER</p>
              </div>
            </div>

            {/* Right Side - White */}
            <div className="lg:col-span-8 bg-white p-8 lg:p-16">
              <div className="max-w-2xl space-y-6 text-gray-700 leading-relaxed">
                <p>
                  I sent a package to my mother in December 2019. It never arrived. After weeks of 
                  back-and-forth with the logistics company, they simply said it was &quot;lost in transit.&quot; 
                  No explanation, no compensation, no accountability.
                </p>
                
                <p>
                  During my frustrating experience, I realised no one was really looking into the 
                  logistics problem with the care and attention it deserved. I started asking questions; 
                  most answers ended with &quot;riders are not reliable&quot;, then I made a lot of research and 
                  discovered delivery companies in other countries made millions of deliveries daily. 
                  It didn&apos;t make sense that at such a scale, we Nigerians couldn&apos;t figure it out.
                </p>

                <p>
                  We initially approached the problem from a technical standpoint then realised the 
                  problem was more operations than tech and we needed to deconstruct operations before 
                  trying again. We went back to first principles to figure this out. We pulled funds 
                  from our pockets, got three bikes and riders.
                </p>

                <p>
                  With a better understanding of what we believed the problem was, we knew our solution 
                  had to be efficient and easy to use. This was hard to pull as we struggled with 
                  iterations before settling with one. It was a lot harder building the product as we 
                  had to ensure equal dedication to all channels (riders, businesses and customers).
                </p>

                <p>
                  We built the first version in 3 months and launched in Lagos. Since then, it&apos;s been 
                  an incredible journey learning and building for our customers. Today, we serve over 
                  150 cities with a 99.2% delivery success rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section with Artistic Elements */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="#044D22" strokeWidth="40" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-5">
          <svg viewBox="0 0 200 200" fill="none">
            <rect x="20" y="20" width="160" height="160" stroke="#FFB11D" strokeWidth="30" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 
              className="text-[#044D22] inline"
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 700 
              }}
            >
              Core Values
            </h2>
            <span className="text-gray-400 text-lg ml-4">What keeps us grounded</span>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <div 
                key={i} 
                className="relative bg-[#FFF8E7] rounded-3xl p-6 lg:p-8 aspect-[3/4] flex flex-col group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFB11D]/20 rounded-bl-[40px] transform translate-x-4 -translate-y-4 group-hover:bg-[#FFB11D]/30 transition-colors" />
                </div>
                
                {/* Decorative Bottom Pattern */}
                <svg className="absolute bottom-0 left-0 w-full h-16 opacity-10" viewBox="0 0 200 50" preserveAspectRatio="none">
                  <path d="M0 50C50 30 100 50 150 30C175 20 200 30 200 30V50H0Z" fill="#044D22" />
                </svg>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#044D22]/10 flex items-center justify-center">
                  <span className="text-[#044D22] text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <h3 
                  className="text-gray-900 text-lg lg:text-2xl mb-auto mt-8"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  {value.title}
                </h3>
                <div className="w-full h-28 lg:h-32 mt-auto relative z-10">
                  {value.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Section - Dark Green */}
      <section className="py-24 bg-[#044D22] relative overflow-hidden">
        {/* Decorative circle badge */}
        <div className="absolute top-8 right-8 w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center">
          <span className="text-[#FFB11D] text-3xl">★</span>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Teams List */}
            <div>
              <h2 
                className="text-white mb-12"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                  fontWeight: 700 
                }}
              >
                Teams.
              </h2>

              <div className="space-y-6">
                {teams.map((team, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTeam(i)}
                    className={`flex items-center gap-4 text-left w-full group transition-colors ${
                      activeTeam === i ? '' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-white/40 text-sm font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span 
                      className={`text-2xl lg:text-3xl font-bold transition-colors ${
                        activeTeam === i ? 'text-[#FFB11D]' : 'text-white'
                      }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {team.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Focus Description */}
            <div>
              <h2 
                className="text-white mb-12"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                  fontWeight: 700 
                }}
              >
                Focus.
              </h2>

              <div className="bg-[#FFF5E6] rounded-3xl p-8 lg:p-10">
                <span className="text-[#FFB11D] text-2xl mb-4 block">★</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {teams[activeTeam].description}
                </p>
              </div>
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
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
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
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
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

      {/* Join Us CTA */}
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
            Join our team
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            We&apos;re always looking for talented people to join our mission of transforming logistics in Nigeria.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-[#044D22] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            View Open Positions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
