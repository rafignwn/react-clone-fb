import Share from "../share/Share";
import style from "./Feed.module.scss";
import Post from "../user-post/UserPost";
import SkeletonPost from "../loading/SkeletonPost";
import { useGetAxios } from "../../hooks/useAxios";
import { memo, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useCallback } from "react";

function Feed({ className = "", username = "" }) {
  const { currentUser } = useContext(AuthContext);
  const { data, isLoading, reFetch } = useGetAxios(
    username
      ? `/posts/profile/${username}`
      : `/posts/timeline/${currentUser._id}`
  );

  console.log("render feed");

  // compare post
  const comparePost = useCallback(
    function (postA, postB) {
      return postA.createdAt > postB.createdAt
        ? -1
        : postA.createdAt < postB.createdAt
        ? 1
        : 0;
    },
    [data]
  );

  return (
    <div className={`${className} ${style.feedContainer}`}>
      <div className={style.feedWrapper}>
        {currentUser.username == username || !username ? (
          <Share reFetchPost={reFetch} />
        ) : (
          ""
        )}
        <div className={style.posts}>
          {isLoading ? (
            <SkeletonPost />
          ) : (
            data?.sort(comparePost).map((post) => {
              return <Post key={post._id} post={post} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Feed);
