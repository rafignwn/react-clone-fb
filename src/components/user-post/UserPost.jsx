import style from "./UserPost.module.scss";
import { MoreVert, ThumbUp, Favorite } from "@mui/icons-material";
import { useState, useContext } from "react";
import { pfimg } from "../../utils";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { memo } from "react";
import { useGetAxios } from "../../hooks/useAxios";
import SkeletonPost from "../loading/SkeletonPost";

function Post({ post }) {
  const { currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUser._id));
  const { data, isLoading } = useGetAxios(`users?id=${post.author.id}`);
  const user = data;

  const handleLike = async () => {
    try {
      await axios.put(`posts/${post._id}/like`, {
        userId: currentUser._id,
      });
      if (isLiked) {
        setLike((prev) => prev - 1);
        setIsLiked(!isLiked);
      } else {
        setLike((prev) => prev + 1);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("post render");

  return isLoading ? (
    <SkeletonPost />
  ) : (
    <div className={style.postContainer}>
      <div className={style.postHeader}>
        <div className={style.postInfo}>
          <Link
            to={`/profile/${user?.username}`}
            className={style.postInfoUser}
          >
            <img
              crossOrigin="anonymous"
              src={pfimg + user?.profileImage}
              alt={user?.username}
              loading="lazy"
              className={style.postProfileImg}
            />
            <p className={style.postAuthor}>
              <span className={style.postAuthorNickname}>{user?.nickname}</span>
              <span className={style.postAuthorUsername}>
                @{user?.username}
              </span>
            </p>
          </Link>
          <span className={style.postDate}>{format(post.createdAt)}</span>
        </div>

        <div className={style.postMoreButton}>
          <MoreVert className={style.postMoreIcon} />
        </div>
      </div>

      <div className={style.postBody}>
        <div className={style.postDesc}>{post.desc}</div>
        {post.image ? (
          <div className={style.postImages}>
            <img
              crossOrigin="anonymous"
              className={style.postImage}
              src={pfimg + post.image}
              alt={post.desc}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={style.postFooter}>
        <div className={style.postLike}>
          <span className={style.postLikeButton} onClick={handleLike}>
            <ThumbUp className={style.postLikeIcon} />
          </span>
          <span className={style.postFavoriteButton} onClick={handleLike}>
            <Favorite className={style.postFavoriteIcon} />
          </span>
          {like ? (
            <span className={style.postLikeCount}>
              {isLiked && like > 1
                ? `You and ${like - 1} other people like it`
                : isLiked
                ? "You Like it"
                : `${like} People like it`}
            </span>
          ) : (
            ""
          )}
        </div>

        {post.comment ? (
          <div className={style.postCommentCount}>
            <span>{post.comment.length} comments</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default memo(Post);
