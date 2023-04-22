import { Component } from "react";
import { Overlay, Modals } from "./Modal.styled";


export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }
  
  handleKeyDown = e => {
    if (e.code === "Escape") {
      this.props.closeModal();
      }
  }

  handleBackdropClick = e => {    
    if (e.currentTarget === e.target) {
      this.props.closeModal()
    }
  }

  render() {
    const { largeImageURL, tags } = this.props.modalData;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <Modals>
          <img src={largeImageURL} alt={tags} />
        </Modals>
      </Overlay>)
  }
}