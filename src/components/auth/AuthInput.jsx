import style from "./Auth.module.scss";
import { WarningAmberRounded } from "@mui/icons-material";

export default function AuthInput({
  type = "text",
  placeholder,
  errorMessage,
  className = "",
}) {
  return (
    <div className={`${style.authFormGroup} ${className}`}>
      <div className={style.authInputWrapper}>
        <input
          type={type}
          required
          placeholder={placeholder}
          className={`${style.authInput} ${
            errorMessage ? style.authInputError : ""
          }`}
        />
        {errorMessage ? (
          <WarningAmberRounded className={style.authErrorIcon} />
        ) : (
          ""
        )}
      </div>
      {errorMessage ? (
        <span className={style.authError}>{errorMessage}</span>
      ) : (
        ""
      )}
    </div>
  );
}
