import Grid from "../Grid/Grid";
import type { Photo } from "../../types/photo";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";
import GridItem from "../GridItem/GridItem";

interface PhotoGalleryProps {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}

export default function PhotosGallery({ photos, onSelect }: PhotoGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => {
        return (
          <GridItem key={photo.id} onClick={() => onSelect(photo)}>
            <PhotosGalleryItem photo={photo} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
