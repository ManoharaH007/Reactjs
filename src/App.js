import './App.css';
import React, { Component } from 'react';
import Navbar from './component/Navbar';
import News from './component/News'; 

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
    this.pageSize = 8;
    this.apiKey = process.env.REACT_APP_NEWS_API;
  }

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const { progress } = this.state;

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={2}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route path="/general-health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general-health" pageSize={this.pageSize} country="in" category="general-health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
