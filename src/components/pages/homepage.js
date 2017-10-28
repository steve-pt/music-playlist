import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Homepage extends Component {
  render() {
    return (
        <div className="container">
          <div className="tbl">
            <div className="tblcell">
                homepage
                <Link to="/list">List</Link>
            </div>
          </div>
        </div>
    );
  }
}

export default Homepage;
