import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { Redirect } from 'react-router'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import {PropTypes as MobxPropTypes} from 'mobx-react'
import PropTypes from 'prop-types'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

@inject('appState')
@observer
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

    login = () => {
      this.props.appState.authenticate()
    }


    render() {
      if (this.props.appState.authenticated && !this.props.appState.authenticating) {
        return <Redirect push to="/" />
      }
      return (
        <React.Fragment>
          <CssBaseline />
          <main className={this.props.classes.layout}>
            <Paper className={this.props.classes.paper}>
              <Avatar className={this.props.classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography variant="h5">Register</Typography>
              <form className={this.props.classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="first-name">First Name</InputLabel>
                  <Input id="first-name" name="first-name" autoComplete="first-name" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="last-name">Last Name</InputLabel>
                  <Input id="last-name" name="last-name" autoComplete="last-name" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="confirm-password">Password</InputLabel>
                  <Input
                    name="confirm-password"
                    type="confirm-password"
                    id="confirm-password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  className={this.props.classes.submit}
                  onClick={this.login}
                >
                Sign in
                </Button>
              </form>
              <Typography variant="subtitle1" style={{ paddingTop: '20px' }}><Link to='/forgot-password' style={{ color: 'black', textDecoration: 'none' }}>Forgot your password?</Link></Typography>
            </Paper>
            <Typography variant="subtitle1" style={{ textAlign: 'center', paddingTop: '20px' }}>Don't have an account? <Link to='create-account' style={{ color: '#33691e', textDecoration: 'none' }}>Create one</Link></Typography>
          </main>
        </React.Fragment>
      )
    }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  appState: MobxPropTypes.observableArray
}

export default withStyles(styles)(Register)
