import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppStyle, Alert, Error } from './App/App.styled';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from '../ApiService/ApiService';
import Modal from './Modal/Modal';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalData: null,
    totalHits: 0,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      const { searchQuery, page } = this.state;
      if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
        this.setState({ isLoading: true });
        const data = await fetchImages(searchQuery, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalHits: data.totalHits,
          isLoading: false,
        }));
      }
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      });
    }
  }

  handleFormSubmit = userSearch => {
    this.setState({ searchQuery: userSearch, page: 1, images: [] });
  };

  onLoadMoreImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = modalData => {
    this.setState({ modalData, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalData: null });
  };

  render() {
    const {
      images,
      modalData,
      showModal,
      totalHits,
      isLoading,
      searchQuery,
      error,
    } = this.state;
    const totalPage = totalHits / images.length;

    return (
      <AppStyle>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images && <ImageGallery images={images} openModal={this.openModal} />}

        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <LoadMoreButton loadMore={this.onLoadMoreImg} />
        )}

        {isLoading && <Loader />}

        {showModal && (
          <Modal modalData={modalData} closeModal={this.closeModal} />
        )}
        {images.length === 0 &&
          searchQuery !== '' &&
          !isLoading &&
          error === null && (
            <Alert>
              No images with search query: {searchQuery} :( <br />
              Try with new search query :)
            </Alert>
          )}

        {error && (
          <Error>
            Sorry, there was an error with the application: <br /> {error}, try
            again later
          </Error>
        )}
      </AppStyle>
    );
  }
}

export default App;
