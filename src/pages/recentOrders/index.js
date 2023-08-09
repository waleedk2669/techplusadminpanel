import { Typography, Grid } from '@mui/material'
import React from 'react'
import CustomDataGrid from '../../components/dataTables/CustomDataGrid'
const RecentOrders = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h3" xs={12} component="h2">
            Recent orders
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomDataGrid />
      </Grid>
    </Grid>
  )
}

export default RecentOrders
