import React, {useEffect} from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import { viewMedicineRequest } from '../../store/reducers/medicines';

const ViewMedicine = () => {
  const formFields = ['name','description', 'price','is_enabled'];
  const formName = 'Medicine'
  const selectedMedicine = useSelector((state)=> state.medicines.selectedMedicine)
  const navigate = useNavigate();
  console.log(selectedMedicine)
  const {addSnackbar} = useSnackbar();
  const medicine = useSelector((state)=> state.medicines.viewMedicine);
  const loading = useSelector((state) => state.medicines.loading)
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(viewMedicineRequest(selectedMedicine.id))
        console.log(medicine)
    },[])
    
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
      <ViewForm row={selectedMedicine} formFields={formFields} formName={formName} onCancel={handleCancelView} />
    </div>
  );
}

export default ViewMedicine;
