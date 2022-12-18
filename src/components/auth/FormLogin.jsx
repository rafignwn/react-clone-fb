import style from "./Auth.module.scss";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import AuthInput from "./AuthInput";

export default function FormLogin() {
  const { currentUser, registerSuccess } = useContext(AuthContext);
  const { loginCall, isLoading, errorMessage } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    loginCall(e.target[0].value, e.target[1].value);
  }
  return (
    <>
      {registerSuccess ? (
        <div className={style.authSuccessMessage}>
          <p className={style.authSuccessMessageText}>
            Your account was created successfully. Please login to access{" "}
            <b>Sosialroom</b>
          </p>
        </div>
      ) : (
        ""
      )}
      <h4 className={style.authTitle}>Log in to you account</h4>
      <form action="" onSubmit={handleSubmit} className={style.authForm}>
        <AuthInput
          type="email"
          placeholder="Email address"
          errorMessage={errorMessage?.emailError}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          errorMessage={errorMessage?.passwordError}
        />

        <button
          disabled={isLoading}
          className={`${style.authButton} ${isLoading ? style.p_loading : ""}`}
        >
          {isLoading ? (
            <CircularProgress color="warning" size={"2rem"} />
          ) : (
            "Sign in"
          )}
        </button>
      </form>
      <div className={style.authRegisterButton}>
        <span>Don't have an account?</span>
        <Link
          className={`${isLoading ? style.disabledLink : ""}`}
          to="/register"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}
