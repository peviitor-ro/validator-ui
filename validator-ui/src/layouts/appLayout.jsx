import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accesCookie } from "../utils/accesCookie";

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;

  const logout_url = process.env.REACT_APP_LOGOUT_URL;

  if (!isAuthenticated) {
    const token = accesCookie("token");
    if (!token) {
      window.location.href = logout_url;
      return;
    }

    dispatch({ type: "LOGIN_SUCCESS", payload: token });
    navigate("/");
  }

  return <Outlet />;
}
