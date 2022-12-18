import style from "./Loading.module.scss";

export default function SkeletonProfile() {
  return (
    <div className={style.skeletonProfile}>
      <div className={style.skeletonProfileTop}>
        <div className={style.skeletonProfileCover} />
        <div className={style.skeletonProfileInfoWrapper}>
          <div className={style.skeletonProfileImg} />
          <div className={style.skeletonProfileName} />
          <div className={style.skeletonProfileDesc} />
        </div>
      </div>
    </div>
  );
}
