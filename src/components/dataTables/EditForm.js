import React, { useState } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from './FormGroup';
import SquareInputField from './SquareInputField';

const EditForm = ({ row, onCancel, onUpdate, formName, formFields, selectedMedicine, medicines, handleAddMedicine, selectedMedicines, handleMedicineChange, handleRemoveMedicine, }) => {
  const [editedRow, setEditedRow] = useState(row);
    const handleFieldChange = (e) => {
      console.log(e.target)
      const { name, value } = e.target;
      setEditedRow((prevRow) => ({ ...prevRow, [name]: value }));
    };
  
    const handleUpdate = () => {
      console.log(editedRow)
      onUpdate(editedRow);
    };
  
  return (
    <Box>
      {
        formFields.map((field)=>{
          const placeholder = field.charAt(0).toUpperCase() + field.slice(1);
          if (field === 'medicines') {
            return (
              <>
                <FormGroup key={field}>
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
          return (
            <FormGroup key={field}>
              <Typography style={{flex:1/3}}>
                {placeholder}
              </Typography>
              <SquareInputField name={field} placeholder={placeholder} value={row[field]} onChange={handleFieldChange} styles={{flex:'1',width:'100%'}} margin="normal" />
            </FormGroup>
          );
        })
      }
      <div style={{display: 'flex',justifyContent: 'flex-end', margin:'15px 0'}}>
      <Button variant='contained' onClick={handleUpdate} color="primary">
        Edit {formName}
      </Button>
      <Button onClick={onCancel} color="secondary">
        Cancel
      </Button>
      </div>
    </Box >
  );
};

export default EditForm;
