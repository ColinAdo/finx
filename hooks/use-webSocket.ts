import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSocketConnected,
  setSocketDisconnected,
  setMessage,
} from "@/redux/features/authSlice";

const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const socketConnected = useAppSelector((state) => state.auth.socketConnected);

  useEffect(() => {
    if (isAuthenticated && !socketConnected) {
      const socket = new WebSocket("ws://localhost:8000/api/v1/chat/");

      socket.onopen = () => {
        console.log("WebSocket connected");
        dispatch(setSocketConnected());
      };

      // socket.onclose = () => {
      //   console.log("WebSocket disconnected");
      //   dispatch(setSocketDisconnected());
      // };

      // socket.onerror = (error) => {
      //   console.error("WebSocket Error: ", error);
      // };

      // socket.onmessage = (event) => {
      //   const message = JSON.parse(event.data);
      //   dispatch(setMessage(message));
      // };

      return () => {
        console.log("Cleaning up WebSocket connection");
        dispatch(setSocketDisconnected());
      };
    }
  }, []);
};

export default useWebSocket;
