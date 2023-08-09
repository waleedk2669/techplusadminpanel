// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  isEditFormOpen: false,
  loading: false,
  error: null,
  filteredRows: [], // New state property to manage the filtered rows
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    toggleEditForm: (state) => {
      state.isEditFormOpen = !state.isEditFormOpen;
    },
    setFilteredRows: (state, action) => {
      state.filteredRows = action.payload;
    },
    fetchProductsRequest: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredRows = action.payload; // Initialize filteredProducts with all products
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchProductsRequest: (state) => {
      state.loading = true;
    },
    searchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredRows = action.payload; // Update filteredProducts with search results
    },
    searchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    newPageRequest: (state) => {
      state.loading = true;
    },
    newPageSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredRows = action.payload; // Update filteredProducts with search results
    },
    newPageFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export const {
  setProducts,
  addProduct,
  editProduct,
  deleteProduct,
  setSelectedProduct,
  toggleEditForm,
  setFilteredRows,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  searchProductsRequest,
  searchProductsSuccess,
  searchProductsFailure,
  newPageRequest,
  newPageSuccess,
  newPageFailure
} = productSlice.actions;

export default productSlice.reducer;
