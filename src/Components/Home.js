import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import '../Style/font/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { withRouter } from 'react-router-dom';

//for product list
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { getProduct } from '../Public/Redux/Action/product';
import { getCategory } from '../Public/Redux/Action/category';
import Button from '@material-ui/core/Button';

//for cart
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';
import { keys } from '@material-ui/core/styles/createBreakpoints';

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
  card: {
    maxWidth: 200,
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
  media: {
    height: 200,
    width: 200
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  toolbar: {
    display: 'flex-justify',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    width: 100,
  },
  toolbarFix: {
    display: 'flex-justify',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    maxWidth: 280,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 80,
  },
}));

const Home = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchProduct = async () => {
    try {
      const data = await dispatch(getProduct());
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCategory = async () => {
    try {
      await dispatch(getCategory());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    fetchCategory()
  }, [])

  const dispatch = useDispatch();
  const result = useSelector(data => data.product.productList);
  const resultCategory = useSelector(data => data.category.categoryList);

  return (
    <div className={classes.root}>
      <Header open={open} onClose={handleDrawerClose} title="Product Item" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} >
          <Grid item xs={3} sm={11} margin={1} >
            <Paper className={classes.paper} xs={3} sm={11} >
              <Grid container className={classes.root} spacing={1}>
                {result !== undefined ? result.map(item => {
                  return (
                    <Grid key={item.id_product} item xs={3} sm={3}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia className={classes.media}>
                            <img src={item.image} alt={item.name} width="150px" height="150px" />
                          </CardMedia>
                          <CardContent>
                            <Typography gutterBottom variant="caption" component="h6">
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" component="p">
                              Price : Rp.{item.price}
                            </Typography>
                            <Button variant="contained" color="primary"> <Typography variant="caption" component="p">Add to Cart</Typography>
                            </Button>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )
                })
                  : <img src="https://thumbs.gfycat.com/BitterEarnestBeardeddragon-small.gif" align="center" width="200px" height="200px" />
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="right">
          <div className={classes.toolbar} />
          <main className={classes.content}>
          <Typography align="center" variant="h5" style={{ fontFamily: "Airbnb Cereal App Bold", alignContent: "center" }} noWrap>
              Cart
          </Typography>
            <Grid container className={classes.root} spacing={1}>
              <Card>
                <CardMedia align="center">
                  <img src="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//89/MTA-2418164/whiskas_cat-food-makanan-kucing-whiskas-tuna-7kg-7-kg_full02.jpg" width="150px" height="150px" />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="caption" component="h6">
                    {/* {item.name} */}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p">
                    {/* Price : Rp.{item.price} */}
                  </Typography>
                  <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button>One</Button>
                    <Button disabled>Three</Button>
                    <Button>Three</Button>
                  </ButtonGroup>
                </CardContent>
                <CardActionArea>
                  <Button variant="contained"
                    alignContent="center"
                    color="primary"
                    fullWidth>
                    Checkout
                  </Button>
                </CardActionArea>
                <br/>
                <CardActionArea>
                  <Button variant="contained"
                    alignContent="center"
                    color="secondary"
                    fullWidth>
                    Remove
                  </Button>
                </CardActionArea>
              </Card>
            </Grid>
          </main>
        </Drawer>
      </div>
    </div>
  );
}

export default withRouter(Home);