import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppStyle } from './App/App.styled';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from '../ApiService/ApiService';
import Modal from './Modal/Modal';
import LoadMoreButton from './Button/Button';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

class App extends Component {
  // const totalPage = total / images.length;

  // {totalPage > 1 && !isLoading && images.length !== 0 && (
  //         <Button onClick={this.onLoadMore} />
  //       )}

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

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page} = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({isLoading: true})
      fetchImages(searchQuery, page).then(data =>
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalHits: data.totalHits,
          isLoading: false,
        }))
      );
    }
  }

  handleFormSubmit = userSearch => {
    this.setState({ searchQuery: userSearch, page: 1, images: [] });
  };

  onLoadMoreImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  };

  openModal = modalData => {
    this.setState({ modalData, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalData: null });
  };

  render() {
    const { images, modalData, showModal, totalHits, isLoading } = this.state;
    const totalPage = totalHits / images.length;

    return (
      <AppStyle>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images && <ImageGallery images={images} openModal={this.openModal} />}

        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <LoadMoreButton loadMore={this.onLoadMoreImg} />
        )}

        {showModal && (
          <Modal modalData={modalData} closeModal={this.closeModal} />
        )}
      </AppStyle>
    );
  }
}

export default App;
