import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Component/Registration/Registration';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Layout/Main';

import './Component/style.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/register" component={Register} />

    </Switch>
  </Router>
  , document.getElementById('root'));

  if (module.hot) {
    module.hot.accept();
  }