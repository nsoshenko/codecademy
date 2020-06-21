import React from "react"
import "./Playlist.css"
import TrackList from "../TrackList/TrackList"

class Playlist extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.name}
               onChange={this.handleChange}/>
        <TrackList tracks={this.props.tracks}
                   onRemove={this.props.onRemove}
                   isRemoval={true} />
        <button className="Playlist-save"
                onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist
