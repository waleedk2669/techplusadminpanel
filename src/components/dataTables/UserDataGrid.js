import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import SearchBar from './SearchBar'; // Assuming the SearchBar component is in a separate file
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredRows, setUsers, setSelectedUser, newPageRequest } from '../../store/reducers/users';
import { useNavigate } from 'react-router';
import FlexContainer from './FlexContainer';
import CustomPagination from './CustomPagination';
import { searchUsersRequest, fetchUsersRequest } from '../../store/reducers/users';
import RowPerPageMenu from './RowsPerPageMenu';

const UserDataGrid = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredRows = useSelector((state) => state.users.filteredRows)
  const users = useSelector((state) => state.users.users)
  const selecteduser = useSelector((state) => state.users.selectedUser)

  const [rowsPerPage, setRowsPerPage] = useState(5); // Initialize with default value

  
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);

  const [loading, setLoading] = useState(true); // Add a loading state

  console.log('DataGridWithCRUD render');

  useEffect(() => {
    // Update the filteredRows whenever the Users change
    dispatch(fetchUsersRequest(rowsPerPage));
  }, [dispatch]);

    useEffect(() => {
      console.log('Users loaded:', users);
      setLoading(false);
      const storedSelectedUser = sessionStorage.getItem('selectedUser');
      console.log('Stored selectedUser:', storedSelectedUser);
        if (storedSelectedUser) {
          dispatch(setSelectedUser(storedSelectedUser));
        }
    }, [users]);
  const columns = [
    // ...same as before...
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerClassName: 'dataGridHeader', // Custom class for header with icon
    },
    {
      field: 'title', headerName: 'TITLE',headerAlign:'center', width: 400,
    },
    {
      field: 'price', headerName: 'PRICE',headerAlign:'left', width: 150,
      renderCell: (params) => (
        <Typography>
          ${params.row.price}
        </Typography>)
    },
    {
      field: 'actions',
      headerName: '',
      width: 200,
      headerAlign:'right',
      sortable: false,
      flex: 1,
      align: 'right',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteConfirmation(params.row)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];


  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };
  const handleView = (row) => {
    dispatch(setSelectedUser(row));
    sessionStorage.setItem('selectedUser', row);
    navigate('view');

  };

  const handleEdit = (row) => {
    dispatch(setSelectedUser(row));
    sessionStorage.setItem('selectedUser', row);
    navigate('edit');
  };

  const handleDeleteConfirmation = (row) => {
    dispatch(setSelectedUser(row));
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      dispatch(setUsers(users.filter((row) => row.id !== selectedUser.id)));
      dispatch(setFilteredRows(filteredRows.filter((item) => item.id !== selectedUser.id))); // Update the filteredRows state as well
    }
    setSelectedUser(null);
    setShowDeleteConfirmation(false);
  };


  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowDeleteConfirmation(false);
  };

  const handleSearch = (searchText) => {
      dispatch(searchUsersRequest(searchText));
    setCurrentPage(1);
  };
  const handleCreateUser = () => {
    navigate('create');
  };

  //client side pagination
  // {const handlePageChange = (newPage) => { 
  //    setCurrentPage(newPage);
  //  };
  // }
  const handlePageChange = (newPage) => {
    dispatch(newPageRequest(newPage));
    setCurrentPage(newPage);

  }

  if (loading) {
    return <div>Loading...</div>; // Show loading message while waiting for Users to load
  }
  return (
    <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', overflowX:'hidden'}}>
      <FlexContainer>
        <SearchBar placeholder='Search Users' onSearch={handleSearch} />

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          style={{ marginTop: '10px' }}
          onClick={handleCreateUser}
        >
          Create User
        </Button>


      </FlexContainer>
      {/* <RowPerPageMenu rowsPerPage={rowsPerPage} handleChange={handleRowsPerPageChange} />
      <DataGrid
        rows={filteredRows.slice(startIndex, endIndex)}
        columns={columns}
        pageSize={rowsPerPage} // Set pageSize to show rows per page in DataGrid
        rowsPerPageOptions={[]} // Disable rows per page options
        checkboxSelection
        autoHeight
        components={{
          // Hide the default pagination by overriding it with the empty component
          Pagination: () => { }
        }}
        style={{ width: '', marginTop: '0px' }}
      />

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}

        {/* Render the CustomPagination component */}

      {/* <Dialog open={showDeleteConfirmation} onClose={handleCloseModal}>
        <DialogTitle>Delete Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default UserDataGrid;
