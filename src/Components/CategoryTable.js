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
import { postCategory, patchCategory, deleteCategory } from '../Public/Redux/Action/category';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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

//for pagination
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

//for sort by
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

//styling
const useStyles = makeStyles({
  root: {
    width: '80%',
    overflowX: 'auto',
    // [top] [right] [bottom] [left]	
    margin: '3% 1% 1% 10%',
    padding: '2%',
    alignContent: 'center',
    flexShrink: 0,

    '& .MuiOutlinedInput-input': {
      padding: 8,
      fontSize: 'small',
      minWidth: 100,
    },
    '& .MuiOutlinedInput-root': {
      position: 'relative',
      width: 195,
      height: 35,
    },
    '& .MuiFormControl-root' : {
      marginInlineEnd: '6%',
      marginInlineStart: '6%',
    },
    '& .MuiFormLabel-root': {
      fontSize: 'small',
    }
  },
  table: {
    maxWidth: 500,
    alignContent: 'center'
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

function CategoryTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  //for header passing props
  const [open, setOpen] = React.useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //initialize the state used in form
  const formState = {
    id_category: "",
    name: "",
  }

  const tableFilter = {
    search: "",
    sort: "asc",
  }

  //for input and open handle
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

  //button for open dialogs and passing data
  const addCategoryModal = () => {
    setAddModal(true);
  }
  const updateCategoryModal = (row) => {
    setInput(row)
    setEditModal(true);
  }
  const deleteCategoryModal = (row) => {
    setInput(row)
    setDeleteModal(true);
  }

  //handle dialog 
  const handleEditClose = () => {
    setEditModal(false)
  }

  const handleDeleteClose = () => {
    setDeleteModal(false)
  }

  const handleAddClose = () => {
    setAddModal(false)
  }

  //passing into database
  const submitAdd = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postCategory(input));
      setAddModal(!addModal)
    } catch (error) {
      console.log(error)
    }
  }

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(patchCategory(input));
      setEditModal(!editModal)
    } catch (error) {
      console.log(error)
    }
  }

  const submitDelete = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteCategory(input))
      setDeleteModal(!deleteModal)
    } catch (error) {
      console.log(error)
    }
  }

  //result 
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

  //get result
  const result = useSelector(data => data.category.categoryList);

  //for sorting
  let sortedResult = result.sort((a, b) => {
    const isReversed = (tableFilter.sort === 'asc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  //for searching
  let filteredResult = sortedResult.filter((item, index) => {
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
  useEffect (()=> {
    const copyNumber = []
    for(let i = 1; i <= result.length; i++) {
      copyNumber.push(i);
  }
    setNumb(copyNumber)
  }, [page]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} onClose={handleDrawerClose} title="Category Management" />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Paper className={classes.root} align="center">
          <div className={classes.column}>
            <FormControl className={classes.formControl}>
              <Select
                variant="outlined"
                value={tableFilter.sort}
                onChange={handleChangeTable("sort")}
                label="Sort by"
              >
                <option value=""></option>
                <option value="asc">Name (A-Z)</option>
                <option value="desc">Name (Z-A)</option>
              </Select>
            </FormControl>
            <Button variant="contained"
              color="primary"
              onClick={addCategoryModal}>
              Add Category
            </Button>
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
              placeholder="Search category name"
              variant="outlined"
              onChange={handleChangeTable("search")}
              value={tableFilter.search}
            />
          </div>
          <Table className={classes.table} aria-label="simple table" align="center">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? filteredResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredResult).map((row, index) => (
                  <TableRow key={row.id_category}>
                    <TableCell>{numb[index+(page*rowsPerPage)]}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <Button value={row.id_category} onClick={() => updateCategoryModal(row)}><EditIcon /></Button>
                      <Button value={row.id_category} onClick={() => deleteCategoryModal(row)}><DeleteOutlineIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  colSpan={3}
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
          
          {/* dialog for edit category */}
          <Dialog open={editModal} onClose={handleEditClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" align="center">Edit Category</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can edit category name here
            </DialogContentText>
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button value={input.id_category} type="submit" onClick={submitEdit} color="primary">
                Submit
              </Button>{' '}
            </DialogActions>
          </Dialog>

          {/* dialog for delete category */}
          <Dialog open={deleteModal} onClose={handleDeleteClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" align="center">Edit Category</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure want to delete <b>{input.name}</b> category?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button value={input.id_category} onClick={handleDeleteClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" value={input.id_category} onClick={submitDelete} color="primary">
                Submit
              </Button>{' '}
            </DialogActions>
          </Dialog>

          {/* dialog for add category */}
          <Dialog open={addModal} onClose={handleAddClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" align="center">Add Category</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add new category name
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                onChange={handleChange("name")}
              />
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
  )
}

export default (CategoryTable);