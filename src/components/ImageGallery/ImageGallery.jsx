import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import LoadMoreButton from 'components/Button/Button';
import fetchImages from 'components/ApiService/ApiService';
import Loader from 'components/Loader/Loader';

import { ImageList } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

let PAGE = 1;

class ImageGallery extends Component {
  state = {
    value: '',
    images: null,
    showModal: false,
    modalData: null,
    status: Status.IDLE,
    error: '',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: Status.PENDING });
      fetchImages(this.props.searchQuery, PAGE)
        .then(images => {
          this.setState({
            images: images.hits,
            status: Status.RESOLVED,
            totalHits: images.totalHits,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  onLoadMoreImg = async () => {
    this.setState({ status: Status.PENDING });
    const { hits } = await fetchImages(this.props.searchQuery, (PAGE += 1));
    this.setState(prevState => ({
      images: [...prevState.images, ...hits],
      status: Status.RESOLVED,
    }));
  };

  openModal = modalData => {
    this.setState({ modalData, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, showModal, modalData, status, error, totalHits } =
      this.state;

    if (status === Status.IDLE) {
      return (
        <h1 style={{ textAlign: 'center' }}>
          Enter image name in search field ;)
        </h1>
      );
    }

    if (status === Status.PENDING) {
      return (
        <>
          <ImageList>
            {images &&
              images.map(image => {
                return (
                  <ImageGalleryItem
                    key={image.id}
                    image={image}
                    onImageClick={this.openModal}
                  />
                );
              })}
          </ImageList>
          <Loader />
        </>
      );
    }

    if (status === Status.REJECTED) {
      return <div>{error.message}</div>;
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageList>
            {images &&
              images.map(image => {
                return (
                  <ImageGalleryItem
                    key={image.id}
                    image={image}
                    onImageClick={this.openModal}
                  />
                );
              })}
          </ImageList>

          {totalHits > 12 && images.length !== totalHits && (
            <LoadMoreButton loadMore={this.onLoadMoreImg}>
              Load More
            </LoadMoreButton>
          )}

          {showModal && (
            <Modal modalData={modalData} closeModal={this.closeModal} />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
