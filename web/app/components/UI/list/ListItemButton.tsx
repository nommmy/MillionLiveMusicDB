import styles from "./List.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ListItemButton = (props: Props) => {
  return (
    <div
      className={`${styles["MyList-item-button-root"]} ${
        props.className ?? ""
      }`}
      tabIndex={0}
      role="button"
    >
      {props.children}
      <span className={styles["MyTouch-ripple-root"]}></span>
    </div>
  );
};

export default ListItemButton;
