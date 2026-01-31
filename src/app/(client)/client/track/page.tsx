'use client';

import { useState } from 'react';

const trackingSteps = [
  { id: 1, name: 'Order Placed', time: '10:30 AM', desc: 'Order confirmed' },
  { id: 2, name: 'Rider Assigned', time: '10:35 AM', desc: 'Adebayo Ogundimu' },
  { id: 3, name: 'Picked Up', time: '10:50 AM', desc: 'Package collected' },
  { id: 4, name: 'In Transit', time: '11:15 AM', desc: 'On the way' },
  { id: 5, name: 'Delivered', time: null, desc: 'Awaiting delivery' },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const currentStep = 4;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOrderFound(true);
    setIsSearching(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Track Order</h1>
        <p className="text-muted-foreground mt-0.5">Enter your order ID to track your delivery</p>
      </div>

      {/* Search Box */}
      <div className="bg-card rounded-2xl border border-border/20 p-5">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.toUpperCase())}
              placeholder="Enter Order ID (e.g., APT-20260131001)"
              className="w-full h-12 pl-12 pr-4 bg-muted/30 border border-border/30 rounded-xl text-foreground font-medium focus:outline-none focus:bg-card focus:border-[#044D22] transition-all placeholder-muted-foreground"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !orderId.trim()}
            className="px-6 h-12 bg-[#044D22] text-white font-medium rounded-xl hover:bg-[#033a19] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Track
              </>
            )}
          </button>
        </form>
      </div>

      {/* Tracking Result */}
      {orderFound && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Tracking */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border/20 overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-[#044D22] via-[#056830] to-[#033a19] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
              </div>
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-white/60 mb-1">Order ID</p>
                  <p className="text-2xl font-bold text-white font-mono">{orderId || 'APT-20260131001'}</p>
                  <p className="text-sm text-white/60 mt-1">Est. delivery: 12:30 PM Today</p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFB11D] text-[#044D22] text-sm font-semibold rounded-full w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#044D22] animate-pulse" />
                  In Transit
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-6">Delivery Progress</h3>
              <div className="relative">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className={`flex gap-4 ${index < trackingSteps.length - 1 ? 'pb-8' : ''}`}>
                    <div className="relative flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        index < currentStep 
                          ? 'bg-[#044D22] text-white' 
                          : index === currentStep 
                            ? 'bg-[#FFB11D] text-[#044D22]' 
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {index < currentStep ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : index === currentStep ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ) : step.id}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={`absolute top-10 w-0.5 h-8 ${index < currentStep ? 'bg-[#044D22]' : 'bg-muted'}`} />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{step.desc}</span>
                        {step.time && <span>• {step.time}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Rider Info */}
            <div className="bg-card rounded-2xl border border-border/20 p-5">
              <h3 className="font-semibold text-foreground mb-4">Rider</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#044D22] flex items-center justify-center text-white font-semibold">
                  AO
                </div>
                <div>
                  <p className="font-medium text-foreground">Adebayo Ogundimu</p>
                  <p className="text-sm text-muted-foreground">4.9 ⭐ • 500+ deliveries</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href="tel:+2348034567890" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#044D22]/10 dark:bg-[#044D22]/20 text-[#044D22] dark:text-emerald-400 font-medium rounded-xl text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call
                </a>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-muted text-muted-foreground font-medium rounded-xl text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  Chat
                </button>
              </div>
            </div>

            {/* Route */}
            <div className="bg-card rounded-2xl border border-border/20 p-5">
              <h3 className="font-semibold text-foreground mb-4">Route</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#044D22] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="text-sm font-medium text-foreground">15 Admiralty Way, Lekki</p>
                  </div>
                </div>
                <div className="ml-1 border-l-2 border-dashed border-border h-4" />
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-[#044D22] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Delivery</p>
                    <p className="text-sm font-medium text-foreground">42 Allen Avenue, Ikeja</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Package */}
            <div className="bg-card rounded-2xl border border-border/20 p-5">
              <h3 className="font-semibold text-foreground mb-4">Package</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item</span>
                  <span className="font-medium text-foreground">Documents</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receiver</span>
                  <span className="font-medium text-foreground">Alice Johnson</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/20">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-[#044D22] dark:text-[#FFB11D]">₦3,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!orderFound && !isSearching && (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Track Your Delivery</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Enter your Order ID to see real-time tracking updates.
          </p>
        </div>
      )}
    </div>
  );
}
