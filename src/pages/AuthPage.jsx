import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useNavigate } from 'react-router-dom';

// Add this import
// import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
const apiUrl=import.meta.env.VITE_API_URL;

const AuthPage = () => {
 

  return (
    
    <>hi</>
  );
};

export default AuthPage;