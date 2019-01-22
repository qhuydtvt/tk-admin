import React from 'react';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Add, Class } from '@material-ui/icons';
import { BrowserRouter as Router } from 'react-router-dom';
import Drawer from './Drawer';

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
    view: () => (<div>Class</div>),
    link: '/classes',
  },
  {
    icon: <Add />,
    title: 'Courses',
    view: () => (<div>Courses</div>),
    link: '/courses',
  },
];

export default () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Drawer panels={panels} />
    </MuiThemeProvider>
  </Router>
);
