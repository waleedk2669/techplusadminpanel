import React from 'react'
import { Typography } from '@mui/material';
import CreateForm from '../../components/dataTables/CreateForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import { createMedicineRequest } from '../../store/reducers/medicines';

const EditMedicine = () => {
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
  const formName = 'Update Medicine';
  const selectedMedicine = useSelector((state)=> state.medicines.selectedMedicine)
  console.log(selectedMedicine)
  const medicines = useSelector((state)=> state.medicines.medicines);
  const filteredRows = useSelector((state)=> state.medicines.filteredRows);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {addSnackbar} = useSnackbar();

  const handleCreate = (newOrder) => {
    dispatch(createMedicineRequest(newOrder));
    console.log(newOrder);
    addSnackbar('Medicine created successfully!', 'success');
    navigate('/dashboard/medicines');
  };
  
  const handleCancelEdit = () => {
    navigate(-1);
  };

  if(!selectedMedicine) {
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Edit Medicine</Typography>
      <CreateForm defaultData={selectedMedicine} formFields={formFields} formName={formName} onCancel={handleCancelEdit} onCreate={handleCreate} />
    </div>
  );
}

export default EditMedicine;
