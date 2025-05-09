import React, { useState,useEffect } from 'react';
import { 
  Box, Table,  TableBody, TableCell, TableContainer,  TableHead,  TableRow,  Checkbox,  Button, Typography, Tabs, Tab, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete ,List,ListItem, ListItemText,
  Select, MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Grid , Badge, Popover} from '@mui/material';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import API_URL from '../../config';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(1);
  const [assignedAnchors, setAssignedAnchors] = useState({});
 const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [deliveryman,setDeliveryman]=useState([]);
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('offline');
  const [anchorEl, setAnchorEl] = useState(null);
 
  const CompanyId = useSelector(state => state.user.company_Id);
  const handleStatusChange = (event, newValue) => {
    setFilteredStatus(newValue);
  };
  useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/deliveryman/${CompanyId}`);
            setDeliveryman(response.data); // Assuming response contains the services array
        } catch (error) {
           // console.error('Error fetching services:', error);
        }
    };

    fetchServices();
}, []);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/admin/all-order-details`); // Replace with your API URL
          setOrders(response.data.data);
       
          
        } catch (error) {
        //  console.error('Error fetching orders:', error);
        }
      };
  
      fetchOrders();
    },  []);
    

    const handleGetReadyDrop = async (orderId,mobile_Number) => {
    
      try {
          const response = await axios.put(`${API_URL}/api/orders/${orderId}/ready-to-drop`,{mobile_Number});
          toast.info(response.data.message);
         
         
         
      } catch (error) {
         // console.error('Error updating order to Ready to Drop', error);
      }
  };
  
  const handleSetCompleted = async (orderId) => {
      try {
          const response = await axios.put(`${API_URL}/api/orders/${orderId}/completed`);
          toast.info(response.data.message);
          //navigate("/")
         
          // Optionally refresh the orders list or update UI
      } catch (error) {
         // console.error('Error updating order to Completed', error);
      }
  };
    const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
 const handleOrderClick = async (orderId) => {
    setSelectedOrder(orderId);
    setOpen(true);

    try {
      const response = await axios.get(`${API_URL}/api/order-details/${orderId}`);
      const { order, products } = response.data.data;
      setOrderData(order);
      setProducts(products);
    } catch (error) {
     // console.error('Error fetching order details:', error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setOrderData(null);
    setProducts([])
  };

  const handleSendTaskToAnchor = async (orderId,status_Name) => {
    const selectedAnchors = assignedAnchors[orderId]; // Get the assigned deliverymen for this order
    if (selectedAnchors && selectedAnchors.length > 0) {
      const deliverymanIds = selectedAnchors.map(anchor => anchor.deliveryman_id); // Extract deliveryman IDs
  
      try {
        const response = await axios.post(`${API_URL}/api/assign-deliveryman`, {

          orderId,
          status_Name,
          deliverymanIds
        });
  
       // triggerRefresh(); // Trigger the re-render of the Anchor component
        toast.info('Task assigned successfully:', response.data);
        setAssignedAnchors({})
      
        // Optionally handle success response, show a message, update UI, etc.
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'An error occurred while assigning the task to the deliveryman.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      
      }
    } else {
   
    }
  };


  const filteredOrders = orders.filter(order => 
    (filteredStatus === 'All' || order.status_Name === filteredStatus) &&
    (order.user_Name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     order.email_Id.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (order.payment?.toLowerCase()?.includes(searchQuery.toLowerCase()))) &&
     (!startDate || !endDate || (new Date(order.order_date) >= new Date(startDate) && new Date(order.order_date) <= new Date(endDate)))
 
  );
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'rgba(245, 113, 0, 1)';
      case 'Ready to Pick':
        return 'rgba(1, 135, 117, 1)';
      case 'Pick':
        return 'rgba(255, 0, 189, 1)';
      case 'Drop':
        return 'rgba(0, 157, 255, 1)';
      case 'Completed':
        return 'rgba(33, 176, 47, 1)';
        case 'Ready to Drop':
            return 'rgba(0, 13, 255, 1)';
      default:
        return 'red';
    }
  };
  

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);


const handleEditClick = (orderId, payment) => {
  setSelectedOrderId(orderId);
  setSelectedPayment(payment);
  setEditOpen(true);
};

const handleEditClose = () => {
  setEditOpen(false);
  setSelectedOrderId(null);
  setSelectedPayment('');
};

const handlePaymentChange = (event) => {
  setSelectedPayment(event.target.value);
};


