// RowPerPageMenu.js
import React from 'react';
import { MenuItem, FormControl, Select } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const RowPerPageMenu = ({ rowsPerPage, handleRowsChange }) => {
  return (
  <div style={{display:'flex', justifyContent:'flex-end'}}>
    <FormControl>
      <Select value={rowsPerPage} onChange={handleRowsChange}
      displayEmpty
      renderValue={() => <FilterAltIcon />}
      //IconComponent={FilterAltIcon}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </FormControl>
  </div>
  );
};

export default RowPerPageMenu;
