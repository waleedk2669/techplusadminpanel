// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
  viewUser: null,
  roles: null,
  pageCount: null,
  currentPage: null,
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
    fetchUsersRequest: (state,action) => {
      state.loading = true;
      state.users = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data.data;
      console.log(action.payload.data.data);
      state.currentPage = action.payload.data.current_page;
      state.pageCount = action.payload.data.last_page;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewUsersRequest: (state,action) => {
      state.loading = true;
      state.viewUser = null;
    },
    viewUsersSuccess: (state, action) => {
      state.loading = false;
      state.viewUser = action.payload.data;
       // Initialize filteredUsers with all Users
    },
    viewUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeStatusRequest: (state,action) => {
      state.loading = true;
    },
    changeStatusSuccess: (state, action) => {
      state.loading = false;
       // Initialize filteredUsers with all Users
    },
    changeStatusFailure: (state, action) => {
      state.loading = false;
    },
    roleIdRequest: (state,action) => {
      state.loading = true;
      state.roles = null;
    },
    roleIdSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload
       // Initialize filteredUsers with all Users
    },
    roleIdFailure: (state, action) => {
      state.loading = false;
    },
    createUserRequest: (state,action) => {
      state.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
       // Initialize filteredUsers with all Users
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchUsersRequest: (state) => {
      state.loading = true;
    },
    searchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data.data;
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
  newPageFailure,
  viewUsersRequest,
  viewUsersSuccess,
  viewUsersFailure,
  changeStatusRequest,
  changeStatusSuccess,
  changeStatusFailure,
  roleIdFailure,
  roleIdSuccess,
  roleIdRequest,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
