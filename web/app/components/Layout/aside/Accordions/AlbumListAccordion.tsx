"use client";

import Link from "next/link";
import AsideListItem from "./AsideListItem";
import List from "@/app/components/UI/list/List";
import { useState } from "react";

type Albums = {
  album_id: string;
  name: string;
  album_image_url: string;
}[];

const AlbumListAccordion = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Albums>([]);
  const [hadLoaded, setHadLoaded] = useState(false);
  const loading = open && data.length === 0;

  const handleToggle = async () => {
    setOpen((open) => !open);

    if (!hadLoaded) {
      try {
        const response = await fetch("/api/albums");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("There has been a problem with fetch operation: ", error);
        setData([]);
      }
      setHadLoaded(true);
    }
  };
  return (
    <details onToggle={handleToggle} open={open}>
      <summary>
        <h4 className="title-h4 summary-inner">
          Albums<span className="summary-icon"></span>
        </h4>
      </summary>
      {loading ? (
        <div className="small-circle-spinner">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
      ) : (
        <List maxHeight={500}>
          {data.length > 0 &&
            data.map((album) => (
              <Link href={`/albums/${album.album_id}`} key={album.album_id}>
                <AsideListItem name={album.name} img={album.album_image_url} />
              </Link>
            ))}
        </List>
      )}
    </details>
  );
};

export default AlbumListAccordion;
