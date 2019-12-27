import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../Public/Redux/Action/user';
import { connect, useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage(props) {
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
      if (result.action.payload.data.status === 200) {
        localStorage.setItem("x-access-token", result.action.payload.data.result.token)
        localStorage.setItem("id_user", result.action.payload.data.result.id_user)
        localStorage.setItem("username", result.action.payload.data.result.username)
        props.history.push('/Home')
      } else {
        props.history.push('/LoginPage')
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {loginResponse.status === 400 ?
                <Alert
                  show={show}
                  width="100%"
                  variant="danger"
                  onClose={() => setShow((false))}
                >
                  <p>{loginResponse.message}</p>
                </Alert>
                : ("")
              }

              {loginResponse.status === 200 ? (
                <Alert
                  show={show}
                  variant="success"
                  onClose={() => setShow(!show)}
                >
                  <p>{loginResponse.message}</p>
                </Alert>
              ) : ("")}

            </Grid>
            <Grid item xs={12}>
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

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange('password')}
                value={input.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loadin={isLoading}
            className={classes.submit}
            onClick={submitLogin}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body2">
                Didn't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default connect()(LoginPage);