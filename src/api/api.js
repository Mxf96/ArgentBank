const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");

  return data.body.token;
}

export async function getUserProfile(token) {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch profile");

  return data.body;
}

export async function updateUserProfileApi(token, firstName, lastName) {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Update failed");

  return data.body; // profil mis à jour
}