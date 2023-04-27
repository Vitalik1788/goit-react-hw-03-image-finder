import React, { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as Icon } from '../IMG/searchImg.svg';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

class Searchbar extends Component {
  
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  handleInputChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      toast.error('Please enter search query field', {
        theme: 'colored',
        autoClose: 3000,
      });
      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <Icon width={20} height={20} />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;
