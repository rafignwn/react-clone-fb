import style from "./Share.module.scss";
import { PermMedia, AddLocation, Label, Close } from "@mui/icons-material";
import { pfimg } from "../../utils";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

export default function Share({ reFetchPost }) {
  const { currentUser } = useContext(AuthContext);
  const [imgPreview, setImgPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setImgPreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [selectedFile]);

  function removeImage() {
    setImgPreview("");
    setSelectedFile(null);
    fileRef.current.value = "";
  }

  function onSelectFile() {
    console.log("fileSelected");
    setSelectedFile(fileRef.current.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("submit");
    const postData = {
      userId: currentUser._id,
      desc: e.target[0].value,
    };
    try {
      if (selectedFile) {
        try {
          // create new form data
          const data = new FormData();

          data.append("image", selectedFile);
          // send data to server
          const res = await axios.post("upload", data);
          // set field img
          postData.image = res.data.filename;
        } catch (error) {
          throw error;
        }
      }

      await axios.post("posts/", postData);
      reFetchPost();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
      e.target[0].value = "";
      removeImage();
    }
  }

  return (
    <div className={style.shareContainer}>
      <form onSubmit={handleSubmit}>
        {/* share top */}
        <div className={style.shareTop}>
          <img
            crossOrigin="anonymous"
            src={pfimg + currentUser.profileImage}
            alt={`${currentUser.nickname} profile picture`}
            className={style.shareProfileImg}
          />
          <input
            type="textArea"
            required
            placeholder={`What's in your mind ${currentUser.username}`}
            className={style.shareInput}
          />
        </div>

        {/* share bottom */}
        <div className={style.shareBottom}>
          {imgPreview ? (
            <div className={style.shareImgPreview}>
              <Close className={style.shareCloseIcon} onClick={removeImage} />
              <img src={imgPreview} alt="image preview" />
            </div>
          ) : (
            ""
          )}
          <div className={style.shareBottomButton}>
            <div className={style.shareOptions}>
              <div className={style.shareOption}>
                <input
                  accept="image/jpg,image/jpeg,image/png"
                  id="ImageOrVideo"
                  type="file"
                  ref={fileRef}
                  onChange={onSelectFile}
                  hidden
                />
                <label
                  className={style.shareOptionLabel}
                  htmlFor="ImageOrVideo"
                >
                  <PermMedia
                    style={{
                      color: "#f64663",
                    }}
                    className={style.shareOptionIcon}
                  />
                  <span className={style.shareOptionText}>Photo or Video</span>
                </label>
              </div>
              <div className={style.shareOption}>
                <Label
                  style={{
                    color: "#1a22f7",
                  }}
                  className={style.shareOptionIcon}
                />
                <span className={style.shareOptionText}>Tag</span>
              </div>
              <div className={style.shareOption}>
                <AddLocation
                  style={{
                    color: "#0fab03",
                  }}
                  className={style.shareOptionIcon}
                />
                <span className={style.shareOptionText}>Location</span>
              </div>
            </div>
            <button className={style.shareButton}>Share</button>
          </div>
        </div>
      </form>
    </div>
  );
}
