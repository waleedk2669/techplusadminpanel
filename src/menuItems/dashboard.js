// assets


// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'Recent Orders',
      title: 'Recent Orders',
      type: 'item',
      url: '/dashboard/recent-orders',
      icon: 32, //ICON Name
      breadcrumbs: false
    },
    {
      id: 'Medicines',
      title: 'Medicines',
      type: 'item',
      url: '/dashboard/medicines',
      icon: 32, //ICON Name
      breadcrumbs: false
    },
    {
      id: 'ComfortKits',
      title: 'Comfort Kits',
      type: 'item',
      url: '/dashboard/comfortKits',
      icon: 32, //ICON Name
      breadcrumbs: false
    },
    {
      id: 'Users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/users',
      icon: 32, //ICON Name
      breadcrumbs: false
    },

  ]
};

export default dashboard;
