// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  medicines: [],
  loading: false,
  error: null,
  viewMedicine: null,
  pageCount: null,
  currentPage: null,
};

const medicineSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    setMedicines: (state, action) => {
      state.medicines = action.payload;
    },
    addMedicine: (state, action) => {
      state.medicines.push(action.payload);
    },
    editMedicine: (state, action) => {
      const index = state.medicines.findIndex((medicine) => medicine.id === action.payload.id);
      if (index !== -1) {
        state.medicines[index] = action.payload;
      }
    },
    deleteMedicine: (state, action) => {
      state.medicines = state.medicines.filter((medicine) => medicine.id !== action.payload);
    },
    setSelectedMedicine: (state, action) => {
      state.selectedMedicine = action.payload;
    },
    toggleEditForm: (state) => {
      state.isEditFormOpen = !state.isEditFormOpen;
    },
    setFilteredRows: (state, action) => {
      state.filteredRows = action.payload;
    },
    createMedicineRequest: (state, action) => {
      state.loading = true;
    },
    createMedicineSuccess: (state, action) => {
      state.loading = false;
    },
    createMedicineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewMedicineRequest: (state, action) => {
      state.loading = true;
      state.viewMedicine = null;
    },
    viewMedicineSuccess: (state, action) => {
      state.loading = false;
      const response = action.payload.data;
      state.viewMedicine = response
    },
    viewMedicineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMedicineRequest: (state, action) => {
      state.loading = true;
      state.medicines = state.medicines.filter((medicine) => medicine.id !== action.payload.id);

    },
    deleteMedicineSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload)
    },
    deleteMedicineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMedicinesRequest: (state, action) => {
      state.loading = true;
      state.medicines = null;
    },
    fetchMedicinesSuccess: (state, action) => {
      state.loading = false;
      state.medicines = action.payload.data.data;
      state.pageCount = action.payload.data.last_page;
      state.currentPage = action.payload.data.current_page;
      console.log(action.payload.data.data);
    },
    fetchMedicinesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchMedicinesRequest: (state) => {
      state.loading = true;
    },
    searchMedicinesSuccess: (state, action) => {
      state.loading = false;
      state.medicines = action.payload.data.data;
    },
    searchMedicinesFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    newPageRequest: (state) => {
      state.loading = true;
    },
    newPageSuccess: (state, action) => {
      state.loading = false;
      state.medicines = action.payload;
    },
    newPageFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export const {
  setMedicines,
  addMedicine,
  editMedicine,
  deleteMedicine,
  setSelectedMedicine,
  toggleEditForm,
  setFilteredRows,
  deleteMedicineRequest,
  deleteMedicineFailure,
  deleteMedicineSuccess,
  viewMedicineFailure,
  viewMedicineRequest,
  viewMedicineSuccess,
  createMedicineRequest,
  createMedicineSuccess,
  createMedicineFailure,
  fetchMedicinesRequest,
  fetchMedicinesSuccess,
  fetchMedicinesFailure,
  searchMedicinesRequest,
  searchMedicinesSuccess,
  searchMedicinesFailure,
  newPageRequest,
  newPageSuccess,
  newPageFailure
} = medicineSlice.actions;

export default medicineSlice.reducer;
