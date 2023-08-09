import React, { useState } from 'react';
import { Button, TextField, Grid, Box, Typography, Switch } from '@mui/material';
import SquareInputField from './SquareInputField';
import FormGroup from './FormGroup';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';

const CreateForm = ({ selectedMedicine, onCancel, medicines, handleAddMedicine, selectedMedicines, handleMedicineChange, handleRemoveMedicine, onCreate, formFields, defaultData, formName }) => {
  const [formData, setFormData] = useState(defaultData);
  const authToken = useSelector((state)=> state.auth.authToken);

  const handleFieldChange = (e) => {
    let { name, value } = e.target;
    if(name=='is_enabled')
      {
       value = e.target.checked?1:0;
      }
    console.log(name, value)
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = () => {
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
          if (field === 'medicines') {
            return (
              <>
                <FormGroup key={field.name}>
                  <Typography style={{ flex: 1 / 3 }}>
                    {placeholder}
                  </Typography>
                  <div style={{ display: 'flex',maxWidth:'50%', alignItems:'stretch', justifyContent:'space-between', width: '100%' }}>
                    <Autocomplete
                      id="medicine-select"
                      options={medicines}
                      getOptionLabel={(option) => option.title}
                      value={selectedMedicine}
                      onChange={handleMedicineChange}
                      style={{minWidth:'300px',flex:1}}
                      renderInput={(params) => <TextField {...params} placeholder="Select Medicine" sx={{minHeight:'40px'}} />}
                    />
                    <Button variant="outlined" color="primary" onClick={handleAddMedicine}>
                      Add Medicine
                    </Button>
                  </div>
                </FormGroup>
                <FormGroup key='addedmedicines' style={{minHeight:'200px'}}>
                  <Typography style={{ flex: 1 / 3 }}>
                    Added Medicines
                  </Typography>
                  <div style={{display:'flex',width:'50%', maxWidth:'50%', flexWrap:'wrap', overflowX:'hidden', padding:'10px 5px' }}>
                    {
                      selectedMedicines &&
                      selectedMedicines.map((medicine) => (
                        <div key={medicine.id}>
                          {medicine.title} - {medicine.price}
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleRemoveMedicine(medicine.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))
                    }
                  </div>
                </FormGroup>
              </>

            );
          }
          if(field.type === 'switch'){
            return (
              <FormGroup key={field.name}>
                <Typography style={{ flex: 1 / 3 }}>
                  {placeholder}
                </Typography>
                <Switch name={field.name} placeholder={placeholder} checked={formData[field.name]==1?true:false} onChange={handleFieldChange} styles={{ flex: '1', width: '100%' }} margin="normal" />
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
