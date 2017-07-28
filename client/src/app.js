/*  eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import View from './components/view';
import Preview from './components/preview';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Router>
      <div>
        <Route exact path="/" component={View} />
        <Route
          path="/preview"
          component={Preview}
        />
      </div>
    </Router>
  </MuiThemeProvider>
, document.getElementById('root'));
