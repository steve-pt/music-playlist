import React from 'react';
import Box from '../boxComponent/box';

export default class Show extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      id: this.props.match.params.id,
      Show: []
    };
  }
  addFavorite(idMusic) {

    let user = JSON.parse(sessionStorage.getItem('userData'));
    if (user) {
      fetch('http://localhost:8080/api/users/' + user.id + '/musics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          musicid: idMusic
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson.message);
          return responseJson;
        })
    }
  }
  fetchData() {
    fetch('http://localhost:8080/api/musics/' + this.state.id)
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return [];
          } else {
            return response.json();
          }
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((responseData) => {
        this.setState({ Show: responseData });
      })
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    let show = this.state.Show.map((music) => (
      <div key="{music.id}" className="music">
        <div className="cover">
          <div className="record"></div>
        </div>
        <div className="details">
          <span className="track">{music.track}</span>
          <span className="artist">{music.artist}</span>
          <span className="album">{music.album}</span>
          {(sessionStorage.getItem('isUserLogged')) ? <a className="addFavorites" onClick={() => this.addFavorite(music.id)}><span className='icon'>♥</span>Adicionar aos favoritos</a> : ""}
        </div>
      </div>
    ));
    return (
      <div className="show">
        <Box title="Música" closeBtn={true} content={show} />
      </div>
    );
  }
}
