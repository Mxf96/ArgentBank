import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchUserProfile } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password, remember }));

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(fetchUserProfile());
      navigate("/user");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="sign-in-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}