import React, { useState } from "react";
import "./auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Account created for ${email}`);
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;
