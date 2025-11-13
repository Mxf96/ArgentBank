import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { token, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!profile) {
      dispatch(fetchUserProfile());
    } else {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [token, profile, dispatch, navigate]);

  const handleSave = async () => {
    await dispatch(updateUserProfile({ firstName, lastName }));
    setEditMode(false);
  };

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
        {editMode ? (
          <>
            <h1>Edit your name</h1>
            <div className="edit-form">
              <div className="input-group">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="button-group">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {profile.firstName} {profile.lastName}!
            </h1>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>
    </main>
  );
}
