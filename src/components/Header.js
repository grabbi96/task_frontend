import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../providers/AuthProvider';
const pages = [
  {
    label: 'Sign up',
    link: 'signup',
  },
  {
    label: 'Log in',
    link: 'login',
  },
];
export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    alert,
    removeAlert,
    profileHandler,
    userLoading,
    userInfo,
    logoutHandler,
  } = useAuthContext();
  const router = useNavigate();

  React.useEffect(() => {
    profileHandler();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(userInfo);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snackbar
        open={alert.isOpen}
        autoHideDuration={6000}
        onClose={removeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={removeAlert}
          severity={alert.type}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {!userLoading && userInfo?.name && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => router('/profile')}>Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          )}

          {!userLoading && !userInfo?.name && (
            <div style={{ display: 'flex' }}>
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={() => {}}>
                  <Link to={page.link} style={{ color: '#fff' }}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
