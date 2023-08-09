import React from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const ViewComfortKit = () => {
  const formFields = ["id", 'status'];
  const formName = 'Comfort Kit'
  const selectedComfortKit = useSelector((state)=> state.comfortKits.selectedComfortKit)
  const navigate = useNavigate();

  const {addSnackbar} = useSnackbar();

  console.log(selectedComfortKit)
  const handleCancelView = () => {
    navigate(-1);
  };
  if(!selectedComfortKit){
    return (
      <div>
        loading...
      </div>
    )
  }
  
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Comfort Kit details</Typography>
      <ViewForm row={selectedComfortKit} formFields={formFields} formName={formName} onCancel={handleCancelView} />
    </div>
  );
}

export default ViewComfortKit;
