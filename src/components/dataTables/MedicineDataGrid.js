import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import SearchBar from './SearchBar'; // Assuming the SearchBar component is in a separate file
import { useDispatch, useSelector } from 'react-redux';
import { setMedicines, deleteMedicineRequest, viewMedicineRequest, setSelectedMedicine, newPageRequest } from '../../store/reducers/medicines';
import { useNavigate } from 'react-router';
import FlexContainer from './FlexContainer';
import CustomPagination from './CustomPagination';
import { searchMedicinesRequest, fetchMedicinesRequest } from '../../store/reducers/medicines';
import RowPerPageMenu from './RowsPerPageMenu';

const MedicineDataGrid = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines.medicines)
  const selectedMedicine = useSelector((state) => state.medicines.selectedMedicine)
  const authToken = useSelector((state) => state.auth.authToken)

  const [rowsPerPage, setRowsPerPage] = useState(5); // Initialize with default value

  
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(medicines.length / rowsPerPage);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, medicines.length);

  const [loading, setLoading] = useState(true); // Add a loading state

  console.log('DataGridWithCRUD render');

  useEffect(() => {
    // Update the medicines whenever the Medicines change
    dispatch(fetchMedicinesRequest({rowsPerPage: rowsPerPage, authToken: authToken}));
    setLoading(true);
  }, [dispatch]);

    useEffect(() => {
      console.log(localStorage.getItem('authToken'));
      console.log('Medicines loaded:', medicines);
      setLoading(false);

      const storedSelectedMedicine = sessionStorage.getItem('selectedMedicine');
      console.log('Stored selectedMedicine:', storedSelectedMedicine);
        if (storedSelectedMedicine) {
          dispatch(setSelectedMedicine(storedSelectedMedicine));
        }
    }, [medicines]);
  const columns = [
    // ...same as before...
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerClassName: 'dataGridHeader', // Custom class for header with icon
    },
    {
      field: 'name', headerName: 'NAME',headerAlign:'center', width: 400,
    },
    {
      field: 'price', headerName: 'PRICE',headerAlign:'left', width: 150,
      renderCell: (params) => (
        <Typography>
          ${params.row.price}
        </Typography>)
    },
    {
      field: 'actions',
      headerName: '',
      width: 200,
      headerAlign:'right',
      sortable: false,
      flex: 1,
      align: 'right',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteConfirmation(params.row)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];


  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };
  const handleView = (row) => {
    dispatch(setSelectedMedicine(row))
    localStorage.setItem('selectedMedicineId', `${row.id}`);
    navigate('view');

  };

  const handleEdit = (row) => {
    dispatch(setSelectedMedicine(row));
    sessionStorage.setItem('selectedMedicine', row);
    navigate('edit');
  };

  const handleDeleteConfirmation = (row) => {
    dispatch(setSelectedMedicine(row));
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    if (selectedMedicine) {
      dispatch(deleteMedicineRequest(
        {
          authToken: authToken,
          id: selectedMedicine.id,
          rowsPerPage: rowsPerPage,
        }
        ));
        window.location.reload();
    }
    setSelectedMedicine(null);
    setShowDeleteConfirmation(false);
  };


  const handleCloseModal = () => {
    setSelectedMedicine(null);
    setShowDeleteConfirmation(false);
  };

  const handleSearch = (searchText) => {
      dispatch(searchMedicinesRequest({searchText: searchText, rowsPerPage: rowsPerPage, authToken}));
    setCurrentPage(1);
  };
  const handleCreateMedicine = () => {
    navigate('create');
  };

  //client side pagination
  // {const handlePageChange = (newPage) => { 
  //    setCurrentPage(newPage);
  //  };
  // }
  const handlePageChange = (newPage) => {
    dispatch(newPageRequest(newPage));
    setCurrentPage(newPage);

  }

  if (loading) {
    return <div>Loading...</div>; // Show loading message while waiting for Medicines to load
  }
  return (
    <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', overflowX:'hidden'}}>
      <FlexContainer>
        <SearchBar placeholder='Search Medicines' onSearch={handleSearch} />

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          style={{ marginTop: '10px' }}
          onClick={handleCreateMedicine}
        >
          Create Medicine
        </Button>


      </FlexContainer>
      <RowPerPageMenu rowsPerPage={rowsPerPage} handleChange={handleRowsPerPageChange} />
      <DataGrid
        rows={medicines.slice(startIndex, endIndex)}
        columns={columns}
        pageSize={rowsPerPage} // Set pageSize to show rows per page in DataGrid
        rowsPerPageOptions={[]} // Disable rows per page options
        checkboxSelection
        autoHeight
        components={{
          // Hide the default pagination by overriding it with the empty component
          Pagination: () => { }
        }}
        style={{ width: '', marginTop: '0px' }}
      />

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Render the CustomPagination component */}

      <Dialog open={showDeleteConfirmation} onClose={handleCloseModal}>
        <DialogTitle>Delete Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MedicineDataGrid;
