type Props = {
  children: React.ReactNode;
  className?: string;
};

const ListItemButton = (props: Props) => {
  return (
    <div
      className={`MyList-item-button-root ${props.className ?? ""}`}
      tabIndex={0}
      role="button"
    >
      {props.children}
    </div>
  );
};

export default ListItemButton;
