import React, { useEffect, useState } from 'react'; // Import useState
import { Typography, Grid, IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material'; // Import icons
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchMedicinesRequest, searchMedicinesRequest, deleteMedicineRequest, newPageRequest } from '../../store/reducers/medicines'; // Import your action creators
import { useNavigate } from 'react-router'
import { DeleteConfirmation } from '../../components/DeleteConfirmation';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import Tag from '../../components/FormFields';


const Medicines = () => {
  
  const { addSnackbar } = useSnackbar();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const dispatch = useDispatch();
  const medicines = useSelector(state => state.medicines.medicines);
  const pageCount = useSelector(state => state.medicines.pageCount);
  const [loading, setLoading] = useState(false);
  const currentPage = useSelector(state => state.medicines.currentPage);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  
  const columns = [
    {
      field: 'name', headerName: 'Name', headerAlign: 'left', width: 200,
    },
    // {
    //   field: 'price', headerName: 'Price', headerAlign: 'left', width: 150,
    //   renderCell: (params) => (
    //     <Typography>
    //       ${params.row.price}
    //     </Typography>
    //   ),
    // },
    {
      field: 'is_enabled',
      headerName: 'Active',
      headerAlign: 'left',
      width: 200,
      renderCell: (params) => {
        const active = params.row.is_enabled
        return <Tag value={active} />
      },
    },
    {
      field: 'actions',
      headerName: '',
      width: 200,
      headerAlign: 'right',
      sortable: false,
      flex: 1,
      align: 'right',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row.id)}>
            <Visibility />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteConfirmation(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];
  
  const handleView = (id) => {
    navigate(`view/${id}`);
  }

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  }

  const handleSearch = (searchText) => {
    const searchPayload = { searchText: searchText, rowsPerPage: rowsPerPage };
    dispatch(searchMedicinesRequest(searchPayload));
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteRowId(id);
    setShowDeleteConfirmation(true)
  };
  const handleDelete = () => {
    dispatch(deleteMedicineRequest({id: deleteRowId}));
    addSnackbar('Medicine Deleted Successfully', 'success');
    setShowDeleteConfirmation(false);
  };
  const handleCloseModal = () => {
    setShowDeleteConfirmation(false);
  };

  const handlePageChange = (newPage) => {
    dispatch(newPageRequest({newPage: newPage, rowsPerPage: rowsPerPage}));
  }

  const handleRowsChange = (e)=> {
    setRowsPerPage(e.target.value)
  }

  useEffect(() => {
    dispatch(fetchMedicinesRequest({ rowsPerPage: rowsPerPage }));
    setLoading(true);
  }, [dispatch, rowsPerPage]);

  useEffect(() => {
    setLoading(false);
    console.log(medicines)

  }, [medicines]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h2">
          Medicines
        </Typography>
      </Grid>
      {
        medicines &&
        <>
          <Grid item xs={12}>
            <DataTable
              columns={columns}
              rowsPerPage={rowsPerPage}
              data={medicines}
              loading={loading}
              multiSelect={0}
              resourceName={'medicine'}
              createRoute={'create'}
              handleSearch={handleSearch}
              handlePageChange={handlePageChange}
              pageCount={pageCount}
              currentPage={currentPage}
              handleRowsChange={handleRowsChange}
            />
          </Grid>
          <DeleteConfirmation
            showDeleteConfirmation={showDeleteConfirmation}
            handleDelete={handleDelete}
            handleCloseModal={handleCloseModal}
          />
        </>
      }
    </Grid>
  );
};

export default Medicines;
