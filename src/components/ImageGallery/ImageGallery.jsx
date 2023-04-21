import { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageList } from "./ImageGallery.styled";

class ImageGallery extends Component {
  state = {
    images: null,
  }

  async componentDidUpdate(prevProps, prevState) {
   
    if (prevProps.searchQuery !== this.props.searchQuery) {
      await fetch(`https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=34648725-bf27d478d17617710acdd3b55&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(images => this.setState({ images: images.hits }));
    }
  }

  render() { 
    const { images } = this.state;    

    return (
      <ImageList className="gallery">        
        {this.state.images && <div>{images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
            />
          )
        })}</div>}
      </ImageList>
    )
  }
}

export default ImageGallery;