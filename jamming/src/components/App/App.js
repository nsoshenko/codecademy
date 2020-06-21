import React from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from "../SearchResults/SearchResults"
import Playlist from "../Playlist/Playlist"
import Spotify from "../../util/Spotify"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack =>
      savedTrack.ID === track.ID)) {
        this.setState({
          playlistTracks: [...this.state.playlistTracks, track]
        })
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.ID === track.ID)) {
        this.setState({
          playlistTracks: this.state.playlistTracks.filter(savedTrack =>
            savedTrack.ID !== track.ID)
        })
      }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  async savePlaylist() {
    await Spotify.savePlaylist(this.state.playlistName,
                               this.state.playlistTracks)
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
    })
  }

  async search(term) {
    this.setState({
      searchResults: await Spotify.search(term)
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist name={this.state.playlistName}
                      tracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
