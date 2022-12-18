import style from "./ErrorPage.module.scss";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={style.error}>
      <div className={style.errorContent}>
        <h1>Oops!</h1>
        <p>Sorry, something went wrong.</p>
        <p className={style.errorMessage}>
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
}
