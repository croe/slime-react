import React, { Component } from "react";
import { render } from "react-dom";
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';

import LikeButton from './components/likeButton.js';

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Index</Link></li>
          <li><Link to="/page1">Page 1</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
        </ul>
        <div>{React.cloneElement(this.props.children, {
            key: this.props.location.pathname
        })}</div>
        <LikeButton />
      </div>
    )
  }
}

class Index extends Component {
  render() {
    return (
      <div className="Image">
        <h1>Index</h1>
        <p>Animation with React Router are not different than any other animation.</p>
      </div>
    )
  }
}

class Page1 extends Component {
  render() {
    return (
      <div className="Image">
        <h1>Page 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    )
  }
}

class Page2 extends Component {
  render() {
    return (
      <div className="Image">
        <h1>Page 2</h1>
        <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} />
    </Route>
  </Router>
), document.getElementById('main'))
