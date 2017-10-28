import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <header>
            <div className="w-max">
                <div className="tbl">
                    <div className="tblcell">
                        <Link className="logo" to="/">Music Playlist</Link>
                    </div>
                </div>
            </div>
        </header>
    );
  }
}

export default Header;
