import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { inject } from 'mobx-react';
import logo from './live-thrive-logo.png';
import {withRouter} from 'react-router-dom';
import History from '@material-ui/icons/History';
import TrendingUp from '@material-ui/icons/TrendingUp';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  logo: {
    width: '100%',
    height: 'auto',
    display: 'block',
    padding: '7px 0'
  },
  iconHolder: {
    flex: 1,
    textAlign: 'right'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

@inject("store")
@withRouter
class ClippedDrawer extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.setState({ anchorEl: null});
    this.props.store.authenticate();
  }

  handleTableOnClick = () => {
    this.props.history.push('/');
  }

  handleGraphOnClick = () => {
    this.props.history.push('/graph');
  }

  handleMyAccount = () => {
    this.props.history.push('/profile');
    this.handleClose();
  }

  render() {
    const { classes, children, store } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="absolute">
            <Toolbar>
              <div style={{ maxWidth: '186px' }} >
                <img src={logo} alt="Live Thrive" className={classes.logo} />
              </div>
              { store.authenticated && (
                <div className={classes.iconHolder} >
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
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
                    <MenuItem onClick={this.handleMyAccount}>My account</MenuItem>
                    <MenuItem onClick={this.logout}>Sign out</MenuItem>
                  </Menu>
                </div>
                )}
            </Toolbar>
          </AppBar>
        {store.authenticated && (
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <List>
              <ListItem button onClick={this.handleTableOnClick}>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="Table" />
              </ListItem>
              <ListItem button onClick={this.handleGraphOnClick}>
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText primary="Graph" />
              </ListItem>
            </List>
          </Drawer>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);