import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Switch, Typography } from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import SearchBar from './SearchBar'; // Assuming the SearchBar component is in a separate file
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredRows, setUsers, setSelectedUser, newPageRequest, changeStatusRequest } from '../../store/reducers/users';
import { useNavigate } from 'react-router';
import FlexContainer from './FlexContainer';
import CustomPagination from './CustomPagination';
import { searchUsersRequest, fetchUsersRequest, viewUsersRequest } from '../../store/reducers/users';
import RowPerPageMenu from './RowsPerPageMenu';


const RenderSwitch = ({isEnabled, handleChange})=>{
  const [toggle, setToggle] = useState(isEnabled==1)
  return (
    <Switch  
    checked={toggle}
    onClick={()=> setToggle((prev)=> !prev)}
    onChange={handleChange}
    styles={{ flex: '1', width: '100%' }} 
    margin="normal" />

  )
}
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
    dispatch(fetchUsersRequest({rowsPerPage: rowsPerPage}));
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
      field: 'first_name',
      headerName: 'First name',
      width: 150,
      headerClassName: 'dataGridHeader', // Custom class for header with icon
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 150,
      headerClassName: 'dataGridHeader', // Custom class for header with icon
    },
    {
      field: 'dob',
      headerName: 'DOB',
      width: 100,
      headerClassName: 'dataGridHeader', // Custom class for header with icon
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      headerClassName: 'dataGridHeader', // Custom class for header with icon
    },
    {
      field: 'is_enabled',
      headerName: 'status',
      width: 100,
      headerClassName: 'dataGridHeader', // Custom class for header with icon
      renderCell: (params) => (
        <>
          <RenderSwitch isEnabled={params.row.is_enabled} 
          handleChange={(e)=> {
            handleChangeStatus(params.row,e)
          }}
          />
        </>
      ),
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
        </>
      ),
    },
  ];

  const handleChangeStatus=(row, e) =>{
    dispatch(changeStatusRequest({id: row.id, status: row.is_enabled}))
    dispatch(setUsers(users.map(user => {
      if(user.id==row.id){
        console.log('i am here');
        return {
          ...user,
          is_enabled: user.is_enabled==1?0:1
        }
      }
      return user;
    })))
  }
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };
  const handleView = (row) => {
    dispatch(viewUsersRequest({id: row.id}));
    sessionStorage.setItem('selectedUser', row);
    navigate('view');

  };

  const handleEdit = (row) => {
    dispatch(setSelectedUser(row));
    sessionStorage.setItem('selectedUser', row);
    navigate('edit');
  };

  
  
  const handleSearch = (searchText) => {
      dispatch(searchUsersRequest({searchText: searchText, rowsPerPage: rowsPerPage}));
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
      <RowPerPageMenu rowsPerPage={rowsPerPage} handleChange={handleRowsPerPageChange} />
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
        />

        {/* Render the CustomPagination component */}

    </div>
  );
};

export default UserDataGrid;
