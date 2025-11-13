import { Link, useNavigate } from "react-router-dom";
import argentBankLogo from "../assets/img/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

export default function Header() {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
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
      </Link>

      <div>
        {!profile ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i> {profile.firstName}
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
              <i className="fa fa-sign-out"></i>
              <strong> Sign Out</strong>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
