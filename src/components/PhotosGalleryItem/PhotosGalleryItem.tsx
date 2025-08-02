import type { Photo } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
}

export default function PhotosGalleryItem({ photo }: PhotosGalleryItemProps) {
  return (
    <div
      className={styles.thumb}
      style={{
        backgroundColor: "avg_color",
        borderColor: "avg_color",
      }}
    >
      <img src={photo.src.original} alt={photo.alt} />
    </div>
  );
}
