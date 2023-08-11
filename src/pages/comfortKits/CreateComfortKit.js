// import React, {useState, useEffect} from 'react'
// import { Typography } from '@mui/material';
// import CreateForm from '../../components/dataTables/createForm'
// import { useSelector, useDispatch } from 'react-redux';
// import { setComfortKits, setFilteredRows, setSelectedComfortKit} from '../../store/reducers/comfortKits';
// import { useNavigate } from 'react-router';
// import { fetchMedicinesRequest } from '../../store/reducers/medicines';

// const CreateComfortKit = () => {

//   const medicines = useSelector((state) => state.medicines.medicines);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [selectedMedicines, setSelectedMedicines] = useState([]);

//   const handleMedicineChange = (event, newValue) => {
//     setSelectedMedicine(newValue);
//     console.log('newvalue', newValue)
//   };

//   const handleAddMedicine = () => {
//     if (selectedMedicine) {
//       setSelectedMedicines((prev)=> [...prev, selectedMedicine]);
//       console.log('selected medicines', selectedMedicines)
//       setSelectedMedicine(null);
//     }
//   };
  
//   const handleRemoveMedicine = (medicineId) => {
//     const newSelectedMedicines = selectedMedicines.filter((medicine) => medicine.id !== medicineId);
//     setSelectedMedicines(newSelectedMedicines);
//   };

  

//   const formFields = ["id", 'medicines', 'price'];
//   const defaultData = {
//     id: '',
//     medicines: [],
//     price: '',
//   };
//   const formName = 'Comfort Kit';
//   const selectedComfortKit = useSelector((state)=> state.comfortKits.selectedComfortKit)
//   console.log(selectedComfortKit)
//   const comfortKits = useSelector((state)=> state.comfortKits.comfortKits);
//   const filteredRows = useSelector((state)=> state.comfortKits.filteredRows);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleCancelCreate = () => {
//     navigate(-1);
//   };

//   const handleCreate = (newOrder) => {
//     dispatch(setComfortKits([...comfortKits, newOrder]));
//     dispatch(setFilteredRows([...filteredRows, newOrder])); // Update the filteredRows state as well
//     navigate('/dashboard/comfortKits');
//   };
//   useEffect(()=>{
//       dispatch(fetchMedicinesRequest());
//     },[])
  
//   return (
//     <div>
//       <Typography variant='h3' component='h2'margin='10px ' >Create Comfort Kit</Typography>
//       <CreateForm medicines={medicines} selectedMedicine={selectedMedicine} handleAddMedicine={handleAddMedicine} handleRemoveMedicine={handleRemoveMedicine} handleMedicineChange={handleMedicineChange} onCancel={handleCancelCreate} onCreate={handleCreate} formName={formName} formFields={formFields} defaultData={defaultData} />
//     </div>
//   );
// }

// export default CreateComfortKit;



import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import CreateForm from '../../components/dataTables/CreateForm.js';
import { useSelector, useDispatch } from 'react-redux';
import { createComfortKitRequest, setComfortKits, setFilteredRows, setLoading, viewComfortKitRequest } from '../../store/reducers/comfortKits';
import { useNavigate } from 'react-router-dom';
import { fetchMedicinesRequest } from '../../store/reducers/medicines';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const CreateComfortKit = () => {
  const medicines = useSelector((state) => state.medicines.medicines);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedMedicinesIds, setSelectedMedicinesIds] = useState([]);
  const {addSnackbar} = useSnackbar();
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
    enabled: true
  }
];
const defaultData = {
    id: '',
    medicines: [],
    price: '',
  };
  const formName = 'Create Comfort Kit';

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
  }, []);
  useEffect(()=>{
    if(!loading && submitted) {
      console.log('here is submitted')
      
    }
  },[submitted, loading]);
  if(loading){
    return (<div>loading...</div>)
  }
  return (
    <div>
      <Typography variant="h3" component="h2" margin="10px">
        Create Comfort Kit
      </Typography>
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
        defaultData={defaultData}
      />
    </div>
  );
};

export default CreateComfortKit;
