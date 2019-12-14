import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItemText } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import TimelineIcon from '@material-ui/icons/Timeline';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { logout } from '../Public/Redux/Action/user';
import { useDispatch } from "react-redux"

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
  // const onClose = props.onClose;
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

  const dispatch = useDispatch()

  const userLogout = async () => {
    await dispatch(logout());
    props.history.push('/LoginPage');
  }

  React.useEffect(() => {
    console.log(display)
  }, [display])

  // const handleProductClose = () => {
  //   setShow(false);
  // };

  // const handleProductOpen = () => {
  //   setShow(true);
  // };

  // const handleCategoryClose = () => {
  //   setDisplay(false);
  // };

  // const handleCategoryOpen = () => {
  //   setDisplay(true);
  // };

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
          <ListItemIcon> <LocalMallIcon /></ListItemIcon>
          <ListItemText primary="Products Item" />
        </ListItem>
        <ListItem button onClick={() => { props.history.push('/History') }}>
          <ListItemIcon > <TimelineIcon /> </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button onClick={() => { props.history.push('/AddProduct') }}>
          <ListItemIcon> <AddBoxIcon /> </ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem button onClick={() => { props.history.push('/CategoryTable') }}>
          <ListItemIcon> <AddBoxOutlinedIcon /> </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem button>
          <ListItemIcon> <SettingsIcon /> </ListItemIcon>
          <ListItemText primary="Admin Page" />
        </ListItem>
        <ListItem button onClick={userLogout}>
          <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Drawer>
    </div>
  );
}

export default withRouter(Header);