import React, { useEffect, useState } from 'react'; // Import useState
import { Typography, Grid, IconButton, Button } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material'; // Import icons
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchNewOrdersRequest, changeStatusRequest, searchNewOrdersRequest, deleteNewOrderRequest, newPageRequest } from '../../store/reducers/newOrders'; // Import your action creators
import { useNavigate } from 'react-router'
import { DeleteConfirmation } from '../../components/DeleteConfirmation';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import Tag from '../../components/FormFields';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import OpenModal from '../../components/OpenModal';


const FilledOrders = () => {

  const { addSnackbar } = useSnackbar();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const dispatch = useDispatch();
  const newOrders = useSelector(state => state.newOrders.newOrders);
  const pageCount = useSelector(state => state.newOrders.pageCount);
  const [loading, setLoading] = useState(false);
  const currentPage = useSelector(state => state.newOrders.currentPage);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);


  const columns = [
    // {
    //   field: 'sub_total', headerName: 'Sub Total', headerAlign: 'left', width: 150,
    //   renderCell: (params) => (
    //     <Typography>
    //       ${params.row.sub_total}
    //     </Typography>
    //   ),
    // },
    // {
    //   field: 'tax_price', headerName: 'Tax Price', headerAlign: 'left', width: 150,
    //   renderCell: (params) => (
    //     <Typography>
    //       ${params.row.tax_price}
    //     </Typography>
    //   )
    // },
    // {
    //   field: 'shipping_price', headerName: 'Shipping Price', headerAlign: 'left', width: 150,
    //   renderCell: (params) => (
    //     <Typography>
    //       ${params.row.shipping_price}
    //     </Typography>
    //   )
    // },
    // {
    //   field: 'grand_total', headerName: 'Grand Total', headerAlign: 'left', width: 150,
    //   renderCell: (params) => (
    //     <Typography>
    //       ${params.row.grand_total}
    //     </Typography>
    //   )
    // },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   headerAlign: 'left',
    //   width: 200,
    //   renderCell: (params) => {
    //     const active = params.row.status
    //     return <Tag value={active} />
    //   },
    // },
    
    {
      field: 'order_id',
      headerName: 'Order Id',
      headerAlign: 'left',
      width: 200,
    },
    
    {
      field: 'medicine_name',
      headerName: 'Medicine name',
      headerAlign: 'left',
      width: 200,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      headerAlign: 'left',
      width: 200,
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
        </>
      ),
    },
  ];
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleView = (id) => {
    navigate(`view/${id}`);
  }

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  }

  const handleSearch = (searchText) => {
    const searchPayload = { searchText: searchText, rowsPerPage: rowsPerPage };
    dispatch(searchNewOrdersRequest(searchPayload));
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteRowId(id);
    setShowDeleteConfirmation(true)
  };
  const handleDelete = () => {
    dispatch(deleteNewOrderRequest({ id: deleteRowId }));
    addSnackbar('NewOrder Deleted Successfully', 'success');
    setShowDeleteConfirmation(false);
  };
  const handleCloseModal = () => {
    setShowDeleteConfirmation(false);
  };

  const handlePageChange = (newPage) => {
    dispatch(newPageRequest({ newPage: newPage, rowsPerPage: rowsPerPage }));
  }

  const handleRowsChange = (e) => {
    setRowsPerPage(e.target.value)
  }

  const onSelectionModelChange = (ids) => {
    console.log(ids)
    setSelectedRowIds(ids)
    if (ids.length > 0) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }

  const onDispatch = (e,id) => {
    console.log('i am dispatch');
    console.log(id)
    dispatch(changeStatusRequest({ driver_id: id ,status: 0, tab_id: 3, medicine_ids: selectedRowIds }))
    addSnackbar('Driver assigned Successfully', 'success');
    dispatch(fetchNewOrdersRequest({ id: 3, rowsPerPage: rowsPerPage }));
    handleClose();

  }

  useEffect(() => {
    dispatch(fetchNewOrdersRequest({ id: 3, rowsPerPage: rowsPerPage }));
    setLoading(true);
  }, [dispatch, rowsPerPage]);

  useEffect(() => {
    setLoading(false);
    console.log(newOrders)

  }, [newOrders]);

  return (
    <Grid container spacing={0}>
      {
        newOrders &&
        <>
          <Grid item xs={12}>
            <DataTable
              extraButtonText="Assign Driver"
              extraButtonHandler={handleOpen}
              disableExtraButton={disabled}
              columns={columns}
              rowsPerPage={rowsPerPage}
              data={newOrders}
              loading={loading}
              multiSelect={1}
              resourceName={'newOrder'}
              createRoute={'create'}
              handleSearch={handleSearch}
              handlePageChange={handlePageChange}
              pageCount={pageCount}
              currentPage={currentPage}
              onSelectionModelChange={onSelectionModelChange}
              handleRowsChange={handleRowsChange}
            />
          </Grid>
          <DeleteConfirmation
            showDeleteConfirmation={showDeleteConfirmation}
            handleDelete={handleDelete}
            handleCloseModal={handleCloseModal}
          />
          <OpenModal open={open} close={handleClose} onDispatch={onDispatch} />
        </>
      }
    </Grid>
  );
};

export default FilledOrders;

