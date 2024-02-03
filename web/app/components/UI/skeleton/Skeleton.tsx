import { FC } from "react";

type Props = {
  additionalClass?: string;
};

const Skeleton: FC<Props> = ({ additionalClass = "" }) => {
  return <div className={`skeleton ${additionalClass}`} />;
};

export default Skeleton;
