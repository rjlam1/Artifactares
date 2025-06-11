import { useState, useEffect } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Discover Ancient Wonders",
      description: "Explore artifacts that shaped human civilization from the Rosetta Stone to the Antikythera Mechanism.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      buttonText: "Browse Collection"
    },
    {
      id: 2,
      title: "Contribute to History",
      description: "Share your knowledge by adding artifacts to our growing database of historical treasures.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      buttonText: "Add Artifact"
    },
    {
      id: 3,
      title: "Journey Through Time",
      description: "From ancient civilizations to modern discoveries, track humanity's most important artifacts.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      buttonText: "Start Exploring"
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full h-[70vh] relative">
  
      <div className="carousel w-full h-full rounded-lg overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            id={`slide${index + 1}`} 
            className={`carousel-item relative w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'}`}
          >
            <img 
              src={slide.image} 
              className="w-full h-full object-cover" 
              alt={slide.title} 
            />
           
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
    
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-4/5 md:w-3/5">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 animate-fadeIn delay-100">
                {slide.description}
              </p>
              <button className="btn btn-primary animate-fadeIn delay-200">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

  
      <div className="flex justify-center gap-2 absolute bottom-6 left-1/2 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;