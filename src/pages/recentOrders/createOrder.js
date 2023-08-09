import React from 'react'
import { Typography } from '@mui/material';
import CreateForm from '../../components/dataTables/CreateForm'
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setFilteredRows, setSelectedProduct} from '../../store/reducers/products';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const CreateOrder = () => {
  const formFields = ["id", 'status'];
  const defaultData = {
    id: '',
    status: '',
  };
  const formName = 'Order';
  const selectedProduct = useSelector((state)=> state.products.selectedProduct)
  console.log(selectedProduct)
  const products = useSelector((state)=> state.products.products);
  const filteredRows = useSelector((state)=> state.products.filteredRows);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {addSnackbar} = useSnackbar();

  const handleCancelCreate = () => {
    navigate(-1);
  };

  const handleCreate = (newOrder) => {
    dispatch(setProducts([...products, newOrder]));
    dispatch(setFilteredRows([...filteredRows, newOrder])); // Update the filteredRows state as well
    addSnackbar('Order created successfully!', 'success');
    navigate('/dashboard/recent-orders');
  };
  
  
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Create Order</Typography>
      <CreateForm onCancel={handleCancelCreate} onCreate={handleCreate} formName={formName} formFields={formFields} defaultData={defaultData} />
    </div>
  );
}

export default CreateOrder;
