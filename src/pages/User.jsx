import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { token, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [token, profile, dispatch, navigate]);

  if (!profile) {
    return (
      <main className="main bg-dark">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="main bg-dark user-page">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile.firstName} {profile.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
    </main>
  );
}