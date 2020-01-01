import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import '../Style/font/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { withRouter } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';

//for product list
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { getCategory } from '../Public/Redux/Action/category';
import {
  getProductList,
  addToCart,
  removeFromCart, 
  changeQuantity,
  checkOutCart,
  removeAllFromCart
} from '../Public/Redux/Action/transaction';

import { getIdUser } from "../../src/Helpers/Jwt";
import Button from '@material-ui/core/Button';

//for search field
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';

//for sort by
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

//for cart
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const drawerWidth = 200;

const Home = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const initialFormState = {
    search: "",
    sort: "asc",
    order: "",
  };

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(initialFormState);

  //handleChange 
  const handleChange = name => event => {
    setInput({
      ...input,
      [name]: event.target.value,
    })
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    try {
      await dispatch(getProductList(input))
      console.log("input", input)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchProduct = async () => {
    try {
      await dispatch(getProductList());
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

  const { productList, detailTransaction, total_price } = useSelector(data => data.transaction);
  const resultCategory = useSelector(data => data.category.categoryList);

  const handleAddToCart = async (product) => {
    try {
      if (!product.is_selected) {
        await dispatch(addToCart(product));
      } else {
        await dispatch(removeFromCart(product));
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleChangeQuantity = async (product, changeType) => {
    let new_qty = 0;
    if (changeType === "reduce") {
      new_qty = product.qty - 1;
      if (new_qty < 1) {
        try {
          await dispatch(removeFromCart(product));
        } catch (error) {
          console.log("error removing from cart", error)
        }
      }
    } else {
      new_qty = product.qty + 1;
    }

    try {
      await dispatch(changeQuantity({ id_product: product.id_product, qty: new_qty }));
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleCheckout = async () => {
    const id_user = getIdUser();
    await dispatch(checkOutCart({
      id_user: id_user,
      total_price: total_price,
      detail_transaction: detailTransaction,
    }));
  }

  const handleRemoveAllFromCart = async (product) => {
    await dispatch(removeAllFromCart(product));
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    fetchCategory()
  }, [])


  let sortedProduct = productList.sort((a, b) => {
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
              <div className={classes.tableHandle}>
                <FormLabel><SortIcon/></FormLabel>
                <FormControl className={classes.formControl}>
                  <Select
                    variant="outlined"
                    value={input.sort}
                    onChange={handleChange("sort")}
                  >
                    <option value=""></option>
                    <option value="asc">Name (A-Z)</option>
                    <option value="desc">Name (Z-A)</option>
                  </Select>
                </FormControl>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-size-small"
                  size="small"
                  placeholder="Search product name"
                  variant="outlined"
                  onChange={handleChange("search")}
                  value={input.search}
                />
              </div>
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
                            {
                              item.is_selected !== true ? [
                                <span>
                                  <Typography variant="caption" color="textSecondary" component="p">
                                    Quantity : <b>{item.quantity}</b>
                                  </Typography>
                                  <Button variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    <Typography variant="caption" component="p" >
                                      Add to Cart
                                  </Typography>
                                  </Button>
                                </span>
                              ] :
                                [
                                  <span>
                                    <Typography variant="caption" color="textSecondary" component="p">
                                      Quantity : <b>{item.quantity}</b>
                                    </Typography>
                                    <Button variant="contained"
                                      color="primary"
                                      disabled
                                    >
                                      <Typography variant="caption" component="p" >
                                        Added
                                    </Typography>
                                    </Button>
                                  </span>
                                ]
                            }
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
          classes={classes.paperCart}
          anchor="right">
          <div className={classes.toolbar} />
          <main className={classes.cart}>
            <Typography align="center" variant="h5" style={{ fontFamily: "Airbnb Cereal App Bold", alignContent: "center", paddingBottom: 10 }} noWrap>
              Cart
          </Typography>
            <Grid container className={classes.root} spacing={1}>
              {detailTransaction.length > 0 ? detailTransaction.map((item, index) => {
                return (
                  <Card key={index}>
                    <CardMedia align="center">
                      <img src={item.image} width="100px" height="100px" />
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="caption" component="h6">
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" component="p">
                        Rp.{item.sub_total}
                      </Typography>
                      <ButtonGroup size="small" aria-label="small outlined button group">
                        {item.qty >= item.last_quantity ? [
                          <Button disabled><AddIcon /></Button>
                        ] :
                          [
                            <Button onClick={() => handleChangeQuantity(item, "add")}><AddIcon /></Button>
                          ]
                        }
                        <Button disabled>{item.qty}</Button>
                        <Button onClick={() => handleChangeQuantity(item, "reduce")}><RemoveIcon /></Button>
                      </ButtonGroup>
                    </CardContent>
                  </Card>
                )
              })
                : <div className={classes.emptyCartImage}>
                  <img src="https://image.flaticon.com/icons/png/512/2038/2038854.png"
                    className={classes.imageCart} />
                  <Typography align="center" variant="subtitle1" style={{ fontFamily: "Airbnb Cereal App Bold" }}>
                    Your Cart is Empty
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p">
                    Looks like you haven't added
                  </Typography>
                  <Typography variant="caption" color="textSecondary" component="p">
                    anything to your cart yet
                  </Typography>
                </div>
              }
            </Grid>
            <br />
            {detailTransaction.length > 0 &&
              <div>
                <Typography align="center" variant="subtitle1" style={{ fontFamily: "Airbnb Cereal App Bold" }}>
                  Total: Rp. {total_price}
                </Typography>
                <Button variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <br />
                <Button variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => handleRemoveAllFromCart(detailTransaction)}
                >
                  Remove All
              </Button>
              </div>
            }
          </main>
        </Drawer>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& .MuiOutlinedInput-input': {
      padding: 5,
      fontSize: 12,
      width: 200,
      height: 25,
    },
    '& .MuiFormControl-root': {
      marginBottom: 20,
      marginLeft: theme.spacing(2),
    },
    '& .MuiFormLabel-root': {
      fontSize: 12,
      verticalAlign: 'sub',
    },
    '& .MuiGrid-spacing-xs-1 > .MuiGrid-item': {
      padding: 10,
    },
    '& .MuiCard-root': {
      overflow: 'hidden',
      width: 250,
    },
    '& .MuiTypography-caption': {
      textAlign: 'center',
    },
    '& .MuiButtonGroup-root': {
      marginInlineStart: '17%',
      marginInlineEnd: '17%',
    },
    '& .MuiButton-fullWidth': {
      margin: '3%',
      width: '90%'
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: 10,
      paddingTop: 10,
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
  cart: {
    flexGrow: 1,
    padding: theme.spacing(2),
    width: 250,
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
  imageCart: {
    alignContent: "center",
    width: 150,
    height: 150,
    marginBottom: '10%'
  },
  emptyCartImage: {
    padding: '5% 15% 5% 15%',
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
  paperCart: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: 'flex-justify',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    width: 100,
  },
  tableHandle: {
    display: 'flex-justify',
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

export default withRouter(Home);