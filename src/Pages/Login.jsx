import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import SocialLogin from "./SocalLogin";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signin(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Login successful!");
        navigate("/");
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        toast.error(`Login failed: ${errorMessage}`);
        console.error("Login error:", error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center items-center ">
        <img
          src="https://i.ibb.co/gFMpcM0R/Computer-login-pana-1.png"
          alt="Login Illustration"
          className="w-full max-w-2xl h-auto"
        />
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center md:w-1/2 "
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden border-white"
        >
          <div className="p-8">
            <Helmet>
              <title>ArtifactEra | Login</title>
            </Helmet>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-stone-600">Sign in to your account</p>
            </motion.div>

            <form onSubmit={handleLoginSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-800 bg-white"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-800 bg-white"
                  required
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r cursor-pointer from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
              >
                Sign In
              </motion.button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-stone-300"></div>
              <span className="mx-4 text-stone-500">or</span>
              <div className="flex-grow border-t border-stone-300"></div>
            </div>

            <SocialLogin />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6"
            >
              <p className="text-stone-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-amber-600 hover:text-amber-700 cursor-pointer  font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
