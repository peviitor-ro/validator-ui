import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accesCookie } from "../utils/accesCookie";

function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login_url = process.env.REACT_APP_LOGIN_URL;

  useEffect(() => {
    const token = accesCookie("token");
    if (!token) {
      window.location.href = login_url;
      return;
    }
    dispatch({ type: "LOGIN_SUCCESS", payload: token });
    navigate("/");
  }, [dispatch, navigate, login_url]);

  return null;
}

export default Oauth;
