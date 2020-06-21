let token = ''
const clientId = 'e0a80df1e53b4172ab4bb7cd7d55b595'
const redirectURI = "http://nsoshenko-jamming.surge.sh/"

const Spotify = {
  getAccessToken: function getAccessToken() {
    if (token) return token
    else if (!token && window.location.href.match('access_token=')) {
      console.log('Token is in URL')
      token = window.location.href.match(/access_token=([^&]*)/)[1]
      console.log('Token is set to: ' + token)

      let expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1]
      window.setTimeout(() => token = '', expirationTime * 1000)
      window.history.pushState('access_token=', null, '/')
      console.log('Expiration time is: ' + expirationTime)

      return token
    }
    else {
      console.log('Token is not in URL. Need to authorize')
      window.location = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}&response_type=token&` +
      `scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  },

  search: async function search(term) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`

    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${await this.getAccessToken()}`,
      },
    }).then(response => {
      return response.json() }).then(responseJson => {
        if (!responseJson.tracks.items) return []
        else {
          return responseJson.tracks.items.map(track => {
            return {
                ID: track.id,
                Name: track.name,
                Artist: track.artists[0].name,
                Album: track.album.name,
                URI: track.uri,
              }
          })
        }
      })
  },

  savePlaylist: async function savePlaylist(name, tracks) {
    if (!name || !tracks) {
      console.log('No name or tracks in playlist!')
      return
    }

    // Prepare variables
    const access_token = await this.getAccessToken()
    const headers = {
      Authorization: `Bearer ${access_token}`,
    }
    const endpointUserInfo = 'https://api.spotify.com/v1/me'

    // GET userInfo
    let userID = await fetch(endpointUserInfo, {
      headers: headers
    }).then(response => {
      return response.json()
    }).then(responseJson => {
      return responseJson.id
    })
    console.log('User ID from me: ' + userID)

    // Create Playlist
    let playlistID = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: name
        }),
      }).then(response => {
      return response.json()
    }).then(responseJson => {
      console.log(responseJson)
      return responseJson.id
    })
    console.log(playlistID)

    // Fill the Playlist

  }
}

export default Spotify
