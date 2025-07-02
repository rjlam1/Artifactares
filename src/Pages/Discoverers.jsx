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
    <section className="py-20 lg:px-10  bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-amber-600 uppercase rounded-full bg-amber-900/30 mb-4">
            Pioneers of Archaeology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800">
            🔍 Legendary Discoverers
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-all duration-300"></div>
              
              <div className="relative h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={d.image} 
                    alt={d.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-amber-600 rounded-full mb-2">
                      {d.era}
                    </span>
                    <h3 className="text-2xl font-bold text-stone-600">{d.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-1 bg-amber-500 mr-3"></div>
                    <span className="text-sm font-medium text-amber-600 tracking-wider">DISCOVERY</span>
                  </div>
                  <h4 className="text-xl font-bold text-amber-400 mb-3">{d.discovery}</h4>
                  <p className="text-stone-600 italic">"{d.quote}"</p>
                  
                
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