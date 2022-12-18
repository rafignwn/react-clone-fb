import { memo } from "react";
import style from "./Auth.module.scss";

function AuthContainer({ children }) {
  return <div className={style.authContainer}>{children}</div>;
}

export default memo(AuthContainer);
