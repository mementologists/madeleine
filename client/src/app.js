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
import DataView from './components/dataView';

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
        <Route
          path="/data"
          component={DataView}
        />
      </div>
    </Router>
  </MuiThemeProvider>
, document.getElementById('root'));
