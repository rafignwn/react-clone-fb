import { AuthContext } from "../../contexts/AuthContext";
import { FollowContext } from "../../contexts/FollowContext";
import { memo, useContext, useCallback, useState } from "react";
import axios from "axios";
import style from "./FollowButton.module.scss";
import { CircularProgress } from "@mui/material";

function FollowButton({ friendId }) {
  const { currentUser } = useContext(AuthContext);
  const { followings, setFollowings } = useContext(FollowContext);
  const [isFollowed, setIsFollowed] = useState(followings?.includes(friendId));
  const [isLoading, setIsLoading] = useState(false);

  const followOrUnfollow = useCallback(
    async function () {
      setIsLoading(true);
      try {
        // reqeust follow or unfollow
        const res = await axios.put(
          isFollowed
            ? `users/${friendId}/unfollow`
            : `users/${friendId}/follow`,
          {
            userId: currentUser._id,
          }
        );
        console.log(res.data.message);

        // referesh user followings
        const { data } = await axios.get(`users?id=${currentUser._id}`);
        setFollowings(data.followings);
        localStorage.setItem("followings", data.followings);
        // set isFollowed after request was seuccessfuly
        if (isFollowed) {
          setIsFollowed((prev) => !prev);
        } else {
          setIsFollowed((prev) => !prev);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [isFollowed]
  );

  return (
    <button
      className={`${style.followBtn} ${
        isFollowed ? style.unfollow : style.follow
      } ${isLoading ? style.followBtnLoading : ""}`}
      type="button"
      onClick={followOrUnfollow}
    >
      {isLoading ? (
        <CircularProgress color="warning" size="1.5rem" />
      ) : isFollowed ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </button>
  );
}

export default memo(FollowButton);
