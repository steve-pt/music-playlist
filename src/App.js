import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homepage';
import List from './components/pages/list';
import Show from './components/pages/show';

// includes
import './assets/css/default.min.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/list" component={List} />
          <Route exact path="/show" component={Show} />
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
