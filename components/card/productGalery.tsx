"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export const ProductGallery = ({ images, name }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      {/* Main Image */}
      <div className="relative w-full aspect-[3/4] bg-white overflow-hidden rounded-lg">
        <Image
          src={selectedImage}
          alt={name}
          fill
          className="object-cover transition duration-300"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 mt-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative w-20 h-24 rounded-md overflow-hidden border transition
              ${
                selectedImage === img
                  ? "border-[#507c59] ring-2 ring-[#507c59]"
                  : "border-gray-200 hover:border-[#507c59]"
              }
            `}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
