'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  images: { src: string; alt: string; caption?: string }[];
  interval?: number;
  className?: string;
}

export function HeroCarousel({ images, interval = 5000, className }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Decorative Background */}
      <div className="relative w-full aspect-square max-w-lg mx-auto">
        <div className="absolute inset-0 bg-[#FFB11D] rounded-3xl transform rotate-6 shadow-2xl scale-95" />
        <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-3 shadow-xl" />
        
        {/* Main Carousel Window */}
        <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-lg border-4 border-gray-100 z-10">
          
          {/* Slider Track */}
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="relative w-full h-full flex-shrink-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Caption */}
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                    <p className="text-white font-bold text-lg md:text-xl drop-shadow-sm">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -left-4 -right-4 -translate-y-1/2 flex justify-between pointer-events-none z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center hover:border-[#FFB11D] hover:text-[#FFB11D] transition-colors pointer-events-auto"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center hover:border-[#FFB11D] hover:text-[#FFB11D] transition-colors pointer-events-auto"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'transition-all duration-300 rounded-full',
              index === currentIndex 
                ? 'w-10 h-3 bg-[#FFB11D]' 
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
