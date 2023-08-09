// // CustomPagination.js
// import React from 'react';
// import { Button, IconButton } from '@mui/material';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';

// const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
//   const handlePageChange = (newPage) => {
//     onPageChange(newPage);
//   };

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//       <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//         Previous
//       </Button>
//       <span style={{ margin: '0 10px' }}>{`Page ${currentPage} of ${totalPages}`}</span>
//       <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//       Next
//       </Button>
//     </div>
//   );
// };

// export default CustomPagination;
// CustomPagination.js

// import React from 'react';
// import { Pagination, PaginationItem, Stack } from '@mui/material';

// const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
//   const handleChange = (_, newPage) => {
//     onPageChange(newPage);
//   };

//   return (
//     <Stack direction="row" spacing={2}>
//       <Pagination
//         count={totalPages}
//         page={currentPage}
//         onChange={handleChange}
//         renderItem={(item) => (
//           <PaginationItem
//             {...item}
//             component="button"
//             sx={{
//               borderRadius: '4px',
//               backgroundColor: item.page === currentPage ? '#007bff' : '#fff',
//               color: item.page === currentPage ? '#fff' : '#007bff',
//               '&:hover': {
//                 backgroundColor: item.page === currentPage ? '#0056b3' : '#e9ecef',
//                 color: item.page === currentPage ? '#fff' : '#007bff',
//               },
//             }}
//           />
//         )}
//       />
//     </Stack>
//   );
// };

// export default CustomPagination;


// CustomPagination.js
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
