import style from "./../assets/Grid.module.scss";
import { Leftbar, Topbar } from "../components";
import { Outlet } from "react-router-dom";
import { memo } from "react";

function Root() {
  return (
    <>
      <Topbar />
      <div className={style.row}>
        <Leftbar className={style.column_3} />
        <div className={style.column_9}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default memo(Root);
