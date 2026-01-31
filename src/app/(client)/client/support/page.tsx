'use client';

import { useState } from 'react';

const tickets = [
  { id: 'TKT-001', subject: 'Missing package', date: '30 Jan 2026', status: 'Open' },
  { id: 'TKT-002', subject: 'Refund request', date: '25 Jan 2026', status: 'Resolved' },
];

const faqs = [
  { q: 'How do I track my order?', a: 'Go to the Track Order page and enter your Order ID or Waybill number.' },
  { q: 'How long does delivery take?', a: 'Same-day delivery for local areas, 1-3 days for interstate deliveries.' },
  { q: 'How do I request a refund?', a: 'Contact support with your Order ID and reason for refund request.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled before rider pickup. Contact support immediately.' },
];

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
    setSubject('');
    setMessage('');
    setIsSubmitting(false);
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Support</h1>
        <p className="text-muted-foreground mt-0.5">Get help with your orders and account</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl border border-border/20 p-6">
            <h2 className="font-semibold text-foreground mb-4">Contact Support</h2>
            
            {isSuccess && (
              <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Message sent. We&apos;ll respond shortly.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What's this about?"
                  className="w-full h-11 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe your issue..."
                  className="w-full py-3 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#044D22] text-white font-medium rounded-xl hover:bg-[#033a19] disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Tickets */}
          <div className="bg-card rounded-2xl border border-border/20 overflow-hidden">
            <div className="p-4 border-b border-border/20">
              <h2 className="font-semibold text-foreground">Your Tickets</h2>
            </div>
            <div className="divide-y divide-border/10">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{ticket.subject}</p>
                    <p className="text-sm text-muted-foreground">{ticket.id} • {ticket.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    ticket.status === 'Open' 
                      ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-[#FFB11D]' 
                      : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              ))}
              {tickets.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">No support tickets</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Contact Options */}
          <div className="bg-card rounded-2xl border border-border/20 p-5">
            <h3 className="font-semibold text-foreground mb-4">Quick Contact</h3>
            <div className="space-y-3">
              <a href="tel:+2348000000000" className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Call Us</p>
                  <p className="text-xs text-muted-foreground">+234 800 000 0000</p>
                </div>
              </a>
              <a href="mailto:support@apporte.ng" className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email Us</p>
                  <p className="text-xs text-muted-foreground">support@apporte.ng</p>
                </div>
              </a>
              <button className="w-full flex items-center gap-3 p-3 bg-[#25D366]/10 rounded-xl hover:bg-[#25D366]/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Chat with us</p>
                </div>
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-card rounded-2xl border border-border/20 p-5">
            <h3 className="font-semibold text-foreground mb-4">FAQs</h3>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
                  >
                    {faq.q}
                    <svg className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-3 pb-3 text-sm text-muted-foreground">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
