import { Typography, Grid } from '@mui/material'
import React from 'react'
import UserDataGrid from '../../components/dataTables/UserDataGrid'
const Users = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h3" xs={12} component="h2">
            Users
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UserDataGrid />
      </Grid>
    </Grid>
  )
}

export default Users
