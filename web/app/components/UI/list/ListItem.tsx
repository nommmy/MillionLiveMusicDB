import styles from "./List.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ListItem = (props: Props) => {
  return (
    <li className={`${styles["MyList-item-root"]} ${props.className ?? ""}`}>
      {props.children}
    </li>
  );
};

export default ListItem;
