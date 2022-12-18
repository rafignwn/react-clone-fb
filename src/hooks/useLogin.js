import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FollowContext } from "../contexts/FollowContext";

export default function useLogin() {
  const { dispatch } = useContext(AuthContext);
  const {setFollowings} = useContext(FollowContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loginCall(email, password) {
    setIsLoading(true);
    try {
      const res = await axios.post("auth/login", { email, password });
      dispatch({ type: "REFRESH_USER", payload: res.data });
      localStorage.setItem("followings", res.data.followings);
      setFollowings(res.data.followings);
    } catch (error) {
      setErrorMessage(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    loginCall,
    isLoading,
    errorMessage,
  };
}
