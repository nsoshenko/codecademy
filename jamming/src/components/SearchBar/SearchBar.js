import React from "react"
import "./SearchBar.css"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
  }

  handleClick(e) {
    //console.log("Sibling: " + e.target.previousElementSibling)
    console.log("Term: " + e.target.previousElementSibling.value)
    this.props.onSearch(e.target.previousElementSibling.value)
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
               onChange={this.handleTermChange}/>
        <button className="SearchButton"
                onClick={this.handleClick}>SEARCH</button>
      </div>
    )
  }
}

export default SearchBar
