import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const RoundInput = styled(TextField)(({ theme, fullWidth }) => ({
  width: fullWidth ? '100%' : 'auto', // Set the width to full or auto based on the `fullWidth` prop
  margin: '10px 0', // Add margin of 10px from top and bottom
  minWidth: '300px',
  '& .MuiOutlinedInput-root': {
    borderRadius: 20, // Adjust this value to change the roundness
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Optional: You can set a background color
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove the default border
  },
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 10px) scale(1)', // Adjust label position as needed
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when shrunk
  },
  '& input': {
    padding: '10px 15px', // Optional: Adjust the padding as needed
  },
}));

const RoundInputField = ({ fullWidth, ...restProps }) => {
  return (
    <RoundInput
      variant="outlined"
      placeholder="Enter your text here"
      fullWidth={fullWidth}
      {...restProps}
    />
  );
};

export default RoundInputField;
