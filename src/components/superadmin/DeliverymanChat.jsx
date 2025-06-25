import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Paper, TextField, IconButton, Tabs, Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBox from './ChatBox';
import axios from 'axios';
import API_URL from '../../config';
import { useDispatch, useSelector } from 'react-redux'; 

const DeliverymanChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('deliveryman'); // Default to deliveryman
  const dispatch = useDispatch();
  // Get the current user's ID and role from localStorage
  const usertype_owner=useSelector((state) => state.user.user_type);
  console.log("ow",usertype_owner);
  
  const currentUserId = localStorage.getItem('userID') || '1'; // Default to 1 if not found
  const currentUserRole = localStorage.getItem('user_type') || '1'; // Default to 1 (superadmin) if not found
  console.log(selectedUser);
  
  useEffect(() => {
    // Fetch users based on selected type
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let response;
        
        if (userType === 'admin') {
          // Fetch admin users (type 2)
          response = await axios.get(`${API_URL}/api/v2/superadmin/user/2`);
        } else if (userType === 'deliveryman') {
          // Fetch deliverymen
          response = await axios.get(`${API_URL}/api/v2/superadmin/user/4`);
        }else if (userType === 'owner') {
          // Fetch deliverymen
          response = await axios.get(`${API_URL}/api/v2/superadmin/user/1`);
        } 
        else if (userType === 'customer') {
          // Fetch customer users (type 5)
          response = await axios.get(`${API_URL}/api/v2/superadmin/user/5`);
        }
        
        setUsers(response.data);
        setSelectedUser(null); // Reset selected user when changing types
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${userType}:`, error);
        setUsers([]);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userType]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setUserType(newValue);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const name = user.user_Name || user.name;
    
    const contact = user.mobile_Number || user.phone;
    
    return (
      (name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact?.includes(searchQuery))
    );
  });

  // Get user ID based on user type
  const getUserId = (user) => {

      return user.user_Code?.toString() || user.id?.toString();
    
  };

  // Get user role based on user type
  const getUserRole = () => {
    if (userType === 'admin') return '2';
    if (userType === 'deliveryman') return '4';
    if (userType === 'customer') return '5';
    return '3'; // Default
  };

  // Get user name based on user type
  const getUserName = (user) => {
    
      return user.user_Name || user.name || 'Unknown';
    
  };

  // Get user contact based on user type
  const getUserContact = (user) => {
    if (userType === 'deliveryman') {
      return user.contact || 'No contact';
    } else {
      return user.mobile_Number || user.phone || 'No contact';
    }
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 100px)', bgcolor: '#f0f2f5' }}>
      {/* Left side - Users list */}
      <Paper sx={{ width: 350, height: '100%', borderRadius: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, bgcolor: '#f0f2f5', borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Chats</Typography>
          
          {/* User type tabs */}
          <Tabs 
            value={userType} 
            onChange={handleTabChange} 
            variant="fullWidth" 
            sx={{ mb: 2 }}
          >
            <Tab value="admin" label="Admin" />
            <Tab value="deliveryman" label="Deliveryman" />
            {usertype_owner==1 ? <Tab value="customer" label="Customer" /> :<Tab value="owner" label="Owner" />}
            
          </Tabs>
          
          {/* Search box */}
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: '8px', p: 1 }}>
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
            <TextField 
              fullWidth 
              variant="standard" 
              placeholder={`Search ${userType}s`}
              InputProps={{ disableUnderline: true }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>
        
        {/* Users list */}
        <List sx={{ overflow: 'auto', flex: 1, bgcolor: 'white' }}>
          {loading ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Loading...</Typography>
            </Box>
          ) : filteredUsers.length === 0 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography>No {userType}s found</Typography>
            </Box>
          ) : (
            filteredUsers.map((user) => (
              <React.Fragment key={getUserId(user)}>
                <ListItem 
                  button 
                  onClick={() => setSelectedUser(user)}
                  selected={selectedUser && getUserId(selectedUser) === getUserId(user)}
                  sx={{ 
                    '&.Mui-selected': { bgcolor: '#ebebeb' },
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{getUserName(user).charAt(0) || userType.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={getUserName(user)}
                    secondary={getUserContact(user)}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
      
      {/* Right side - Chat area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        {selectedUser ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Chat header */}
            <Box sx={{ p: 2, bgcolor: '#f0f2f5', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', zIndex: 1 }}>
              <Avatar sx={{ mr: 2 }}>{getUserName(selectedUser).charAt(0) || userType.charAt(0).toUpperCase()}</Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {getUserName(selectedUser)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getUserContact(selectedUser)}
                </Typography>
              </Box>
            </Box>
            
            {/* Chat content - takes full height */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(100% - 72px)', bgcolor: '#e5ddd5' }}>
              <ChatBox 
                senderId={currentUserId} 
                receiverId={getUserId(selectedUser)} 
                senderRole={currentUserRole} 
                receiverRole={getUserRole()} 
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: '#e5ddd5' }}>
            <Typography variant="h6" color="text.secondary">Select a {userType} to start chatting</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DeliverymanChat;