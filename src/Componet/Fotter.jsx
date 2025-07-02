import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook size={20} />, name: "Facebook", path: "https://facebook.com" },
    { icon: <FaTwitter size={20} />, name: "Twitter", path: "https://twitter.com" },
    { icon: <FaInstagram size={20} />, name: "Instagram", path: "https://instagram.com" },
    { icon: <FaLinkedin size={20} />, name: "LinkedIn", path: "https://linkedin.com" },
    { icon: <FaGithub size={20} />, name: "GitHub", path: "https://github.com" }
  ];

  const quickLinks = [
    { path: "/", text: "Home" },
    { path: "/allArtifacts", text: "All Artifacts" },
    { path: "/addArtifacts", text: "Add Artifact" },
    { path: "/my-artifacts", text: "My Artifacts" },
    { path: "/liked-artifacts", text: "Liked Artifacts" }
  ];


  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: "info@artifactstracker.com"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: "+1 (555) 123-4567"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: "123 Museum St, Historyville"
    }
  ];

  return (
    <footer className="bg-gradient-to-b px-4  lg:px-10 from-gray-900 to-gray-800 text-amber-500 pt-16 pb-8">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="space-y-6">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
              Historical Artifacts Tracker
            </h3>
            <p className="text-amber-500/90">
              Discover, explore, and contribute to the world's most fascinating historical artifacts.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-6 border-b border-amber-500/30 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link to={link.path} className="flex items-center text-amber-500/90 hover:text-amber-500 transition-colors duration-300 group">
                    <FaArrowRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm" />
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-6 border-b border-amber-500/30 pb-2">Stay Updated</h4>
            <p className="text-amber-500/90 mb-4">
              Subscribe to our newsletter for the latest artifact discoveries and updates.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-gray-800 border border-amber-500/30 focus:border-amber-500 focus:outline-none text-white placeholder-amber-500/50 transition-all duration-300"
              />
              <motion.button
                type="submit"
                className="px-6 py-3  bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:scale-105 text-gray-900 font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-6 border-b border-amber-500/30 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1 mr-3 text-amber-500">{info.icon}</span>
                  <span className="text-amber-500/90 hover:text-white transition-colors duration-300">{info.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm items-center mx-auto text-amber-500/80 mb-4 md:mb-0">
            &copy; {currentYear} Historical Artifacts Tracker. All rights reserved.
          </p>
       
        </motion.div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-amber-500 text-gray-900 p-3 rounded-full shadow-lg hover:bg-amber-300 transition-colors duration-300 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;