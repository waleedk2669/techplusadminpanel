import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComfortKitRequest, setLoading } from '../../store/reducers/comfortKits';
import { useNavigate } from 'react-router-dom';
import { fetchMedicinesRequest } from '../../store/reducers/medicines';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import {SetForm} from '../../components/SetForm'

const CreateComfortKit = () => {

  const medicines = useSelector((state) => state.medicines.medicines);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedMedicinesIds, setSelectedMedicinesIds] = useState([]);
  const loading = useSelector((state) => state.comfortKits.loading)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addSnackbar } = useSnackbar();
  const formName = 'Create Comfort Kit';
  
  
  const defaultData = {
    id: '',
    medicines: [],
    price: '',
  };
  
  const handleMedicineChange = (event, newValue) => {
    setSelectedMedicine(newValue);
  };
  const handleAddMedicine = () => {
    if (selectedMedicine) {
      if (selectedMedicines.includes(selectedMedicine)) {
        handleRemoveMedicine(selectedMedicine.id);
      }
      else {
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


  const handleCancelCreate = () => {
    navigate(-1);
  };
  const handleCreate = (data) => {
    dispatch(setLoading(true));
    dispatch(createComfortKitRequest({ ...data, medicines: selectedMedicinesIds }));
    addSnackbar('Comfort Kit created successfully!', 'success');
    navigate('/dashboard/comfortKits');
  };

  useEffect(() => {
    dispatch(fetchMedicinesRequest({ rowsPerPage: 20 }));
  }, []);
  
  const formFields = [
    {
      name: 'name',
      label: 'name',
      type: 'string',
      enabled: true,
    },
    {
      name: 'medicines',
      label: 'Medicines',
      type: 'multiSelectDropdown',
      data:medicines,
      tagsData:selectedMedicines,
      handleAddItem: handleAddMedicine,
      handleRemoveItem: handleRemoveMedicine,
      handleDataChange: handleMedicineChange,
      enabled: true,
    },
    {
      name: 'price',
      label: 'price',
      hidden: true,
      type: 'number',
      enabled: true,
    },
    {
      name: 'is_enabled',
      label: 'enabled',
      type: 'switch',
      enabled: true
    }
  ];
  

  if (loading) {
    return (<div>loading...</div>)
  }

  return (
    <div>
      <SetForm
        onCancel={handleCancelCreate}
        handleSubmit={handleCreate}
        formName={formName}
        formFields={formFields}
        defaultData={defaultData}
      />
    </div>
  );
};

export default CreateComfortKit;
