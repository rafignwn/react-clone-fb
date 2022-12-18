import { memo } from "react";
import style from "./Auth.module.scss";

function AuthLeft() {
  console.log("left auth render");
  return (
    <div className={style.authLeft}>
      <div className={style.authLeftContent}>
        <h1 className={style.authLogo}>
          Social<span>room</span>
        </h1>
        <p className={style.authDesc}>
          Connect with friends and the world around on Socialroom
        </p>
      </div>
    </div>
  );
}

export default memo(AuthLeft);
