import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isValidLength) {
      toast.error("Password must have uppercase, lowercase, and at least 6 characters.");
      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateUserProfile({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            toast.success("Registration successful!");
            navigate("/login");
          })
          .catch((err) => {
            console.error("Profile update failed:", err);
            toast.error("Profile update failed.");
          });
      })
      .catch((error) => {
        console.error("Register error:", error);
        toast.error("Registration failed: " + error.message);
      });
  };

  return (
    <div className="flex  flex-col lg:flex-row min-h-screen ">
      {/* Image Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <img
          src="https://i.ibb.co/357K1Tn4/Sign-up-pana.png"
          alt="Register Illustration"
          className="w-full max-w-md"
        />
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-md  bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden "
        >
          <div className="p-8">
            <Helmet>
              <title>ArtifactEra | Register</title>
            </Helmet>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent mb-2">
                Create Account
              </h2>
              <p className="text-stone-600">Join our artifact collection community</p>
            </motion.div>

            <form onSubmit={handleRegisterSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-800 bg-white"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
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
                transition={{ delay: 0.5 }}
                className="mb-4"
              >
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Photo URL (Optional)
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-800 bg-white"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
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
                <p className="text-xs text-stone-500 mt-2">
                  Must contain uppercase, lowercase, and at least 6 characters
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
              >
                Create Account
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-6"
            >
              <p className="text-stone-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
