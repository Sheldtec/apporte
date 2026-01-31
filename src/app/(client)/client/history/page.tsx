'use client';

import { useState } from 'react';

const orders = [
  { id: 'APT-20260131001', date: '31 Jan 2026', receiver: 'Alice Johnson', address: '42 Allen Avenue, Ikeja', amount: 3500, status: 'In Transit' },
  { id: 'APT-20260130002', date: '30 Jan 2026', receiver: 'Bob Smith', address: '15 Awolowo Rd, Ikoyi', amount: 2000, status: 'Delivered' },
  { id: 'APT-20260129003', date: '29 Jan 2026', receiver: 'Carol Williams', address: '8 Marina, Lagos Island', amount: 5000, status: 'Delivered' },
  { id: 'APT-20260128004', date: '28 Jan 2026', receiver: 'David Brown', address: '23 Akin Adesola, VI', amount: 3500, status: 'Delivered' },
  { id: 'APT-20260127005', date: '27 Jan 2026', receiver: 'Eve Davis', address: '10 Admiralty Way, Lekki', amount: 2000, status: 'Delivered' },
  { id: 'APT-20260126006', date: '26 Jan 2026', receiver: 'Frank Miller', address: '5 Adeola Odeku, VI', amount: 5000, status: 'Cancelled' },
];

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  'Pending': { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', dot: 'bg-gray-400' },
  'In Transit': { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-[#FFB11D]', dot: 'bg-[#FFB11D]' },
  'Delivered': { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'Cancelled': { bg: 'bg-red-50 dark:bg-red-500/10', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500' },
};

export default function OrderHistoryPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === statusFilter);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Order History</h1>
          <p className="text-muted-foreground mt-0.5">View all your past deliveries</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'in transit', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                statusFilter === status
                  ? 'bg-[#044D22] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-card rounded-2xl border border-border/20 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/20">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Receiver</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {filteredOrders.map((order) => {
                const status = statusStyles[order.status] || statusStyles['Pending'];
                return (
                  <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-mono text-sm font-medium text-foreground">{order.id}</td>
                    <td className="p-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="p-4 text-sm text-foreground">{order.receiver}</td>
                    <td className="p-4 text-sm font-semibold text-foreground">₦{order.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#044D22] dark:text-[#FFB11D] text-sm font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-border/10">
          {filteredOrders.map((order) => {
            const status = statusStyles[order.status] || statusStyles['Pending'];
            return (
              <div key={order.id} className="p-4" onClick={() => setSelectedOrder(order)}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-sm font-medium text-foreground">{order.id}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">To: {order.receiver}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                  <p className="font-semibold text-foreground">₦{order.amount.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-card rounded-2xl max-w-md w-full p-6 border border-border/20" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-semibold text-foreground">{selectedOrder.id}</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full ${statusStyles[selectedOrder.status]?.bg} ${statusStyles[selectedOrder.status]?.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[selectedOrder.status]?.dot}`} />
                  {selectedOrder.status}
                </span>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Receiver</span>
                  <span className="text-foreground">{selectedOrder.receiver}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Address</span>
                  <span className="text-foreground text-right max-w-[180px]">{selectedOrder.address}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border/20">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-bold text-[#044D22] dark:text-[#FFB11D] text-lg">₦{selectedOrder.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {selectedOrder.status === 'In Transit' && (
                  <button className="flex-1 py-3 bg-[#044D22] text-white font-medium rounded-xl hover:bg-[#033a19] transition-colors">
                    Track Order
                  </button>
                )}
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 bg-muted text-muted-foreground font-medium rounded-xl hover:bg-muted/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
