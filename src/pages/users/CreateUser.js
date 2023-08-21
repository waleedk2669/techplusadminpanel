import React, { useEffect } from 'react'
import { SetForm } from '../../components/SetForm';
import { useSelector, useDispatch } from 'react-redux';
import { createUserRequest, roleIdRequest } from '../../store/reducers/users';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const CreateUser = () => {
  // const formFields = [
  //   {
  //     name: 'name',
  //     label: 'Name',
  //     type: 'text',
  //     maxLength: 100,
  //     enabled: true,
  //     width: 2 / 3,
  //   },
  //   {
  //     name: 'description',
  //     label: 'Description',
  //     type: 'textarea',
  //     maxLength: 500,
  //     enabled: true,
  //     width: 2 / 3,
  //   },
  //   {
  //     name: 'price',
  //     label: 'Price',
  //     type: 'number',
  //     enabled: true,
  //     width: 2 / 3,
  //   },
  //   {
  //     name: 'is_enabled',
  //     label: 'Active',
  //     type: 'switch',
  //     enabled: true,
  //     width: 2 / 3,
  //   }
  // ];
  
  const defaultData = {
    id: '',
    name: '',
    price: '',
  };

  const formName = 'Create User';
  const loading = useSelector((state) => state.users.loading)
  const roles = useSelector((state) => state.users.roles);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoleChange = (name, newValue, state) => {
    if(newValue)
    state((prevData) => ({ ...prevData, [name] : newValue.id }))
  }
  
  useEffect(() => {
    dispatch(roleIdRequest())
  }, []);
  
  const { addSnackbar } = useSnackbar();
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  const handleSubmit = (data) => {
    console.log(data);
    dispatch(createUserRequest(data));
    addSnackbar('User created successfully!', 'success');
    navigate('/dashboard/users');
  };
  
  const optionHandler = (option) => option.name;
  const formFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      enabled: true,
    },
    {
      name: 'phone_number',
      label: 'Phone Number',
      type: 'text',
      enabled: true,
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'string',
      maxLength: 255,
      enabled: true,
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      enabled: true,
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'text',
      enabled: true
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      enabled: true,
    },
    {
      name: 'role_id',
      label: 'Role',
      type: 'dropdown',
      data: roles,
      fieldChange: handleRoleChange,
      optionHandler: optionHandler,
      enabled: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      enabled: true,
    },
  ];

  return (
    <div>
      {
        roles &&
        <SetForm
          onCancel={handleCancel}
          formName={formName}
          formFields={formFields}
          defaultData={defaultData}
          handleSubmit={handleSubmit}
        />
      }
    </div>
  );
}

export default CreateUser;
