import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import FormGroup from './FormGroup';
import SquareDataField from './SquareDataField.js';
import { useSelector, useDispatch } from 'react-redux';
import { viewMedicineRequest } from '../../store/reducers/medicines';
const ViewForm = ({ row, onCancel, formName, formFields }) => {
    return (
        <Box>
            {
                formFields.map((field) => {
                    return (
                        <FormGroup key={field}>
                            <Typography style={{ flex: 1 / 3 }}>
                                {field}
                            </Typography>
                            <SquareDataField styles={{ flex: '1', width: '100%' }} margin="normal">
                                {row[field]}
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