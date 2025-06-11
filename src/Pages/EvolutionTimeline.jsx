import React from 'react';
import { motion } from "framer-motion";

const events = [
  { year: "3000 BC", title: "Clay Tablets", detail: "Early writing tools in Mesopotamia." },
  { year: "2560 BC", title: "Pyramid Tools", detail: "Tools used in construction of the Pyramids." },
  { year: "1799", title: "Rosetta Stone", detail: "Key to deciphering Egyptian hieroglyphs." },
  { year: "1901", title: "Antikythera Mechanism", detail: "Ancient Greek analog computer." },
];

const  EvolutionTimeline= () => {
     return (
    <section className="my-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-6">🕰️ Evolution of Artifacts</h2>
      <div className="border-l-4 border-blue-600 pl-6 space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-blue-50 p-4 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold text-blue-800">{event.year} - {event.title}</h3>
            <p className="text-gray-700">{event.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EvolutionTimeline ;