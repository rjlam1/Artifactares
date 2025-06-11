
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import SocialLogin from "./SocalLogin";
import { toast } from "react-hot-toast"; 

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
        // Signed in
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
    <div className="max-w-md mx-auto p-6 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>} 
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <SocialLogin></SocialLogin>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;