'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login, verify2FA } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.requires2FA && result.userId) {
        setRequires2FA(true);
        setUserId(result.userId);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (userId) {
        await verify2FA(userId, twoFactorCode);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid 2FA code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {/* Full-bleed Image */}
        <Image
          src="/images/hero-rider.png"
          alt="Apporte Delivery Rider"
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#044D22]/90 via-[#044D22]/40 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-10">

          {/* Bottom Content */}
          <div>
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              Delivering Excellence,<br />
              <span className="text-[#FFB11D]">Every Time.</span>
            </h1>
            <p className="text-white/90 text-lg mb-6 max-w-md drop-shadow">
              Enterprise logistics management for modern businesses.
            </p>
            
            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold text-[#FFB11D]">10K+</p>
                <p className="text-white/70 text-sm">Deliveries Daily</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FFB11D]">500+</p>
                <p className="text-white/70 text-sm">Active Riders</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#FFB11D]">99.5%</p>
                <p className="text-white/70 text-sm">On-Time Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (Light Theme) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-8">
            <Image
              src="/images/apporte-logo.png"
              alt="Apporte Delivery"
              width={200}
              height={60}
              className="w-auto h-12"
              priority
            />
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {requires2FA ? 'Two-Factor Authentication' : 'Welcome back'}
            </h2>
            <p className="text-gray-500">
              {requires2FA 
                ? 'Enter the code from your authenticator app' 
                : 'Sign in to your account to continue'}
            </p>
          </div>

          {!requires2FA ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#044D22] focus:ring-[#044D22] focus:ring-offset-0" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm text-[#044D22] hover:text-[#033a19] font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#044D22] hover:bg-[#033a19] text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#044D22]/25"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Don&apos;t have an account?{' '}
                  <a href="/register" className="text-[#044D22] hover:text-[#033a19] font-medium transition-colors">
                    Contact Sales
                  </a>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handle2FA} className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#044D22]/10 mb-4">
                  <svg className="w-8 h-8 text-[#044D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 text-center">
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  className="w-full h-14 text-center text-2xl tracking-[0.5em] bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || twoFactorCode.length !== 6}
                className="w-full h-12 bg-[#044D22] hover:bg-[#033a19] text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#044D22]/25"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setRequires2FA(false);
                  setTwoFactorCode('');
                  setError('');
                }}
                className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors py-2"
              >
                ← Back to login
              </button>
            </form>
          )}

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-8">
            © 2026 Apporte Logistics. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
