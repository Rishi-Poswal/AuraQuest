// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = `${import.meta.env.VITE_SERVER_URI}/api/auth`
// axios.defaults.withCredentials = true;

// // Async thunks
// export const signup = createAsyncThunk(
//   'auth/signup',
//   async ({ email, password, name }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/signup`, { email, password, name });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || "Error signing up");
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, { email, password });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Error logging in");
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axios.post(`${API_URL}/logout`);
//       return null;
//     } catch (error) {
//       return rejectWithValue("Error logging out");
//     }
//   }
// );

// export const verifyEmail = createAsyncThunk(
//   'auth/verifyEmail',
//   async (code, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/verify-email`, { code });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || "Error verifying email");
//     }
//   }
// );

// export const checkAuth = createAsyncThunk(
//   'auth/checkAuth',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/check-auth`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(null);
//     }
//   }
// );

// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/forgot-password`, { email });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || "Error sending reset password email");
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async ({ token, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || "Error resetting password");
//     }
//   }
// );

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     userDetails: null, // Added userDetails to store user information
//     isAuthenticated: false,
//     error: null,
//     isLoading: false,
//     isCheckingAuth: true,
//     message: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },
//     setUserDetails: (state, action) => {
//       state.userDetails = action.payload; // This reducer is for updating userDetails
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Signup
//       .addCase(signup.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Login
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.userDetails = action.payload.userDetails; // Store the userDetails here
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Logout
//       .addCase(logout.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.userDetails = null; // Clear userDetails on logout
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(logout.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Verify Email
//       .addCase(verifyEmail.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(verifyEmail.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//       })
//       .addCase(verifyEmail.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Check Auth
//       .addCase(checkAuth.pending, (state) => {
//         state.isCheckingAuth = true;
//         state.error = null;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isCheckingAuth = false;
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.isCheckingAuth = false;
//         state.isAuthenticated = false;
//         state.user = null;
//       })

//       // Forgot Password
//       .addCase(forgotPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.message = action.payload.message;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Reset Password
//       .addCase(resetPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.message = action.payload.message;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError, clearMessage, setUserDetails } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URI}/api/auth`;
axios.defaults.withCredentials = true;

// Retrieve stored auth data from localStorage
const getStoredAuthData = () => {
  const storedData = localStorage.getItem('auth');
  return storedData ? JSON.parse(storedData) : null;
};

// Async thunks (same as before)
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      // Dispatch the setAuthData action to store data in Redux and localStorage
      dispatch(setAuthData({ user: response.data.user, userDetails: response.data.userDetails }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error signing up");
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      // Dispatch the setAuthData action to store data in Redux and localStorage
      dispatch(setAuthData({ user: response.data.user, userDetails: response.data.userDetails }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error logging in");
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(`${API_URL}/logout`);
      dispatch(clearAuthData());  // Dispatch action to clear auth data from Redux and localStorage
      return null;
    } catch (error) {
      return rejectWithValue("Error logging out");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error verifying email");
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      return response.data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error sending reset password email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error resetting password");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userDetails: null, 
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    // Initialize with data from localStorage (if available)
    ...getStoredAuthData() || {},
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAuthData: (state, action) => {
      // Save authentication data to state and localStorage
      state.user = action.payload.user;
      state.userDetails = action.payload.userDetails;
      state.isAuthenticated = true;
      localStorage.setItem('auth', JSON.stringify(action.payload));  // Store in localStorage
    },
    clearAuthData: (state) => {
      state.user = null;
      state.userDetails = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');  // Remove from localStorage
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        // Auth data is handled by the dispatched setAuthData action
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        // Auth data is handled by the dispatched setAuthData action
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        // Auth data is handled by the dispatched clearAuthData action
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Other reducers for verifyEmail, forgotPassword, resetPassword...
  },
});

export const { clearError, clearMessage, setUserDetails, setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
