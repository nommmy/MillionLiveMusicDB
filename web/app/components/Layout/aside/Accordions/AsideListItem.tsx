"use client";

import { FC } from "react";
import Image from "next/image";
import ListItem from "@/app/components/UI/list/ListItem";
import ListItemText from "@/app/components/UI/list/ListItemText";
import ListItemButton from "@/app/components/UI/list/ListItemButton";

type Props = {
  name: string;
  img: string;
};

const AsideListItem: FC<Props> = ({ name, img }) => {
  return (
    <ListItem>
      <ListItemButton>
        <Image
          width={45}
          height={45}
          alt={name}
          src={img}
          className="margin-right-little"
        />
        <ListItemText
          primary={name}
          primaryTypographyProps={{ fontSize: "0.876rem" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default AsideListItem;
