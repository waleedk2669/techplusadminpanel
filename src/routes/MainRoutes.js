import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/mainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/index.js')));
const RecentOrders = Loadable(lazy(() => import('../pages/recentOrders/index.js')));
const CreateOrder = Loadable(lazy(() => import('../pages/recentOrders/createOrder.js')));
const EditOrder = Loadable(lazy(() => import('../pages/recentOrders/editOrder.js')));
const ViewOrder = Loadable(lazy(() => import('../pages/recentOrders/viewOrder.js')));

const Medicines = Loadable(lazy(() => import('../pages/medicines/index.js')));
const CreateMedicine = Loadable(lazy(() => import('../pages/medicines/CreateMedicine.js')));
const EditMedicine = Loadable(lazy(() => import('../pages/medicines/EditMedicine.js')));
const ViewMedicine = Loadable(lazy(() => import('../pages/medicines/ViewMedicine.js')));

const ComfortKits = Loadable(lazy(() => import('../pages/comfortKits/index.js')));
const CreateComfortKit = Loadable(lazy(() => import('../pages/comfortKits/CreateComfortKit.js')));
const EditComfortKit = Loadable(lazy(() => import('../pages/comfortKits/EditComfortKit.js')));
const ViewComfortKit = Loadable(lazy(() => import('../pages/comfortKits/ViewComfortKit.js')));

const Users = Loadable(lazy(() => import('../pages/users/index.js')));
const PrivateRoute = Loadable(lazy(() => import('../components/PrivateRoute')));
const CreateUser = Loadable(lazy(() => import('../pages/users/CreateUser.js')));
const ViewUser = Loadable(lazy(() => import('../pages/users/ViewUser.js')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/dashboard',
  element: <PrivateRoute component={<MainLayout />}/>,
  children: [
    {
      index: true,
      element: <DashboardDefault />
    },
    {
      path: 'comfortKits',
      element: <ComfortKits />
    },
    {
      path: 'comfortKits/create',
      element: <CreateComfortKit />
    },
    {
      path: 'comfortKits/edit',
      element: <EditComfortKit />
    },
    {
      path: 'comfortKits/view',
      element: <ViewComfortKit />
    },
    {
      path: 'medicines',
      element: <Medicines />
    },
    {
      path: 'medicines/create',
      element: <CreateMedicine />
    },
    {
      path: 'medicines/edit',
      element: <EditMedicine />
    },
    {
      path: 'medicines/view',
      element: <ViewMedicine />
    },
    {
      path: 'recent-orders',
      element: <RecentOrders />
    },
    {
      path: 'recent-orders/create',
      element: <CreateOrder />
    },
    {
      path: 'recent-orders/edit',
      element: <EditOrder />
    },
    {
      path: 'recent-orders/view',
      element: <ViewOrder />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'users/create',
      element: <CreateUser />
    },
    {
      path: 'users/view',
      element: <ViewUser />
    },
    
  ]
};

export default MainRoutes;
