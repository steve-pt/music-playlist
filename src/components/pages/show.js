import React from 'react';
//import { Link } from 'react-router-dom'
import Box from '../boxComponent/box';

export default class Show extends React.Component {
  constructor(){
      super(...arguments);
      this.state = {
        id: this.props.match.params.id,
        Show: []
      };
  }
  componentDidMount()
  {
      fetch('http://localhost:8080/api/musics/'+this.state.id)
          .then((response) => {
              if(response.ok){
                  return response.json();
              } else {
                  throw new Error("Server response wasn't OK");
              }
          })
          .then((responseData) => {
              this.setState({Show:responseData});
          })
  }
  render() {
    let favorites = null;
    if(sessionStorage.getItem('isUserLogged')){
        favorites = <div className="addFavorites"><span className='icon'>♥</span>Adicionar aos favoritos</div>
    }
      let show = this.state.Show.map((music) => (
          <div key="{music.id}" className="music">
            <div className="cover">
              <div className="record"></div>
            </div>
            <div className="details">
              <span className="track">{music.track}</span>
              <span className="artist">{music.artist}</span>
              <span className="album">{music.album}</span>
              {favorites}
            </div>
          </div>
      ));
      return (
        <div className="show">
            <Box title="Música" closeBtn={true} content={ show } />
        </div>
      );
  }
}
