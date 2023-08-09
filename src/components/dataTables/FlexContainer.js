import React from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

const FlexContainer = ({ children }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      justifyContent={isMobile ? 'flex-start' : 'space-between'}
    >
      {/* Render dynamically passed children */}
      {React.Children.map(children, (child, index) => (
        <div key={index} style={{}}>
          {child}
        </div>
      ))}
    </Box>
  );
};

export default FlexContainer;
