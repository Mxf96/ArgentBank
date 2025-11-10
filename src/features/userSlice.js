import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, getUserProfile } from "../api/api";

// === Thunk pour login ===
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, remember }, thunkAPI) => {
    try {
      const token = await loginUser(email, password);
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      return token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// === Thunk pour récupérer le profil ===
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const profile = await getUserProfile(token);
      return profile;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.profile = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;