import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import Searchbar from "./Searchbar/Searchbar";

import { AppStyle } from "./App/App.styled";

class App extends Component {
  state = {
    searchQuery: '',
  }

  handleFormSubmit = (userSearch) => {
    this.setState({ searchQuery: userSearch });
  }

  render() {
    return (
      <AppStyle>
        
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />

      </AppStyle>
    )

  }
}

export default App;

