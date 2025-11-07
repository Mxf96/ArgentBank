import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import argentBankLogo from "../assets/img/argentBankLogo.png";
import { getUserProfile } from "../api/api";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // pour détecter les changements de route

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const profile = await getUserProfile(token);
        setUser(profile);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };

    fetchUser();
  }, [location]); // 👈 se relance à chaque navigation (login/logout)

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {!user ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i> {user.firstName}
            </Link>
            <button
              onClick={handleLogout}
              className="main-nav-item"
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              <i className="fa fa-sign-out"></i>Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
