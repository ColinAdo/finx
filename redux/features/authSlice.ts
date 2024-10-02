import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  socketConnected: boolean;
  messages: any[];
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  socketConnected: false,
  messages: [],
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.socketConnected = false;
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
    setSocketConnected: (state) => {
      state.socketConnected = true;
    },
    setSocketDisconnected: (state) => {
      state.socketConnected = false;
    },
    setMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  setAuth,
  logout,
  finishInitialLoad,
  setSocketConnected,
  setSocketDisconnected,
  setMessage,
} = authSlice.actions;
export default authSlice.reducer;
