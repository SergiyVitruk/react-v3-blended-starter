import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import toast from "react-hot-toast";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  const onSubmit = async (query: string) => {
    setIsError(false);
    setIsLoading(true);
    setIsEmpty(false);

    try {
      const data = await getPhotos(query);

      if (!data.length) {
        toast.error(`We don't find photos with ${query}`);
        setIsEmpty(true);
        return;
      }

      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={openModal} />
          )}
          {isEmpty && <Text textAlign="center">{"We don`t find photos"}</Text>}
          {isError && <Text textAlign="center">{"Error"}</Text>}
          {isLoading && <Loader />}
          {isModalOpen && selectedPhoto && (
            <Modal photo={selectedPhoto} onClose={closeModal} />
          )}
        </Container>
      </Section>
    </>
  );
}
