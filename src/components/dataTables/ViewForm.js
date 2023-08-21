import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import FormGroup from './FormGroup';
import SquareDataField from './SquareDataField.js';
import Tag from '../FormFields';

const ViewForm = ({ row, onCancel, formFields }) => {

    return (
        <Box>
            {
                formFields.map((field) => {
                    if (field.name == 'medicines') {
                        return (
                            <FormGroup key={field.name}>
                                <Typography style={{ flexBasis:'100px', flexGrow: 1 / 3 }}>
                                    {field.label}
                                </Typography>
                                <SquareDataField style={{ display: 'flex', alignItems: 'center' }} margin="normal">
                                    {row.medicines.map((med) => {
                                        return <div style={{ padding: '5px 10px', margin: '3px 10px', border: '1px solid grey', borderRadius: '5px' }}>{med.name}</div>
                                    })}
                                </SquareDataField>
                            </FormGroup>
                        );
                    }

                    if (field.type == 'tag') {
                        return (
                            <FormGroup key={field.name}>
                                <Typography style={{flexBasis:'100px', flexGrow: 1/3 }}>
                                    {field.label}
                                </Typography>
                                <div style={{ width: '50%' }}>
                                    <Tag value={row[field.name]} />
                                </div>
                            </FormGroup>
                        );
                    }
                    return (
                        <FormGroup key={field.name}>
                            <Typography style={{ flexBasis:'100px',flexGrow: 1/3 }}>
                                {field.label}
                            </Typography>
                            <SquareDataField style={{width: '50%' }} margin="normal">
                                {row[field.name]}
                            </SquareDataField>
                        </FormGroup>
                    );
                })
            }
            <Button onClick={onCancel} style={{ float: 'right', margin: '10px' }} color="secondary">
                Cancel
            </Button>
        </Box>
    );
};

export default ViewForm;
