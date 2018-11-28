import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import { inject } from 'mobx-react'
import logo from '../assets/images/live-thrive-logo.png'
import {withRouter} from 'react-router-dom'
import History from '@material-ui/icons/History'
import Timeline from '@material-ui/icons/Timeline'
import {PropTypes as MobxPropTypes} from 'mobx-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TableChart from '@material-ui/icons/TableChartOutlined'
import Map from '@material-ui/icons/MapOutlined'

const drawerWidth = 240

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
    zIndex: theme.zIndex.drawer + 1,
    display: 'flex',
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    // },
  },
  logo: {
    width: '100%',
    height: 'auto',
    display: 'block',
    padding: '7px 0'
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
    padding: '20px'
  },
  iconHolder: {
    flex: 1,
    textAlign: 'right'
  }
})

@inject('authStore', 'userStore')
@withRouter // This lets it switch between components. It uses the props.history!!!!!
class ClippedDrawer extends React.Component {
  state = {
    anchorEl: null,
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  logout = () => {
    this.setState({ anchorEl: null})
    this.props.authStore.logout()
  }

  handleTableOnClick = () => {
    this.props.history.push('/')
  }

  handleGraphOnClick = () => {
    this.props.history.push('/graph')
  }

  handleMyAccount = () => {
    this.props.history.push('/profile')
    this.handleClose()
  }

  handleExportClick = () => {
    this.props.history.push('/export')
  }

  handleMapClick = () => {
    this.props.history.push('/map')
  }

  render() {
    const { classes, children, userStore, theme } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button onClick={this.handleTableOnClick}>
            <ListItemIcon>
              <TableChart />
            </ListItemIcon>
            <ListItemText primary="Table" />
          </ListItem>
          <ListItem button onClick={this.handleGraphOnClick}>
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>
            <ListItemText primary="Graph" />
          </ListItem>
          <ListItem button onClick={this.handleExportClick}>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText primary="Export" />
          </ListItem>
        </List>
      </div>
    )
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ maxWidth: '186px' }} >
              <img src={logo} alt="Live Thrive" className={classes.logo} />
            </div>
            {userStore.currentUser && (
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
        {userStore.currentUser && (
          <nav className={classes.drawer}>
            {/* The implementation can be swap with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
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
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.array,
  children: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(ClippedDrawer)
