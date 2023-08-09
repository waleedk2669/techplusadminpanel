import { Typography, Grid } from '@mui/material'
import React from 'react'
import ComfortKitDataGrid from '../../components/dataTables/ComfortKitDataGrid'
const ComfortKits = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h3" xs={12} component="h2">
            Comfort Kits
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ComfortKitDataGrid />
      </Grid>
    </Grid>
  )
}

export default ComfortKits
