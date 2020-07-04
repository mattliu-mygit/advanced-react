import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './storeProvider';

class SearchBar extends Component {
  state = {
    searchTerm: '',
  };
  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 300);
  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.doSearch();
    });
  };
  render() {
    return (
      <input
        ref={(input) => (this.searchInput = input)}
        type="search"
        value={this.state.searchTerm}
        placeholder="Enter Search Term"
        onChange={this.handleSearch}
      ></input>
    );
  }
}

export default storeProvider()(SearchBar);
