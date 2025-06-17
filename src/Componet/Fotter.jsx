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

  const legalLinks = [
    { path: "#", text: "Privacy Policy" },
    { path: "#", text: "Terms of Service" },
    { path: "#", text: "Sitemap" }
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
    <footer className="bg-gradient-to-b px-6 lg:px-0 from-[#0a1f38] to-[#0e2745] text-[#d2b44c] pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="space-y-6">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#d2b44c] to-[#f8e58c]">
              Historical Artifacts Tracker
            </h3>
            <p className="text-[#d2b44c]/90">
              Discover, explore, and contribute to the world's most fascinating historical artifacts.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#0e2745] hover:bg-[#d2b44c] hover:text-[#0e2745] transition-all duration-300 group"
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
            <h4 className="text-xl font-semibold mb-6 border-b border-[#d2b44c]/30 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link to={link.path} className="flex items-center text-[#d2b44c]/90 hover:text-white transition-colors duration-300 group">
                    <FaArrowRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm" />
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-6 border-b border-[#d2b44c]/30 pb-2">Stay Updated</h4>
            <p className="text-[#d2b44c]/90 mb-4">
              Subscribe to our newsletter for the latest artifact discoveries and updates.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-[#0e2745] border border-[#d2b44c]/30 focus:border-[#d2b44c] focus:outline-none text-white placeholder-[#d2b44c]/50 transition-all duration-300"
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#d2b44c] to-[#f8e58c] text-[#0e2745] font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-6 border-b border-[#d2b44c]/30 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1 mr-3 text-[#d2b44c]">{info.icon}</span>
                  <span className="text-[#d2b44c]/90 hover:text-white transition-colors duration-300">{info.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div className="border-t border-[#1d3d5c] pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#d2b44c]/80 mb-4 md:mb-0">
            &copy; {currentYear} Historical Artifacts Tracker. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.path}
                className="text-sm text-[#d2b44c]/80 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.text}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-[#d2b44c] text-[#0e2745] p-3 rounded-full shadow-lg hover:bg-[#f8e58c] transition-colors duration-300 z-50"
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
 