// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newOrders: [],
  loading: false,
  error: null,
  viewNewOrder: null,
  pageCount: null,
  currentPage: null,
  hospice: null,
  pharmacy: null,
  patient: null,
  nurse: null,
  driver: null,
};

const newOrderSlice = createSlice({
  name: 'newOrders',
  initialState,
  reducers: {
    setNewOrders: (state, action) => {
      state.newOrders = action.payload;
    },
    addNewOrder: (state, action) => {
      state.newOrders.push(action.payload);
    },
    editNewOrder: (state, action) => {
      const index = state.newOrders.findIndex((newOrder) => newOrder.id === action.payload.id);
      if (index !== -1) {
        state.newOrders[index] = action.payload;
      }
    },
    deleteNewOrder: (state, action) => {
      state.newOrders = state.newOrders.filter((newOrder) => newOrder.id !== action.payload);
    },
    setSelectedNewOrder: (state, action) => {
      state.selectedNewOrder = action.payload;
    },
    toggleEditForm: (state) => {
      state.isEditFormOpen = !state.isEditFormOpen;
    },
    setFilteredRows: (state, action) => {
      state.filteredRows = action.payload;
    },
    createNewOrderRequest: (state, action) => {
      state.loading = true;
    },
    createNewOrderSuccess: (state, action) => {
      state.loading = false;
    },
    createNewOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewNewOrderRequest: (state, action) => {
      state.loading = true;
      state.viewNewOrder = null;
    },
    viewNewOrderSuccess: (state, action) => {
      state.loading = false;
      const response = action.payload.data;
      state.viewNewOrder = response
    },
    viewNewOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteNewOrderRequest: (state, action) => {
      state.loading = true;
      state.newOrders = state.newOrders.filter((newOrder) => newOrder.id !== action.payload.id);

    },
    deleteNewOrderSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload)
    },
    deleteNewOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchNewOrdersRequest: (state, action) => {
      state.loading = true;
      state.newOrders = null;
    },
    fetchNewOrdersSuccess: (state, action) => {
      state.loading = false;
      state.newOrders = action.payload.data.data;
      state.pageCount = action.payload.data.last_page;
      state.currentPage = action.payload.data.current_page;
      console.log(action.payload.data.data);
    },
    fetchNewOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchNewOrdersRequest: (state) => {
      state.loading = true;
    },
    searchNewOrdersSuccess: (state, action) => {
      state.loading = false;
      state.newOrders = action.payload.data.data;
    },
    searchNewOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    newPageRequest: (state) => {
      state.loading = true;
    },
    newPageSuccess: (state, action) => {
      state.loading = false;
      state.newOrders = action.payload;
    },
    newPageFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    hospiceRequest: (state,action) => {
      state.loading = true;
      state.hospice = null;
    },
    hospiceSuccess: (state, action) => {
      state.loading = false;
      state.hospice = action.payload
       // Initialize filteredUsers with all Users
    },
    hospiceFailure: (state, action) => {
      state.loading = false;
    },
    patientRequest: (state,action) => {
      state.loading = true;
      state.patient = null;
    },
    patientSuccess: (state, action) => {
      state.loading = false;
      state.patient = action.payload
       // Initialize filteredUsers with all Users
    },
    patientFailure: (state, action) => {
      state.loading = false;
    },
    nurseRequest: (state,action) => {
      state.loading = true;
      state.nurse = null;
    },
    nurseSuccess: (state, action) => {
      state.loading = false;
      state.nurse = action.payload
       // Initialize filteredUsers with all Users
    },
    nurseFailure: (state, action) => {
      state.loading = false;
    },
    pharmacyRequest: (state,action) => {
      state.loading = true;
      state.pharmacy = null;
    },
    pharmacySuccess: (state, action) => {
      state.loading = false;
      state.pharmacy = action.payload
       // Initialize filteredUsers with all Users
    },
    pharmacyFailure: (state, action) => {
      state.loading = false;
    },
    driverRequest: (state,action) => {
      state.loading = true;
      state.driver = null;
    },
    driverSuccess: (state, action) => {
      state.loading = false;
      state.driver = action.payload
       // Initialize filteredUsers with all Users
    },
    driverFailure: (state, action) => {
      state.loading = false;
    },
    changeStatusRequest: (state, action) => {
      state.loading = true;
    },
    changeStatusSuccess: (state, action) => {
      state.loading = false;
    },
    changeStatusFailure: (state, action) => {
      state.loading = false;
    },
    
  },
});

export const {
  setNewOrders,
  addNewOrder,
  editNewOrder,
  deleteNewOrder,
  setSelectedNewOrder,
  toggleEditForm,
  setFilteredRows,
  deleteNewOrderRequest,
  deleteNewOrderFailure,
  deleteNewOrderSuccess,
  viewNewOrderFailure,
  viewNewOrderRequest,
  viewNewOrderSuccess,
  createNewOrderRequest,
  createNewOrderSuccess,
  createNewOrderFailure,
  fetchNewOrdersRequest,
  fetchNewOrdersSuccess,
  fetchNewOrdersFailure,
  searchNewOrdersRequest,
  searchNewOrdersSuccess,
  searchNewOrdersFailure,
  newPageRequest,
  newPageSuccess,
  newPageFailure,
  hospiceRequest,
  hospiceSuccess,
  hospiceFailure,
  nurseRequest,
  nurseSuccess,
  nurseFailure,
  pharmacyRequest,
  pharmacySuccess,
  pharmacyFailure,
  patientRequest,
  patientSuccess,
  patientFailure,
  changeStatusRequest,
  changeStatusSuccess,
  changeStatusFailure,
  driverRequest,
  driverSuccess,
  driverFailure,
} = newOrderSlice.actions;

export default newOrderSlice.reducer;
