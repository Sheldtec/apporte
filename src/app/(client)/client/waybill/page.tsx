'use client';

import { useState } from 'react';

export default function WaybillPickupPage() {
  const [waybillNumber, setWaybillNumber] = useState('');
  const [pickupAddress, setPickupAddress] = useState('15 Admiralty Way, Lekki Phase 1, Lagos');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waybillNumber.trim()) {
      setError('Please enter a waybill number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-[#044D22] flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Pickup Request Submitted!</h2>
        <p className="text-muted-foreground mb-6">A rider will be dispatched to collect your package.</p>
        <div className="bg-muted/30 rounded-xl p-4 mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Waybill:</span><span className="font-mono font-semibold text-foreground">{waybillNumber}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Pickup:</span><span className="font-medium text-foreground">{pickupAddress}</span></div>
            {scheduleDate && <div className="flex justify-between"><span className="text-muted-foreground">Scheduled:</span><span className="font-medium text-foreground">{scheduleDate} {scheduleTime}</span></div>}
          </div>
        </div>
        <button
          onClick={() => { setIsSuccess(false); setWaybillNumber(''); setScheduleDate(''); setScheduleTime(''); }}
          className="px-6 py-3 bg-[#044D22] text-white font-medium rounded-full hover:bg-[#033a19] transition-colors"
        >
          Request Another Pickup
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Waybill Pickup</h1>
        <p className="text-muted-foreground mt-0.5">Request a rider to pickup your package using a waybill</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border/20 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Waybill Number</label>
              <input
                type="text"
                value={waybillNumber}
                onChange={(e) => setWaybillNumber(e.target.value.toUpperCase())}
                placeholder="e.g., WB-12345678"
                className="w-full h-12 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground font-mono focus:outline-none focus:bg-card focus:border-[#044D22] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Pickup Address</label>
              <textarea
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                rows={2}
                className="w-full py-3 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">Your default address is pre-filled.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Schedule Pickup (Optional)</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full h-12 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all"
                />
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full h-12 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Leave empty for immediate pickup</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl text-sm text-red-600 dark:text-red-400">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#FFB11D] text-[#044D22] font-semibold rounded-xl hover:bg-[#f9a50a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  Request Pickup
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="space-y-5">
          <div className="bg-card rounded-2xl border border-border/20 p-5">
            <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
            <div className="space-y-3">
              {[
                { step: 1, text: 'Enter your waybill number' },
                { step: 2, text: 'Confirm your pickup address' },
                { step: 3, text: 'Optionally schedule a pickup time' },
                { step: 4, text: 'A rider will be dispatched' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#044D22] text-white text-xs flex items-center justify-center font-medium">
                    {item.step}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-500/10 p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-400">What is a Waybill?</p>
                <p className="text-xs text-blue-700 dark:text-blue-400/70 mt-1">
                  A waybill is a tracking document for pre-arranged shipments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
