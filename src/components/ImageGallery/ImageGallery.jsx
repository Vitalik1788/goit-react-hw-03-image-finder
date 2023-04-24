import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import LoadMoreButton from 'components/Button/Button';
import fetchImages from 'components/ApiService/ApiService';
import Loader from 'components/Loader/Loader';

import { ImageList } from './ImageGallery.styled';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

let PAGE = 1;

class ImageGallery extends Component {
  state = {
    value: '',
    images: null,
    showModal: false,
    modalData: null,
    status: STATUS.idle,
    error: '',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: STATUS.pending });
      fetchImages(this.props.searchQuery, PAGE)
        .then(images => {
          this.setState({
            images: images.hits,
            status: STATUS.resolved,
            totalHits: images.totalHits,
          });
        })
        .catch(error => this.setState({ error, status: STATUS.rejected }));
    }
  }

  onLoadMoreImg = async () => {
    this.setState({ status: STATUS.pending });
    const { hits } = await fetchImages(this.props.searchQuery, (PAGE += 1));
    this.setState(prevState => ({
      images: [...prevState.images, ...hits],
      status: STATUS.resolved,
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

    if (status === STATUS.idle) {
      return (
        <h1 style={{ textAlign: 'center' }}>
          Enter image name in search field ;)
        </h1>
      );
    }

    if (status === STATUS.pending) {
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

    if (status === STATUS.rejected) {
      return <div>{error.message}</div>;
    }

    if (status === STATUS.resolved) {
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
