import style from "./Loader.module.css";
import { CircleLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <CircleLoader color="#e2e2e2" />
    </div>
  );
}
