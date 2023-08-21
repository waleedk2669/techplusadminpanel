import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import { useDispatch, useSelector } from 'react-redux';
import { viewComfortKitRequest } from '../../store/reducers/comfortKits';
import { useParams } from 'react-router';

const ViewComfortKit = () => {
  const params = useParams();
  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text'
    },
    {
      name: 'price',
      label: 'Price',
      hidden: true,
      type: 'number'
    },
    {
      name: 'is_enabled',
      label: 'Active',
      type: 'tag'
    },
    {
      name: 'medicines',
      label: 'Medicines',
      type: 'text'
    },
  ];

  const formName = 'Comfort Kit'
  const viewComfortKit = useSelector((state) => state.comfortKits.viewComfortKit);
  const loading = useSelector((state) => state.comfortKits.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleCancelView = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(viewComfortKitRequest({ id: params.id }))
    console.log(viewComfortKit)
  }, []);

  return (
    <div>
      <Typography variant='h3' component='h2' margin='10px ' >Comfort Kit details</Typography>
      {
        viewComfortKit &&
        <ViewForm row={viewComfortKit} formFields={formFields} formName={formName} onCancel={handleCancelView} />
      }
    </div>
  );
}

export default ViewComfortKit;
