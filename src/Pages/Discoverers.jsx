import React from 'react';
import { motion } from "framer-motion";
 const discoverers = [
  {
    name: "Pierre-François Bouchard",
    discovery: "Rosetta Stone",
    image: "https://i.ibb.co/g3bNG0t/bouchard.jpg",
  },
  {
    name: "Derek J. de Solla Price",
    discovery: "Antikythera Mechanism",
    image: "https://i.ibb.co/5GBXpJK/derek.jpg",
  },
  {
    name: "Howard Carter",
    discovery: "Tutankhamun's Tomb",
    image: "https://i.ibb.co/f9fBJ0X/carter.jpg",
  },
];
const Discoverers = () => {

   
    return (
    <section className="my-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-6">🔍 Legendary Discoverers</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {discoverers.map((d, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <img src={d.image} alt={d.name} className="h-60 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{d.name}</h3>
              <p className="text-sm text-gray-600">Discovered: {d.discovery}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Discoverers;