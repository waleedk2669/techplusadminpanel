import { Typography, Grid } from '@mui/material'
import React from 'react'
import MedicineDataGrid from '../../components/dataTables/MedicineDataGrid'
const Medicines = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h3" xs={12} component="h2">
            Medicines
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MedicineDataGrid />
      </Grid>
    </Grid>
  )
}

export default Medicines
