// // src/components/Loader.jsx
// import { motion } from "framer-motion";

// const Loader = () => {
//   return (
//     <div className="flex flex-col justify-center items-center min-h-[200px] space-y-4">
//       {/* Main animated logo/icon */}
//       <motion.div 
//         className="relative w-20 h-20"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Outer ring with gradient border */}
//         <motion.div
//           className="absolute inset-0 border-4 border-dashed rounded-full"
//           style={{
//             borderImage: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899) 1",
//           }}
//           animate={{ rotate: 360 }}
//           transition={{
//             repeat: Infinity,
//             ease: "linear",
//             duration: 2,
//           }}
//         />
        
//         {/* Inner rotating dots */}
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
//             style={{
//               top: "10%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//             }}
//             animate={{
//               rotate: 360,
//               x: ["0px", "30px", "0px", "-30px", "0px"],
//               y: ["0px", "30px", "60px", "30px", "0px"],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 2,
//               delay: i * 0.2,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
        
//         {/* Center logo/icon */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <motion.div
//             className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
//             animate={{
//               rotate: [0, 180, 360],
//               scale: [1, 1.1, 1],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 1.5,
//               ease: "easeInOut",
//             }}
//           />
//         </div>
//       </motion.div>

//       {/* Animated loading text */}
//       <motion.div
//         className="text-gray-600 dark:text-gray-300 font-medium"
//         animate={{ opacity: [0.5, 1, 0.5] }}
//         transition={{ repeat: Infinity, duration: 1.5 }}
//       >
//         Loading your treasures
//         <motion.span
//           animate={{ opacity: [0, 1] }}
//           transition={{ repeat: Infinity, duration: 0.8 }}
//         >
//           ...
//         </motion.span>
//       </motion.div>

//       {/* Progress indicator */}
//       <motion.div 
//         className="w-40 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <motion.div
//           className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
//           initial={{ width: 0 }}
//           animate={{ width: "100%" }}
//           transition={{
//             repeat: Infinity,
//             duration: 2,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         />
//       </motion.div>
//     </div>
//   );
// };

// export default Loader;



import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
      {/* Spinner */}
      <motion.div
        className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "linear"
        }}
      />
      
      {/* Loading text */}
      <motion.p 
        className="text-gray-600 font-medium"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          repeat: Infinity,
          duration: 1.5
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;