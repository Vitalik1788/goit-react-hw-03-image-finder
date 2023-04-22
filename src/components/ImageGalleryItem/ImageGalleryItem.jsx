import { ImageItem, Image } from "./ImageGalleryItem.styled";


export const ImageGalleryItem = ({ image, onImageClick }) => {
  const { largeImageURL, webformatURL, tags } = image;

  return (
    <ImageItem
      onClick={event => {
        event.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <Image src={webformatURL} alt={tags} loading="lazy" />
    </ImageItem>
  )

}
