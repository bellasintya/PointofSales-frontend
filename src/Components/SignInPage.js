import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Logo from '../Style/image/logo.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { loginUser } from '../Public/Redux/Action/user';
import { connect, useDispatch, useSelector } from 'react-redux';
import Notifications from './Notifications';
import { openNotification } from '../Public/Redux/Action/notification';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Point of Sales
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundBlendMode: 'screen',
    backgroundImage: 'url(./petshop2.png)',
    backgroundRepeat: 'repeat',
    backgroundColor: 'unset',
    backgroundSize: 'auto',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0.75),
    backgroundColor: 'white',
    width: 100,
    height: 100,
  },
  avatarImage: {
    width: 'unset',
    height: 130,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInPage(props) {
  const classes = useStyles();
  const formState = {
    username: "",
    password: "",
    result: ''
  };

  const [input, setInput] = useState(formState);
  const [show, setShow] = useState(true);

  const { loginResponse, isLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(input));
      let notification = {};
      if (result.action.payload.data.status === 200) {
        localStorage.setItem("x-access-token", result.action.payload.data.result.token)
        localStorage.setItem("id_user", result.action.payload.data.result.id_user)
        localStorage.setItem("username", result.action.payload.data.result.username)
        notification = {
          variant: 'success',
          message: result.value.data.message,
        }
        props.history.push('/Home')
      } else {
        notification = {
          variant: 'error',
          message: result.value.data.message,
        }
      await dispatch(openNotification(notification));            
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = nameChange => e => {
    setInput({
      ...input,
      [nameChange]: e.target.value
    })
  } 

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <br />
          <Notifications/>
          <Avatar className={classes.avatar}>
            <img className={classes.avatarImage} src={Logo} alt="logo"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              onChange={handleChange('username')}
              value={input.username}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange('password')}
              value={input.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitLogin}
            >
              Sign In
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default connect()(SignInPage);
