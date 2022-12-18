import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useRegister() {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function registerCall({ nickname, username, email, password }) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await axios.post("auth/register", {
        nickname,
        username,
        email,
        password,
      });
      dispatch({ type: "REGISTER_SUCCESS" });
    } catch (error) {
      error.response.data
        ? setErrorMessage(error.response.data)
        : setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    registerCall,
    isLoading,
    errorMessage,
  };
}
