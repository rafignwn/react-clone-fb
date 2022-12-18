import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import style from "./UserModal.module.scss";
import { pfimg } from "../../utils";
import { Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function UserModal({ setShowModal }) {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    function closestModalProfile(e) {
      if (
        !e.target.closest("div#ModalTopbarProfile") &&
        !e.target.closest("div#TopbarProfile")
      ) {
        setShowModal(false);
      }
    }

    window.addEventListener("click", closestModalProfile);

    return () => {
      window.removeEventListener("click", closestModalProfile);
    };
  }, []);

  function handleLogout() {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  return (
    <div id="ModalTopbarProfile" className={style.userModal}>
      <div className={style.userModalWrapper}>
        {/* user modal profile */}
        <div className={style.userModalProfile}>
          <div
            className={style.userModalProfileInfo}
            onClick={() => {
              navigate(`/profile/${currentUser.username}`);
              setShowModal(false);
            }}
          >
            <img
              className={style.userModalProfileImg}
              src={`${pfimg}/${currentUser.profileImage}`}
              alt={currentUser.username}
            />
            <span className={style.userModalProfileName}>
              {currentUser.nickname}
            </span>
          </div>
          <div className={style.userModalProfileBtn}>
            <span className={style.userModalBtnAnotherProfile}>
              Show all profile
            </span>
          </div>
        </div>
        {/* end modal profile */}

        {/* user modal menu */}
        <ul className={style.userModalMenu}>
          <li className={style.userModalMenuItem}>
            <Settings className={style.userModalIcon} />
            <span className={style.userModalMenuItemText}>Settings</span>
          </li>
          <li className={style.userModalMenuItem} onClick={handleLogout}>
            <Logout className={style.userModalIcon} />
            <span className={style.userModalMenuItemText}>Logout</span>
          </li>
        </ul>
        {/* end modal menu */}
      </div>
    </div>
  );
}
