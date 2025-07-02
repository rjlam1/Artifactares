import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  const slides = [
    {
      id: 1,
      title: "Discover Ancient Wonders",
      description:
        "Explore artifacts that shaped human civilization from the Rosetta Stone to the Antikythera Mechanism.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      buttonText: "Browse Collection",
      overlayColor: "rgba(78, 56, 42, 0.5)",
    },
    {
      id: 2,
      title: "Contribute to History",
      description:
        "Share your knowledge by adding artifacts to our growing database of historical treasures.",
      image:
        "https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1653&q=80",
      buttonText: "Add Artifact",
      overlayColor: "rgba(42, 65, 78, 0.5)",
    },
    {
      id: 3,
      title: "Journey Through Time",
      description:
        "From ancient civilizations to modern discoveries, track humanity's most important artifacts.",
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      buttonText: "Start Exploring",
      overlayColor: "rgba(78, 42, 56, 0.5)",
    },
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  const goToPrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="w-full h-[70vh] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* prev button */}
      <motion.button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.5)" }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>

      {/* next button */}
      <motion.button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.5)" }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>

      {/* slide with overlay and text */}
      <div className="relative w-full h-full">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* overlay */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                background: `linear-gradient(to right, ${slides[currentSlide].overlayColor}, rgba(0,0,0,0.3))`,
              }}
            ></motion.div>

            {/* text content */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-4/5 md:w-2/3 lg:w-1/2 px-4"
              initial="hidden"
              animate="visible"
              variants={contentVariants}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                variants={contentVariants}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8"
                variants={contentVariants}
                transition={{ delay: 0.2 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              <Link to="/allArtifacts">
                <motion.button
                  className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full shadow-lg"
                  variants={contentVariants}
                  transition={{ delay: 0.4 }}
                  whileHover={buttonVariants.hover}
                  whileTap={buttonVariants.tap}
                >
                  {slides[currentSlide].buttonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* indicators */}
      <div className="flex justify-center gap-3 absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-300 bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.3 }}
            animate={{
              width: index === currentSlide ? 32 : 12,
              backgroundColor:
                index === currentSlide
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.5)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          ></motion.button>
        ))}
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-gray-300 bg-opacity-30 overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        ></motion.div>
      </div>
    </div>
  );
};

export default Banner;
