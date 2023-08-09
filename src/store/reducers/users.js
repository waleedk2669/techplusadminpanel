// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  selectedUser: null,
  isEditFormOpen: false,
  loading: false,
  error: null,
  filteredRows: [], // New state property to manage the filtered rows
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    toggleEditForm: (state) => {
      state.isEditFormOpen = !state.isEditFormOpen;
    },
    setFilteredRows: (state, action) => {
      state.filteredRows = action.payload;
    },
    fetchUsersRequest: (state,action) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data.data;
      console.log(action.payload.data.data);
      state.filteredRows = action.payload.data.data; // Initialize filteredUsers with all Users
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchUsersRequest: (state) => {
      state.loading = true;
    },
    searchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.filteredRows = action.payload; // Update filteredUsers with search results
    },
    searchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    newPageRequest: (state) => {
      state.loading = true;
    },
    newPageSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.filteredRows = action.payload; // Update filteredUsers with search results
    },
    newPageFailure: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  },
});

export const {
  setUsers,
  addUser,
  editUser,
  deleteUser,
  setSelectedUser,
  toggleEditForm,
  setFilteredRows,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  searchUsersRequest,
  searchUsersSuccess,
  searchUsersFailure,
  newPageRequest,
  newPageSuccess,
  newPageFailure
} = userSlice.actions;

export default userSlice.reducer;
