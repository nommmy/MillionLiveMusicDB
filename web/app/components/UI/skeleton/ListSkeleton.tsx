import { FC } from "react";
import Skeleton from "@/app/components/UI/skeleton/Skeleton";
import SkeletonText from "@/app/components/UI/skeleton/SkeletonText";

type Props = {
  height: number;
  titleClass: string;
};

const ListSkeleton: FC<Props> = ({ titleClass, height }) => (
  <div className="main-contents-wrapper">
    <SkeletonText additionalClass={titleClass} />
    <Skeleton additionalClass={`list-skeleton-${height}`} />
  </div>
);

export default ListSkeleton;
