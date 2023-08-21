import React, { useState } from 'react'
import { Typography, IconButton, TextField as TextField2, Button, Switch, Autocomplete, TextareaAutosize } from '@mui/material'
import FormGroup from './dataTables/FormGroup';
import SquareInputField from './dataTables/SquareInputField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './formFields.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const DropdownField = ({ showLabel, data, name, fieldChange, state, label, optionHandler }) => {
    if(showLabel==null){
        showLabel = true
    }
    return (
        <FormGroup key={name}>
            {
                showLabel &&
                <Typography style={{ flex: 1 / 3 }}>
                    {label}
                </Typography>
            }
            <Autocomplete
                options={data}
                name={name}
                getOptionLabel={optionHandler}
                sx={{ minWidth: '250px', width: !showLabel? '100%':'50%' }}
                onChange={(event, newValue) => {
                    fieldChange(name, newValue, state)
                }}
                renderInput={(params) => <TextField2 {...params} placeholder={label} />}
            />
        </FormGroup>
    )
}

export const SwitchField = ({ value, name, label, handleFieldChange }) => {
    const [formValue, setFormValue] = useState(value == 1);
    const toggleFormValue = (e) => {
        setFormValue(!formValue)
        handleFieldChange(e);
    }
    return (
        <FormGroup key={name}>
            <Typography style={{ flex: 1 / 3 }}>
                {label}
            </Typography>
            <div style={{ width: '50%' }}>
                <Switch
                    name={name}
                    placeholder={label}
                    // checked={formData[name] == 1 ? true : false}
                    onChange={toggleFormValue}
                    styles={{ flex: '1', width: '100%' }}
                    checked={formValue}
                    margin="normal"
                />
            </div>
        </FormGroup>
    )
}

export const TextField = ({ value, name, label, type, handleFieldChange }) => {
    return (
        <FormGroup key={name}>
            <Typography style={{ flex: 1 / 3 }}>
                {label}
            </Typography>
            <SquareInputField
                name={name}
                id={name}
                placeholder={label}
                type={type}
                value={value}
                onChange={handleFieldChange}
            />
        </FormGroup>
    )
}

export const TextAreaField = ({ value, name, label, type, handleFieldChange }) => {
    return (
        <FormGroup key={name}>
            <Typography style={{ flex: 1 / 3 }}>
                {label}
            </Typography>
            <textarea
                className='input-textarea'
                name={name}
                style={{
                    width: '50%',
                    height: '40px',
                    border: '0px',
                    borderRadius: '5px',
                    color: '',
                    background: '#f5f5f5',
                    padding: '10px 15px',
                }}
                id={name}
                placeholder={label}
                type={type}
                onChange={handleFieldChange}
                value={value}
            />
        </FormGroup>
    )
}

const Tag = ({ value }) => {
    if (value == 1)
        return <CheckCircleOutlineIcon sx={{ color: 'green' }} />
    else
        return <HighlightOffIcon sx={{ color: 'red' }} />
}

export default Tag;

export const MultipleSelectDropdown = ({ data, handleDataChange, handleInputChange, handleAddItem, name, label }) => {
    return (
        <FormGroup key={`${name}-field`}>
            <Typography style={{ flex: 1 / 3 }}>
                {label}
            </Typography>
            <div
                style=
                {{
                    position: 'relative',
                    display: 'flex',
                    maxWidth: '50%',
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                <Autocomplete
                    id={name}
                    options={data}
                    getOptionLabel={(option) => option.name}
                    //onInputChange={handleMedicineChange}
                    onChange={handleDataChange}
                    onInputChange={handleInputChange}
                    style={{ minWidth: '300px', flex: 1 }}
                    renderInput={(params) => <TextField2 {...params} placeholder={`Select ${label}`} sx={{ minHeight: '40px' }} />}
                />
                <Button variant="outlined" color="primary" onClick={handleAddItem}>
                    Add Medicine
                </Button>
            </div>
        </FormGroup>
    );
}

export const RenderTags = ({ name, label, tagsData, handleRemoveItem }) => {

    return (
        <FormGroup key={name} style={{ minHeight: '200px' }}>
            <Typography style={{ flex: 1 / 3 }}>
                {label}
            </Typography>
            <div style={{ display: 'flex', width: '50%', maxWidth: '50%', flexWrap: 'wrap', overflowX: 'hidden', padding: '10px 5px' }}>
                {
                    tagsData &&
                    tagsData.map((item) => (
                        <div key={item.id}>
                            <Button
                                sx={{ marginRight: '5px' }}
                                variant="outlined"
                                color="primary"
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                {item.name}
                            </Button>
                        </div>
                    ))
                }
            </div>
        </FormGroup>
    );
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const TableInput = ({ rows, header, label, handlePlus, handleMinus }) => {
    return (
        <FormGroup key={name} style={{ minHeight: '200px' }}>
            <Typography style={{ flex: 1 / 3 }}>
                {label}
            </Typography>
            <div style={{ display: 'flex', width: '50%', maxWidth: '50%', flexWrap: 'wrap', overflowX: 'hidden', padding: '10px 5px' }}>
                <TableContainer sx={{}} component={Paper}>
                    <Table sx={{}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {header.map((item) => {
                                    return <StyledTableCell align='center'>{item}</StyledTableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton name={row.name} cellid={row.id} color='primary' onClick={handlePlus}>
                                            +
                                        </IconButton>
                                        <IconButton name={row.name} cellid={row.id} color='error' onClick={handleMinus}>
                                            -
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </FormGroup>

    );
}
