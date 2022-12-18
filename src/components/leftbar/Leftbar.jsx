import style from "./Leftbar.module.scss";
import {
  RssFeed,
  Chat,
  VideoLibrary,
  Group,
  Bookmark,
  HelpOutline,
  School,
  Event,
  WorkOutline,
  Logout,
} from "@mui/icons-material";
import { freinds } from "../../DummyData";
import { publicFolder } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { memo } from "react";

const CloseFriend = memo(({ friend }) => {
  return (
    <li className={style.leftbarFriendListsItem}>
      <span className={style.leftbarFriendImage}>
        <img src={publicFolder + friend.profileImage} alt={friend.username} />
      </span>
      <span className={style.leftbarFriendName}>{friend.username}</span>
    </li>
  );
});

function Leftbar({ className = "" }) {
  console.log("leftbar render");

  return (
    <div className={`${className} ${style.leftbarContainer} `}>
      <ul className={style.leftbarMenu}>
        <h5 className={style.leftbarTitle}>Menu</h5>
        <li className={`${style.leftbarMenuItem} ${style.active}`}>
          <a href="#link" className={style.leftbarLink}>
            <RssFeed className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Feed</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <Chat className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Chat</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <VideoLibrary className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Video</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <Group className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Group</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <Bookmark className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Bookmark</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <WorkOutline className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Jobs</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <Event className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Event</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <School className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Courses</span>
          </a>
        </li>
        <li className={`${style.leftbarMenuItem}`}>
          <a href="#link" className={style.leftbarLink}>
            <HelpOutline className={style.leftbarIcon} />
            <span className={style.leftbarMenuItemText}>Questions</span>
          </a>
        </li>
      </ul>

      <ul className={style.leftbarFriendLists}>
        <h5 className={style.leftbarTitle}>Friends</h5>
        {freinds
          .sort((a, b) =>
            a.username > b.username ? 1 : a.username < b.username ? -1 : 0
          )
          .map((friend, index) => (
            <CloseFriend key={index} friend={friend} />
          ))}
      </ul>
    </div>
  );
}

export default memo(Leftbar);
