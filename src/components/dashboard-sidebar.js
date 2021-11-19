import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Lock as LockIcon } from '../icons/lock';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { useSelector } from 'react-redux'
import { Logout } from '@mui/icons-material';

import { useDispatch } from 'react-redux'
import { signOut } from '../actions'

const items = [
  {
    href: '/',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Clientes'
  },
  {
    href: '/productos',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Productos'
  },
  {
    href: '/cuenta',
    icon: (<UserIcon fontSize="small" />),
    title: 'Cuenta'
  },
  {
    href: '/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
  {
    href: '/registrar',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Registrarse'
  },
  {
    href: '/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'LogOut'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const { JWTToken } = useSelector(state => state.JWTToken);

  useEffect(
    () => {

      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const dispatch = useDispatch();

  const Logout = (e) =>{
    e.preventDefault();
    return false
  }

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            ((JWTToken != undefined && item.title != 'Login' && item.title != 'Registrarse') || ((item.title == 'LogOut' && JWTToken != undefined) || ((item.title == 'Login' || item.title == 'Registrarse') && JWTToken == undefined) || item.title == 'Registrar')?<NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />:null)
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} /> 
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
