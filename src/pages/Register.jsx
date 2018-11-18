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
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import {PropTypes as MobxPropTypes} from 'mobx-react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router'

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

@inject('authStore', 'userStore')
@observer
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      emailError: false,
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      passwordError: false
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      this.setState({ emailError: !this.validateEmail(this.state.email) })
    })
  }

  handlePasswordChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.password && this.state.confirmPassword) {
        this.setState({ passwordError: this.state.password !== this.state.confirmPassword })
      }
    })
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.authStore.register(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password
    )
  }

  render() {
    const { currentUser } = this.props.userStore
    if (currentUser) {
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
            <form className={this.props.classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input id="first-name" name="firstName" autoComplete="first-name" autoFocus onChange={this.handleChange}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                <Input id="last-name" name="lastName" autoComplete="last-name" autoFocus onChange={this.handleChange}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleEmailChange} error={this.state.emailError}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handlePasswordChange}
                  error={this.state.passwordError}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  id="confirm-password"
                  autoComplete="current-password"
                  onChange={this.handlePasswordChange}
                  error={this.state.passwordError}
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                className={this.props.classes.submit}
                type="submit"
                disabled={this.state.passwordError || this.state.emailError}
              >
              Register
              </Button>
            </form>
          </Paper>
          <Typography variant="subtitle1" style={{ textAlign: 'center', paddingTop: '20px' }}><Link to='/login' style={{ color: '#33691e', textDecoration: 'none' }}>Sign In</Link></Typography>
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
