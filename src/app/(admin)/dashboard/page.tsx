'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { api, Waybill, InventoryItem, PaginatedResponse } from '@/lib/api/client';

interface DashboardStats {
  total_waybills: number;
  pending_waybills: number;
  in_transit: number;
  delivered_today: number;
  total_clients: number;
  active_riders: number;
  online_riders: number;
  open_tickets: number;
  pending_pickups: number;
  pending_deliveries: number;
}

interface DashboardData {
  stats: DashboardStats;
  monthly_revenue: number;
  recent_waybills: Waybill[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
    loadInventory();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.get<DashboardData>('/admin/dashboard');
      setData(response);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadInventory = async () => {
    try {
      const response = await api.get<PaginatedResponse<InventoryItem>>('/inventory', { per_page: 5 });
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to load inventory:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-12 w-64 bg-[hsl(var(--secondary))] rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-[hsl(var(--secondary))] rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-[hsl(var(--secondary))] rounded-xl animate-pulse" />
          <div className="h-80 bg-[hsl(var(--secondary))] rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Dashboard Overview</h1>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            Welcome back! Here&apos;s your business summary for today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/waybills/create">
            <Button className="bg-[#044D22] hover:bg-[#033a19] text-white">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Waybill
            </Button>
          </Link>
        </div>
      </div>

      {/* Revenue Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#044D22] to-[#066830] p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB11D]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-[#FFB11D]/5 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-white/70 text-sm mb-1">Monthly Revenue</p>
            <p className="text-4xl font-bold text-white">{formatCurrency(data?.monthly_revenue || 0)}</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FFB11D]">{data?.stats?.total_clients || 0}</p>
              <p className="text-white/70 text-xs">Active Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FFB11D]">{data?.stats?.active_riders || 0}</p>
              <p className="text-white/70 text-xs">Active Riders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#FFB11D]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Total Waybills</p>
                <p className="text-2xl font-bold mt-1">{data?.stats?.total_waybills || 0}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#FFB11D]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FFB11D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#044D22]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide">In Transit</p>
                <p className="text-2xl font-bold mt-1">{data?.stats?.in_transit || 0}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#044D22]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#044D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Delivered Today</p>
                <p className="text-2xl font-bold mt-1">{data?.stats?.delivered_today || 0}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Open Tickets</p>
                <p className="text-2xl font-bold mt-1">{data?.stats?.open_tickets || 0}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Waybills */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b border-[hsl(var(--border))] pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Waybills</CardTitle>
                <Link href="/waybills">
                  <Button variant="ghost" size="sm" className="text-[#044D22] hover:text-[#033a19]">
                    View All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[hsl(var(--border))]">
                {data?.recent_waybills?.length === 0 ? (
                  <div className="p-8 text-center text-[hsl(var(--muted-foreground))]">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No waybills yet</p>
                    <Link href="/waybills/create">
                      <Button size="sm" className="mt-3 bg-[#FFB11D] hover:bg-[#e69f1a] text-black">Create First Waybill</Button>
                    </Link>
                  </div>
                ) : (
                  data?.recent_waybills?.slice(0, 5).map((waybill) => (
                    <Link key={waybill.id} href={`/waybills/${waybill.id}`} className="block">
                      <div className="flex items-center justify-between p-4 hover:bg-[hsl(var(--secondary))]/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#FFB11D]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#FFB11D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-mono text-sm font-medium text-[#FFB11D]">{waybill.waybill_number}</p>
                            <p className="text-xs text-[hsl(var(--muted-foreground))]">
                              {waybill.sender_city} → {waybill.receiver_city}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge status={waybill.status} />
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                            {formatRelativeTime(waybill.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Rider Status */}
          <Card>
            <CardHeader className="border-b border-[hsl(var(--border))] pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Rider Status</CardTitle>
                <Link href="/riders">
                  <Button variant="ghost" size="sm" className="text-[#044D22] hover:text-[#033a19]">
                    Manage
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm">Online</span>
                  </div>
                  <span className="text-lg font-bold text-green-500">{data?.stats?.online_riders || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#FFB11D]/5 border border-[#FFB11D]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FFB11D]" />
                    <span className="text-sm">On Delivery</span>
                  </div>
                  <span className="text-lg font-bold text-[#FFB11D]">{data?.stats?.pending_deliveries || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-500/5 border border-gray-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-sm">Offline</span>
                  </div>
                  <span className="text-lg font-bold text-gray-400">
                    {Math.max(0, (data?.stats?.active_riders || 0) - (data?.stats?.online_riders || 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Preview */}
          <Card>
            <CardHeader className="border-b border-[hsl(var(--border))] pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Inventory</CardTitle>
                <Link href="/inventory">
                  <Button variant="ghost" size="sm" className="text-[#044D22] hover:text-[#033a19]">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {inventory.length === 0 ? (
                <div className="text-center py-6 text-[hsl(var(--muted-foreground))]">
                  <svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-sm">No inventory items</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {inventory.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[hsl(var(--secondary))]/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{item.sku}</p>
                      </div>
                      <div className="ml-3 px-2 py-1 rounded bg-[#044D22]/10 text-[#044D22] text-xs font-medium">
                        {item.quantity} units
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card>
            <CardHeader className="border-b border-[hsl(var(--border))] pb-4">
              <CardTitle className="text-lg">Pending Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <Link href="/waybills?status=pending" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FFB11D]/5 border border-transparent hover:border-[#FFB11D]/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB11D]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#FFB11D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm">Pending Waybills</span>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#FFB11D]/10 text-[#FFB11D] text-xs font-bold">
                    {data?.stats?.pending_waybills || 0}
                  </span>
                </div>
              </Link>
              <Link href="/waybills?status=pickup_scheduled" className="block">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#044D22]/5 border border-transparent hover:border-[#044D22]/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#044D22]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#044D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <span className="text-sm">Scheduled Pickups</span>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#044D22]/10 text-[#044D22] text-xs font-bold">
                    {data?.stats?.pending_pickups || 0}
                  </span>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
