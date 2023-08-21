import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { viewMedicineRequest } from '../../store/reducers/medicines';
import { useParams } from 'react-router-dom'

const ViewMedicine = () => {

  const params = useParams();
  const formFields = [
    {
      name: 'name',
      label: 'name',
      type: 'text'
    },
    {
      name: 'description',
      label: 'description',
      type: 'text'
    },
    // {
    //   name: 'price',
    //   label: 'price',
    //   type: 'text'
    // },
    {
      name: 'is_enabled',
      label: 'active',
      type: 'tag'
    }
  ];
  const formName = 'Medicine'
  const navigate = useNavigate();
  const medicine = useSelector((state) => state.medicines.viewMedicine);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewMedicineRequest({id: params.id}))
    console.log(medicine)
  }, [])

  const handleCancelView = () => {
    navigate(-1);
  };

  return (
    <div>
      {
        medicine &&
        <>
          <Typography variant='h3' component='h2' margin='10px ' >Medicine details</Typography>
          <ViewForm row={medicine} formFields={formFields} formName={formName} onCancel={handleCancelView} />
        </>
      }
    </div>
  );
}

export default ViewMedicine;
