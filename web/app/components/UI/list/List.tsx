import styles from "./List.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  maxHeight?: number;
};

const List = (props: Props) => {
  return (
    <ul
      className={`${styles["MyList-root"]} ${props.className ?? ""}`}
      style={{ maxHeight: `${props.maxHeight}px` }}
    >
      {props.children}
    </ul>
  );
};

export default List;
