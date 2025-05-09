import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  Grid,
  Card,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { QRCodeCanvas } from "qrcode.react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import API_URL from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const LaundryReception = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const[selectedUserPhoneNumber,setSelectedUserPhoneNumber]=useState();
  const [userError, setUserError] = useState(false);
  const [serviceType, setServiceType] = useState("DRY CLEAN");
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrData, setQrData] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const[customer,setCustmer]=useState([])
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const[service,setService]=useState([]);

  const navigate=useNavigate()

  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    if (!selectedUserId) {
      setUserError(true);
      return;
    }
    if (!selectedUserId || userError) {
      Swal.fire({
        icon: "error",
        title: "User Not Found",
        text: "Please select a valid user before placing the order.",
      });
      return;
    }
  
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  
    try {
      const response = await axios.post(`${API_URL}/api/orders`, {
        cartItems: selectedItems,
        totalPrice,
        addressId: 1,
        orderStatus_Id:4,
        userId: selectedUserId,
        totalquantity: totalQuantity,
        payment: paymentStatus,
        userPhoneNumber: selectedUserPhoneNumber, 
      });
      console.log(selectedItems);
      
  
      // Reset form fields
      setSelectedUser("");
      setSelectedUserId("");
      setSelectedUserPhoneNumber("");
      setUserError(false);
      setServiceType("DRY CLEAN");
      setSelectedItems([]);
      setTotalPrice(0);
      setQrData("");
      setPaymentStatus("Paid");
  
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order submited successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error placing order: ${error.response?.data?.error || "Unknown error"}`,
      });
    }
  };
  
  
  const userRef = useRef(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/customer`); 
        setCustmer(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const users = customer.map(user => ({
    label: `${user.user_Name} - Ph(${user.mobile_Number})`,
    id: user.user_Code,
    phoneNumber:user.mobile_Number
  }));
  
 useEffect(() => {
    userRef.current?.focus();
  }, []);

    // Fetch users from the API
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/serviceSubTypes`); 
          setService(response.data);  
         
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    const serviceItems = service.reduce((acc, service) => {
  const category = service.serv_Name || "Unknown"; // Ensure a valid key
  if (!acc[category]) acc[category] = [];
  acc[category].push({
    id: service.servSubType_Id,
    servSubType_Name: service.servSubType_Name,
    serv_Name:service.serv_Name,
    rate: service.rate || 0,
  });
  return acc;
}, {});

const handleUserChange = (event, newInputValue) => {
  const selectedUser = users.find(user => user.label === newInputValue);
  
  setSelectedUser(newInputValue); // Ensure selectedUser is updated
  setSelectedUserId(selectedUser ? selectedUser.id : ""); // Store user_ID
  setSelectedUserPhoneNumber(selectedUser ? selectedUser.phoneNumber : "");
  setUserError(!selectedUser && newInputValue !== "");
};


 const handleServiceChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleItemClick = (item) => {
    console.log("item",item);
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id, delta) => {
    setSelectedItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
    );
  };

 const handleDeleteItem = (id) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setTotalPrice(
      selectedItems.reduce((sum, item) => sum + item.rate * item.quantity, 0)
    );
  }, [selectedItems]);

  const generateQRCode = () => {
    setQrData(
      `User: ${selectedUser}, Service: ${serviceType}, Items: ${JSON.stringify(
        selectedItems
      )}, Total: ₹${totalPrice}`
    );
  };

  return (
    <Grid container spacing={2} padding={3}>
    
      <Grid item xs={6}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="h6">Select User</Typography>
          <Autocomplete 
  freeSolo
  options={users.map(user => user.label)} // Extract only labels for display
  value={selectedUser} // Bind value to state
  onInputChange={handleUserChange}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Username"
      fullWidth
      inputRef={userRef}
      error={userError}
      helperText={userError ? "User not found" : ""}
    />
  )}
/>

        </Card>
      </Grid>

      {/* Service Type Selection */}
      <Grid item xs={6}>
        <Card sx={{ padding: 2 }}>
          <Typography variant="h6">Service Type</Typography>
          <Select fullWidth value={serviceType} onChange={handleServiceChange} displayEmpty>
            {Object.keys(serviceItems).map((service,index) => (
              <MenuItem key={index} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </Card>
      </Grid>

      {/* Service Items */}
      {serviceType && serviceItems[serviceType] && (
  <Grid item xs={12}>
    <Card sx={{ padding: 2 }}>
      <Typography variant="h6">Select Items</Typography>
      <Grid container spacing={1}>
        {serviceItems[serviceType].map((item,index) => (
          <Grid item key={index}>
            <Button variant="outlined" onClick={() => handleItemClick(item)}>
              {item.servSubType_Name} - ₹{item.rate}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  </Grid>
)}

      {/* Order Summary Table */}
      {selectedItems.length > 0 && (
        <Grid item xs={12}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Typography variant="h6">Total Price: ₹{totalPrice}</Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "10px" }}>
  {/* Payment Status Radio Buttons */}
  <FormControl component="fieldset">
    <FormLabel component="legend">Payment Status</FormLabel>
    <RadioGroup
      row
      value={paymentStatus}
      onChange={(e) => setPaymentStatus(e.target.value)}
    >
      <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
      <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
    </RadioGroup>
  </FormControl>

  {/* Generate QR Code Button */}
  <Button variant="contained" color="secondary" onClick={generateQRCode}>
    Generate QR Code
  </Button>

  {/* Order Submit Button */}
  <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
    Submit Order
  </Button>
</div>
{/* QR Code Display */}
{qrData && (
        <Grid item xs={12}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">QR Code</Typography>
            <QRCodeCanvas sx={{textAlign:"center"}} value={qrData} size={150} />
          </Card>
        </Grid>
      )}
            <DataGrid
            rows={[...selectedItems]
                .sort((a, b) => b.id - a.id) // Sorting by ID in descending order
                .map((item) => ({
                  id: item.id,
                  name: item.servSubType_Name,
                  quantity: item.quantity,
                  rate:item.rate,
                  price: item.rate * item.quantity,
                  category_Name:item.serv_Name,

                }))}
              
              columns={[
                { field: "name", headerName: "Item", width: 150 },
                { field: "category_Name", headerName: "Category_Name", width: 150 },
                {
                  field: "quantity",
                  headerName: "Qty",
                  width: 130,
                  renderCell: (params) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => handleQuantityChange(params.row.id, -1)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{params.row.quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange(params.row.id, 1)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  ),
                },
                { field: "rate", headerName: "Rate", width: 100 },
                { field: "price", headerName: "Total Price", width: 100 },
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 100,
                  renderCell: (params) => (
                    <IconButton color="error" onClick={() => handleDeleteItem(params.row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  ),
                },
              ]}
              autoHeight
            />
           
          </Card>
        </Grid>
      )}

      
    </Grid>
  );
};

export default LaundryReception;
