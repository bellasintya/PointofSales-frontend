import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItemText } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import TimelineIcon from '@material-ui/icons/Timeline';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { logout } from '../Public/Redux/Action/user';
import { useDispatch } from "react-redux"

//for dialog
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    backgroundColor: '#ffdb58',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    backgroundColor: '#ffdb58',
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: 36,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  toolbar: {
    display: 'flex-justify',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    width: 150,
  },
  toolbarFix: {
    display: 'flex-justify',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    width: 300,
  },
}));

const Header = props => {
  const classes = useStyles();
  const theme = useTheme();

  const onOpen = props.open;
  const title = props.title;

  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [display, setDisplay] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setShow(true);
  };

  const handleLogoutCancel = () => {
    setShow(false);
  };

  const dispatch = useDispatch()

  const userLogout = async () => {
    await dispatch(logout());
    props.history.push('/SignInPage');
  }

  React.useEffect(() => {
  }, [display]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" style={{ fontFamily: "Airbnb Cereal App Bold", margin: "auto", color: "black" }} noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={onOpen}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button onClick={() => { props.history.push('/Home') }}>
          <ListItemIcon> <LocalMallOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Products Item" />
        </ListItem>
        <ListItem button onClick={() => { props.history.push('/History') }}>
          <ListItemIcon > <TimelineIcon /> </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button onClick={() => { props.history.push('/ProductTable') }}>
          <ListItemIcon> <AddBoxOutlinedIcon /> </ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem button onClick={() => { props.history.push('/CategoryTable') }}>
          <ListItemIcon> <LocalOfferOutlinedIcon /> </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem button>
          <ListItemIcon> <AccountCircleOutlinedIcon /> </ListItemIcon>
          <ListItemText primary="Admin Page" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Drawer>

      {/* logout modal */}
      <Dialog open={show} onClose={handleLogoutCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" align="center">Are you sure want to log out?</DialogTitle>
        <DialogActions align="center">
          <Button onClick={handleLogoutCancel} color="unset" variant="contained">
            Cancel
          </Button>
          <Button type="submit" onClick={userLogout} color="secondary" variant="contained">
            Logout
          </Button>{' '}
        </DialogActions>
        <br/>
      </Dialog>
    </div>
  );
}

export default withRouter(Header);