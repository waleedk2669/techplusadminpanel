// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comfortKits: [],
  selectedComfortKit: null,
  isEditFormOpen: false,
  loading: false,
  error: null,
  filteredRows: [], // New state property to manage the filtered rows
};

const comfortKitSlice = createSlice({
  name: 'comfortKits',
  initialState,
  reducers: {
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
    fetchComfortKitsRequest: (state) => {
      state.loading = true;
    },
    fetchComfortKitsSuccess: (state, action) => {
      state.loading = false;
      state.comfortKits = action.payload;
      state.filteredRows = action.payload; // Initialize filteredComfortKits with all ComfortKits
    },
    fetchComfortKitsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchComfortKitsRequest: (state) => {
      state.loading = true;
    },
    searchComfortKitsSuccess: (state, action) => {
      state.loading = false;
      state.comfortKits = action.payload;
      state.filteredRows = action.payload; // Update filteredComfortKits with search results
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
  searchComfortKitsRequest,
  searchComfortKitsSuccess,
  searchComfortKitsFailure,
  newPageRequest,
  newPageSuccess,
  newPageFailure
} = comfortKitSlice.actions;

export default comfortKitSlice.reducer;
