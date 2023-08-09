import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const SquareInput = styled(Typography)(({ theme }) => ({
  width: '50%', // Set the width to full or auto based on the `fullWidth` prop
  padding: '10px 0', // Add margin of 10px from top and bottom
  height:'60px',
  fontSize:'20px',
  lineHeight:'30px',
  minWidth: '300px',
    borderRadius: 5, // Adjust this value to change the roundness
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Optional: You can set a background color
    border: 'none', // Remove the default border
    transform: 'translate(14px, 10px) scale(1)', // Adjust label position as needed
    transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when shrunk
    padding: '10px 15px', // Optional: Adjust the padding as needed
}));

const SquareDataField = ({ children, ...restProps }) => {
  return (
    <SquareInput 
      {...restProps}
    >
    {children}
    </SquareInput>
  );
};

export default SquareDataField;
