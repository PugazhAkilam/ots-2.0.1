import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, ListItemButton,Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme as useMuiTheme, useMediaQuery, Menu, MenuItem, Avatar, Switch } from '@mui/material';
import Footer from './Footer';
import MenuIcon from '@mui/icons-material/Menu';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import VisaIcon from '@mui/icons-material/DocumentScanner';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import  logo from '../assets/img/kirush.png';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';
import axios from 'axios';
//import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaUser, FaBox, FaCog, FaReceipt, FaServicestack, FaProcedures, FaList, FaUserSecret } from 'react-icons/fa';
import { FaVideo,FaUserShield, FaFilm, FaPlayCircle, FaFileVideo } from "react-icons/fa";

const drawerWidth = 240;
import TableChartIcon from '@mui/icons-material/TableChart';
import { useTheme } from '../theme/ThemeContext';
import { ClockIcon } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { FaPersonFalling, FaProductHunt } from 'react-icons/fa6';
import { logout } from '../features/userSlice';
const apiUrl=import.meta.env.VITE_API_URL;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
 const dispatch=useDispatch();
  const userType = useSelector(state => state.user.user_type);
  //alert(userType);
 // const { user, loading } = useAuth(); // Get loading state from useAuth

  const getMenuItems = () => {
    if (userType == 1) {
      return [
        { text: 'Dashboard', icon: <FaTachometerAlt />, path: '/superadmin' },
        { text: 'Flight', icon: <FlightIcon />, path: '/superadmin/flight' },
        { text: 'Hotel', icon: <HotelIcon />, path: '/superadmin/hotel' },
        { text: 'Travel', icon: <LuggageIcon />, path: '/superadmin/travel' },
        { text: 'Visa', icon: <VisaIcon />, path: '/superadmin/visa' },
        { text: 'Table', icon: <TableChartIcon />, path: '/admin/table' },
      ];
    } else if (userType == 2) {
      return [
        { text: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
        { text: 'LaundryReception', icon: <FaReceipt />, path: '/admin/laundryReception' },
        { text: 'Orders', icon: <FaShoppingCart />, path: '/admin/orderpage' },
        { text: 'Customers', icon: <FaUsers />, path: '/admin/customers' },
        { text: 'Anchor', icon: <FaUserSecret />, path: '/admin/anchor' },
        { text: 'Service', icon: <FaServicestack />, path: '/admin/service' },
        { text: 'Product', icon: <FaList />, path: '/admin/product' },
        { text: 'Profile', icon:<FaUser /> , path: '/admin/profilepage' }
      ];
    } else if (userType == 4) {
      return [
        { text: 'Dashboard', icon: <FaTachometerAlt />, path: '/anchor' },
        { text: 'Takeorder', icon: <FaReceipt />, path: '/anchor/anchorTakeorder' },
        { text: 'Myorder', icon: <FaServicestack />, path: '/anchor/pendingorder' },
         { text: 'profilepage', icon: <FaUser />, path: '/anchor/profilepage' },
      
      ];
    }
    return []; // Return empty array if no user type matches
  };

  const menuItems = getMenuItems();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    });
  
    // If user confirms
    if (result.isConfirmed) {
      // try {
      //   await fetch(`${apiUrl}/auth/logout`, {
      //     method: 'POST',
      //     credentials: 'include'
      //   });
        
      //   Swal.fire(
      //     'Logged Out!',
      //     'You have been successfully logged out.',
      //     'success'
      //   );
        
      //   navigate('/login');
      // } catch (err) {
      //   console.error('Logout error:', err);
      //   Swal.fire(
      //     'Error!',
      //     'Failed to logout. Please try again.',
      //     'error'
      //   );
      // }
      dispatch(logout());  // Dispatch the logout action from Redux
    navigate('/user'); 
    }
  };
  
  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1,bgcolor:isDarkMode ?"rgb(39, 39, 39)":"GrayText" }}>
        <img src={logo} alt="ZEAL Logo" style={{ width: 34, height: 33 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' ,color:"white"}}>
          ZEAL Travels
        </Typography>
      </Box>
    
<List
  sx={{ p: 0, m: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
>
  <Box sx={{ flexGrow: 1 }}>
    {menuItems.map((item) => (
      <ListItem key={item.text} disablePadding sx={{ mt: 0 }}>
        <ListItemButton
          onClick={() => {
            navigate(item.path);
            if (isMobile) setMobileOpen(false);
          }}
          selected={location.pathname === item.path}
          sx={{
            mt: 0,
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: '#fff',
              '& .MuiListItemIcon-root': {
                color: '#fff',
              },
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </Box>

  <Divider />

  {/* 🔻 Logout at the bottom */}
  <Box>
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          '&:hover': {
            backgroundColor: '#ff5252',
            color: '#fff',
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </ListItem>
  </Box>
</List>

    </Box>
  );

  return (
    <>
    
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
          
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {/* {!loading && user?.name ? user.name.toUpperCase() : "Loading..."} Dashboard - {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1)} */}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleTheme}
        size={30}
        sunColor="orange"
        moonColor="#42a5f5"
        
      />
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <Avatar sx={{ width: 32, height: 32 }} onClick={()=>navigate('/admin/profile')}>A</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '80vh',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
       
      </Box>
    </Box>
    <Box sx={{mt:5}}><Footer  />
      </Box> </>
  );
};

export default AdminLayout;