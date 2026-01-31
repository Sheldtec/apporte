'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Service amounts (would come from API in production)
const serviceAmounts = [
  { id: 1, label: 'Short Distance (Within Local Area)', price: 2000 },
  { id: 2, label: 'Medium Distance (Inter-City)', price: 3500 },
  { id: 3, label: 'Long Distance (Interstate)', price: 5000 },
];

type PaymentMethod = 'paystack' | 'bank_transfer' | null;

interface FormData {
  // Sender
  senderName: string;
  pickupPhone: string;
  pickupAddress: string;
  // Package
  itemDescription: string;
  // Receiver
  receiverName: string;
  receiverPhone: string;
  deliveryAddress: string;
  // Service & Payment
  serviceAmountId: number | null;
  paymentMethod: PaymentMethod;
}

export default function BookDispatchPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    senderName: '',
    pickupPhone: '',
    pickupAddress: '',
    itemDescription: '',
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    serviceAmountId: null,
    paymentMethod: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'pickupPhone' || name === 'receiverPhone') {
      setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
    } else if (name === 'serviceAmountId') {
      setFormData(prev => ({ ...prev, [name]: value ? parseInt(value) : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (currentStep === 1) {
      if (!formData.senderName.trim()) newErrors.senderName = 'Sender name is required';
      if (!formData.pickupPhone.trim()) newErrors.pickupPhone = 'Phone number is required';
      else if (formData.pickupPhone.replace(/\D/g, '').length < 10) newErrors.pickupPhone = 'Enter a valid phone number';
      if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    } else if (currentStep === 2) {
      if (!formData.itemDescription.trim()) newErrors.itemDescription = 'Item description is required';
    } else if (currentStep === 3) {
      if (!formData.receiverName.trim()) newErrors.receiverName = 'Receiver name is required';
      if (!formData.receiverPhone.trim()) newErrors.receiverPhone = 'Phone number is required';
      else if (formData.receiverPhone.replace(/\D/g, '').length < 10) newErrors.receiverPhone = 'Enter a valid phone number';
      if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required';
    } else if (currentStep === 4) {
      if (!formData.serviceAmountId) newErrors.serviceAmountId = 'Please select a service';
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const getSelectedService = () => {
    return serviceAmounts.find(s => s.id === formData.serviceAmountId);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be an API call:
      // await api.post('/dispatch/book', {
      //   sender_name: formData.senderName,
      //   pickup_phone: formData.pickupPhone.replace(/\D/g, ''),
      //   pickup_address: formData.pickupAddress,
      //   item_description: formData.itemDescription,
      //   receiver_name: formData.receiverName,
      //   receiver_phone: formData.receiverPhone.replace(/\D/g, ''),
      //   delivery_address: formData.deliveryAddress,
      //   service_amount_id: formData.serviceAmountId,
      //   payment_method: formData.paymentMethod,
      // });
      
      setIsSuccess(true);
      setStep(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      senderName: '',
      pickupPhone: '',
      pickupAddress: '',
      itemDescription: '',
      receiverName: '',
      receiverPhone: '',
      deliveryAddress: '',
      serviceAmountId: null,
      paymentMethod: null,
    });
    setStep(1);
    setIsSuccess(false);
    setError('');
  };

  const stepTitles = [
    'Sender Details',
    'Package Info',
    'Receiver Details',
    'Service & Payment',
    'Confirmation'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/apporte-logo.png"
              alt="Apporte Delivery"
              width={150}
              height={45}
              className="w-auto h-10"
            />
          </Link>
          <Link href="/login" className="text-sm text-[#044D22] hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Book a Dispatch Ride
          </h1>
          <p className="text-gray-600">
            Request a delivery rider for your package in minutes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {stepTitles.slice(0, 4).map((title, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step > index + 1 
                    ? 'bg-[#044D22] text-white' 
                    : step === index + 1 
                      ? 'bg-[#FFB11D] text-[#044D22]' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > index + 1 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-xs mt-2 hidden md:block ${step === index + 1 ? 'text-[#044D22] font-medium' : 'text-gray-500'}`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mt-4">
            <div className="h-1 bg-gray-200 rounded-full">
              <div 
                className="h-1 bg-[#044D22] rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Step 1: Sender Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#044D22]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#044D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Sender Information</h2>
                    <p className="text-sm text-gray-500">Who is sending this package?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sender Name *</label>
                    <input
                      type="text"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      placeholder="Enter sender's full name"
                      className={`w-full h-12 px-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all ${errors.senderName ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.senderName && <p className="text-red-500 text-sm mt-1">{errors.senderName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Phone Number *</label>
                    <input
                      type="tel"
                      name="pickupPhone"
                      value={formData.pickupPhone}
                      onChange={handleChange}
                      placeholder="0800 000 0000"
                      className={`w-full h-12 px-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all ${errors.pickupPhone ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.pickupPhone && <p className="text-red-500 text-sm mt-1">{errors.pickupPhone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
                    <textarea
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      placeholder="Enter full pickup address"
                      rows={3}
                      className={`w-full py-3 px-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all resize-none ${errors.pickupAddress ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{errors.pickupAddress}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Package Information */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#044D22]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#044D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Package Information</h2>
                    <p className="text-sm text-gray-500">Describe what you&apos;re sending</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Description *</label>
                  <textarea
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    placeholder="E.g., Small parcel containing documents, clothing items, electronics, etc."
                    rows={5}
                    className={`w-full py-3 px-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all resize-none ${errors.itemDescription ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.itemDescription && <p className="text-red-500 text-sm mt-1">{errors.itemDescription}</p>}
                  <p className="text-xs text-gray-500 mt-2">
                    Please provide accurate details about the item(s) for proper handling.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Receiver Information */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#044D22]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#044D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Receiver Information</h2>
                    <p className="text-sm text-gray-500">Where should we deliver?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name *</label>
                    <input
                      type="text"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleChange}
                      placeholder="Enter receiver's full name"
                      className={`w-full h-12 px-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all ${errors.receiverName ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.receiverName && <p className="text-red-500 text-sm mt-1">{errors.receiverName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Phone Number *</label>
                    <input
                      type="tel"
                      name="receiverPhone"
                      value={formData.receiverPhone}
                      onChange={handleChange}
                      placeholder="0800 000 0000"
                      className={`w-full h-12 px-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all ${errors.receiverPhone ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.receiverPhone && <p className="text-red-500 text-sm mt-1">{errors.receiverPhone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      placeholder="Enter full delivery address"
                      rows={3}
                      className={`w-full py-3 px-4 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#044D22] focus:ring-2 focus:ring-[#044D22]/20 transition-all resize-none ${errors.deliveryAddress ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Service & Payment */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#044D22]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#044D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Service & Payment</h2>
                    <p className="text-sm text-gray-500">Select service and payment method</p>
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Service *</label>
                  <div className="space-y-3">
                    {serviceAmounts.map((service) => (
                      <label
                        key={service.id}
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.serviceAmountId === service.id
                            ? 'border-[#044D22] bg-[#044D22]/5 ring-2 ring-[#044D22]/20'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="serviceAmountId"
                            value={service.id}
                            checked={formData.serviceAmountId === service.id}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#044D22] focus:ring-[#044D22]"
                          />
                          <span className="text-gray-900">{service.label}</span>
                        </div>
                        <span className="text-lg font-semibold text-[#044D22]">
                          ₦{service.price.toLocaleString()}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.serviceAmountId && <p className="text-red-500 text-sm mt-2">{errors.serviceAmountId}</p>}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${
                        formData.paymentMethod === 'paystack'
                          ? 'border-[#044D22] bg-[#044D22]/5 ring-2 ring-[#044D22]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paystack"
                        checked={formData.paymentMethod === 'paystack'}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as PaymentMethod }))}
                        className="sr-only"
                      />
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Pay with Paystack</span>
                      <span className="text-xs text-gray-500">Card, Bank, USSD</span>
                    </label>

                    <label
                      className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${
                        formData.paymentMethod === 'bank_transfer'
                          ? 'border-[#044D22] bg-[#044D22]/5 ring-2 ring-[#044D22]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === 'bank_transfer'}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as PaymentMethod }))}
                        className="sr-only"
                      />
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Bank Transfer</span>
                      <span className="text-xs text-gray-500">Manual Transfer</span>
                    </label>
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>}
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="text-gray-900 font-medium">{formData.senderName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="text-gray-900 font-medium">{formData.receiverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package:</span>
                      <span className="text-gray-900 font-medium truncate max-w-[200px]">{formData.itemDescription}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-base">
                      <span className="text-gray-900 font-semibold">Total:</span>
                      <span className="text-[#044D22] font-bold text-lg">
                        ₦{getSelectedService()?.price.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Success */}
            {step === 5 && isSuccess && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your dispatch ride has been booked successfully. A rider will be assigned shortly.
                </p>
                <div className="bg-[#044D22]/5 rounded-xl p-4 max-w-sm mx-auto mb-6">
                  <p className="text-sm text-gray-600">Booking Reference</p>
                  <p className="text-xl font-bold text-[#044D22]">APT-{Date.now().toString().slice(-8)}</p>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  You will receive an SMS with rider details and tracking information.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-[#044D22] text-white font-semibold rounded-xl hover:bg-[#033a19] transition-all"
                >
                  Book Another Ride
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#044D22] text-white font-semibold rounded-xl hover:bg-[#033a19] transition-all flex items-center gap-2"
                >
                  Continue
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-3 bg-[#FFB11D] text-[#044D22] font-semibold rounded-xl hover:bg-[#e9a01a] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      Book Dispatch Ride
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Help Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Need help? Call us at <a href="tel:+2348000000000" className="text-[#044D22] font-medium">+234 800 000 0000</a>
        </p>
      </main>
    </div>
  );
}