const handleSubmit = async () => {
  try {
    const response = await axios.put(`${API_URL}/api/orders/updatePayment`, {
      orderId: selectedOrderId,
      paymentStatus: selectedPayment,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

   
    if (response.status === 200||response.status===201) {
     // alert(`Order ID: ${selectedOrderId} payment status updated to: ${selectedPayment}`);
    } else {
      alert(`Failed to update payment status: ${response.data.error}`);
    }

    handleEditClose();
    
  } catch (error) {
    //console.error('Error updating payment status:', error);
    alert('An error occurred while updating payment status.');
  }
};
useEffect(() => {
  if (editOpen) {
      setSelectedPayment("offline");
  }
}, [editOpen]);
  return (
    <Box p={3} >
      {/* <Typography variant="h5" gutterBottom>Order List</Typography> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom sx={{marginTop:"6px"}}>
        Order List
      </Typography>
    </div>
      {/* Filter tabs */}
      <Tabs value={filteredStatus} onChange={handleStatusChange}>
        <Tab label={`All (${orders.length})`} value="All" />
        <Tab label={`Ready to Drop (${orders.filter(order => order.status_Name === 'Ready to Drop').length})`} value="Ready to Drop" />
        <Tab label={`Drop (${orders.filter(order => order.status_Name === 'Drop').length})`} value="Drop" />
        <Tab label={`Complete (${orders.filter(order => order.status_Name === 'Completed').length})`} value="Completed" />
      </Tabs>
      <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
        <TextField 
          label="Start date" 
          type="date" 
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <TextField 
          label="End date" 
          type="date" 
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={handleEndDateChange}
        />
        </Box>
        
        <TextField
          label="Search Name or Email..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #Id</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>PaymentStatus</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Send Task To Anchor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.order_id}>
            
                <TableCell>
                  <Button onClick={() => handleOrderClick(order.order_id)}>{`#${order.order_id}`}</Button>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography>{order.user_Name}</Typography>
                  </Box>
                  <Typography variant="caption" >UserID# <b>{order.user_Code}</b></Typography>
                </TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>
                {/* {order.payment}{" "} */}
  {
    order.payment === "Pending"
      ? "COD" // Display "COD" for offline payments
    
      : order.payment === "Paid"
      ? "Paid"   
      : "COD"    // Default to "COD" if no specific match is found
  }
  <IconButton onClick={() => handleEditClick(order.order_id, order.payment)}>
    <EditIcon color='primary' />
  </IconButton>
</TableCell>
                <TableCell>{order.total_item}</TableCell>
                <TableCell>₹{order.total_price}</TableCell>
                <TableCell>
                  <Typography style={{ color: getStatusColor(order.status_Name) ,fontSize:"larger",fontWeight:"bold"}}>{order.status_Name}</Typography>
                </TableCell>
              
                <TableCell>
  {order.status_Name === 'Ready to Drop' ? (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleGetReadyDrop(order.order_id,order.mobile_Number)}
    >
      Send Message to Customer
    </Button>
  ) : order.status_Name === 'Drop' ? (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleSetCompleted(order.order_id)}
    >
      Set Completed
    </Button>
  ) : (
    <Button 
    variant="contained" 
    color="primary" 
    onClick={() => handleSendTaskToAnchor(order.order_id,order.status_Name)}
    disabled={
      order.status_Name === 'Completed' || 
      order.status_Name === 'User Cancelled' || 
      (assignedAnchors[order.order_id] || []).length === 0
    }
  >
    Send Task
  </Button>
  )}
</TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>Order ID: {selectedOrderId}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Select Payment Status:</Typography>
                <Select
                placeholder='gf'
                    value={selectedPayment} // Bound to selectedPayment state
                    onChange={handlePaymentChange}
                    fullWidth
                >
                    <MenuItem value="offline">COD</MenuItem>
                    <MenuItem value="paid">PAID</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
      {/* Dialog Box for Order Details */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {orderData && products ? (
            <Grid container spacing={2}>
              {/* Product List Card */}
              <Grid item xs={12} >
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h6" gutterBottom>Products</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 300, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="products-table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.category_name}</TableCell>
                <TableCell>₹{product.rate}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>₹{product.total_price}</TableCell>
              </TableRow>
            ))}
            {/* Optional Total Price Row */}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="subtitle1" component="div"><strong>Total Price:</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" component="div"><strong>₹{orderData.total_price}</strong></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
</Grid>
              <Grid item xs={12}  sm={6}>
     
      </Grid>
             
              <Grid item xs={12} sm={6}>
    
      </Grid>
            </Grid>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderList;
