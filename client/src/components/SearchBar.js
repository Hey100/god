import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    term: ''
  };
  render() {
    return (
      <div>
        <input
					type="search"
          className="all__search"
          value={this.state.term}
					placeholder="Search.."
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchChange(term);
  }
}

export default SearchBar;
