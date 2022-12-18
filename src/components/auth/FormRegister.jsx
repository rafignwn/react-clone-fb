import style from "./Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useRegister from "../../hooks/useRegister";
import { AuthContext } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import AuthInput from "./AuthInput";

export default function FormRegister() {
  const { registerSuccess } = useContext(AuthContext);
  const [stage, setStage] = useState("first");
  const navigate = useNavigate();
  const { registerCall, isLoading, errorMessage } = useRegister();

  if (registerSuccess && !errorMessage) {
    return navigate("/login");
  }

  useEffect(() => {
    if (errorMessage) {
      setStage("first");
    }
  }, [errorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stage === "first") {
      console.log("change stage");
      setStage("second");
      return;
    }

    const fname = e.target[0].value;
    const username = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const confirmPassword = e.target[4].value;

    if (password !== confirmPassword) {
      e.target[4].setCustomValidity("Password don't match");
      console.log("password don't match");
      return;
    }

    registerCall({ nickname: fname, username, email, password });
  };

  return (
    <>
      <h4 className={style.authTitle}>Create your account</h4>
      {/* form register */}
      <form onSubmit={handleSubmit} className={style.authForm}>
        {/* first stage - nickname username email */}

        <AuthInput
          className={stage !== "first" ? style.authInputNone : ""}
          type="text"
          placeholder="Full name"
        />
        <AuthInput
          className={stage !== "first" ? style.authInputNone : ""}
          type="text"
          placeholder="Username"
          errorMessage={errorMessage?.usernameError}
        />
        <AuthInput
          className={stage !== "first" ? style.authInputNone : ""}
          type="email"
          placeholder="Email address"
          errorMessage={errorMessage?.emailError}
        />
        {/*  end first stage */}

        {/* second stage - input password */}
        {stage === "second" ? (
          <>
            <AuthInput
              className={stage !== "second" ? style.authInputNone : ""}
              type="password"
              placeholder="Password"
            />
            <AuthInput
              className={stage !== "second" ? style.authInputNone : ""}
              type="password"
              placeholder="Confirm password"
            />
          </>
        ) : (
          ""
        )}
        {/* end input password */}

        {/* button submit */}
        <button
          disabled={isLoading}
          className={`${style.authButton} ${isLoading ? style.p_loading : ""}`}
        >
          {isLoading ? (
            <CircularProgress color="warning" size={"2rem"} />
          ) : stage === "first" ? (
            "Next"
          ) : (
            "Sign up"
          )}
        </button>
        {/* end button submit */}
      </form>
      {/* end form register */}

      <div className={style.authRegisterButton}>
        <span>Have an account?</span>
        <Link to="/login">Sign In</Link>
      </div>
    </>
  );
}
