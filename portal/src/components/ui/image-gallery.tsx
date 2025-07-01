"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { getMediaInfo } from "@/utils/getMediaInfo";
import { CustomImage } from "@/components/controls";

export const ImageGallery = ({ images }: { images: unknown[] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const imagesData = images
    .map((image: unknown) => getMediaInfo(image))
    .map(({ imgUrl, alt }) => ({
      src: imgUrl,
      alt,
    }));

  return (
    <div className="relative w-full bg-white rounded-lg overflow-hidden">
      {images.map((image: unknown, index: number) => {
        const { imgUrl, alt, width, height } = getMediaInfo(image);

        return (
          <CustomImage
            key={index}
            src={imgUrl}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-cover object-center cursor-pointer"
            onClick={() => handleImageClick(index)}
          />
        );
      })}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={imagesData}
          index={currentIndex}
          plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        />
      )}
    </div>
  );
};
