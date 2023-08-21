// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comfortKits: [],
  loading: false,
  error: null,
  viewComfortKit: null,
  pageCount: null,
  currentPage: null,
};

const comfortKitSlice = createSlice({
  name: 'comfortKits',
  initialState,
  reducers: {
    setLoading: (state, action)=>{
      state.loading = action.payload;
    },
    setComfortKits: (state, action) => {
      state.comfortKits = action.payload;
    },
    addComfortKit: (state, action) => {
      state.comfortKits.push(action.payload);
    },
    editComfortKit: (state, action) => {
      const index = state.comfortKits.findIndex((comfortKit) => comfortKit.id === action.payload.id);
      if (index !== -1) {
        state.comfortKits[index] = action.payload;
      }
    },
    deleteComfortKit: (state, action) => {
      state.comfortKits = state.comfortKits.filter((comfortKit) => comfortKit.id !== action.payload);
    },
    setSelectedComfortKit: (state, action) => {
      state.selectedComfortKit = action.payload;
    },
    toggleEditForm: (state) => {
      state.isEditFormOpen = !state.isEditFormOpen;
    },
    setFilteredRows: (state, action) => {
      state.filteredRows = action.payload;
    },
    fetchComfortKitsRequest: (state, action) => {
      state.loading = true;
      state.comfortKits = null
    },
    fetchComfortKitsSuccess: (state, action) => {
      state.loading = false;
      state.comfortKits = action.payload.data.data;
      state.currentPage = action.payload.data.current_page;
      state.pageCount = action.payload.data.last_page;
    },
    fetchComfortKitsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewComfortKitRequest: (state, action) => {
      state.loading = true
      state.viewComfortKit = null;
    },
    viewComfortKitSuccess: (state, action) => {
      state.loading = false;
      state.viewComfortKit = action.payload.data;
      console.log(state.viewComfortKit);
    },
    viewComfortKitFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(state.error);
    },
    deleteComfortKitRequest: (state, action) => {
      state.loading = true;
      state.comfortKits = state.comfortKits.filter((comfortKit) => comfortKit.id !== action.payload.id);
    },
    deleteComfortKitSuccess: (state, action) => {
      console.log('deleteComfortKit');
      state.loading = false;
    },
    deleteComfortKitFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createComfortKitRequest: (state, action) => {
      state.loading = true
    },
    createComfortKitSuccess: (state, action) => {
      state.loading = false;
    },
    createComfortKitFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchComfortKitsRequest: (state,action) => {
    },
    searchComfortKitsSuccess: (state, action) => {
      state.loading = false;
      state.comfortKits = action.payload.data.data;
    },
    searchComfortKitsFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    newPageRequest: (state) => {
      state.loading = true;
    },
    newPageSuccess: (state, action) => {
      state.loading = false;
      state.comfortKits = action.payload;
      state.filteredRows = action.payload; // Update filteredComfortKits with search results
    },
    newPageFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export const {
  setLoading,
  setComfortKits,
  addComfortKit,
  editComfortKit,
  deleteComfortKit,
  setSelectedComfortKit,
  toggleEditForm,
  setFilteredRows,
  fetchComfortKitsRequest,
  fetchComfortKitsSuccess,
  fetchComfortKitsFailure,
  deleteComfortKitRequest,
  deleteComfortKitSuccess,
  deleteComfortKitFailure,
  viewComfortKitRequest,
  viewComfortKitSuccess,
  viewComfortKitFailure,
  createComfortKitRequest,
  createComfortKitSuccess,
  createComfortKitFailure,
  searchComfortKitsRequest,
  searchComfortKitsSuccess,
  searchComfortKitsFailure,
  newPageRequest,
  newPageSuccess,
  newPageFailure
} = comfortKitSlice.actions;

export default comfortKitSlice.reducer;
