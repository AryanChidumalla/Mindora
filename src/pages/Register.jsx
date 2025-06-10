import { NavBar } from "../components/NavBar";
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Register() {
  const [logIn, setLogIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    // Added 'async' for Firebase calls
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      if (logIn) {
        if (!email || !password) {
          setError("Please fill in all fields.");
          return;
        }
        if (!validateEmail(email)) {
          setError("Please enter a valid email address.");
          return;
        }

        await signInWithEmailAndPassword(auth, email, password);
        // Optionally redirect the user after successful login
      } else {
        if (!name || !email || !password || !confirmPassword) {
          setError("Please fill in all fields.");
          return;
        }
        if (!validateEmail(email)) {
          setError("Please enter a valid email address.");
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredentials.user;

        // Update the user's profile with the name
        await updateProfile(user, {
          displayName: name,
        });
        // Optionally redirect the user after successful signup
      }
      // Optionally reset the form after successful validation (or submission)
      // setName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
    } catch (err) {
      setError(err.message); // Display Firebase error message
      console.error("Firebase Auth Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-notion-light flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Form */}
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="w-[350px] flex flex-col items-center border-2 border-primary rounded-lg px-4 py-4">
          <div className="w-full flex justify-between gap-4">
            <button
              className={
                logIn
                  ? "w-full px-4 py-2 rounded-md bg-primary text-secondary"
                  : "w-full px-4 py-2 rounded-md bg-secondary text-primary"
              }
              onClick={() => {
                setLogIn(true);
                setError(""); // Clear error when switching modes
              }}
            >
              Log In
            </button>
            <button
              className={
                logIn
                  ? "w-full px-4 py-2 rounded-md bg-secondary text-primary"
                  : "w-full px-4 py-2 rounded-md bg-primary text-secondary"
              }
              onClick={() => {
                setLogIn(false);
                setError(""); // Clear error when switching modes
              }}
            >
              Sign Up
            </button>
          </div>
          {logIn ? (
            <form
              className="w-full flex flex-col gap-4 mt-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray rounded-md focus:outline-none focus:border-transparent"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray rounded-md focus:outline-none focus:border-transparent"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-secondary"
              >
                Log In
              </button>
            </form>
          ) : (
            <form
              className="w-full flex flex-col gap-4 mt-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray rounded-md focus:outline-none focus:border-transparent"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray rounded-md focus:outline-none focus:border-transparent"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray rounded-md focus:outline-none focus:border-transparent"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray rounded-md focus:outline-none focus:border-transparent"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-secondary"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 w-full flex justify-center">
        {error && (
          <p className="border-2 border-primary text-red-500 text-sm px-4 py-2 w-fit rounded-md">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
