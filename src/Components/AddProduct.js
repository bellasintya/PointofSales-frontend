import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Header from './Header';
import { postProduct } from '../Public/Redux/Action/product';
import { getCategory } from '../Public/Redux/Action/category';
import { connect } from 'react-redux';

class AddProduct extends Component {
  state = {
    name: '',
    quantity: '',
    price: '',
    description: '',
    image: '',
    id_category: '',
    data: [],
    open: false,
    setOpen: true,
  };

  handleDrawerOpen = () => {
    this.setOpen(true); 
  };

  handleDrawerClose = () => {
    this.setOpen(false);
  };

  handleChange = (e) => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.dispatch(postProduct(this.state))
    console.log(this.state);
    this.props.history.push ('/ProductTable');
  }

  async componentDidMount() {
    await this.props.dispatch(getCategory())
    this.setState({
      data: this.props.category.categoryList
    })
  }

  render() {
    const classes = makeStyles(theme => ({
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(8),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      card: {
        maxWidth: 100,
      },
      media: {
        height: 100,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
      },
    }
    ));
    console.log(this.state.data);
    return (
      <div className={classes.root}>
        <Header open={this.open} onClose={this.handleDrawerClose} title="Add Product" />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <br/>
          <br/>
          <div className={classes.paper}>
            <main className={classes.content}>
              <Typography component="h1" align="center" variant="h5">
                Add Product
              </Typography>
              <form className={classes.form}
                onSubmit={this.handleSubmit}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Product Name"
                  type="text"
                  id="name"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Product Price"
                  type="number"
                  id="price"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="quantity"
                  label="Product Quantity"
                  type="number"
                  id="quantity"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="image"
                  label="Product Image"
                  type="text"
                  id="image"
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  onChange={this.handleChange}
                />

              <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  variant="outlined"
                  name="id_category"
                  value={this.state.id_category}
                  onChange={this.handleChange}
                  fullWidth
                >
                  {console.log(this.state.data)}
                  {this.state.data.map(item => {
                    return (
                      <MenuItem value={item.id_category}>{item.name}</MenuItem>
                    )
                  })
                  }
                  {/* {console.log ('halooo')} */}
                </Select>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Add Product
                </Button>
                  <Grid container>
                    <Grid item>
                      <Link to="/ProductTable" variant="body2">
                        {"Show All Product List"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </main>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (values) => {
  return {
    category: values.category
  }
}

export default connect(mapStateToProps)(AddProduct);