"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState } from "react";

type Track = {
  track_id: string;
  track_name: string;
}[];

const TrackSearch = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Track>([]);
  const [hadLoaded, setHadLoaded] = useState(false);
  const loading = open && options.length === 0;

  const handleOpen = async () => {
    setOpen(true);

    if (!hadLoaded) {
      try {
        const response = await fetch("/api/tracks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error(
          "There has been a problem with fetch operation: ",
          error
        );
        setOptions([{track_id: "No results", track_name: "No results"}]);
      }
      setHadLoaded(true);
    }
  };

  return (
    <Autocomplete
      open={open}
      onOpen={handleOpen}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.track_name === value.track_name
      }
      getOptionLabel={(option) => option.track_name}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <Link href={`/tracks/${option.track_id}`} key={option.track_id}>
          <li {...props} key={option.track_id}>
            {option.track_name}
          </li>
        </Link>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Music"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <div className="small-circle-spinner">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                  </div>
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default TrackSearch;
