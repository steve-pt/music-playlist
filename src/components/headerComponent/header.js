import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doLogout: false
        };
        this.logout = this.logout.bind(this);
    }
    logout() {
        sessionStorage.clear();
        this.setState({redirectToReferrer: true});
    }
    render() {
        let button = null;
        if(!sessionStorage.getItem('isUserLogged')){
            button = <Link className="login" to="/login">Login<span className="icon">☊</span></Link>; 
        } else {
            button = <div className="login">
                        <Link className="favorites" to="/favorites">Favoritos<span className="icon">♥</span></Link>
                        <a className="logout" onClick={this.logout}>Logout<span className="icon">×</span></a>
                    </div>;
        }

        if (this.state.redirectToReferrer) {
            this.setState({redirectToReferrer: false});
            return (<Redirect to={'/'} />)
        }

    return (
        <header>
            <div className="w-max">
                <div className="tbl">
                    <div className="tblcell">
                        <Link className="logo" to="/">Music Playlist</Link>
                        {button}
                    </div>
                </div>
            </div>
        </header>
    );
  }
}

export default Header;
