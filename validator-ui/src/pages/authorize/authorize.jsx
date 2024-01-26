import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IsAuthorized } from "./isAuthorized";
import { useEffect } from "react";

function Authorize() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token_url = window.location.href.split("/");
  let token = token_url[token_url.length - 1];

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    }

    IsAuthorized(token).then((response) => {
      if (response.authorized) {
        dispatch({ type: "LOGIN_SUCCESS", payload: token });
        navigate("/");
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        navigate("/unauthorized");
      }
    });
  }, [dispatch, navigate, token]);
}

export default Authorize;
