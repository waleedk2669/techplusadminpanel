import React, { useState, useEffect } from 'react';
import EditForm from '../../components/dataTables/EditForm';
import { setComfortKits, setFilteredRows, setSelectedComfortKit } from '../../store/reducers/comfortKits';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedicinesRequest } from '../../store/reducers/medicines';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const EditComfortKit = () => {
  const medicines = useSelector((state) => state.medicines.medicines);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const comfortKits = useSelector((state) => state.comfortKits.comfortKits);
  const filteredRows = useSelector((state) => state.comfortKits.filteredRows);
  const selectedComfortKit = useSelector((state) => state.comfortKits.selectedComfortKit)
  const formName = 'Comfort Kit';
  const {addSnackbar} = useSnackbar();

  const handleMedicineChange = (event, newValue) => {
    setSelectedMedicine(newValue);
  };

  const handleAddMedicine = () => {
    if (selectedMedicine) {
      setSelectedMedicines((prev) => [...prev, selectedMedicine]);
      setSelectedMedicine(null);
    }
  };

  const handleRemoveMedicine = (medicineId) => {
    const newSelectedMedicines = selectedMedicines.filter((medicine) => medicine.id !== medicineId);
    setSelectedMedicines(newSelectedMedicines);
  };

  const formFields = ['id', 'medicines', 'price'];
  const defaultData = {
    id: '',
    medicines: [],
    price: '',
  };




  const handleUpdate = (updatedOrder) => {
    dispatch(setComfortKits(comfortKits.map((row) => (row.id === updatedOrder.id ? updatedOrder : row))
    ));

    dispatch(setFilteredRows(Array.from(filteredRows).map((row) => row.id === updatedOrder.id ? updatedOrder : row)))
    setSelectedComfortKit(null);
    addSnackbar('Comfort Kit updated successfully!', 'success');
    navigate("/dashboard/comfortKits");
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchMedicinesRequest());
  }, []);

  if (!selectedComfortKit) {
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <div>
      <Typography variant='h3' component='h2' margin='10px ' >Edit Comfort Kit</Typography>
      <EditForm
        row={selectedComfortKit}
        formFields={formFields}
        formName={formName}
        onCancel={handleCancelEdit}
        onUpdate={handleUpdate}
        medicines={medicines}
        selectedMedicine={selectedMedicine}
        selectedMedicines={selectedMedicines} // Pass the selected medicines to CreateForm
        handleAddMedicine={handleAddMedicine}
        handleRemoveMedicine={handleRemoveMedicine}
        handleMedicineChange={handleMedicineChange}
      />
    </div>
  );
}

export default EditComfortKit;
