import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

//for search field
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

//for sort by
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

//for cart
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';
import { keys } from '@material-ui/core/styles/createBreakpoints';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& .MuiOutlinedInput-input': {
      padding: 5,
      fontSize: 12
    },
    '& .MuiFormControl-root': {
      verticalAlign: 0,
      marginBottom: 20,
      marginLeft: theme.spacing(2),
    },
    '& .MuiFormLabel-root': {
      fontSize: 15
    }
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
  iconButton: {
    padding: 7,
  },
  menuButton: {
    marginRight: 36,
  },
  media: {
    width: 200,
    padding: 5
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
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
}));

const Home = props => {
  const classes = useStyles();

  const initialFormState = {
    search: "",
    sort: "asc",
    order: "",
  };
  const [input, setInput] = useState(initialFormState);

  const handleChange = name => event => {
    setInput({
      ...input,
      [name]: event.target.value,
    })
  };

  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const submitSearch = async (e) => {
    e.preventDefault();
    try {
      await dispatch(getProduct(input))
      console.log("input", input)
    } catch (error) {
      console.log(error);
    }
  }  

  const fetchProduct = async () => {
    try {
      await dispatch(getProduct(input));
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

  let sortedProduct = result.sort((a, b) => {
    const isReversed = (input.sort === 'asc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  let filteredProduct = sortedProduct.filter((item) => {
    return item.name.toLowerCase().indexOf(input.search.toLowerCase()) !== -1;
  });

  return (
    <div className={classes.root}>
      <Header open={open} onClose={handleDrawerClose} title="Product Item" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} >
          <Grid item xs={3} sm={11} margin={1} >
            <Paper className={classes.paper} xs={3} sm={11} >
              <FormLabel>Sort By</FormLabel>
              <FormControl className={classes.formControl}>
                <Select
                  variant="outlined"
                  value={input.sort}
                  onChange={handleChange("sort")}
                >
                  <option value=""></option> 
                  <option value="asc">Name (A-Z)</option>
                  <option valZue="desc">Name (Z-A)</option>
                </Select>
              </FormControl>
              <TextField
                id="outlined-size-small"
                size="small"
                placeholder="Search product name"
                variant="outlined"
                onChange={handleChange("search")}
                value={input.search}
              />
              <IconButton type="submit" className={classes.iconButton} onClick={submitSearch} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Grid container className={classes.root} spacing={1}>
                {filteredProduct !== undefined ? filteredProduct.map(item => {
                  return (
                    <Grid key={item.id_product} item xs={3} sm={3}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia className={classes.media}>
                            <img src={item.image} alt={item.name} width="150px" height="150px" />
                          </CardMedia>
                          <CardContent>
                            <Typography gutterBottom variant="caption" component="h6">
                              <b>{item.name}</b>
                            </Typography>
                            <Typography variant="caption" color="textSecondary" component="p">
                              Price : Rp.{item.price}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" component="p">
                              Quantity : <b>{item.quantity}</b>
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
                    <Button>+</Button>
                    <Button disabled>{1}</Button>
                    <Button>-</Button>
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
                <br />
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