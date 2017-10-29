import React from 'react';
import { Link } from 'react-router-dom'
import Box from '../boxComponent/box';

export default class List extends React.Component {
  constructor(){
      super(...arguments);
      this.state = {
        List: [],
      };
      this.addFavorites = this.addFavorites.bind(this);
  }
  addFavorites(idMusic) {
      
    let user = JSON.parse(sessionStorage.getItem('userData'));
    if(user){
       fetch('http://localhost:8080/api/users/'+user.id+'/musics', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
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
      let list = this.state.List.map((music) => (
          <li key={music.id}>
            <Link className="music" to={"/show/"+music.id}>
              <span className="track">{music.track}</span>
              <span className="artist">{music.artist} - <i>{music.album}</i></span>
            </Link>
            {(sessionStorage.getItem('isUserLogged')) ? <a className="addFavorites" onClick={() => this.addFavorites(music.id)}>♥</a> : ""}            
          </li>
      ));
      return (
        <div className="list">
            <Box title="Playlist" closeBtn={false} content={<ul>{ list }</ul>} />
        </div>
      );
  }
}
