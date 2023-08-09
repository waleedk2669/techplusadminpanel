// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  login: false,
  register: false,
  loading: false,
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.authToken = action.payload.data.token;
      localStorage.setItem('authToken', `${state.authToken}`);
      state.login = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.register = true
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export const {
  loginRequest,
  loginFailure,
  loginSuccess,
  registerRequest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
