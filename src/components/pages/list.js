import React from 'react';
import { Link } from 'react-router-dom'
import Box from '../boxComponent/box';

export default class List extends React.Component {
  constructor(){
      super(...arguments);
      this.state = {
        List: []
      };
  }
  componentDidMount()
  {
      fetch('http://localhost:8080/api/musics')
          .then((response) => {
              if(response.ok){
                  return response.json();
              } else {
                  throw new Error("Server response wasn't OK");
              }
          })
          .then((responseData) => {
              this.setState({List:responseData});
          })
  }
  render() {
        let favorites = null;
        if(sessionStorage.getItem('isUserLogged')){
            favorites = <Link className="addFavorites" to="/">♥</Link>
        }

      let list = this.state.List.map((music) => (
          <li key={music.id}>
            <Link className="music" to={"/show/"+music.id}>
              <span className="track">{music.track}</span>
              <span className="artist">{music.artist} - <i>{music.album}</i></span>
            </Link>
            {favorites}
          </li>
      ));
      return (
        <div className="list">
            <Box title="Playlist" closeBtn={false} content={<ul>{ list }</ul>} />
        </div>
      );
  }
}
