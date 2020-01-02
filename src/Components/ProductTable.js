import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { getCategory } from '../Public/Redux/Action/category';
import { postProduct, getProduct, patchProduct, deleteProduct } from '../Public/Redux/Action/product';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchIcon from '@material-ui/icons/Search';
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
import InputLabel from '@material-ui/core/InputLabel';

//for pagination
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

//for sort by
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Notifications from './Notifications';
import { openNotification } from '../Public/Redux/Action/notification';

const useStyles = makeStyles({
  root: {
    width: '90%',
    overflowX: 'auto',
    // [top] [right] [bottom] [left]	
    margin: '3% 1% 1% 6%',
    padding: '2%',
    alignContent: 'center',

    '& .MuiOutlinedInput-input': {
      padding: 8,
      fontSize: 'small',
      width: 200,
      height: 25,
    },
    '& .MuiOutlinedInput-root': {
      position: 'relative',
      width: 200,
      height: 35,
    },
    '& .MuiFormControl-root': {
      marginInlineEnd: '7%',
      marginInlineStart: '7%',
    },
    '& .MuiFormLabel-root': {
      fontSize: 'small',
    }

  },
  table: {
    alignContent: 'center',
    maxWidth: '95%',
    marginTop: '2%',
  },
  column: {
    justifyContent: 'normal'
  }
});

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function ProductTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
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
    id_category: "",
  };

  const tableFilter = {
    search: "",
    sort: "asc",
  }

  const [input, setInput] = useState(formState);
  const [state, setState] = useState(tableFilter);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  //for handling change
  const handleChange = nameChange => e => {
    setInput({
      ...input,
      [nameChange]: e.target.value
    })
  }

  const handleChangeTable = nameChange => e => {
    setInput({
      ...state,
      [nameChange]: e.target.value
    })
  }

  //for submit data
  const submitAdd = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(postProduct(input));
      let notification = {};
      if (result.value.data.status === 400) {
        notification = {
          variant: 'error',
          message: result.value.data.message,
        }
        setAddModal(addModal);
      } else {
        notification = {
          variant: 'success',
          message: result.value.data.message,
        }
        setAddModal(!addModal);
      }
      await dispatch(openNotification(notification));            
    } catch (error) {
      console.log(error)
    }
  }

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const result = await props.dispatch(patchProduct(input))
      let notification = {};
      if (result.value.data.status === 400) {
        notification = {
          variant: 'error',
          message: result.value.data.message,
        }
        setEditModal(editModal);
      } else {
        notification = {
          variant: 'success',
          message: result.value.data.message,
        }
        setEditModal(!editModal);
      }
      await dispatch(openNotification(notification)); 
    } catch (error) {
      console.log(error);
    }
  }

  const submitDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await props.dispatch(deleteProduct(input));
      let notification = {};
      if (result.value.data.status === 400) {
        notification = {
          variant: 'error',
          message: result.value.data.message,
        }
        setDeleteModal(deleteModal);
      } else {
        notification = {
          variant: 'success',
          message: result.value.data.message,
        }
        setDeleteModal(!deleteModal);
      }
      await dispatch(openNotification(notification));            
    } catch (error) {
      console.log(error);
    }
  }

  //from button to dialog
  const addProductModal = () => {
    setAddModal(true);
  }

  const updateProduct = (row) => {
    setInput(row)
    setEditModal(true);
  }

  const delProduct = (row) => {
    setInput(row)
    setDeleteModal(true);
  }

  //for handling close dialog
  const handleAddClose = () => {
    setAddModal(false)
  }

  const handleEditClose = () => {
    setEditModal(false)
  }

  const handleDeleteClose = () => {
    setDeleteModal(false)
  }

  //dipatch and fetchProduct
  const fetchProduct = async () => {
    try {
      await dispatch(getProduct());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])


  const fetchCategory = async (input) => {
    try {
      await dispatch(getCategory(input))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const result = useSelector(data => data.product.productList);
  const resultCategory = useSelector(data => data.category.categoryList);

  //for sorting
  let sortedResult = result.sort((a, b) => {
    const isReversed = (tableFilter.sort === 'asc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  //for searching
  let filteredResult = sortedResult.filter((item) => {
    return item.name.toLowerCase().indexOf(tableFilter.search.toLowerCase()) !== -1;
  });

  //for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numb, setNumb] = useState([])
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredResult.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //numbering
  useEffect(() => {
    const copyNumber = []
    for (let i = 1; i <= result.length; i++) {
      copyNumber.push(i);
    }
    setNumb(copyNumber)
  }, [page]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} onClose={handleDrawerClose} title="Product Management" />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Notifications />
        <Paper className={classes.root} align="center">
          <div className={classes.column}>
            <FormControl className={classes.formControl}>
              <Select
                variant="outlined"
                value={tableFilter.sort}
                onChange={handleChangeTable("sort")}
                label="Sort by"
              >
                <option value="asc">Name (A-Z)</option>
                <option value="desc">Name (Z-A)</option>
              </Select>
            </FormControl>
            <Button variant="contained"
              color="primary"
              onClick={addProductModal}
            >
              Add Product
            </Button>
            <TextField
              id="outlined-size-small"
              size="small"
              placeholder="Search product name"
              variant="outlined"
              onChange={handleChangeTable("search")}
              value={tableFilter.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
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
              {(rowsPerPage > 0 ? filteredResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredResult).map((row, index) => (
                  <TableRow key={row.id_product}>
                    <TableCell>{index + (page * rowsPerPage) + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="right"><img alt="Product Image" src={row.image} width="150px" length="150px" /></TableCell>
                    <TableCell align="right">{row.name_category}</TableCell>
                    <TableCell align="right">
                      <Button value={row.id_product} onClick={() => updateProduct(row)}><EditIcon /></Button>
                      <Button value={row.id_product} onClick={() => delProduct(row)}><DeleteOutlineIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  colSpan={20}
                  count={filteredResult.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
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

          {/* dialog for add product */}
          <Dialog open={addModal} onClose={handleAddClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" align="center">Add Product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add new product
              </DialogContentText>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="Product Name"
                type="text"
                id="name"
                onChange={handleChange("name")}
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
                onChange={handleChange("price")}
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
                onChange={handleChange("quantity")}
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
                onChange={handleChange("image")}
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
                onChange={handleChange("description")}
              />
              <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                variant="outlined"
                name="id_category"
                value={input.id_category}
                onChange={handleChange("id_category")}
                fullWidth
                required
              >
                {resultCategory.map(item => {
                  return (
                    <MenuItem key={item.id_category} value={item.id_category}>{item.name}</MenuItem>
                  )
                })
                }
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={submitAdd} color="primary">
                Submit
              </Button>{' '}
            </DialogActions>
          </Dialog>
        </Paper>
      </main>
    </div>
  );
}

export default connect()(ProductTable);