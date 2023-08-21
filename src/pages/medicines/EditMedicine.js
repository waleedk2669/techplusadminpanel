import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import { createMedicineRequest, viewMedicineRequest } from '../../store/reducers/medicines';
import { SetForm } from '../../components/SetForm';
import { useParams } from 'react-router';

const EditMedicine = () => {
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
      enabled: true,
      hidden: true,
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

  const formName = 'Update Medicine';
  const medicine = useSelector((state) => state.medicines.viewMedicine);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { addSnackbar } = useSnackbar();

  const handleEdit = (data) => {
    dispatch(createMedicineRequest(data));
    console.log(data);
    addSnackbar('Medicine updated successfully!', 'success');
    navigate('/dashboard/medicines');
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(viewMedicineRequest({ id: params.id }))
  }, [])

  return (
    <div>
      {
        medicine &&
        <>
          <SetForm defaultData={medicine} formFields={formFields} formName={formName} onCancel={handleCancelEdit} handleSubmit={handleEdit} />
        </>
      }
    </div>
  );
}

export default EditMedicine;
