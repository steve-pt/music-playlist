import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class List extends Component {
  render() {
    return (
        <div className="list">
          List
          <Link to="/show">Show</Link>
        </div>
    );
  }
}

export default List;
