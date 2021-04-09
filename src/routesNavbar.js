import React from 'react';
import LoginPage from '@pages/Login';

const routes = [
  // {
  //   path: '/',
  //   children: [
  //     {
  //       path: '/dashboard/deposit-normal',
  //       name: 'Lãi suất huy động thông thường',
  //       element: <DepositRateNormalPage path="/dashboard/deposit-normal" />
  //     },
  //   ]
  // },
  {
    path: '/auth',
    children: [
      { path: 'login', element: <LoginPage /> },
    ]
  }
];

export default routes;