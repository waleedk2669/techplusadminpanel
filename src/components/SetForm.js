import React, { useState } from 'react'
import { SwitchField, DropdownField, TextField, TextAreaField, MultipleSelectDropdown, RenderTags, TableInput } from './FormFields';
import { Typography, Box, Button } from '@mui/material';

export const SetForm = ({ defaultData, formFields, formName, handleSubmit, onCancel }) => {

  const [formData, setFormData] = useState(defaultData);
  console.log(defaultData)

  const submit = () => {
    handleSubmit(formData);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name == 'is_enabled') {
      setFormData((prev) => {
        return { ...prev, [name]: e.target.checked ? 1 : 0 };
      });
    }
    else {
      setFormData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  return (
    <>
      <Typography variant='h3' component='h2' margin='10px'>{formName}</Typography>

      {
        formFields.map((field) => {
          if(field.hidden){
            return 
          }
          if (field.type == 'multiSelectDropdown') {
            return (
              <>
                <MultipleSelectDropdown
                  data={field.data}
                  handleAddItem={field.handleAddItem}
                  name={field.name}
                  label={field.label}
                  handleInputChange={field.handleInputChange}
                  handleDataChange={field.handleDataChange}
                />
                {
                  field.table ?
                    <TableInput
                      rows={field.rows}
                      header={field.header}
                      label={field.label}
                      handlePlus={field.handlePlus}
                      handleMinus={field.handleMinus}
                    /> :

                    <RenderTags
                      tagsData={field.tagsData}
                      handleRemoveItem={field.handleRemoveItem}
                      name={field.name}
                      label={field.label}
                    />

                }
              </>
            );
          }
          if (field.type == 'switch') {
            return (<SwitchField
              name={field.name}
              type={field.type}
              label={field.label}
              value={formData[field.name]}
              handleFieldChange={handleFieldChange}
            />);
          }
          else if (field.type == 'dropdown') {
            return (<DropdownField
              data={field.data}
              fieldChange={field.fieldChange}
              name={field.name}              
              label={field.label}
              state={setFormData}
              optionHandler={field.optionHandler}
            />);
          }
          else if (field.type == 'textarea') {
            return (<TextAreaField
              name={field.name}
              type={field.type}
              label={field.label}
              value={formData[field.name]}
              handleFieldChange={handleFieldChange}
            />);
          }
          else {
            return (<TextField
              name={field.name}
              type={field.type}
              label={field.label}
              value={formData[field.name]}
              handleFieldChange={handleFieldChange}
            />);
          }
        })
      }

      <Box>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '15px 0' }}>
          <Button variant='contained' onClick={submit} color="primary">
            {formName}
          </Button>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
        </div>
      </Box >
    </>
  )
};