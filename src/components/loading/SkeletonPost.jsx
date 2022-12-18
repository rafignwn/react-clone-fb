import style from "./Loading.module.scss";

export default function SkeletonPost() {
  return (
    <div className={style.skeletonPost}>
      <div className={style.skeletonPostInfo}>
        <div className={style.skeletonUserImg}></div>
        <div className={style.skeletonUsername}></div>
        <div className={style.skeletonPostDate}></div>
      </div>
      <div className={style.skeletonPostContent}>
        <div className={style.skeletonPostDesc}></div>
        <div className={style.skeletonPostImg}></div>
      </div>
      <div className={style.skeletonPostFooter}></div>
    </div>
  );
}
