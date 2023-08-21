import React, {useEffect, useState} from 'react'
import { SetForm } from '../../components/SetForm';
import { useSelector, useDispatch } from 'react-redux';
import { createNewOrderRequest, hospiceRequest, pharmacyRequest, nurseRequest, patientRequest } from '../../store/reducers/newOrders';
import { searchMedicinesRequest } from '../../store/reducers/medicines';
import { useNavigate } from 'react-router';
import { useSnackbar } from '../../components/Snackbar/SnackbarProvider';

const CreateOrder = () => {
  
  const defaultData = {
    id: '',
    name: '',
    price: '',
  };
  const medicines = useSelector((state) => state.medicines.medicines);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicineRows, setMedicineRows] = useState([]);
  
  const formName = 'Create New Order';
  const loading = useSelector((state) => state.newOrders.loading)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hospice = useSelector((state) => state.newOrders.hospice)
  const pharmacy = useSelector((state) => state.newOrders.pharmacy)
  const nurse = useSelector((state) => state.newOrders.nurse)
  const patient = useSelector((state) => state.newOrders.patient)
  const { addSnackbar } = useSnackbar();
  
  const handleMedicineChange = (event, newValue) => {
    setSelectedMedicine(newValue);
  };
  const handleAddMedicine = () => {
    if (selectedMedicine) {
      if (selectedMedicines.includes(selectedMedicine)) {
        handleRemoveMedicine(selectedMedicine.id, selectedMedicine.name);
      }
      else {
        setSelectedMedicines((prev) => [...prev, selectedMedicine]);
        setMedicineRows((prev) => [...prev, {name: selectedMedicine.name, quantity: 1, id: selectedMedicine.id}]);;
        setSelectedMedicine(null);
      }
    }
  }
  const handlePlus = (e) => {
    const newMedicineRows = medicineRows.map((item)=>{
      if(item.name === e.target.name){
        return {...item, quantity: ++item.quantity}
      }
      return item;
    });
    console.log()
    setMedicineRows(newMedicineRows);
  }
  const handleMinus = (e) => {
    const newMedicineRows = medicineRows.map((item) =>{
      if(item.name === e.target.name){
        if(item.quantity===0){
          return item;
        }
        return {...item, quantity: --item.quantity}
      }
      return item;
    });
    setMedicineRows(newMedicineRows);
  }

  const handleRemoveMedicine = (medicineId, medicineName) => {
    const newSelectedMedicines = selectedMedicines.filter((medicine) => medicine.id !== medicineId);
    const newMedicineRows =  medicineRows.filter((row) => row.name !== medicineName);
    setMedicineRows(newMedicineRows)
    setSelectedMedicines(newSelectedMedicines);
  };


  const handleFieldChange = (name, newValue, setFormData) => {
    console.log(newValue)
    if(name)
    setFormData((prevData) => ({ ...prevData, [name] : newValue.id }))
  }
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  const handleSubmit = (data) => {
    const orderProducts = medicineRows.map((row)=>{
      return [row.id, row.quantity];
    });
    console.log(orderProducts)
    dispatch(createNewOrderRequest({...data, orderProducts: orderProducts}));
    addSnackbar('New Order created successfully!', 'success');
    navigate('/dashboard/recent-orders');
  };
  
  useEffect(() => {
    dispatch(searchMedicinesRequest({ searchText: '', rowsPerPage: 25 }));
    dispatch(hospiceRequest())
    dispatch(pharmacyRequest())
    dispatch(nurseRequest())
    dispatch(patientRequest())
  }, []);
  const optionHandler = (option) => option.first_name + " " + option.last_name;
  const handleInputChange = (event, newInputValue) => {
    dispatch(searchMedicinesRequest({ searchText: newInputValue, rowsPerPage: 10 }));

  }

  const formFields = [
    {
      name: 'hospice_id',
      label: 'Hospice Id',
      data: hospice,
      fieldChange: handleFieldChange,
      optionHandler: optionHandler,
      type: 'dropdown',
      maxLength: 100,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'pharmacy_id',
      label: 'Pharmacy Id',
      data: pharmacy,
      fieldChange: handleFieldChange,
      optionHandler: optionHandler,
      type: 'dropdown',
      maxLength: 500,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'nurse_id',
      label: 'Nurse Id',
      data: nurse,
      fieldChange: handleFieldChange,
      optionHandler: optionHandler,
      type: 'dropdown',
      maxLength: 500,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'patient_id',
      label: 'Patient Id',
      data: patient,
      fieldChange: handleFieldChange,
      optionHandler: optionHandler,
      type: 'dropdown',
      maxLength: 500,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'tax_price',
      label: 'Tax Price',
      type: 'number',
      hidden: true,
      enabled: true,
      width: 2 / 3,
    },
    {
      name: 'shipping_price',
      label: 'Shipping Price',
      type: 'number',
      enabled: true,
      width: 2 / 3,
      hidden: true,
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
      handlePlus: handlePlus,
      handleMinus: handleMinus,
      handleInputChange: handleInputChange,
      table: true,
      header: ['Medicines', 'Quantity', 'Actions'],
      rows: medicineRows,
      enabled: true,
    },
  ];

  return (
    <div>
      {
        medicines && pharmacy && nurse && patient && hospice &&
      <SetForm
      onCancel={handleCancel}
      formName={formName}
      formFields={formFields}
      defaultData={defaultData}
      handleSubmit={handleSubmit}
      />
    }
    </div>
  );
}

export default CreateOrder;
