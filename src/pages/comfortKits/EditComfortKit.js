import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComfortKitRequest, viewComfortKitRequest, setLoading } from '../../store/reducers/comfortKits';
import { useNavigate } from 'react-router-dom';
import { searchMedicinesRequest } from '../../store/reducers/medicines';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';
import {SetForm} from '../../components/SetForm'
import { useParams } from 'react-router';

const EditComfortKit = () => {

  const params = useParams();
  const comfortKit = useSelector(state => state.comfortKits.viewComfortKit)
  const medicines = useSelector((state) => state.medicines.medicines);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedMedicinesIds, setSelectedMedicinesIds] = useState([]);
  const loading = useSelector((state) => state.comfortKits.loading)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addSnackbar } = useSnackbar();
  const formName = 'Edit Comfort Kit';

  
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

  const handleCancelUpdate = () => {
    navigate(-1);
  };

  const handleUpdate = (data) => {
    dispatch(setLoading(true));
    dispatch(createComfortKitRequest({ ...data, medicines: selectedMedicinesIds }));
    console.log({ ...data, medicines: selectedMedicinesIds })
    addSnackbar('Comfort Kit updated successfully!', 'success');
    navigate('/dashboard/comfortKits');
  };

  useEffect(() => {
    dispatch(searchMedicinesRequest({ rowsPerPage: 25 }));
    dispatch(viewComfortKitRequest({id: params.id}))
  }, []);

  useEffect(()=>{
    if(comfortKit){
      setSelectedMedicines(comfortKit.medicines);
      const newSelectedMedicinesIds = selectedMedicines.map((medicine) => medicine.id)
      setSelectedMedicinesIds(newSelectedMedicinesIds);
    }
  },[comfortKit])
  
  const formFields = [
    {
      name: 'name',
      label: 'name',
      type: 'string',
      enabled: true,
    },
    {
      name: 'medicines',
      label: 'medicines',
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
      type: 'number',
      hidden: true,
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
      {
        comfortKit &&
        <SetForm
        onCancel={handleCancelUpdate}
        handleSubmit={handleUpdate}
        formName={formName}
        formFields={formFields}
        defaultData={comfortKit}
        />
      }
    </div>
  );
};
export default EditComfortKit;