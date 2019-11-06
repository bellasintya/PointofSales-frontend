import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../Style/font/style.css';
import Header from './Header';
import { withRouter } from 'react-router-dom';

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

const History = props => {
  const classes = useStyles();
  // const theme = useTheme();

  const [open, setOpen] = React.useState(false);  

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} onClose={handleDrawerClose} title="History"/>

      <main className={classes.content}>
        <div className={classes.toolbar} />

      </main>
    </div>
  );
}

export default withRouter(History);