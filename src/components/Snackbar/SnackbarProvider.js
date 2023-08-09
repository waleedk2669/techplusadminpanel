import React, { createContext, useContext, useState } from 'react';
import SnackbarMessage from './SnackbarMessage';

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([]);

  const addSnackbar = (message, severity) => {
    const newSnackbar = { message, severity, key: new Date().getTime() };
    setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);
  };

  const removeSnackbar = (key) => {
    setSnackbars((prevSnackbars) => prevSnackbars.filter((snackbar) => snackbar.key !== key));
  };

  return (
    <SnackbarContext.Provider value={{ snackbars, addSnackbar, removeSnackbar }}>
      {children}
      {snackbars.map((snackbar) => (
        <SnackbarMessage
          key={snackbar.key}
          open={true}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => removeSnackbar(snackbar.key)}
        />
      ))}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export { SnackbarProvider, useSnackbar };
