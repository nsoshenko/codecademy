import React from "react"
import "./SearchBar.css"

class SearchBar extends React.Component {
  constructor(props) {
    super()
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match',
    }
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count',
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption]
      return (
        <li className={this.getSortByClass(sortByOptionValue)}
            onClick={() => this.handleSortByChange(sortByOptionValue)}
            key={ sortByOptionValue }>{ sortByOption }</li>
      )
    })
}

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active'
    return ''
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption,
    })
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value,
    })
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value,
    })
  }

  handleSearch(e) {
    this.props.searchYelp(this.state.term, this.state.location,
                          this.state.sortBy)
    e.preventDefault()
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            { this.renderSortByOptions() }
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={(e) => this.handleTermChange(e)}
                  placeholder="Search Businesses" />
          <input onChange={(e) => this.handleLocationChange(e)}
                  placeholder="Where?" />
        </div>
        <div onClick={this.handleSearch}
              className="SearchBar-submit">
          <a>Let's Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar
