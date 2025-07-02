import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { useContext } from "react";

const SocialLogin = ({ from }) => {
  const { googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        navigate(from || '/');
        console.log(user);
      });
  };

  return (
    <div className="mt-6 cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-300"></div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogle}
        className="w-full mt-6 flex items-center justify-center gap-3 px-4 py-3 bg-white text-stone-800 font-medium rounded-lg shadow-sm border border-stone-300 hover:shadow-md transition-all"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 2 }
          }}
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
        </motion.div>
        <span className="cursor-pointer">Continue with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialLogin;