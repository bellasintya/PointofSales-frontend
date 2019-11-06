import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getCategory } from '../Public/Redux/Action/category';
import { getProduct, patchProduct, deleteProduct } from '../Public/Redux/Action/product';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//for header
import Header from './Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../Style/font/style.css';

//for dialog
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    width: '90%',
    overflowX: 'auto',
    // [top] [right] [bottom] [left]	
    margin: '4% 1% 1% 6%',
    alignContent: 'center'
  },
  table: {
    maxWidth: 800,
    alignContent: 'center'
  },
});

function ProductTable(props) {
  const [open, setOpen] = React.useState(false);  

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const formState = {
    id_product: "",
    name: "",
    quantity: "",
    price: "",
    description: "",
    image: "",
    id_category: ""
  };

  const [input, setInput] = useState(formState);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  let numb = 0;

  //for handling change
  const handleChange = nameChange => e => {
    setInput({
      ...input,
      [nameChange]: e.target.value
    })
  }

  //for submit data
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const result = await props.dispatch(patchProduct(input))
      setEditModal(!editModal)
    } catch (error) {
      console.log(error);
    }
  }

  const submitDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await props.dispatch(deleteProduct(input))
      setDeleteModal(!deleteModal)
    } catch (error) {
      console.log(error);
    }
  }

  //from button to dialog
  const updateProduct = (row) => {
    setInput(row)
    setEditModal(true);
  }

  const delProduct = (row) => {
    setInput(row)
    setDeleteModal(true);
  }

  //for handling close dialog
  const handleEditClose = () => {
    setEditModal(false)
  }

  const handleDeleteClose = () => {
    setDeleteModal(false)
  }

  //dipatch and fetchProduct

  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const data = await dispatch(getProduct());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])


  const fetchCategory = async (input) => {
    try {
      const result = await props.dispatch(getCategory(input))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const result = useSelector(data => data.product.productList);
  const resultCategory = useSelector(data => data.category.categoryList.result);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} onClose={handleDrawerClose} title="Product Management" />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Paper className={classes.root} align="center">
          <Table className={classes.table} aria-label="simple table" align="center">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log('data', result)} */}
              {result !== undefined ? result.map(row => (
                <TableRow key={row.id_product}>
                  <TableCell>{numb = numb + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="right"><img alt="Product Image" src={row.image} width="150px" length="150px" /></TableCell>
                  <TableCell align="right">{row.name_category}</TableCell>
                  <TableCell align="right">
                    <Button value={row.id_product} onClick={() => updateProduct(row)}><EditIcon/></Button>
                    <Button value={row.id_product} onClick={() => delProduct(row)}><DeleteOutlineIcon/></Button>
                  </TableCell>
                </TableRow>
              ))
                : <img src="https://thumbs.gfycat.com/BitterEarnestBeardeddragon-small.gif" align="center" width="200px" height="200px" />
              }
            </TableBody>
          </Table>

          {/* edit modal */}
          <Dialog open={editModal} onClose={handleEditClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" align="center">Edit Product</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                onChange={handleChange("name")}
                value={input.name}
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                onChange={handleChange("price")}
                value={input.price}
              />
              <TextField
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                fullWidth
                onChange={handleChange("quantity")}
                value={input.quantity}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                onChange={handleChange("description")}
                value={input.description}
              />
              <TextField
                autoFocus
                margin="dense"
                id="image"
                label="Image URL"
                type="text"
                fullWidth
                onChange={handleChange("image")}
                value={input.image}
              />
              <Select
                label="Category"
                name="id_category"
                onChange={handleChange("id_category")}
                value={input.id_category}
                fullWidth
              >
                {resultCategory !== undefined ? resultCategory.map(item => {
                  return (
                    <MenuItem value={item.id_category}>{item.name}</MenuItem>
                  )
                }) : <img src="https://thumbs.gfycat.com/BitterEarnestBeardeddragon-small.gif" align="center" width="200px" height="200px" />
                }
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={submitEdit} color="primary">
                Submit
              </Button>{' '}
            </DialogActions>
          </Dialog>
          
           {/* delete modal */}
           <Dialog open={deleteModal} onClose={handleDeleteClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" align="center">Delete Product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure want to delete <b>{input.name}</b>?
              </DialogContentText>
              <TextField
                disabled
                autoFocus
                margin="dense"
                id="id_product"
                label="Id Product"
                type="text"
                fullWidth
                onChange={handleChange("id_product")}
                value={input.id_product}
              />
            </DialogContent>
            <DialogActions>
              <Button value={input.id_product} onClick={handleDeleteClose} color="primary">
                Cancel
          </Button>
              <Button type="submit" onClick={submitDelete} color="secondary">
                Delete
          </Button>{' '}
            </DialogActions>
          </Dialog>
        </Paper>
      </main>
    </div>
  );
}

export default connect()(ProductTable);