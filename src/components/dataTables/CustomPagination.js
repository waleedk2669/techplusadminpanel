// CustomPagination.js
import React from 'react';
import { Pagination, PaginationItem, Stack } from '@mui/material';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (_, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Stack direction="row" marginLeft='auto' spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component="button"
            sx={{
              borderRadius: '5px', // Add border-radius for a rounded border
              backgroundColor: item.page === currentPage ? '#007bff' : '#fff',
              color: item.page === currentPage ? '#fff' : '#007bff',
              border: `1px solid ${
                item.page === currentPage ? '#007bff' : 'rgba(0, 0, 0, 0.23)'
              }`, // Add border with primary color on every page number
              '&:hover': {
                backgroundColor: item.page === currentPage ? '#0056b3' : '#e9ecef',
                color: item.page === currentPage ? '#fff' : '#007bff',
                border: `1px solid ${
                  item.page === currentPage ? '#0056b3' : 'rgba(0, 0, 0, 0.23)'
                }`, // Add border with primary color on hover
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CustomPagination;
