import React from 'react';
import { motion } from "framer-motion";

const discoverers = [
  {
    name: "Pierre-François Bouchard",
    discovery: "Rosetta Stone",
    image: "https://i.ibb.co/wFgTZcDx/pexels-michael-pointner-134459625-30191723.jpg",
    era: "1799",
    quote: "The key that unlocked ancient Egypt's secrets"
  },
  {
    name: "Derek J. de Solla Price",
    discovery: "Antikythera Mechanism",
    image: "https://i.ibb.co/qL6bdgsf/pexels-tima-miroshnichenko-7567591.jpg",
    era: "1901",
    quote: "An ancient computer that rewrote history"
  },
  {
    name: "Howard Carter",
    discovery: "Tutankhamun's Tomb",
    image: "https://i.ibb.co/DPJvjkVS/birmingham-museums-trust-fi7-VBZst2-Zs-unsplash.jpg",
    era: "1922",
    quote: "The most spectacular discovery in Egyptian archaeology"
  },
];

const Discoverers = () => {
  return (
    <section className="py-20 px-4 md:px-10 bg-gradient-to-b from-gray-50 to-amber-50">
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-amber-600 text-lg font-semibold">
            Pioneers of Archaeology
          </span>
          <h2 className="text-5xl mx-auto  mb-6 font-bold  text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
            🔍 Legendary Discoverers
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {discoverers.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
              
              <div className="relative h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={d.image} 
                    alt={d.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-amber-600 rounded-full mb-2">
                      {d.era}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{d.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-1 bg-amber-500 mr-3"></div>
                    <span className="text-sm font-medium text-amber-600">DISCOVERY</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{d.discovery}</h4>
                  <p className="text-gray-600 italic">"{d.quote}"</p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button className="text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors flex items-center">
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discoverers;
