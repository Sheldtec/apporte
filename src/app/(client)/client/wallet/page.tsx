'use client';

import { useState } from 'react';

const transactions = [
  { id: 1, type: 'credit', amount: 10000, date: '30 Jan 2026', time: '3:45 PM', method: 'Paystack', reference: 'PAY-8472916', status: 'Success' },
  { id: 2, type: 'debit', amount: 3500, date: '30 Jan 2026', time: '2:15 PM', description: 'APT-20260130001', status: 'Success' },
  { id: 3, type: 'credit', amount: 5000, date: '28 Jan 2026', time: '10:00 AM', method: 'Bank Transfer', reference: 'TRF-5829173', status: 'Success' },
  { id: 4, type: 'debit', amount: 2000, date: '27 Jan 2026', time: '4:30 PM', description: 'APT-20260127002', status: 'Success' },
  { id: 5, type: 'credit', amount: 15000, date: '25 Jan 2026', time: '11:20 AM', method: 'Paystack', reference: 'PAY-7361849', status: 'Success' },
];

export default function WalletPage() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'bank_transfer' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const walletBalance = 25000;

  const handleFund = async () => {
    if (!amount || !paymentMethod) return;
    
    setIsLoading(true);
    
    if (paymentMethod === 'bank_transfer') {
      setShowBankDetails(true);
      setIsLoading(false);
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Payment successful!');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Fund Account</h1>
        <p className="text-muted-foreground mt-0.5">Add funds to your wallet for seamless payments</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Funding Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <div className="relative bg-gradient-to-br from-[#044D22] via-[#056830] to-[#033a19] rounded-3xl p-6 lg:p-8 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
            </div>
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60 uppercase tracking-wide font-medium mb-2">Available Balance</p>
                <p className="text-4xl lg:text-5xl font-bold tracking-tight">₦{walletBalance.toLocaleString()}<span className="text-xl text-white/40">.00</span></p>
                <p className="text-sm text-white/50 mt-2">Last funded: 30 Jan 2026</p>
              </div>
              <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center">
                <svg className="w-8 h-8 text-[#FFB11D]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Funding Form */}
          <div className="bg-card rounded-2xl border border-border/20 p-6">
            <h2 className="font-semibold text-foreground mb-5">Add Funds</h2>
            
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground font-medium">₦</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full h-14 pl-10 pr-4 bg-muted/30 border border-border/30 rounded-xl text-2xl font-semibold text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-card focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/10 transition-all"
                />
              </div>
              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[1000, 2000, 5000, 10000, 20000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      amount === amt.toString()
                        ? 'bg-[#044D22] text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-3">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setPaymentMethod('paystack'); setShowBankDetails(false); }}
                  className={`relative flex items-center gap-4 p-4 border rounded-xl transition-all ${
                    paymentMethod === 'paystack'
                      ? 'border-[#044D22] bg-[#044D22]/5 dark:bg-[#044D22]/10'
                      : 'border-border/30 hover:border-border bg-card'
                  }`}
                >
                  {paymentMethod === 'paystack' && (
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#044D22] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-foreground block">Paystack</span>
                    <span className="text-xs text-muted-foreground">Card, Bank, USSD</span>
                  </div>
                </button>

                <button
                  onClick={() => { setPaymentMethod('bank_transfer'); setShowBankDetails(false); }}
                  className={`relative flex items-center gap-4 p-4 border rounded-xl transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#044D22] bg-[#044D22]/5 dark:bg-[#044D22]/10'
                      : 'border-border/30 hover:border-border bg-card'
                  }`}
                >
                  {paymentMethod === 'bank_transfer' && (
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#044D22] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-foreground block">Bank Transfer</span>
                    <span className="text-xs text-muted-foreground">Manual Transfer</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Bank Details */}
            {showBankDetails && paymentMethod === 'bank_transfer' && (
              <div className="mb-6 p-5 bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-xl">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                  Transfer Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Bank</span>
                    <span className="font-semibold text-foreground">GTBank</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Account</span>
                    <span className="font-mono font-semibold text-foreground">0123456789</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-semibold text-foreground">Apporte Logistics Ltd</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-[#044D22] dark:text-emerald-400">₦{parseInt(amount || '0').toLocaleString()}</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                  💡 Transfer exactly ₦{parseInt(amount || '0').toLocaleString()} and use your phone number as reference.
                </p>
                <button className="mt-4 w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm">
                  I&apos;ve Made This Transfer
                </button>
              </div>
            )}

            {/* Fund Button */}
            <button
              onClick={handleFund}
              disabled={!amount || !paymentMethod || isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#FFB11D] to-[#f9a50a] text-[#044D22] font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FFB11D]/20"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Fund Wallet
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column - Transaction History */}
        <div className="lg:col-span-1 bg-card rounded-2xl border border-border/20 overflow-hidden h-fit">
          <div className="p-5 border-b border-border/20">
            <h2 className="font-semibold text-foreground">Transactions</h2>
            <p className="text-sm text-muted-foreground">Recent activity</p>
          </div>
          <div className="divide-y divide-border/10 max-h-[500px] overflow-y-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-emerald-100 dark:bg-emerald-500/10' : 'bg-red-100 dark:bg-red-500/10'}`}>
                    {tx.type === 'credit' ? (
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {tx.type === 'credit' ? tx.method : tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <p className={`font-semibold text-sm ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border/20">
            <button className="w-full text-sm text-[#044D22] dark:text-[#FFB11D] font-medium hover:underline">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
