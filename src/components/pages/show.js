import React, { Component } from 'react';
import { Link } from 'react-router-dom'


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
      let show = this.state.Show.map((post) => (
          <div className="music">
            <div className="cover">
              <div className="record"></div>
            </div>
            <div className="details">
              <span className="num">{post.id}</span>
              <span className="track">{post.track}</span>
              <span className="artist">{post.artist}</span>
              <span className="album">{post.album}</span>
              <div className="addFavorites"><span className='icon'>♥</span>Adicionar aos favoritos</div>
            </div>
          </div>
      ));
      return (
        <div className="show">
        <div className="title">Show da Música</div>
        { show }
        
    </div>
      );
  }
}
