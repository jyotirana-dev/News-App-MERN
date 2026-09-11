
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import API_URL from "../api";
function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        // "http://localhost:8000/user/forgot-password",
        `${API_URL}/user/forgot-password`,
        {
          email
        }
      );

      // Development purpose:
      // Backend reset link return karega
      navigate(new URL(response.data.resetLink).pathname);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <div className="forgot-icon">
          🔐
        </div>

        <h2>Forgot Password?</h2>

        <p className="forgot-text">
          Enter your registered email address and we'll help
          you reset your password.
        </p>

        <form onSubmit={submitHandler}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating Link..." : "Continue"}
          </button>

        </form>

        <Link to="/login" className="back-login">
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;
