import { useEffect } from "react";
import style from "./EditProfile.module.scss";
import { Image } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { pfimg } from "../../utils";
import { useState } from "react";
import axios from "axios";

export default function EditProfileModal({ setShowModal }) {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [previewCoverImg, setPreviewCoverImg] = useState(
    pfimg + currentUser.coverImage
  );
  const [previewProfileImg, setPreviewProfileImg] = useState(
    pfimg + currentUser.profileImage
  );

  useEffect(() => {
    function closestEditProfileModal(e) {
      if (
        !e.target.closest("#EditProfileModal") &&
        !e.target.closest("#EditProfileBtn")
      ) {
        setShowModal(false);
      }
    }

    window.addEventListener("click", closestEditProfileModal);

    return () => {
      window.removeEventListener("click", closestEditProfileModal);
      URL.revokeObjectURL(previewCoverImg);
      URL.revokeObjectURL(previewProfileImg);
    };
  }, []);

  function handleSelectCover(e) {
    const coverUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewCoverImg(coverUrl);
  }

  function handleSelectProfile(e) {
    const profileUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewProfileImg(profileUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nickname = e.target[2].value;
    const city = e.target[3].value;
    const from = e.target[4].value;
    const relationship = e.target[5].value;
    const description = e.target[6].value;

    setIsLoading(true);
    // store data to object user data
    let userData = {
      userId: currentUser._id,
    };
    // when value not empty, add new value into user data object
    if (nickname) userData.nickname = nickname;
    if (city) userData.city = city;
    if (from) userData.from = from;
    if (relationship) userData.relationship = Number(relationship);
    if (description) userData.desc = description;

    console.log(userData);

    const coverImg = e.target[0].files[0];
    const profileImg = e.target[1].files[0];

    try {
      // upload cover image if not empty
      if (coverImg) {
        console.log(coverImg);
        const data = new FormData();
        data.append("image", coverImg);
        if (currentUser.coverImage !== "d-cover.png") {
          data.append("remove", currentUser.coverImage);
        }

        try {
          const res = await axios.post("upload", data);
          userData.coverImage = res.data.filename;
        } catch (error) {
          throw error;
        }
      }

      // upload profile image if not empty
      if (profileImg) {
        const data = new FormData();
        data.append("image", profileImg);
        if (currentUser.profileImage !== "d-profile.png") {
          data.append("remove", currentUser.profileImage);
        }

        try {
          const res = await axios.post("upload", data);
          userData.profileImage = res.data.filename;
        } catch (error) {
          throw error;
        }
      }

      console.log(userData);

      // update profile
      await axios.put(`users/${currentUser._id}`, userData);
      const res = await axios.get(`users?id=${currentUser._id}`);
      dispatch({ type: "REFRESH_USER", payload: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  }

  return (
    <div className={style.shadowBackground}>
      <div id="EditProfileModal" className={style.editProfile}>
        <div className={style.editProfileWrapper}>
          <form className={style.editProfileForm} onSubmit={handleSubmit}>
            <div className={style.editProfileFormTop}>
              <div
                className={`${style.editProfileFormGroup} ${style.flexDouble}`}
              >
                <input
                  hidden
                  accept="image/jpg,image/jpeg,image/png"
                  id="CoverImage"
                  type="file"
                  onChange={handleSelectCover}
                />
                <img
                  className={`${style.editProfileImgPreview} ${style.imgCover}`}
                  src={previewCoverImg}
                  alt=""
                />
                <label className={style.editProfileLabel} htmlFor="CoverImage">
                  <Image className={style.editProfileIcon} />
                  Cover Image
                </label>
              </div>
              <div className={style.editProfileFormGroup}>
                <input
                  hidden
                  accept="image/jpg,image/jpeg,image/png"
                  id="ImageProfile"
                  type="file"
                  onChange={handleSelectProfile}
                />
                <img
                  className={style.editProfileImgPreview}
                  src={previewProfileImg}
                  alt=""
                />
                <label
                  className={style.editProfileLabel}
                  htmlFor="ImageProfile"
                >
                  <Image className={style.editProfileIcon} />
                  Profile Image
                </label>
              </div>
            </div>
            <div className={style.editProfileFormBottom}>
              <div className={style.editProfileFormGroup}>
                <input
                  className={style.editProfileInput}
                  placeholder="Full Name"
                  type="text"
                  defaultValue={currentUser.nickname}
                />
              </div>
              <div className={style.editProfileFormGroup}>
                <input
                  className={style.editProfileInput}
                  placeholder="Enter your city"
                  type="text"
                  defaultValue={currentUser.city}
                />
              </div>
              <div className={style.editProfileFormGroup}>
                <input
                  className={style.editProfileInput}
                  placeholder="Where do you come from"
                  type="text"
                  defaultValue={currentUser.from}
                />
              </div>
              <div className={style.editProfileFormGroup}>
                <div className={style.editProfileSelect}>
                  <select defaultValue="" className={style.editProfileInput}>
                    <option value="" className={style.option} disabled selected>
                      Your relationship
                    </option>
                    <option className={style.option} value={1}>
                      Single
                    </option>
                    <option className={style.option} value={2}>
                      Merried
                    </option>
                    <option className={style.option} value={3}>
                      Other
                    </option>
                  </select>
                </div>
              </div>
              <div className={`${style.editProfileFormGroup} ${style.colFull}`}>
                <textarea
                  className={`${style.editProfileInput}`}
                  placeholder="About your self"
                  rows={4}
                  type="text"
                  defaultValue={currentUser.desc}
                />
              </div>
            </div>
            <button className={style.editProfileSaveBtn}>
              {isLoading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
