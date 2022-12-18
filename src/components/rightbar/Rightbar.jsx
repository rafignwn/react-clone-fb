import { freinds } from "../../DummyData";
import style from "./Rightbar.module.scss";
import { pfimg, publicFolder } from "../../utils";
import ProfileRightbar from "./ProfileRightbar";
import { memo } from "react";

// online friend component
const OnlineFriend = ({ friend }) => {
  return (
    <li className={style.rightbarOnlineFriend}>
      <div className={style.rightbarOnlineFriendImg}>
        <img src={publicFolder + friend.profileImage} alt={friend.username} />
        <span className={style.badgeOnline}></span>
      </div>
      <span className={style.rightbarOnlineFriendName}>{friend.username}</span>
    </li>
  );
};

const HomeRightbar = () => {
  return (
    <>
      <div className={style.rightbarGift}>
        <img
          crossOrigin="anonymous"
          src={`${pfimg}/gift.png`}
          alt="gift"
          className={style.rightbarGiftImg}
        />
        <p className={style.rightbarGiftText}>
          <b>Franky</b> and <b>3 other friends</b> have a birthday today
        </p>
      </div>

      <div className={style.rightbarAdv}>
        <img
          crossOrigin="anonymous"
          src={`${pfimg}/adv.jpg`}
          alt="iklan nih bos"
          className={style.rightbarAdvImg}
        />
      </div>

      <ul className={style.rightbarOnlineFriends}>
        <h4 className={style.rightbarTitle}>Online Friends</h4>
        {freinds.map((friend, index) => (
          <OnlineFriend key={index} friend={friend} />
        ))}
      </ul>
    </>
  );
};

function Rightbar({ className = "", isProfile = false, userProfile = {} }) {
  return (
    <div className={`${className} ${style.rightbarContainer}`}>
      {isProfile && userProfile ? (
        <ProfileRightbar user={userProfile} />
      ) : (
        <HomeRightbar />
      )}
    </div>
  );
}

export default memo(Rightbar);
