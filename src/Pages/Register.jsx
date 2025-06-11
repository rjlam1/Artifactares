// import { Link } from "react-router";
// import { use } from "react";
// import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";

// const Register = () => {
//     const {createUser}=use(AuthContext)
//   const handelRegisterSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name=form.name.value;
//     const email=form.email.value;
//     const photo=form.photo.value;
//     const password=form.password.value;
//     console.log(name,photo,password,email);

//       createUser(email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log(user)
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
//   };
//   return (
//     <div className="max-w-md mx-auto p- shadow-md rounded">
//       <h2 className="text-2xl font-semibold mb-4">Register</h2>
//       <form onSubmit={handelRegisterSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Photo URL"
//           name="photo"
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white p-2 rounded"
//         >
//           Register
//         </button>
//       </form>

//       <p className="mt-4 text-sm">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-600 underline">
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

// import { useContext } from "react";
// import { Link, useNavigate } from "react-router"; // ✅ FIXED HERE
// import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
// import { toast } from "react-hot-toast";

// const Register = () => {
//   const { createUser, updateUserProfile } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const photo = form.photo.value;
//     const password = form.password.value;

//     // ✅ Password validation
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const isValidLength = password.length >= 6;

//     if (!hasUpperCase || !hasLowerCase || !isValidLength) {
//       toast.error("Password must have uppercase, lowercase, and at least 6 characters.");
//       return;
//     }

//     // ✅ Register the user
//     createUser(email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;

//         // ✅ Update displayName and photoURL
//         updateUserProfile({
//           displayName: name,
//           photoURL: photo,
//         })
//           .then(() => {
//             toast.success("Registration successful!");
//             navigate("/login"); 
//           })
//           .catch((err) => {
//             console.error("Profile update failed:", err);
//             toast.error("Profile update failed.");
//           });
//       })
//       .catch((error) => {
//         console.error("Register error:", error);
//         toast.error("Registration failed: " + error.message);
//       });
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 shadow-md rounded">
//       <h2 className="text-2xl font-semibold mb-4">Register</h2>
//       <form onSubmit={handleRegisterSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="photo"
//           placeholder="Photo URL"
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full mb-3 p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white p-2 rounded"
//         >
//           Register
//         </button>
//       </form>

//       <p className="mt-4 text-sm">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-600 underline">
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;


import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext/AuthProvider";
import { toast } from "react-hot-toast";

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

    // Password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isValidLength) {
      toast.error("Password must have uppercase, lowercase, and at least 6 characters.");
      return;
    }

    // Register the user
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update displayName and photoURL
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
    <div className="max-w-md mx-auto p-6 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;