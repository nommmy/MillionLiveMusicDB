type Props = {
  children: React.ReactNode;
  className?: string;
};

const ListItem = (props: Props) => {
  return (
    <li className={`MyList-item-root ${props.className ?? ""}`}>
      {props.children}
    </li>
  );
};

export default ListItem;
