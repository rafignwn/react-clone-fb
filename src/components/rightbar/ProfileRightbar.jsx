import style from "./Rightbar.module.scss";
import { memo, useContext } from "react";
import { useGetAxios } from "../../hooks/useAxios";
import { pfimg } from "../../utils";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import FollowButton from "../follow-button/FollowButton";

const UserFriend = memo(function ({ userId }) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAxios(`users?id=${userId}`);
  const friend = data;

  console.log("user friend render");

  const handleClick = () => {
    navigate(`/profile/${friend.username}`);
  };

  return (
    <div onClick={handleClick} className={style.rightbarFollowing}>
      {isLoading ? (
        <>
          <div
            className={`${style.followingSkeletonBg} ${style.rightbarFollowingImgWrapper}`}
          ></div>
          <span
            className={`${style.followingSkeletonBg} ${style.followingNameSkeleton}`}
          ></span>
        </>
      ) : (
        <>
          <div className={style.rightbarFollowingImgWrapper}>
            <img
              src={pfimg + friend?.profileImage}
              alt=""
              className={style.rightbarFollowingImg}
            />
          </div>
          <span className={style.rightbarFollowingName}>
            {friend?.username}
          </span>
        </>
      )}
    </div>
  );
});

function ProfileRightbar({ user }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser._id === user._id ? (
        ""
      ) : (
        <div className={style.rightbarFollowBtn}>
          <FollowButton friendId={user._id} />
        </div>
      )}
      <h4 className={style.rightbarTitle}>User Information</h4>
      <div className={style.rightbarProfileInfo}>
        <div className={style.rightbarProfileInfoItem}>
          <span className={style.rightbarProfileInfoKey}>City</span>
          <span className={style.rightbarProfileInfoValue}>
            {user.city ? user.city : "-"}
          </span>
        </div>
        <div className={style.rightbarProfileInfoItem}>
          <span className={style.rightbarProfileInfoKey}>From</span>
          <span className={style.rightbarProfileInfoValue}>
            {user.from ? user.from : "-"}
          </span>
        </div>
        <div className={style.rightbarProfileInfoItem}>
          <span className={style.rightbarProfileInfoKey}>Relationship</span>
          <span className={style.rightbarProfileInfoValue}>
            {user.relationship == 1
              ? "Single"
              : user.relationship == 2
              ? "Merried"
              : "-"}{" "}
          </span>
        </div>
      </div>

      <h4 className={style.rightbarTitle}>User Friends</h4>
      <div className={style.rightbarFollowings}>
        {user.followings.map((friendId, index) => {
          return <UserFriend key={friendId} userId={friendId} />;
        })}
      </div>
    </>
  );
}

export default memo(ProfileRightbar);
