import React, { useState, useEffect } from 'react';
import CreateForm from '../../components/dataTables/CreateForm';
import { setComfortKits, setFilteredRows, setSelectedComfortKit, viewComfortKitFailure } from '../../store/reducers/comfortKits';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedicinesRequest, viewMedicineRequest } from '../../store/reducers/medicines';
import { createComfortKitRequest ,viewComfortKitRequest, setLoading } from '../../store/reducers/comfortKits';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const EditComfortKit = () => {
  const medicines = useSelector((state) => state.medicines.medicines);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedMedicinesIds, setSelectedMedicinesIds] = useState([]);
  const viewComfortKit = useSelector((state) => state.comfortKits.viewComfortKit);
  const {addSnackbar} = useSnackbar();
  const selectedComfortKit = useSelector((state) => state.comfortKits.selectedComfortKit);
  const handleMedicineChange = (event, newValue) => {
    setSelectedMedicine(newValue);
  };

  const handleAddMedicine = () => {
    if (selectedMedicine) {
      if(selectedMedicines.includes(selectedMedicine)){
        console.log("want to remove selectedMedicine")
        handleRemoveMedicine(selectedMedicine.id);
      }
      else{
        setSelectedMedicines((prev) => [...prev, selectedMedicine]);
        setSelectedMedicinesIds((prev) => [...prev, selectedMedicine.id]);
        setSelectedMedicine(null);
      }
    }
  };

  const handleRemoveMedicine = (medicineId) => {
    const newSelectedMedicines = selectedMedicines.filter((medicine) => medicine.id !== medicineId);
    const newSelectedMedicinesIds = selectedMedicinesIds.filter((medicine) => medicine !== medicineId);
    setSelectedMedicines(newSelectedMedicines);
    setSelectedMedicinesIds(newSelectedMedicinesIds);
  };

  const formFields = [
    {
      name: 'id',
      label: 'id',
      type: 'text',
      enabled: false,
    },
    {
    name: 'name',
    label: 'name',
    type: 'string',
    enabled: true,
  },
  {
    name: 'medicines',
    label: 'medicines',
    enabled: true,
  },
  {
    name: 'price',
    label: 'price',
    type: 'number',
    enabled: true,
  },
  {
    name: 'is_enabled',
    label: 'enabled',
    type: 'switch',
    enabled: true,
  }
];
const formName = 'Edit Comfort Kit';

const defaultData = {
  id: '',
  medicines: [],
  price: '',
};
const [isLoading, setIsLoading] = useState(true)

const navigate = useNavigate();
const dispatch = useDispatch();
const loading = useSelector((state) => state.comfortKits.loading)
const handleCancelCreate = () => {
  navigate(-1);
};
let submitted = false;
const handleCreate = (newOrder) => {
  dispatch(setLoading(true));
  submitted = true;
  dispatch(createComfortKitRequest({...newOrder.data, medicines: selectedMedicinesIds}));
  addSnackbar('Comfort Kit created successfully!', 'success');
    navigate('/dashboard/comfortKits');
};

useEffect(() => {
  dispatch(fetchMedicinesRequest({rowsPerPage: 20}));
  dispatch(viewComfortKitRequest({id: selectedComfortKit.id}))
  if(viewComfortKit){
    setSelectedMedicines(viewComfortKit.medicines)
  const newSelectedMedicinesIds = selectedMedicines.map((medicine) => medicine.id)
  console.log(newSelectedMedicinesIds);
  setSelectedMedicinesIds(newSelectedMedicinesIds);
  console.log(viewComfortKit)
  setIsLoading(false);
  }
}, [viewComfortKit]);
useEffect(()=>{
  if(!loading && submitted) {
    console.log('here is submitted')
    
  }
},[submitted, loading]);

if(isLoading){
  return (<div>loading...</div>)
}
  return (
    <div>
      <Typography variant='h3' component='h2' margin='10px ' >Edit Comfort Kit</Typography>
      <CreateForm
        medicines={medicines}
        selectedMedicine={selectedMedicine}
        selectedMedicines={selectedMedicines} // Pass the selected medicines to CreateForm
        handleAddMedicine={handleAddMedicine}
        handleRemoveMedicine={handleRemoveMedicine}
        handleMedicineChange={handleMedicineChange}
        onCancel={handleCancelCreate}
        onCreate={handleCreate}
        formName={formName}
        formFields={formFields}
        defaultData={viewComfortKit}
        mode = 'editting'
      />
    </div>
  );
}

export default EditComfortKit;
