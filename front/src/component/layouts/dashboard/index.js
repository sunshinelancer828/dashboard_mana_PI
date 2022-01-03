import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { logoutHandler } from '../../../action/authAction';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch(logoutHandler());
  }

  return isAuth ? (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} user={user} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} user={user} />
      <MainStyle>
        <Outlet user={user} />
      </MainStyle>
    </RootStyle>
  ) : (
    <Navigate to="/" />
  )
}
