// RowPerPageMenu.js
import React from 'react';
import { MenuItem, FormControl, Select } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const RowPerPageMenu = ({ rowsPerPage, handleChange }) => {
  return (
  <div style={{display:'flex', justifyContent:'flex-end'}}>
    <FormControl>
      <Select value={rowsPerPage} onChange={handleChange}
      displayEmpty
      renderValue={() => <FilterAltIcon />}
      //IconComponent={FilterAltIcon}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControl>
  </div>
  );
};

export default RowPerPageMenu;
