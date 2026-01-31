'use client';

import Link from 'next/link';

const recentOrders = [
  { id: 'APT-20260131001', date: 'Today, 10:30 AM', status: 'In Transit', amount: '₦3,500', receiver: 'Alice Johnson', from: 'Ikeja', to: 'Victoria Island' },
  { id: 'APT-20260130002', date: 'Yesterday, 2:15 PM', status: 'Delivered', amount: '₦2,000', receiver: 'Bob Smith', from: 'Lekki', to: 'Ikoyi' },
  { id: 'APT-20260129003', date: 'Jan 29, 9:00 AM', status: 'Delivered', amount: '₦5,000', receiver: 'Carol Williams', from: 'Surulere', to: 'Lagos Island' },
];

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  'Pending': { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400' },
  'In Transit': { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-[#FFB11D]', dot: 'bg-[#FFB11D]' },
  'Delivered': { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
};

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Good afternoon, John
        </h1>
        <p className="text-muted-foreground mt-0.5">Manage your deliveries and wallet</p>
      </div>

      {/* Main Grid - Wallet + Stats */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Wallet Card - Premium Standalone */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#044D22] via-[#056830] to-[#033a19] rounded-3xl p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-white/70 font-medium tracking-wide">WALLET BALANCE</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FFB11D]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
              </div>
            </div>
            
            <p className="text-4xl font-bold tracking-tight mb-1">₦25,000<span className="text-xl text-white/50">.00</span></p>
            <p className="text-sm text-white/60">Available balance</p>
            
            <div className="flex gap-3 mt-6">
              <Link
                href="/client/wallet"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FFB11D] text-[#044D22] font-semibold rounded-xl hover:bg-[#ffc34d] transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Funds
              </Link>
              <Link
                href="/client/wallet"
                className="flex items-center justify-center px-4 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-sm"
              >
                History
              </Link>
            </div>
          </div>
        </div>

        {/* Order Stats - Compact */}
        <div className="lg:col-span-3 bg-card rounded-3xl border border-border/20 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground">Order Overview</h2>
            <Link href="/client/history" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Total Orders */}
            <div className="text-center p-4 rounded-2xl bg-muted/30">
              <p className="text-3xl font-bold text-foreground">47</p>
              <p className="text-sm text-muted-foreground mt-1">Total Orders</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                +12 this month
              </p>
            </div>
            
            {/* Active */}
            <div className="text-center p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/5">
              <p className="text-3xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground mt-1">Active</p>
              <p className="text-xs text-[#FFB11D] mt-2 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB11D] animate-pulse" />
                In transit
              </p>
            </div>
            
            {/* Completed */}
            <div className="text-center p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5">
              <p className="text-3xl font-bold text-foreground">45</p>
              <p className="text-sm text-muted-foreground mt-1">Completed</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">96% success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Minimal */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        <Link
          href="/client/book"
          className="flex items-center gap-3 px-5 py-3 bg-[#044D22] text-white font-medium rounded-full whitespace-nowrap hover:bg-[#033a19] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          Book Delivery
        </Link>
        <Link
          href="/client/track"
          className="flex items-center gap-3 px-5 py-3 bg-card border border-border/30 text-foreground font-medium rounded-full whitespace-nowrap hover:bg-muted transition-colors"
        >
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          Track Order
        </Link>
        <Link
          href="/client/waybill"
          className="flex items-center gap-3 px-5 py-3 bg-card border border-border/30 text-foreground font-medium rounded-full whitespace-nowrap hover:bg-muted transition-colors"
        >
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          Waybill Pickup
        </Link>
      </div>

      {/* Active Delivery - Compact */}
      <div className="bg-card rounded-2xl border border-border/20 p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#FFB11D] animate-pulse" />
          <h2 className="font-semibold text-foreground">Active Delivery</h2>
          <Link href="/client/track" className="ml-auto text-sm text-[#044D22] dark:text-[#FFB11D] font-medium">
            Track →
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#044D22] flex items-center justify-center text-white font-semibold text-sm shrink-0">
            AO
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">APT-20260131001</p>
            <p className="text-sm text-muted-foreground truncate">Ikeja → Victoria Island</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-semibold text-foreground">₦3,500</p>
            <p className="text-xs text-[#FFB11D]">In Transit</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#044D22] to-[#056830] rounded-full" style={{ width: '75%' }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Picked up</span>
            <span className="text-[#FFB11D] font-medium">75%</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      {/* Recent Orders - Clean */}
      <div className="bg-card rounded-2xl border border-border/20">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
          <Link href="/client/history" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        
        <div className="divide-y divide-border/10">
          {recentOrders.map((order) => {
            const status = statusStyles[order.status];
            return (
              <div key={order.id} className="flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground truncate">{order.from} → {order.to}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="font-semibold text-foreground">{order.amount}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {order.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
