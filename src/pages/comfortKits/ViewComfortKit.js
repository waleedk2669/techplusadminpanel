import React,{useEffect} from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import { useDispatch, useSelector } from 'react-redux';
import { viewComfortKitRequest } from '../../store/reducers/comfortKits';

const ViewComfortKit = () => {
  const formFields = ['name', 'price', 'is_enabled', 'medicines'];
  const formName = 'Comfort Kit'
  const selectedComfortKit = useSelector((state)=> state.comfortKits.selectedComfortKit)
  const viewComfortKit = useSelector((state)=> state.comfortKits.viewComfortKit);
  const loading = useSelector((state)=> state.comfortKits.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {addSnackbar} = useSnackbar();

  console.log(viewComfortKit, selectedComfortKit)
  const handleCancelView = () => {
    navigate(-1);
  };
  useEffect(()=>{
    console.log("i am here")
    dispatch(viewComfortKitRequest({id: selectedComfortKit.id}))
  },[]);

  if(loading){
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Comfort Kit details</Typography>
      <ViewForm row={viewComfortKit} formFields={formFields} formName={formName} onCancel={handleCancelView} />
    </div>
  );
}

export default ViewComfortKit;
