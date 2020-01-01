import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { registerUser } from '../Public/Redux/Action/user';
import { connect, useDispatch, useSelector } from 'react-redux';
import Logo from '../Style/image/logo.png';
import Notifications from './Notifications';
import { openNotification } from '../Public/Redux/Action/notification';

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
        margin: theme.spacing(4, 4),
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

function SignUpPage(props) {
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

    const clearForm = () => {
        setInput(formState);
    };

    useEffect(() => {
        if (registerResponse.status === 200) clearForm();
    }, [registerResponse]);

    const submitRegister = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(registerUser(input));
            let notification = {};
            if (result.value.data.status === 400) {
                notification = {
                    variant: 'error',
                    message: result.value.data.message,
                }
            } else {
                notification = {
                    variant: 'success',
                    message: result.value.data.message,
                }
            }  
            await dispatch(openNotification(notification));            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <img className={classes.avatarImage} src={Logo} alt="logo"/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        {registerResponse.status === 400 ? (
                            <Notifications show='true' 
                                message={registerResponse.message} 
                                status='error'
                                />
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
                        <TextField
                            autoComplete="full_name"
                            name="full_name"
                            variant="outlined"
                            required
                            fullWidth
                            id="full_name"
                            label="Full name"
                            autoFocus
                            onChange={handleChange('full_name')}
                            value={input.full_name}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            autoComplete="email"
                            onChange={handleChange('email')}
                            value={input.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="Username"
                            type="username"
                            id="username"
                            autoComplete="username"
                            onChange={handleChange('username')}
                            value={input.username}
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
                            autoComplete="password"
                            onChange={handleChange('password')}
                            value={input.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={submitRegister}
                        >
                            Sign In
                        </Button>
                        <Grid container justify="center">
                            <Grid item>
                                <Link href="/SignInPage" variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default connect()(SignUpPage);
