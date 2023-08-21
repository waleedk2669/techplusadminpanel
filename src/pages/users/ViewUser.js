import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import ViewForm from '../../components/dataTables/ViewForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { viewUsersRequest } from '../../store/reducers/users';
import { useParams } from 'react-router';

const ViewUser = () => {
  const params = useParams();
  const formFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'text'
    },
    {
      name: 'phone_number',
      label: 'Phone Number',
      type: 'text'
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text'
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text'
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'text'
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text'
    },
    {
      name: 'role_id',
      label: 'Role',
      type: 'text'
    }
  ];
  const formName = 'User'
  const navigate = useNavigate();
  const viewUser = useSelector((state) => state.users.viewUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewUsersRequest({ id: params.id }));
    console.log(viewUser)
  },[])
  const handleCancelView = () => {
    navigate(-1);
  };

  return (
    <div>
      {
        viewUser &&
        <>
          <Typography variant='h3' component='h2' margin='10px ' >Medicine details</Typography>
          <ViewForm row={viewUser} formFields={formFields} formName={formName} onCancel={handleCancelView} />
        </>
      }
    </div>
  );
}

export default ViewUser;
