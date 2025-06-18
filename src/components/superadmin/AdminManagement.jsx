import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Tabs, Tab } from '@mui/material';
import axios from 'axios';
import  API_URL  from '../../config'; // Make sure you have this config file

const AdminManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v2/superadmin/get-all-user`);
      const users = response.data;
  
      const admins = [];
      const owners = [];
      const deliverymen = [];
      const customers = [];
  
      users.forEach(user => {
        const formattedUser = {
          id: user.user_ID,
          name: user.user_Name,
          email: user.email_ID,
          mobile: user.mobile_Number,
          alter_Mobile_number: user.alter_Mobile_number,
          created_Date: user.created_Date,
          isActive: user.active_Flag
        };
  
        switch (user.user_Type_ID) {
          case 2:
            admins.push(formattedUser);
            break;
          case 3:
            owners.push(formattedUser);
            break;
          case 4:
            deliverymen.push(formattedUser);
            break;
          case 5:
            customers.push(formattedUser);
            break;
          default:
            break;
        }
      });
  
      setAdmins(admins);
      setOwners(owners);
      setDeliverymen(deliverymen);
      setCustomers(customers);
  
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Separate states for each user type
  const [admins, setAdmins] = useState([]);
  const [owners, setOwners] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    mobile: '',
    usercode: '',
    companyName: '',
    alternativePhone: '',
    address: '',
    city: '',
    isActive: true
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getCurrentData = () => {
    switch(selectedTab) {
      case 0: return { data: owners, setData: setOwners, title: 'Owner' };
      case 1: return { data: admins, setData: setAdmins, title: 'Admin' };
   
      case 2: return { data: deliverymen, setData: setDeliverymen, title: 'Deliveryman' };
      case 3: return { data: customers, setData: setCustomers, title: 'Customer' };
      default: return { data: admins, setData: setAdmins, title: 'Admin' };
    }
  };

  const handleOpenDialog = () => {
    setNewUser({
      name: '',
      email: '',
      mobile: '',
      usercode: '',
      companyName: '',
      alternativePhone: '',
      address: '',
      city: '',
      isActive: true
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditMode(false);
  };

  const handleEdit = (item) => {
    setNewUser({
      ...newUser,
      name: item.name || '',
      email: item.email || '',
      mobile: item.mobile || '',
      alternativePhone: item.alter_Mobile_number || '',
      id: item.id // Keep track of which user we're editing
    });
    setIsEditMode(true);
    setOpenDialog(true);
  };
// Add handleUpdate function
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/v2/superadmin/update-user/${newUser.id}`, {
        user_Name: newUser.name,
        email_ID: newUser.email,
        mobile_Number: newUser.mobile,
        alter_Mobile_number: newUser.alternativePhone
      });

      if (response.data) {
        const { setData } = getCurrentData();
        setData(prev =>
          prev.map(item =>
            item.id === newUser.id
              ? {
                  ...item,
                  name: newUser.name,
                  email: newUser.email,
                  mobile: newUser.mobile,
                  alter_Mobile_number: newUser.alternativePhone
                }
              : item
          )
        );
        handleCloseDialog();
        fetchUsers(); // Refresh the data
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };
  const handleAdd = async () => {
    try {
      const { setData } = getCurrentData();
      let response;

      switch(selectedTab) {
        case 0: // Admin
        case 1: // Owner
          response = await axios.post(`${API_URL}/api/v2/superadmin/create-admin`, {
            ...newUser,
            role: selectedTab === 0 ? 2 : 3
          });
          break;
        
        case 2: // Deliveryman
          response = await axios.post(`${API_URL}/api/create/deliveryman`, {
            ...newUser
          });
          break;
        
        case 3: // Customer
          response = await axios.post(`${API_URL}/api/users`, {
            ...newUser,country: 'India', 
            area: 'Annamalai Nagar', state: 'tamilnadu', city: 'Trichy', street: 'Kumudham Salai', floorDoorNumber: '1 floor', door: 'NO 12', pincode: '620018', landmark: '620018',location:{latitude: '10.8278097', longitude: '78.6844134' }
          });
          break;
      }

      if (response && response.data) {
        setData(prev => [...prev, { ...response.data, id: response.data._id || Date.now() }]);
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // You might want to add error handling here (e.g., showing an error message)
    }
  };

  

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.put(`${API_URL}/api/v2/superadmin/update-user-status/${id}`, {
        isActive: !isActive
      });
      
      // Refresh the data after successful update
      const { setData } = getCurrentData();
      setData(prev =>
        prev.map(item =>
          item.id === id ? { ...item, isActive: !isActive } : item
        )
      );
      
      // Refresh the entire user list
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
  };

  const renderFormContent = () => {
    switch(selectedTab) {
      case 0: // Admin Form
      case 1: // Owner Form (same as Admin)
        return (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Username"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            
            <TextField
              fullWidth
              margin="dense"
              label="Mobile Number"
              value={newUser.mobile}
              onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </>
        );
        case 2: // Customer Form (same as Deliveryman)
        return (
          <>
            <TextField
              fullWidth
              margin="dense"
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Phone Number"
              value={newUser.mobile}
              onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Alternative Phone Number"
              value={newUser.alternativePhone}
              onChange={(e) => setNewUser({ ...newUser, alternativePhone: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            {isEditMode ?<></>:<>  <TextField
              fullWidth
              margin="dense"
              label="Address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="City"
              value={newUser.city}
              onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
            /> </>}
          
          </>
        );
      
      case 3: // Deliveryman Form
        return (
          <>
             <TextField
              fullWidth
              margin="dense"
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Phone Number"
              value={newUser.mobile}
              onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Alternative Phone Number"
              value={newUser.alternativePhone}
              onChange={(e) => setNewUser({ ...newUser, alternativePhone: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
           
          </>
        );
      
      default:
        return null;
    }
  };

  const { data, title } = getCurrentData();
  const totalLoggedIn=admins.length+owners.length+deliverymen.length+customers.length;
  return (
    <Box>
         <Typography variant="h5">Account Holders-({totalLoggedIn})</Typography> <br />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
           <Tab label={`Owner(${owners.length})`} />
          <Tab label={`Admin(${admins.length})`} />
           <Tab label={`DeliveryMen(${deliverymen.length})`} />
          <Tab label={`Customer(${customers.length})`} />
        </Tabs>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{title} Management</Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          Create {title}
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{title} Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>AlterNative Number</TableCell>
            <TableCell>Created_Date</TableCell>
            <TableCell>isActive</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name || "null"}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.mobile || "null"}</TableCell>
              <TableCell>{item.alter_Mobile_number || "null"}</TableCell>
              <TableCell>
  {item.created_Date
    ? new Date(item.created_Date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "null"}
</TableCell>

              <TableCell>
                <Checkbox
                  checked={item.isActive}
                  onChange={() => handleToggleActive(item.id,item.isActive)}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={()=>handleEdit(item)}>
                  <Edit />
                </IconButton>
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New {title}</DialogTitle>
        <DialogContent>
          {renderFormContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            CANCEL
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAdd}
            sx={{ bgcolor: '#00A1E0' }}
          >
           SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
     
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{isEditMode ? `Edit ${title}` : `Create New ${title}`}</DialogTitle>
      <DialogContent>
        {renderFormContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>
          CANCEL
        </Button>
        <Button 
          variant="contained" 
          onClick={isEditMode ? handleUpdate : handleAdd}
          sx={{ bgcolor: '#00A1E0' }}
        >
          {isEditMode ? 'UPDATE' : 'SUBMIT'}
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default AdminManagement;
