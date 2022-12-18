import { useState } from "react";
import { useReducer, createContext } from "react";

const INITIAL_STATE = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  registerSuccess: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export function AuthContextProvider({ children }) {
  function authReducer(state, action) {
    switch (action.type) {
      case "REFRESH_USER":
        const user = action.payload;
        localStorage.setItem("user", JSON.stringify(user));
        return {
          registerSuccess: false,
          currentUser: user,
        };
      case "REGISTER_SUCCESS":
        return {
          ...state,
          registerSuccess: true,
        };
      case "LOGOUT":
        return {
          registerSuccess: false,
          currentUser: null,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        registerSuccess: state.registerSuccess,
        dispatch: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
