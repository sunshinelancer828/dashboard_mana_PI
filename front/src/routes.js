import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './component/layouts/dashboard';
import LogoOnlyLayout from './component/layouts/LogoOnlyLayout';
//
import Login from './page/Login';
import Register from './page/Register';
import Upload from './page/Upload';
import Device from './page/Device';
import User from './page/User';
import NotFound from './page/Page404';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Navigate to="/dashboard/user" /> },
        { path: 'upload', element: <Upload /> },
        { path: 'device', element: <Device /> },
        { path: 'user', element: <User /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}