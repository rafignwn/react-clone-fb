import { Feed, Rightbar } from "../../components";
import style from "./../../assets/Grid.module.scss";

export default function Home() {
  return (
    <div className={style.row}>
      <Feed className={style.column_8} />
      <Rightbar className={style.column_4} />
    </div>
  );
}
