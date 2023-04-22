import { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import Modal from '../Modal/Modal';
import LoadMoreButton from "components/Button/Button";

import { ImageList } from "./ImageGallery.styled";

class ImageGallery extends Component {
  state = {
    images: null,
    showModal: false,
    modalData: null,
  }

  async componentDidUpdate(prevProps, prevState) {   
    if (prevProps.searchQuery !== this.props.searchQuery) {
      await fetch(`https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=34648725-bf27d478d17617710acdd3b55&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(images => this.setState({ images: images.hits }));
    }
  }

  openModal = (modalData) => {
    this.setState({modalData, showModal: true})
  }

  closeModal = () => {
    this.setState({showModal: false})
  }

  render() { 
    const { images, showModal, modalData } = this.state;    

    return (
    <>
        <ImageList className="gallery"> 

                  
        {images && images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onImageClick={this.openModal}
            />
          )
        })}
        </ImageList>
        
        {images && <LoadMoreButton />}        
        
        {showModal && <Modal modalData={modalData} closeModal={this.closeModal} />}
        
    </>
    )
  }
}

export default ImageGallery;