import React, { useState, useEffect} from 'react';
import { Button, TextField, Grid, Box, Typography, Switch } from '@mui/material';
import SquareInputField from './SquareInputField';
import FormGroup from './FormGroup';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch} from 'react-redux';
import { roleIdRequest } from '../../store/reducers/users';
import './createForm.css';

const CreateForm = ({ selectedMedicine, mode, onCancel, medicines, updateMedicineDropdown, handleAddMedicine, selectedMedicines, handleMedicineChange, handleRemoveMedicine, onCreate, formFields, defaultData, formName }) => {
  const [formData, setFormData] = useState(defaultData);
  const authToken = useSelector((state) => state.auth.authToken);
  const roles = useSelector((state) => state.users.roles);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(mode==='register'){
      dispatch(roleIdRequest())
    }
  },[])
  const handleRoleChange = (event, newValue) => {
    console.log(newValue)
    setFormData((prevData)=>({...prevData, role_id: newValue.id}))

  }
  const handleFieldChange = (e) => {
    let { name, value } = e.target;
    if (name == 'is_enabled') {
      value = e.target.checked ? 1 : 0;
    }
    if(name == 'role_id'){
      console.log(value);
      //setFormData((prevData)=>({...prevData, role_id: roles}))
    }
    console.log(name, value)
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = () => {
    console.log(formData)
    onCreate(
      {
        data: formData,
        authToken: authToken,
      }
    );
  };

  return (
    <Box>
      {
        formFields.map((field) => {
          const label = field.label.toString();
          const placeholder = label.charAt(0).toUpperCase() + field.label.slice(1);
          if (field.name === 'medicines') {
            return (
              <>
                <FormGroup key={field.name}>
                  <Typography style={{ flex: 1 / 3 }}>
                    {placeholder}
                  </Typography>
                  <div style={{ position: 'relative', display: 'flex', maxWidth: '50%', alignItems: 'stretch', justifyContent: 'space-between', width: '100%' }}>
                    {/* <SquareInputField sx={{position:'relative'}} name={field.name} disabled={!field.enabled} type='text' placeholder="Add Medicines" onChange={updateMedicineDropdown} styles={{ flex: '1', width: '100%' }} margin="normal" />
                    <div style={{height:'300px', width:'50%', position:'absolute', zIndex:'1',backgroundColor:'white', border:'1px solid black', borderRadius:'5px', top:'60px',left:'0px'}}>
                      {medicines.map((medicine)=>{
                        return (<p className='hoverGreyEffect' style={{border: '1px solid grey',margin:'0px',padding:'10px'}}>{medicine.name}</p>)
                      })}
                    </div> */}
                    <Autocomplete
                      id="medicine-select"
                      options={medicines}
                      getOptionLabel={(option) => option.name}
                      //onInputChange={handleMedicineChange}
                      onChange={handleMedicineChange}
                      style={{ minWidth: '300px', flex: 1 }}
                      renderInput={(params) => <TextField {...params} placeholder="Select Medicine" sx={{ minHeight: '40px' }} />}
                    />
                    <Button variant="outlined" color="primary" onClick={handleAddMedicine}>
                      Add Medicine
                    </Button>
                  </div>
                </FormGroup>
                <FormGroup key='addedmedicines' style={{ minHeight: '200px' }}>
                  <Typography style={{ flex: 1 / 3 }}>
                    Added Medicines
                  </Typography>
                  <div style={{ display: 'flex', width: '50%', maxWidth: '50%', flexWrap: 'wrap', overflowX: 'hidden', padding: '10px 5px' }}>
                    {
                      selectedMedicines &&
                      selectedMedicines.map((medicine) => (
                        <div key={medicine.id}>
                          <Button
                            sx={{ marginRight: '5px' }}
                            variant="outlined"
                            color="primary"
                            onClick={() => handleRemoveMedicine(medicine.id)}
                          >
                            {medicine.name}
                          </Button>
                        </div>
                      ))
                    }
                  </div>
                </FormGroup>
              </>

            );
          }

          if (field.name === 'role_id') {
            return (
              <FormGroup key={field.name}>
                <Typography style={{ flex: 1 / 3 }}>
                  {placeholder}
                </Typography>
                <Autocomplete
                  options={roles}
                  name={field.name}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: '50%' }}
                  onChange={handleRoleChange}
                  renderInput={(params) => <TextField {...params} placeholder="Role id" />}
                />              
              </FormGroup>
            );
          }

          if (field.type === 'switch') {
            return (
              <FormGroup key={field.name}>
                <Typography style={{ flex: 1 / 3 }}>
                  {placeholder}
                </Typography>
                <Switch name={field.name} placeholder={placeholder} checked={formData[field.name] == 1 ? true : false} onChange={handleFieldChange} styles={{ flex: '1', width: '100%' }} margin="normal" />
              </FormGroup>
            );
          }
          return (
            <FormGroup key={field.name}>
              <Typography style={{ flex: 1 / 3 }}>
                {placeholder}
              </Typography>
              <SquareInputField name={field.name} disabled={!field.enabled} type={field.type} placeholder={placeholder} value={formData[field.name]} onChange={handleFieldChange} styles={{ flex: '1', width: '100%' }} margin="normal" />
            </FormGroup>
          );
        })
      }
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '15px 0' }}>
        <Button variant='contained' onClick={handleCreate} color="primary">
          {formName}
        </Button>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
      </div>
    </Box >
  );
};

export default CreateForm;
