import React from 'react'
import { Typography } from '@mui/material';
import EditForm from '../../components/dataTables/EditForm';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setFilteredRows, setSelectedProduct} from '../../store/reducers/products';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const EditOrder = () => {
  const formFields = ["id", 'status'];
  const formName = 'Order';
  const selectedProduct = useSelector((state)=> state.products.selectedProduct)
  console.log(selectedProduct)
  const products = useSelector((state)=> state.products.products);
  const filteredRows = useSelector((state)=> state.products.filteredRows);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {addSnackbar} = useSnackbar();

  const handleUpdate = (updatedOrder) => {
    dispatch(setProducts(products.map((row) => (row.id === updatedOrder.id ? updatedOrder : row))
    ));

    dispatch(setFilteredRows(Array.from(filteredRows).map((row)=> row.id === updatedOrder.id? updatedOrder: row)))
    setSelectedProduct(null);
    addSnackbar('Order updated successfully!', 'success');

    navigate("/dashboard/recent-orders");
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  if(!selectedProduct) {
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <div>
      <Typography variant='h3' component='h2'margin='10px ' >Edit Order</Typography>
      <EditForm row={selectedProduct} formFields={formFields} formName={formName} onCancel={handleCancelEdit} onUpdate={handleUpdate} />
    </div>
  );
}

export default EditOrder;
