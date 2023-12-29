"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../CharacterDetailPage.module.css";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { DotButton, useDotButton } from "./SliderDotButton";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  imgs: string[];
};

const ImageSlider: FC<Props> = ({ imgs }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  );

  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, []);
  //スケルトン的なダミーをかえす？
  return isShow ? (
    <div className={styles["embla"]}>
      <div className={styles["embla__viewport"]} ref={emblaRef}>
        <div className={styles["embla__container"]}>
          {imgs.map((image, index) => (
            <div className={styles["embla__slide"]} key={index}>
              <Image
                className={styles["embla__slide__img"]}
                src={image}
                alt="image"
                width={1282}
                height={722}
                priority={true}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles["embla__dots"]}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`${styles["embla__dot"]} ${
              index === selectedIndex ? styles["embla__dot--selected"] : ""
            }
            `}
          />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ImageSlider;
