import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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


//styling
const useStyles = makeStyles({
  root: {
    width: '80%',
    overflowX: 'auto',
    // [top] [right] [bottom] [left]	
    margin: '4% 1% 1% 10%',
    alignContent: 'center'
  },
  table: {
    maxWidth: 500,
    alignContent: 'center'
  },
});

function CategoryTable(props) {

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

  //for input and open handle
  const [input, setInput] = useState(formState);
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

  let numb = 0;

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
      await props.dispatch(postCategory(input))
      setAddModal(!addModal)
    } catch (error) {
      console.log (error)
    }
  }

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const result = await props.dispatch(patchCategory(input))
      setEditModal(!editModal)
    } catch (error) {
      console.log (error)
    }
  }

  const submitDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await props.dispatch(deleteCategory(input))
      setDeleteModal(!deleteModal)
    } catch (error) {
      console.log (error)
    }
  }

  //result 

  const dispatch = useDispatch();

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

  const result = useSelector(data => data.category.categoryList);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} onClose={handleDrawerClose} title="Category Management" />
      <main className={classes.content} >
        <div className={classes.toolbar} />
        <Paper className={classes.root} align="center">
          <Button variant="contained" color="primary" onClick={addCategoryModal}>Add Category</Button>
          <Table className={classes.table} aria-label="simple table" align="center">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result !== undefined ? result.map(row => (
                <TableRow key={row.id_category}>
                  <TableCell>{numb = numb + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button value={row.id_category} onClick={() => updateCategoryModal(row)}><EditIcon /></Button>
                    <Button value={row.id_category} onClick={() => deleteCategoryModal(row)}><DeleteOutlineIcon /></Button>
                  </TableCell>
                </TableRow>
              ))
                : <img src="https://thumbs.gfycat.com/BitterEarnestBeardeddragon-small.gif" align="center" width="200px" height="200px" />
              }
            </TableBody>
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
              <Button type="submit" onClick={submitEdit} color="primary">
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
              <TextField
                disabled
                autoFocus
                margin="dense"
                id="id_category"
                label="Id Category"
                type="text"
                fullWidth
                onChange={handleChange("id_category")}
                value={input.id_category}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={submitDelete}  color="primary">
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