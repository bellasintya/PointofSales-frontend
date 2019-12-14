import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Alert } from 'react-bootstrap';
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
import { registerUser } from '../Public/Redux/Action/user';
import { connect, useDispatch, useSelector } from 'react-redux';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://material-ui.com/">
      </Link>{' '}
    </Typography>
  );
}

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

function RegisterPage(props) {
  const classes = useStyles();

  const formState = {
    full_name: '',
    username: '',
    email: '',
    password: '',
  };

  const [input, setInput] = useState(formState);
  const [show, setShow] = useState(true);

  const handleChange = nameChange => e => {
    setInput({
      ...input,
      [nameChange]: e.target.value
    })
  }

  const registerResponse = useSelector(state => state.user.registerResponse);
  const dispatch = useDispatch();

  useEffect(() => {
    if (registerResponse.status === 200) clearForm();
  }, [registerResponse]);

  const clearForm = () => {
    setInput(formState);
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(input));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            {registerResponse.status === 400 ? (
              <Alert
                show={show}
                width="100%"
                variant="danger"
                onClose={() => setShow(!show)}
              >
                <p width="100%">{registerResponse.message}</p>
              </Alert>
            ) : ("")}

            {registerResponse.status === 200 ? (
              <Alert
                show={show}
                variant="success"
                onClose={() => setShow(!show)}
              >
                <p>{registerResponse.message}</p>
              </Alert>
            ) : ("")}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="full_name"
                name="full_name"
                variant="outlined"
                required
                fullWidth
                id="full_name"
                type="text"
                label="Full Name"
                autoFocus
                onChange={handleChange('full_name')}
                value={input.full_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                type="text"
                label="Email"
                onChange={handleChange('email')}
                value={input.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
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
            className={classes.submit}
            onClick={submitRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href='/LoginPage' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default connect()(RegisterPage);