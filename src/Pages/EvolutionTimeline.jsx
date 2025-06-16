import React from 'react';
import { motion } from "framer-motion";

const events = [
  { year: "3000 BC", title: "Clay Tablets", detail: "Early writing tools in Mesopotamia.", icon: "📜" },
  { year: "2560 BC", title: "Pyramid Tools", detail: "Tools used in construction of the Pyramids.", icon: "🔺" },
  { year: "1799", title: "Rosetta Stone", detail: "Key to deciphering Egyptian hieroglyphs.", icon: "🗿" },
  { year: "1901", title: "Antikythera Mechanism", detail: "Ancient Greek analog computer.", icon: "⚙️" },
];

const EvolutionTimeline = () => {
  return (
    <section className="py-20 px-4 md:px-10 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-amber-700 uppercase rounded-full bg-amber-100 mb-4">
            Historical Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
            The Evolution of Artifacts
          </h2>
          <p className="max-w-2xl mx-auto text-stone-500 text-lg">
            Tracing humanity's progress through significant historical objects
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute -left-20 top-0 w-40 h-40 rounded-full bg-amber-50 blur-3xl opacity-60"></div>
          <div className="absolute -right-20 bottom-0 w-40 h-40 rounded-full bg-amber-100 blur-3xl opacity-30"></div>
          
          {/* Timeline line */}
          <div className="absolute left-6 h-full w-0.5 bg-gradient-to-b from-transparent via-amber-300 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-100 to-transparent opacity-60"></div>
          </div>
          
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative pl-16 mb-16 last:mb-0 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-md shadow-amber-200 z-10 flex items-center justify-center text-white text-xs font-bold"
                >
                  {event.icon}
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute w-8 h-8 rounded-full bg-amber-100 opacity-40"
                ></motion.div>
              </div>
              
              {/* Content card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                {/* Card background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiNkNGExMzYiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9zdmc+')]"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                    <span className="text-lg font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                      {event.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-stone-800">{event.title}</h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-lg">{event.detail}</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-100 rounded-full opacity-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-amber-200 rounded-full opacity-5"></div>
              </motion.div>
              
              {/* Connector line between dots */}
              {index !== events.length - 1 && (
                <div className="absolute left-6 top-12 h-[calc(100%+2rem)] w-0.5 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50 to-transparent opacity-70"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-stone-400 italic">
            "History is not a burden on the memory but an illumination of the soul." — Lord Acton
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EvolutionTimeline;