import style from "./GridItem.module.css";
import type { ReactNode, MouseEventHandler } from "react";

interface GridItemProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
}

export default function GridItem({ children, onClick }: GridItemProps) {
  return (
    <li className={style.item} onClick={onClick}>
      {children}
    </li>
  );
}
