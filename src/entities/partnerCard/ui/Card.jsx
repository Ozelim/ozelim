import React from "react";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button, Textarea } from "@mantine/core";
import { getImageUrl } from "shared/lib";

import { GrDocumentPdf } from 'react-icons/gr'

export const PartnersCard = ({
  partner,
  viewPdf,
}) => {

  const [embla, setEmbla] = React.useState(null);

  const autoplay = React.useRef(Autoplay({ delay: 2000 }));

  useAnimationOffsetEffect(embla, 200);

  const [images, setImages] = React.useState([])

  React.useEffect(() => {

    const imageUrls = []

    for (const key in partner) {
      if (!isNaN(key)) {
        if (partner?.[key]) {
          imageUrls.push(partner?.[key])
        }
      }
    }
    setImages(imageUrls)
  }, [partner])

  return (
    <div className="relative rounded-primary overflow-hidden space-y-2  w-full shadow-md pb-4 max-w-xs mx-auto" >
      <Carousel
        slideSize={"100%"}
        loop
        withControls={false}
        w={"100%"}
        getEmblaApi={setEmbla}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {images?.map((img, i) => {
          return (
            <Carousel.Slide key={i} className={`relative `}>
              <img
                src={getImageUrl(partner, img)}
                className={
                  "flex justify-center items-center object-cover w-full h-56 text-3xl bg-slate-200"
                }
              >
                {/* {i + 1} */}
              </img>
            </Carousel.Slide>
          );
        })}
      </Carousel>
      <h2 className="text-center font-head text-2xl px-6">{partner.name}</h2>
      <p className="px-4 text-center text-sm">{partner.description}</p>
      {partner?.pdf && (
        <div className="flex justify-center mt-2">
          <Button
            compact
            variant="subtle"
            onClick={() => viewPdf(partner)}
          > 
          <GrDocumentPdf className="inline mr-2" size={20} />
            Документ
          </Button>
        </div>
      )}
    </div>
  );
};
