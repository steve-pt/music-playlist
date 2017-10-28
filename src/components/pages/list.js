import React, { Component } from 'react';
import { Link } from 'react-router-dom'


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
      let list = this.state.List.map((post) => (
          <li>
            <Link className="music" to={"/show/"+post.id}>
              <span className="track">{post.id} - {post.track}</span>
              <span className="artist">{post.artist} - {post.album}</span>
            </Link>
            <Link className="addFavorites" to="/">♥</Link>
          </li>
      ));
      return (
        <div className="list">
        <div className="title">Listagem de Músicas</div>
        <ul>
          { list }
        </ul>
        
    </div>
      );
  }
}
