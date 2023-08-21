import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function FormPagination({currentPage, pageCount, handlePageChange}) {

  const handleChange = (event, value) => {
    handlePageChange(value);
  };

  return (
    <Stack spacing={2} sx={{marginLeft:'auto'}}>
      <Pagination count={pageCount} page={currentPage} showFirstButton showLastButton onChange={handleChange} color='primary'/>
    </Stack>
  );
}
