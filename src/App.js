import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import List from './components/pages/list';
import Show from './components/pages/show';
import Login from './components/pages/login';
import Favorites from './components/pages/favorites';

// includes
import './assets/css/default.min.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <div className="container">
            <div className="tbl">
              <div className="tblcell">
                <Route exact path="/" component={List} />
                <Route path="/show/:id" component={Show} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/favorites" component={Favorites} />
              </div>
            </div>
          </div>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
