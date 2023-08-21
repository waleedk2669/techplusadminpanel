import { Grid } from '@mui/material'
import React from 'react'
import LabTabs from '../../components/LabTabs'
import NewOrders from './NewOrders'
import FilledOrders from './FilledOrders'
import DispatchedOrders from './DispatchedOrders'
import DeliveredOrders from './DeliveredOrders'
import IncompleteOrders from './IncompleteOrders'

const RecentOrders = () => {
  const tabComponents = [
    {
      value: 5,
      component: <IncompleteOrders />,
    },
    {
      value: 1,
      component: <NewOrders />,
    },
    {
      value: 2,
      component: <FilledOrders />,
    },
    {
      value: 3,
      component: <DispatchedOrders />,
    },
    {
      value: 4,
      component: <DeliveredOrders />,
    },
    
  ];
  const tabHeaders = [
    {
      label: 'Incomplete orders',
      value: 5,
    },
    {
      label: 'New orders',
      value: 1,
    },
    {
      label: 'Filled orders',
      value: 2,
    },
    {
      label: 'Dispatched orders',
      value: 3,
    },
    {
      label: 'Delivered orders',
      value: 4,
    },
    
  ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <LabTabs tabComponents={tabComponents} tabHeaders={tabHeaders} />
      </Grid>
    </Grid>
  )
}

export default RecentOrders
