import AuthContainer from "../../components/auth/AuthContainer";
import AuthLeft from "../../components/auth/AuthLeft";
import AuthRight from "../../components/auth/AuthRight";

export default function Login() {
  return (
    <AuthContainer>
      <AuthLeft />
      <AuthRight type="login" />
    </AuthContainer>
  );
}
