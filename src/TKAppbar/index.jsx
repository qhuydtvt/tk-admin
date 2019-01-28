import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
// eslint-disable-next-line import/no-named-as-default
const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  grow: {
    flexGrow: 1,
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
  spaceBetween: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class TKAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  render() {
    const {
      classes,
      expand,
      title,
      menuItems,
      style,
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <AppBar position="fixed" className={classes.appBar} color={style ? style.colorAppbar : 'primary'}>
        <Toolbar className={classes.spaceBetween}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={expand}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ color: style ? style.colorTitle : '#fff' }}>
            {title || ''}
          </Typography>
          {
            menuItems.length > 0 && (
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )
          }
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
                open={open}
                onClose={this.handleClose}
              >
                {
                  menuItems.map(item => (
                    <MenuItem onClick={item.onClick}>
                      {item.icon}
                      &ensp;
                      {item.title}
                    </MenuItem>
                  ))
                }
              </Menu>
            )
          }
        </Toolbar>
      </AppBar>
    );
  }
}

TKAppBar.defaultProps = {
  classes: {},
  title: '',
  style: null,
  menuItems: [],
};

TKAppBar.propTypes = {
  expand: PropTypes.func.isRequired,
  title: PropTypes.string,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({}),
  menuItems: PropTypes.shape([
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
    }),
  ]),
};

export default withStyles(styles)(TKAppBar);
