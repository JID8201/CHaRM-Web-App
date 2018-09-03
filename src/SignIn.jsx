import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router';

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
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          redirect: false
        };
    }

    handleOnClick = () => {
      this.setState({redirect: true})
    }

    render() {
        if (this.state.redirect) {
          return <Redirect push to="/home" />;
        }
        
        return (
            <React.Fragment>
              <CssBaseline />
              <main className={this.props.classes.layout}>
                <Paper className={this.props.classes.paper}>
                  <Avatar className={this.props.classes.avatar}>
                    <LockIcon />
                  </Avatar>
                  <Typography variant="headline">Sign in</Typography>
                  <form className={this.props.classes.form}>
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
                    <Button
                      fullWidth
                      variant="raised"
                      color="primary"
                      className={this.props.classes.submit}
                      onClick={this.handleOnClick}
                    >
                      Sign in
                    </Button>
                  </form>
                </Paper>
              </main>
            </React.Fragment>
          );
    }
}

export default withStyles(styles)(SignIn);