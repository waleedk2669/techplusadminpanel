import React from 'react'
import { SetForm } from '../../components/SetForm';
import { useSelector, useDispatch } from 'react-redux';
import { createMedicineRequest } from '../../store/reducers/medicines';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const CreateMedicine = () => {
  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      maxLength: 100,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      maxLength: 500,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      hidden: true,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'is_enabled',
      label: 'Active',
      type: 'switch',
      enabled: true,
      width: 2 / 3,
    }
  ];

  const defaultData = {
    id: '',
    name: '',
    price: '',
  };

  const formName = 'Create Medicine';
  const loading = useSelector((state) => state.medicines.loading)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addSnackbar } = useSnackbar();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (data) => {
    dispatch(createMedicineRequest(data));
    addSnackbar('Medicine created successfully!', 'success');
    navigate('/dashboard/medicines');
  };

  return (
    <div>
      <SetForm
        onCancel={handleCancel}
        formName={formName}
        formFields={formFields}
        defaultData={defaultData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateMedicine;
