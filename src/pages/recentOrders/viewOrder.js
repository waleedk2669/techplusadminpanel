import React from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const ViewOrder = () => {
  const formFields = ["id", 'status'];
  const formName = 'Order'
  const selectedProduct = useSelector((state)=> state.products.selectedProduct)
  const navigate = useNavigate();
  console.log(selectedProduct)
  
  const {addSnackbar} = useSnackbar();

  const handleCancelView = () => {
    navigate(-1);
  };
  if(!selectedProduct){
    return (
      <div>
        loading...
      </div>
    )
  }
  
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Order details</Typography>
      <ViewForm row={selectedProduct} formFields={formFields} formName={formName} onCancel={handleCancelView} />
    </div>
  );
}

export default ViewOrder;
