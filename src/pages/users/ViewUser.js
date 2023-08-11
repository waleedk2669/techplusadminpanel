import React, {useEffect} from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import { viewUserRequest } from '../../store/reducers/medicines';

const ViewUser = () => {
  const formFields = ['id', 'email', 'phone_number', 'first_name', 'last_name', 'dob', 'address', 'role_id' ];
  const formName = 'User'
  const navigate = useNavigate();
  const viewUser = useSelector((state)=> state.users.viewUser);
  const {addSnackbar} = useSnackbar();
  const loading = useSelector((state) => state.users.loading)
  const dispatch = useDispatch();
    
  const handleCancelView = () => {
    navigate(-1);
  };
  if(loading){
    return (
      <div>
        loading...
      </div>
    )
  }
  
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Medicine details</Typography>
      <ViewForm row={viewUser} formFields={formFields} formName={formName} onCancel={handleCancelView} />
    </div>
  );
}

export default ViewUser;
