import React, { useEffect, useState } from 'react'; // Import useState
import { Typography, Grid, IconButton, Switch } from '@mui/material';
import { Visibility } from '@mui/icons-material'; // Import icons
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchUsersRequest, setUsers, searchUsersRequest, newPageRequest, changeStatusRequest } from '../../store/reducers/users'; // Import your action creators
import { useNavigate } from 'react-router'


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

const Users = () => {
  
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const pageCount = useSelector(state => state.users.pageCount);
  const [loading, setLoading] = useState(false);
  const currentPage = useSelector(state => state.users.currentPage);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  
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
          <IconButton onClick={() => handleView(params.row.id)}>
            <Visibility />
          </IconButton>
        </>
      ),
    },
  ];
  
  const handleView = (id) => {
    navigate(`view/${id}`);
  }

  const handleSearch = (searchText) => {
    const searchPayload = { searchText: searchText, rowsPerPage: rowsPerPage };
    dispatch(searchUsersRequest(searchPayload));
  };

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

  const handlePageChange = (newPage) => {
    dispatch(newPageRequest({newPage: newPage, rowsPerPage: rowsPerPage}));
  }

  const handleRowsChange = (e)=> {
    setRowsPerPage(e.target.value)
  }

  useEffect(() => {
    dispatch(fetchUsersRequest({ rowsPerPage: rowsPerPage }));
    setLoading(true);
  }, [dispatch, rowsPerPage]);

  useEffect(() => {
    setLoading(false);
    console.log(users)
  }, [users]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h2">
          Users
        </Typography>
      </Grid>
      {
        users &&
        <>
          <Grid item xs={12}>
            <DataTable
              columns={columns}
              rowsPerPage={rowsPerPage}
              data={users}
              loading={loading}
              multiSelect={0}
              resourceName={'Users'}
              createRoute={'create'}
              handleSearch={handleSearch}
              handlePageChange={handlePageChange}
              pageCount={pageCount}
              currentPage={currentPage}
              handleRowsChange={handleRowsChange}
            />
          </Grid>
        </>
      }
    </Grid>
  );
};

export default Users;
