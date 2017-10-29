import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Box from '../boxComponent/box';

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Favorites: []
        };
        this.removeFavorite = this.removeFavorite.bind(this);
    }
    // REMOVER DOS FAVORITOS
    removeFavorite(idMusic) {
        let user = JSON.parse(sessionStorage.getItem('userData'));
        if (user) {
            fetch('http://localhost:8080/api/users/' + user.id + '/musics/' + idMusic, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson.message);
                    this.fetchData();
                    return responseJson;
                })
        }
    }
    // BUSCAR FAVORITOS
    fetchData() {
        let user = JSON.parse(sessionStorage.getItem('userData'));
        if (user) {
            fetch('http://localhost:8080/api/users/' + user.id + '/musics')
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
                    this.setState({ Favorites: responseData });
                })
        } else {
            return (<Redirect to={'/'} />);
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    render() {
        let favorites = this.state.Favorites.map((music) => (
            <li key={music.id}>
                <Link className="music" to={"/show/" + music.id}>
                    <span className="track">{music.track}</span>
                    <span className="artist">{music.artist} - <i>{music.album}</i></span>
                </Link>
                <a className="removeFavorites" onClick={() => this.removeFavorite(music.id)}>♥</a>
            </li>
        ));
        let user = JSON.parse(sessionStorage.getItem('userData'));
        let title = "Músicas favoritas de " + user.username;
        return (
            <div className="favorites">
                <Box title={title} closeBtn={true} content={<ul>{favorites}</ul>} />
            </div>
        );
    }
}

