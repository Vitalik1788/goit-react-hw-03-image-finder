import { Component } from "react";
import { Overlay, Modals } from "./Modal.styled";
import { createPortal } from "react-dom";
import { PropTypes } from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalData: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalData;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Modals>
          <img src={largeImageURL} alt={tags} />
        </Modals>
      </Overlay>,
      modalRoot
    );
  }
}