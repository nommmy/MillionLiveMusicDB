"use client";

import List from "@/app/components/UI/list/List";
import AsideListItem from "./AsideListItem";
import { useState } from "react";
import Link from "next/link";

type Characters = {
  artist_id: string;
  character_name: string;
  image_6th: string;
  image_uniform: string;
  color: string;
}[];

const CharacterListAccordion = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Characters>([]);
  const [hadLoaded, setHadLoaded] = useState(false);
  const loading = open && data.length === 0;

  const handleToggle = async () => {
    setOpen((open) => !open);

    if (!hadLoaded) {
      try {
        const response = await fetch("/api/characters");
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
          Characters<span className="summary-icon"></span>
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
            data.map((character) => (
              <Link
                href={`/characters/${character.artist_id}`}
                key={character.character_name}
              >
                <AsideListItem
                  name={character.character_name}
                  img={character.image_6th ?? character.image_uniform}
                />
              </Link>
            ))}
        </List>
      )}
    </details>
  );
};

export default CharacterListAccordion;
