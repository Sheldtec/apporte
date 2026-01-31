'use client';

import { useState } from 'react';

const serviceAmounts = [
  { id: 1, label: 'Short Distance', desc: 'Within Local Area', price: 2000, time: '30-45 mins' },
  { id: 2, label: 'Medium Distance', desc: 'Inter-City Delivery', price: 3500, time: '1-2 hours' },
  { id: 3, label: 'Long Distance', desc: 'Interstate Delivery', price: 5000, time: '1-3 days' },
];

interface FormData {
  senderName: string;
  pickupPhone: string;
  pickupAddress: string;
  itemDescription: string;
  receiverName: string;
  receiverPhone: string;
  deliveryAddress: string;
  serviceAmountId: number | null;
  paymentMethod: 'wallet' | 'online' | null;
}

export default function BookRidePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const walletBalance = 25000;
  
  const [formData, setFormData] = useState<FormData>({
    senderName: 'John Doe',
    pickupPhone: '0801 234 5678',
    pickupAddress: '',
    itemDescription: '',
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    serviceAmountId: null,
    paymentMethod: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'pickupPhone' || name === 'receiverPhone') {
      setFormData(prev => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getSelectedService = () => serviceAmounts.find(s => s.id === formData.serviceAmountId);

  const validateStep = (step: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (step === 1) {
      if (!formData.senderName.trim()) newErrors.senderName = 'Required';
      if (!formData.pickupPhone.trim()) newErrors.pickupPhone = 'Required';
      if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Required';
      if (!formData.itemDescription.trim()) newErrors.itemDescription = 'Required';
    }
    
    if (step === 2) {
      if (!formData.receiverName.trim()) newErrors.receiverName = 'Required';
      if (!formData.receiverPhone.trim()) newErrors.receiverPhone = 'Required';
      if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'Required';
    }
    
    if (step === 3) {
      if (!formData.serviceAmountId) newErrors.serviceAmountId = 'Select a service';
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Select payment method';
      const selectedPrice = getSelectedService()?.price || 0;
      if (formData.paymentMethod === 'wallet' && selectedPrice > walletBalance) {
        newErrors.paymentMethod = 'Insufficient wallet balance';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSuccess(true);
    setIsLoading(false);
  };

  const steps = [
    { num: 1, label: 'Pickup' },
    { num: 2, label: 'Receiver' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Confirm' },
  ];

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-[#044D22] flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Booking Successful!</h2>
        <p className="text-muted-foreground mb-6">A rider will be assigned shortly.</p>
        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
          <p className="text-xl font-bold text-[#044D22] dark:text-[#FFB11D] font-mono">APT-{Date.now().toString().slice(-8)}</p>
        </div>
        <button
          onClick={() => { setIsSuccess(false); setCurrentStep(1); setFormData({ ...formData, pickupAddress: '', itemDescription: '', receiverName: '', receiverPhone: '', deliveryAddress: '', serviceAmountId: null, paymentMethod: null }); }}
          className="px-6 py-3 bg-[#044D22] text-white font-medium rounded-full hover:bg-[#033a19] transition-colors"
        >
          Book Another Ride
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Book a Ride</h1>
        <p className="text-muted-foreground mt-0.5">Request a delivery rider for your package</p>
      </div>

      {/* Step Indicator */}
      <div className="bg-card rounded-2xl border border-border/20 p-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" style={{ marginLeft: '12%', marginRight: '12%' }}>
            <div className="h-full bg-[#044D22] transition-all duration-300" style={{ width: `${((currentStep - 1) / 3) * 100}%` }} />
          </div>
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                step.num < currentStep 
                  ? 'bg-[#044D22] text-white' 
                  : step.num === currentStep 
                    ? 'bg-[#FFB11D] text-[#044D22]' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {step.num < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : step.num}
              </div>
              <p className={`mt-2 text-xs font-medium hidden sm:block ${step.num <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Pickup */}
          {currentStep === 1 && (
            <div className="bg-card rounded-2xl border border-border/20 p-6 space-y-5">
              <h2 className="font-semibold text-foreground">Pickup Details</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Sender Name</label>
                  <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} className={`w-full h-11 px-4 bg-muted/30 border rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all ${errors.senderName ? 'border-red-500' : 'border-border/30'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Phone Number</label>
                  <input type="tel" name="pickupPhone" value={formData.pickupPhone} onChange={handleChange} className={`w-full h-11 px-4 bg-muted/30 border rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all ${errors.pickupPhone ? 'border-red-500' : 'border-border/30'}`} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Pickup Address</label>
                <textarea name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} rows={2} placeholder="Enter full pickup address" className={`w-full py-3 px-4 bg-muted/30 border rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all resize-none ${errors.pickupAddress ? 'border-red-500' : 'border-border/30'}`} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Package Description</label>
                <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} rows={2} placeholder="What are you sending?" className={`w-full py-3 px-4 bg-muted/30 border rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all resize-none ${errors.itemDescription ? 'border-red-500' : 'border-border/30'}`} />
              </div>
            </div>
          )}

          {/* Step 2: Receiver */}
          {currentStep === 2 && (
            <div className="bg-card rounded-2xl border border-border/20 p-6 space-y-5">
              <h2 className="font-semibold text-foreground">Receiver Details</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Receiver Name</label>
                  <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} placeholder="Full name" className={`w-full h-11 px-4 bg-muted/30 border rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all ${errors.receiverName ? 'border-red-500' : 'border-border/30'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Phone Number</label>
                  <input type="tel" name="receiverPhone" value={formData.receiverPhone} onChange={handleChange} placeholder="0800 000 0000" className={`w-full h-11 px-4 bg-muted/30 border rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all ${errors.receiverPhone ? 'border-red-500' : 'border-border/30'}`} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Delivery Address</label>
                <textarea name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} rows={2} placeholder="Enter full delivery address" className={`w-full py-3 px-4 bg-muted/30 border rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all resize-none ${errors.deliveryAddress ? 'border-red-500' : 'border-border/30'}`} />
              </div>
            </div>
          )}

          {/* Step 3: Service & Payment */}
          {currentStep === 3 && (
            <div className="bg-card rounded-2xl border border-border/20 p-6 space-y-6">
              <h2 className="font-semibold text-foreground">Service & Payment</h2>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">Select Delivery Type</label>
                <div className="space-y-2">
                  {serviceAmounts.map((s) => (
                    <label key={s.id} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${formData.serviceAmountId === s.id ? 'border-[#044D22] bg-[#044D22]/5 dark:bg-[#044D22]/10' : 'border-border/30 hover:border-border'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.serviceAmountId === s.id ? 'border-[#044D22] bg-[#044D22]' : 'border-muted-foreground'}`}>
                          {formData.serviceAmountId === s.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{s.label}</p>
                          <p className="text-sm text-muted-foreground">{s.desc} • {s.time}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#044D22] dark:text-[#FFB11D]">₦{s.price.toLocaleString()}</span>
                      <input type="radio" checked={formData.serviceAmountId === s.id} onChange={() => setFormData(prev => ({ ...prev, serviceAmountId: s.id }))} className="hidden" />
                    </label>
                  ))}
                </div>
                {errors.serviceAmountId && <p className="text-red-500 text-sm mt-2">{errors.serviceAmountId}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'wallet' }))} className={`relative p-4 border rounded-xl text-left transition-all ${formData.paymentMethod === 'wallet' ? 'border-[#044D22] bg-[#044D22]/5 dark:bg-[#044D22]/10' : 'border-border/30 hover:border-border'}`}>
                    {formData.paymentMethod === 'wallet' && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#044D22] flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </span>
                    )}
                    <p className="font-medium text-foreground">Wallet</p>
                    <p className="text-sm text-muted-foreground">₦{walletBalance.toLocaleString()}</p>
                  </button>
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'online' }))} className={`relative p-4 border rounded-xl text-left transition-all ${formData.paymentMethod === 'online' ? 'border-[#044D22] bg-[#044D22]/5 dark:bg-[#044D22]/10' : 'border-border/30 hover:border-border'}`}>
                    {formData.paymentMethod === 'online' && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#044D22] flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </span>
                    )}
                    <p className="font-medium text-foreground">Pay Online</p>
                    <p className="text-sm text-muted-foreground">Card, Bank</p>
                  </button>
                </div>
                {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {currentStep === 4 && (
            <div className="bg-card rounded-2xl border border-border/20 p-6 space-y-4">
              <h2 className="font-semibold text-foreground">Confirm Booking</h2>
              
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/5 rounded-xl">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">PICKUP</p>
                <p className="font-medium text-foreground">{formData.senderName}</p>
                <p className="text-sm text-muted-foreground">{formData.pickupPhone}</p>
                <p className="text-sm text-muted-foreground">{formData.pickupAddress}</p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-500/5 rounded-xl">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">DELIVERY</p>
                <p className="font-medium text-foreground">{formData.receiverName}</p>
                <p className="text-sm text-muted-foreground">{formData.receiverPhone}</p>
                <p className="text-sm text-muted-foreground">{formData.deliveryAddress}</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground font-medium mb-1">PACKAGE</p>
                <p className="text-sm text-foreground">{formData.itemDescription}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {currentStep > 1 && (
              <button onClick={prevStep} className="px-5 py-3 bg-muted text-muted-foreground font-medium rounded-xl hover:bg-muted/80 transition-colors">
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button onClick={nextStep} className="flex-1 py-3 bg-[#044D22] text-white font-medium rounded-xl hover:bg-[#033a19] transition-colors">
                Continue
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={isLoading} className="flex-1 py-3 bg-[#FFB11D] text-[#044D22] font-semibold rounded-xl hover:bg-[#f9a50a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Processing...
                  </>
                ) : 'Confirm & Book'}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl border border-border/20 p-5 sticky top-24">
            <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-3 border-b border-border/20">
                <span className="text-muted-foreground">From</span>
                <span className="font-medium text-foreground truncate max-w-[140px]">{formData.senderName || '—'}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border/20">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium text-foreground truncate max-w-[140px]">{formData.receiverName || '—'}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border/20">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium text-foreground">{getSelectedService()?.label || '—'}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-border/20">
                <span className="text-muted-foreground">Payment</span>
                <span className="font-medium text-foreground capitalize">{formData.paymentMethod || '—'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-[#044D22] dark:text-[#FFB11D]">₦{(getSelectedService()?.price || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
