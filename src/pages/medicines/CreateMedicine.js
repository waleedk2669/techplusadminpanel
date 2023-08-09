import React from 'react'
import { Typography } from '@mui/material';
import CreateForm from '../../components/dataTables/CreateForm'
import { useSelector, useDispatch } from 'react-redux';
import { createMedicineRequest } from '../../store/reducers/medicines';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const CreateMedicine = () => {
  const formFields = [
    {
      name:'id',
      label: 'id',
      type: 'string',
      enabled: false,
    },
    {
    name: 'name',
    label: 'name',
    type: 'string',
    enabled: true,
  }, 
  {
    name: 'description',
    label: 'description',
    type: 'string',
    maxLength: 255,
    enabled: true,
  },
  {
    name: 'price',
    label: 'price',
    type: 'number',
    enabled: true,
  },
  {
    name: 'is_enabled',
    label: 'enabled',
    type: 'switch',
    enabled: true
  }
];
  const defaultData = {
    id: '',
    name: '',
    price: '',
  };
  const formName = 'Create Medicine';
  const loading = useSelector((state)=> state.medicines.loading)
  const medicines = useSelector((state)=> state.medicines.medicines);
  const filteredRows = useSelector((state)=> state.medicines.filteredRows);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {addSnackbar} = useSnackbar();

  const handleCancelCreate = () => {
    navigate(-1);
  };

  const handleCreate = (newOrder) => {
    dispatch(createMedicineRequest(newOrder));
    console.log(newOrder);
    addSnackbar('Medicine created successfully!', 'success');
    navigate('/dashboard/medicines');
  };
  
  
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Create Medicine</Typography>
      <CreateForm onCancel={handleCancelCreate} onCreate={handleCreate} formName={formName} formFields={formFields} defaultData={defaultData} />
    </div>
  );
}

export default CreateMedicine;
