import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ImageList>
      {images &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onImageClick={openModal}
            />
          );
        })}
    </ImageList>
  );
};

//       {showModal && (
//         <Modal modalData={modalData} closeModal={this.closeModal} />
//       )}
//     </>
//   );
// }

export default ImageGallery;
