"use client";

import { ReactNode } from "react";
import { atom, Provider } from "jotai";
import { splitAtom } from "jotai/utils";

const NUMBER_OF_CHARACTER = 54;
export const characterIdAtom = atom(new Array(NUMBER_OF_CHARACTER).fill(""));
export const characterIdAtomsInAtom = splitAtom(characterIdAtom);

type Props = {
  children: ReactNode;
};

const SearchProviders = ({ children }: Props) => {
  return (
    <Provider>
      {children}
    </Provider>
  );
};

export default SearchProviders;