'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TrackingResult {
  waybillNumber: string;
  status: string;
  sender: { name: string; city: string };
  receiver: { name: string; city: string };
  estimatedDelivery: string;
  timeline: Array<{
    status: string;
    location: string;
    date: string;
    time: string;
    completed: boolean;
  }>;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  'pending': { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Pending' },
  'picked_up': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Picked Up' },
  'in_transit': { bg: 'bg-[#FFB11D]', text: 'text-gray-900', label: 'In Transit' },
  'out_for_delivery': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Out for Delivery' },
  'delivered': { bg: 'bg-[#044D22]', text: 'text-white', label: 'Delivered' },
};

const faqs = [
  { q: 'Where can I find my waybill number?', a: 'Your waybill number is provided when you book a shipment. It\'s also included in your confirmation email and SMS.' },
  { q: 'How often is tracking updated?', a: 'Tracking information is updated in real-time as your package moves through our network.' },
  { q: 'What if my package is delayed?', a: 'If your package is delayed beyond the estimated delivery date, please contact our support team for assistance.' },
  { q: 'Can I change the delivery address?', a: 'Address changes may be possible before the package is out for delivery. Contact support immediately to request a change.' },
];

export default function TrackPage() {
  const [waybillNumber, setWaybillNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');
  const [activeFaq, setActiveFaq] = useState(0);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waybillNumber.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (waybillNumber.toLowerCase().includes('demo') || waybillNumber.length > 5) {
      setResult({
        waybillNumber: waybillNumber.toUpperCase(),
        status: 'in_transit',
        sender: { name: 'Tech Solutions Ltd', city: 'Lagos' },
        receiver: { name: 'John Adeyemi', city: 'Abuja' },
        estimatedDelivery: 'January 29, 2026',
        timeline: [
          { status: 'Package Received', location: 'Lagos Hub', date: 'Jan 28', time: '09:15 AM', completed: true },
          { status: 'Processing', location: 'Lagos Hub', date: 'Jan 28', time: '10:30 AM', completed: true },
          { status: 'In Transit', location: 'En route to Abuja', date: 'Jan 28', time: '02:45 PM', completed: true },
          { status: 'Arrived at Hub', location: 'Abuja Hub', date: 'Jan 29', time: '-', completed: false },
          { status: 'Out for Delivery', location: 'Abuja', date: 'Jan 29', time: '-', completed: false },
          { status: 'Delivered', location: 'Recipient Address', date: 'Jan 29', time: '-', completed: false },
        ],
      });
    } else {
      setError('No shipment found with this waybill number. Please check and try again.');
    }

    setIsLoading(false);
  };

  const statusInfo = result ? statusColors[result.status] || statusColors['pending'] : null;

  return (
    <>
      {/* Hero Section - Cream Background */}
      <section className="relative overflow-hidden bg-[#FFF5E6] min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
          <h1 
            className="text-center text-[#044D22] mb-6"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(3rem, 8vw, 6rem)', 
              fontWeight: 700, 
              lineHeight: 1,
              letterSpacing: '-0.03em'
            }}
          >
            Track Shipment
          </h1>
          <p className="text-center text-gray-600 text-xl mb-12 max-w-xl mx-auto">
            Enter your waybill number for real-time updates.
          </p>

          {/* Track Form */}
          <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-3 rounded-full shadow-lg">
              <Input
                id="waybill"
                placeholder="Enter waybill number (e.g., AWB240128DEMO)"
                value={waybillNumber}
                onChange={(e) => setWaybillNumber(e.target.value)}
                className="flex-1 h-14 text-lg border-0 focus:ring-0 rounded-full pl-6"
              />
              <Button 
                type="submit" 
                size="lg" 
                className="h-14 px-10 rounded-full" 
                isLoading={isLoading}
              >
                Track Now
              </Button>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Try: <span className="text-[#044D22] font-medium">AWB240128DEMO</span> for a sample result
            </p>
          </form>
        </div>

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#044D22]" />
      </section>

      {/* Results Section */}
      {(result || error) && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            {error ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 
                  className="text-2xl text-gray-900 mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  Shipment Not Found
                </h3>
                <p className="text-gray-500">{error}</p>
              </div>
            ) : result && (
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left - Summary */}
                <div className="lg:col-span-5">
                  <div className="bg-[#044D22] rounded-3xl p-8 text-white">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="w-3 h-3 rounded-full bg-[#FFB11D]" />
                      <span className="font-semibold">Shipment Details</span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Waybill</p>
                        <p className="text-2xl font-mono font-bold">{result.waybillNumber}</p>
                      </div>

                      <div>
                        <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Status</p>
                        {statusInfo && (
                          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                            {statusInfo.label}
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="text-white/50 text-sm uppercase tracking-widest mb-1">From</p>
                        <p className="font-semibold">{result.sender.name}</p>
                        <p className="text-white/70">{result.sender.city}</p>
                      </div>

                      <div>
                        <p className="text-white/50 text-sm uppercase tracking-widest mb-1">To</p>
                        <p className="font-semibold">{result.receiver.name}</p>
                        <p className="text-white/70">{result.receiver.city}</p>
                      </div>

                      <div className="pt-6 border-t border-white/20">
                        <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Est. Delivery</p>
                        <p className="text-xl font-bold">{result.estimatedDelivery}</p>
                        <p className="text-[#FFB11D] font-medium text-sm mt-1">★ On Track</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Timeline */}
                <div className="lg:col-span-7">
                  <div className="bg-[#FFF5E6] rounded-3xl p-8">
                    <h3 
                      className="text-[#044D22] mb-8"
                      style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600 }}
                    >
                      Tracking History.
                    </h3>
                    
                    <div className="space-y-4">
                      {result.timeline.map((event, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                              event.completed 
                                ? 'bg-[#044D22]' 
                                : 'bg-gray-300'
                            }`} />
                            {i < result.timeline.length - 1 && (
                              <div className={`w-0.5 flex-1 mt-1 ${
                                event.completed ? 'bg-[#044D22]' : 'bg-gray-300'
                              }`} />
                            )}
                          </div>
                          <div className={`flex-1 pb-4 ${!event.completed && 'opacity-50'}`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-gray-900 font-semibold">{event.status}</p>
                                <p className="text-gray-500 text-sm">{event.location}</p>
                              </div>
                              <div className="text-right text-sm">
                                <p className="text-gray-600">{event.date}</p>
                                <p className="text-gray-400">{event.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button variant="outline" className="rounded-full">
                      Download Receipt
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Share Tracking
                    </Button>
                    <Button variant="outline" className="rounded-full">
                      Report Issue
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-24 bg-white border-t border-gray-100">
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

      {/* Help CTA */}
      <section className="py-16 bg-[#044D22]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 
            className="text-white mb-4"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
              fontWeight: 700 
            }}
          >
            Need Help?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Can&apos;t find your shipment? Our support team is here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-[#044D22] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Support
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
