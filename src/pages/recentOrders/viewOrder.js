import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { viewNewOrderRequest } from '../../store/reducers/newOrders';
import { useParams } from 'react-router';

const ViewOrder = () => {
  const params = useParams();
  const formFields = [
    {
      name: 'hospice_id',
      label: 'Hospice Id',
      type: 'dropdown',
    },
    {
      name: 'pharmacy_id',
      label: 'Pharmacy Id',
      type: 'dropdown',
    },
    {
      name: 'nurse_id',
      label: 'Nurse Id',
      type: 'dropdown',
      
    },
    {
      name: 'patient_id',
      label: 'Patient Id',
      type: 'dropdown',
    },
    {
      name: 'tax_price',
      label: 'Tax Price',
      type: 'number',
      hidden: true,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'shipping_price',
      label: 'Shipping Price',
      type: 'number',
      enabled: true,
      hidden: true,
      width: 2 / 3,
    }
  ];

  const formName = 'Order'
  const navigate = useNavigate();
  const viewOrder = useSelector((state) => state.newOrders.viewNewOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewNewOrderRequest({ id: params.id }));
    console.log(viewOrder)
  },[])
  const handleCancelView = () => {
    navigate(-1);
  };

  return (
    <div>
      {
        viewOrder &&
        <>
          <Typography variant='h3' component='h2' margin='10px ' >Medicine details</Typography>
          <ViewForm row={viewOrder} formFields={formFields} formName={formName} onCancel={handleCancelView} />
        </>
      }
    </div>
  );
}

export default ViewOrder;
