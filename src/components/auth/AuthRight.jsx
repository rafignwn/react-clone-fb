import { memo } from "react";
import style from "./Auth.module.scss";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

function AuthRight({ type }) {
  console.log("right auth render");
  return (
    <div className={style.authRight}>
      <h1
        className={`${style.authLogo} ${
          type === "login" ? style.authLogoAbsolute : ""
        }`}
      >
        Social<span>room</span>
      </h1>
      {type === "login" ? (
        <FormLogin />
      ) : type === "register" ? (
        <FormRegister />
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(AuthRight);
