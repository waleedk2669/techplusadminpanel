import React from 'react'
import { Typography } from '@mui/material';
import CreateForm from '../../components/dataTables/CreateForm'
import { useSelector, useDispatch } from 'react-redux';
import { createUserRequest } from '../../store/reducers/users';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const CreateUser = () => {
  const formFields = [
    {
      name:'email',
      label: 'Email',
      type: 'email',
      enabled: true,
    },
    {
    name: 'phone_number',
    label: 'Phone Number',
    type: 'text',
    enabled: true,
  }, 
  {
    name: 'first_name',
    label: 'First Name',
    type: 'string',
    maxLength: 255,
    enabled: true,
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    enabled: true,
  },
  {
    name: 'dob',
    label: 'Date of Birth',
    type: 'text',
    enabled: true
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    enabled: true,
  },
  {
    name: 'role_id',
    label: 'Role Id',
    type: 'text',
    enabled: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    enabled: true,
  },
  
];
  const defaultData = {
    id: '',
    name: '',
    price: '',
  };
  const formName = 'Create User';
  const loading = useSelector((state)=> state.users.loading)
  const medicines = useSelector((state)=> state.medicines.medicines);
  const filteredRows = useSelector((state)=> state.medicines.filteredRows);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {addSnackbar} = useSnackbar();

  const handleCancelCreate = () => {
    navigate(-1);
  };

  const handleCreate = (newOrder) => {
    dispatch(createUserRequest(newOrder));
    console.log(newOrder);
    addSnackbar('User created successfully!', 'success');
    navigate('/dashboard/users');
  };
  
  
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Create User</Typography>
      <CreateForm onCancel={handleCancelCreate} mode='register' onCreate={handleCreate} formName={formName} formFields={formFields} defaultData={defaultData} />
    </div>
  );
}

export default CreateUser;
