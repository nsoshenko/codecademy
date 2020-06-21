import React from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from "../SearchResults/SearchResults"
import Playlist from "../Playlist/Playlist"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [
        {
          id: '1',
          name: 'Energy',
          artist: 'Drake',
          album: 'IYALTOITITL',
        },
        {
          id: '2',
          name: 'White America',
          artist: 'Eminem',
          album: 'The Eminem Show',
        },
        {
          id: '3',
          name: 'This is America',
          artist: 'Childish Gambino',
          album: 'Single',
        }],
        playlistName: 'Tuesday',
        playlistTracks: [
          {
            id: '3',
            name: 'This is America',
            artist: 'Childish Gambino',
            album: 'Single',
          }
        ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
        this.setState({
          playlistTracks: [...this.state.playlistTracks, track]
        })
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
        this.setState({
          playlistTracks: this.state.playlistTracks.filter(savedTrack =>
            savedTrack.id !== track.id)
        })
      }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist () {

  }

  search(term) {
    console.log(term)
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
