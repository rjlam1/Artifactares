import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaGlobe, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-4xl text-orange-500" />,
    title: "Authentic Artifacts",
    description: "Every artifact listed is verified for authenticity and historical significance.",
  },
  {
    icon: <FaClock className="text-4xl text-orange-500" />,
    title: "Timeless Knowledge",
    description: "Dive into centuries of history and learn about civilizations that shaped the world.",
  },
  {
    icon: <FaGlobe className="text-4xl text-orange-500" />,
    title: "Global Access",
    description: "Explore and contribute to artifacts from across the globe anytime, anywhere.",
  },
  {
    icon: <FaUserCheck className="text-4xl text-orange-500" />,
    title: "User Contribution",
    description: "Empowering users to share and preserve their own historical discoveries.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800  md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent mb-4">
          Why Choose Us
        </h2>
        <p className="text-stone-600 text-lg">
          We’re committed to making historical knowledge accessible and engaging for all.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-amber-600">{feature.title}</h3>
            <p className="text-stone-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
