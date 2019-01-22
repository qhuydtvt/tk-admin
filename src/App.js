import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import Drawer from './Drawer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Add, Class} from '@material-ui/icons';
import { BrowserRouter as Router } from "react-router-dom";

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const panels = [
  {
    icon: <Class />,
    title: 'Classes',
    view: (props) => (<div>Class</div>),
    link: '/classes'
  },
  {
    icon: <Add />,
    title: 'Courses',
    view: (props) => (<div>Courses</div>),
    link: '/courses',
  }
]

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Drawer panels={panels} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
