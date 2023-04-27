import { ImageItem, Image } from './ImageGalleryItem.styled';
import { PropTypes } from 'prop-types';

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
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onImageClick: PropTypes.func.isRequired,
};
