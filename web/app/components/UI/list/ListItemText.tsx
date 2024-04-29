type Props = {
  primary: string;
  secondary?: string;
  primaryTypographyProps?: object;
};

const ListItemText = (props: Props) => {
  return (
    <div
      className={`MyList-item-text-root ${
        props.secondary ? "MyList-item-text-multiline" : ""
      }`}
    >
      <span
        className="My-typography-root MyList-item-text-primary"
        style={props.primaryTypographyProps}
      >
        {props.primary}
      </span>
      {props.secondary && (
        <p className="My-typography-root MyList-item-text-secondary">
          {props.secondary}
        </p>
      )}
    </div>
  );
};

export default ListItemText;
