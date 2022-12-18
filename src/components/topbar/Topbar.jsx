import style from "./Topbar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotifIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { pfimg } from "../../utils";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import UserModal from "../user-modal/UserModal";

export default function Topbar() {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={style.topbarContainer}>
      <div className={style.topbarLeft}>
        <div className={style.logo}>
          <Link to="/">
            Social<span>room</span>
          </Link>
        </div>
      </div>
      <div className={style.topbarCenter}>
        <div className={style.searchBar}>
          <SearchIcon className={style.topbarIcon} />
          <input type="text" placeholder="Search for friend or post..." />
        </div>
      </div>
      <div className={style.topbarRight}>
        <div className={style.menuContainer}>
          <a href="#HomePage" className={style.link}>
            Homepage
          </a>
          <a href="#Timeline" className={style.link}>
            Timeline
          </a>
        </div>
        <div className={style.iconContainer}>
          <a href="#message" className={style.btn}>
            <MessageIcon className={style.topbarIcon} />
            <span className={style.badge}>2</span>
          </a>
          <a href="#friends" className={style.btn}>
            <PeopleAltIcon className={style.topbarIcon} />
            <span className={style.badge}>1</span>
          </a>
          <a href="#notification" className={style.btn}>
            <NotifIcon className={style.topbarIcon} />
            <span className={style.badge}>3</span>
          </a>
        </div>
        <div id="TopbarProfile" className={style.topbarProfile}>
          <div
            className={style.profileImage}
            onClick={() => setShowModal((prev) => !prev)}
          >
            <img
              crossOrigin="anonymous"
              src={pfimg + currentUser.profileImage}
              alt={currentUser.username}
            />
          </div>
          {showModal ? (
            <div className={style.profileModal}>
              <UserModal setShowModal={setShowModal} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
