
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

function ResetPassword() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill both password fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `http://localhost:8000/user/reset-password/${token}`,
        {
          password
        }
      );

      alert(
        response.data.message ||
        "Password changed successfully"
      );

      // Password change hone ke baad Login page
      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data ||
        "Unable to reset password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">

      <div className="reset-card">

        <div className="reset-icon">
          🔒
        </div>

        <h2>Reset Password</h2>

        <p className="reset-text">
          Create a new password for your account.
        </p>

        <form onSubmit={submitHandler}>

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>

        </form>

        <button
          className="cancel-button"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}

export default ResetPassword;
