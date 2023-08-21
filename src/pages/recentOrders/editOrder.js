import React, { useEffect } from 'react'
import { SetForm } from '../../components/SetForm';
import { useSelector, useDispatch } from 'react-redux';
import { createNewOrderRequest, hospiceRequest, pharmacyRequest, nurseRequest, patientRequest, viewNewOrderRequest } from '../../store/reducers/newOrders';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const EditOrder = () => {
  const params = useParams();
  const formName = 'Create New Order';
  const loading = useSelector((state) => state.newOrders.loading)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hospice = useSelector((state) => state.newOrders.hospice)
  const pharmacy = useSelector((state) => state.newOrders.pharmacy)
  const nurse = useSelector((state) => state.newOrders.nurse)
  const patient = useSelector((state) => state.newOrders.patient)
  const newOrder = useSelector((state) => state.newOrders.viewNewOrder)

  const { addSnackbar } = useSnackbar();

  const handleFieldChange = (event, newValue, setFormData) => {
    const { name } = event.target;
    console.log(newValue)
    if (name)
      setFormData((prevData) => ({ ...prevData, [name]: newValue.id }))
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (data) => {
    dispatch(createNewOrderRequest(data));
    addSnackbar('New Order updated successfully!', 'success');
    navigate('/dashboard/recent-orders');
  };

  useEffect(() => {
    dispatch(viewNewOrderRequest({ id: params.id }))
    dispatch(hospiceRequest())
    dispatch(pharmacyRequest())
    dispatch(nurseRequest())
    dispatch(patientRequest())
  }, []);


  const formFields = [
    {
      name: 'hospice_id',
      label: 'Hospice Id',
      data: hospice,
      fieldChange: handleFieldChange,
      type: 'dropdown',
      maxLength: 100,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'pharmacy_id',
      label: 'Pharmacy Id',
      data: pharmacy,
      fieldChange: handleFieldChange,
      type: 'dropdown',
      maxLength: 500,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'nurse_id',
      label: 'Nurse Id',
      data: nurse,
      fieldChange: handleFieldChange,
      type: 'dropdown',
      maxLength: 500,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'patient_id',
      label: 'Patient Id',
      data: patient,
      fieldChange: handleFieldChange,
      type: 'dropdown',
      maxLength: 500,
      enabled: true,
      width: 2 / 3,
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
      hidden: true,
      enabled: true,
      width: 2 / 3,
    }
  ];

  return (
    <div>
      {
        newOrder &&

        <SetForm
          onCancel={handleCancel}
          formName={formName}
          formFields={formFields}
          defaultData={newOrder}
          handleSubmit={handleSubmit}
        />
      }
    </div>
  );
}

export default EditOrder;
