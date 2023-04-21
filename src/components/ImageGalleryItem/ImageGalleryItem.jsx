import { ImageItem, Image } from "./ImageGalleryItem.styled";


export const ImageGalleryItem = ({ image }) => {
  const { webformatURL, tags } = image;
  return (
    <ImageItem className="gallery-item">
      <Image src={webformatURL} alt={tags} />
    </ImageItem>
  )

}
