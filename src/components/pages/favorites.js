import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Box from '../boxComponent/box';

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        Favorites: []
      };
  }
  componentDidMount()
  {
    let user = JSON.parse(sessionStorage.getItem('userData'));
    if(user){
      fetch('http://localhost:8080/api/users/'+user.id+'/musics')
          .then((response) => {
              if(response.ok){
                  return response.json();
              } else {
                  throw new Error("Server response wasn't OK");
              }
          })
          .then((responseData) => {
              this.setState({Favorites:responseData});
          })
    } else {
        return (<Redirect to={'/'} />);
    }
  }
  render() {
      let favorites = this.state.Favorites.map((music) => (
          <li key={music.id}>
            <Link className="music" to={"/show/"+music.id}>
              <span className="track">{music.track}</span>
              <span className="artist">{music.artist} - <i>{music.album}</i></span>
            </Link>
          </li>
      ));
      return (
        <div className="favorites">
            <Box title="Favoritos" closeBtn={true} content={<ul>{ favorites }</ul>} />
        </div>
      );
  }
}

  