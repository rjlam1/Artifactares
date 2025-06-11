import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-[#0e2745] text-[#d2b44c] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">

          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-2xl font-bold mb-4">Historical Artifacts Tracker</h3>
            <p className="text-[#d2b44c] mb-4">
              Discover, explore, and contribute to the world's most fascinating historical artifacts.
            </p>
            <div className="flex space-x-4 text-[#d2b44c]">
              <a href="#" className="hover:text-white transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaGithub size={24} />
              </a>
            </div>
          </div>

        
          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allArtifacts" className="hover:text-white transition">
                  All Artifacts
                </Link>
              </li>
              <li>
                <Link to="/addArtifacts" className="hover:text-white transition">
                  Add Artifact
                </Link>
              </li>
              <li>
                <Link to="/my-artifacts" className="hover:text-white transition">
                  My Artifacts
                </Link>
              </li>
              <li>
                <Link to="/liked-artifacts" className="hover:text-white transition">
                  Liked Artifacts
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-[#d2b44c]">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@artifactstracker.com
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                123 Museum St, Historyville
              </li>
            </ul>
          </div>
        </div>

      
        <div className="border-t border-[#1d3d5c] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0 text-[#d2b44c]">
            &copy; {new Date().getFullYear()} Historical Artifacts Tracker. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
