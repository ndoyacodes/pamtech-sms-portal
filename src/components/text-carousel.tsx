import React, { useState, useEffect, useCallback } from 'react';

interface CarouselItem {
  title: string;
  description: string;
}

interface TextCarouselProps {
  items: CarouselItem[]; 
  interval?: number; 
}

const TextCarousel: React.FC<TextCarouselProps> = ({ items, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [items, interval, goToNext]);


  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) {
    return null; 
  }

  return (
    <div className="relative overflow-hidden w-full">

      <div
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex w-full mb-10">
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full text-center md:text-left p-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                {item.title}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto md:mx-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-blue-500' : 'bg-white hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;