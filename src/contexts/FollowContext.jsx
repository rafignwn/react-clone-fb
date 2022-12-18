import { createContext, useState } from "react";

export const FollowContext = createContext({
  followings: localStorage.getItem("followings"),
});

export function FollowContextProvider({ children }) {
  const [followings, setFollowings] = useState(
    localStorage.getItem("followings")
  );

  return (
    <FollowContext.Provider
      value={{
        followings,
        setFollowings,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}
