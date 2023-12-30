import { FC } from "react";
import Image from "next/image";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

type Props = {
  name: string;
  img: string;
};

const AsideListItem: FC<Props> = ({ name, img }) => {
  return (
      <ListItem disablePadding>
        <ListItemButton>
          <Image
            width={45}
            height={45}
            alt={name}
            src={img}
            className="margin-right-little"
          />
        <ListItemText primary={name} primaryTypographyProps={{fontSize: '0.876rem'}} />
        </ListItemButton>
      </ListItem>
  );
};

export default AsideListItem;
