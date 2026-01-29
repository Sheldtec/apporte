'use client';

import { AuthProvider } from '@/lib/auth-context';
import { Sidebar } from '@/components/dashboard/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[hsl(var(--background))]">
        <Sidebar />
        <div className="pl-64">
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
