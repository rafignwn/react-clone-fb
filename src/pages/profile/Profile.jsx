import style from "./Profile.module.scss";
import { Feed, Rightbar } from "../../components";
import { pfimg } from "../../utils";
import { useParams } from "react-router-dom";
import { useGetAxios } from "../../hooks/useAxios";
import { memo, useContext, useEffect, useState } from "react";
import SkeletonProfile from "../../components/loading/SkeletonProfile";
import { Edit } from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthContext";
import EditProfileModal from "../../components/edit-profile-modal/EditProfileModal";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const { username } = useParams();
  const { data, isLoading, setUrl } = useGetAxios(`users?username=${username}`);
  const [isEditProfile, setIsEditProfile] = useState(false);

  useEffect(() => {
    setUrl(`users?username=${username}`);
  }, [username]);

  return isLoading ? (
    <SkeletonProfile />
  ) : (
    <>
      {isEditProfile ? (
        <EditProfileModal setShowModal={setIsEditProfile} />
      ) : (
        ""
      )}
      <div className={style.profile}>
        <div className={style.profileTop}>
          <div className={style.profileCover}>
            <img
              crossOrigin="anonymous"
              className={style.profileCoverImg}
              src={pfimg + data.coverImage}
              alt={`${data.nickname} cover picture`}
            />
            <div className={style.profileInfo}>
              <img
                crossOrigin="anonymous"
                className={style.profileUserImg}
                src={pfimg + data.profileImage}
                alt={`${data.nickname} profile picture`}
              />
              <h4 className={style.profileInfoName}>{data.nickname}</h4>
              <p className={style.profileInfoDesc}>{data.desc}</p>
            </div>
            {currentUser._id === data._id ? (
              <div
                onClick={() => setIsEditProfile((prev) => !prev)}
                id="EditProfileBtn"
                className={style.profileBtnEdit}
              >
                <span className={style.profileBtnEditText}>Edit Profile</span>
                <Edit className={style.profileEditIcon} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Feed username={username} className={style.profileFeed} />
        <Rightbar
          userProfile={data}
          className={style.profileRightbar}
          isProfile={true}
        />
      </div>
    </>
  );
}

export default memo(Profile);
