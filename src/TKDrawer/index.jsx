/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FormatListBulleted } from '@material-ui/icons';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import {
  Switch, Route, Link, BrowserRouter as Router,
} from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  panel: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }

  render() {
    const { mobileOpen } = this.state;
    const { classes, theme } = this.props;
    const {
      panels,
      container,
      renderAppbar,
      basename,
    } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {panels.map(panel => (
            panel.isChild ? (
              <Link to={panel.link} key={panel.title} style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>{panel.icon || <FormatListBulleted /> }</ListItemIcon>
                  <ListItemText primary={panel.title} />
                </ListItem>
              </Link>
            ) : ('')
          ))}
        </List>
      </div>
    );

    return (
      <Router basename={basename}>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            {
              renderAppbar != null
              && renderAppbar({
                expand: this.handleDrawerToggle,
                classes,
              })
            }
            <nav className={classes.drawer}>
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
            <main className={classes.content}>
              {
                renderAppbar != null
                && <div className={classes.toolbar} />
              }
              <Switch>
                {panels.map(p => (
                  <Route
                    path={p.link}
                    component={props => (
                      p.noPaper ? (
                        <div className={classes.panel}>
                          {p.view(props)}
                        </div>
                      ) : (
                        <Paper
                          className={classes.panel}
                        >
                          {p.view(props)}
                        </Paper>
                      )
                    )}
                    key={p.title}
                  />
                ))}
              </Switch>
            </main>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

ResponsiveDrawer.defaultProps = {
  container: undefined,
  style: null,
  theme: undefined,
  panels: [],
  renderAppbar: null,
  basename: '',
};

ResponsiveDrawer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  container: PropTypes.shape({}),
  panels: PropTypes.arrayOf(PropTypes.shape({})),
  renderAppbar: PropTypes.func,
  style: PropTypes.shape({}),
  theme: PropTypes.shape({}),
  basename: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
