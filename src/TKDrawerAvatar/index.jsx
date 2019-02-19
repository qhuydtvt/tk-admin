import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withWidth from '@material-ui/core/withWidth';
import classNames from 'classnames';
import {
  Switch, Route, Link, BrowserRouter as Router,
} from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: 'all .5s',
  },
  appBarClose: {
    paddingLeft: 50,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: 'all .5s',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: 'all .5s',
  },
  drawerClose: {
    transition: 'all .5s',
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 7 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    borderRadius: '50%',
    maxWidth: '80px',
    margin: '10px',
  },
  AppbarLeft: {
    width: '95%', display: 'flex', alignItems: 'center',
  },
  AppbarRight: {
    width: '5%',
  },
});

const size = ['xs', 'md', 'sm'];

class LearnDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      anchorEl: null,
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.avatar = this.avatar.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { width } = this.props;
    if (nextProps.width !== width) {
      if (size.includes(nextProps.width)) {
        this.setState({
          open: false,
        });
      }
    }
  }

  handleDrawerOpen() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  avatar() {
    const {
      avatar,
      classes,
    } = this.props;
    if (avatar) {
      return (
        <Fragment>
          <div className={classNames(classes.toolbar, classes.avatar)}>
            <img className={classes.img} src={avatar} alt="Avatar" />
          </div>
          <Divider />
        </Fragment>
      );
    } return '';
  }

  buttonItems() {
    const { anchorEl, open } = this.state;
    const { menuItems } = this.props;
    const openAnchorEL = Boolean(anchorEl);
    if (menuItems.length > 0) {
      return (
        <Fragment>
          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {
          menuItems.length > 0 && (
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openAnchorEL}
            onClose={this.handleClose}
          >
            {
            menuItems.map(item => (
              <MenuItem
                onClick={item.onClick}
                key={item.title}
              >
                {item.icon}
                &ensp;
                {item.title}
              </MenuItem>
            ))
          }
          </Menu>
          )
      }
        </Fragment>
      );
    } return '';
  }

  render() {
    const {
      classes,
      panels,
      title,
    } = this.props;
    const { open } = this.state;
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes.appBarClose]: !open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <div className={classNames(classes.AppbarLeft)}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  {title}
                </Typography>
              </div>

              <div className={classNames(classes.AppbarRight)}>
                {/* ButtonItems */}
                {this.buttonItems()}
              </div>

            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
            open={open}
          >
            {/* Avatar */}
            {this.avatar()}

            {/* Panels */}
            <List>
              {panels.map((panel, index) => (
                panel.show ? (
                  <Link to={panel.link} key={index.toString()} className={classes.link}>
                    <ListItem button key={panel.title}>
                      <ListItemIcon>
                        {panel.icon}
                      </ListItemIcon>
                      <ListItemText primary={panel.title} />
                    </ListItem>
                  </Link>
                ) : (
                  ''
                )
              ))}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {panels.map((panel, index) => (
                <Route key={index.toString()} path={panel.link} component={panel.view} />
              ))}
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

LearnDrawer.defaultProps = {
  menuItems: [],
  avatar: null,
  title: '',
  width: '',
};

LearnDrawer.propTypes = {
  width: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({})),
  panels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  avatar: PropTypes.string,
  title: PropTypes.string,
};

export default withWidth()(withStyles(styles, { withTheme: true })(LearnDrawer));
