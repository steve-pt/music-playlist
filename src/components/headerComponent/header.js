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
            button = <Link className="login" to="/login"><span className="icon">☊</span>Login</Link>; 
        } else {
            button = <a className="login" onClick={this.logout}><span className="icon">x</span>Logout</a>;
        }

        if (this.state.redirectToReferrer) {
            this.state.redirectToReferrer=false;
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
