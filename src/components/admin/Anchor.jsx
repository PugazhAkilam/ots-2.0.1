import React, { useState, useRef,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Box, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Visibility, Delete, Edit, Print } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import API_URL from '../../config';
import Swal from 'sweetalert2';



const columns = (handleDelete, handleEdit) => [
  { field: "sno", headerName: 'S.No', width: 100 },
  { field: 'deliveryman_name', headerName: 'Name', width: 200, sortable: true },
  { field: 'contact', headerName: 'Phone Number', width: 200, sortable: true },
  { field: 'alternativeNumber', headerName: 'Alternative Number', width: 200, sortable: true },
  { field: 'email', headerName: 'Email', width: 250, sortable: true },
  { field: 'city', headerName: 'City', width: 150, sortable: true },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <div>
        <IconButton color="info" onClick={() => handleEdit(params.row)}>
          <Edit />
        </IconButton>
        <IconButton
          sx={{ color: "red" }}
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'You won’t be able to revert this!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(params.row.deliveryman_id);
                Swal.fire(
                  'Deleted!',
                  'The record has been deleted.',
                  'success'
                );
              }
            });
          }}
        >
          <Delete />
        </IconButton>
      </div>
    ),
    sortable: false,
  },
];
// Main Table Component
const Anchor = () => {
  const [rows, setRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [mapLocation, setMapLocation] = useState('');
  const componentRef = useRef();
  const navigate=useNavigate();
  const CompanyId = useSelector(state => state.user.company_Id);
  // Export as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
    XLSX.writeFile(workbook, 'customers.xlsx');
  };



 // Function to handle deleting a deliveryman (disabling them)
const handleDelete = async (id) => {
  try {
    await axios.put(`${API_URL}/api/deliveryman/disable/${id}`);  // Send request to disable deliveryman
    setRows((prevRows) => prevRows.filter((row) => row.deliveryman_id !== id));  // Remove from frontend
    toast.success('Deliveryman disabled successfully!');
  } catch (error) {
    //console.error('Error disabling deliveryman:', error);
    toast.error('Failed to disable deliveryman');
  }
};

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/deliveryman/${CompanyId}`);
            setRows(response.data); // Assuming response contains the services array
        } catch (error) {
          //  console.error('Error fetching services:', error);
        }
    };

    fetchServices();
},  []);
//console.log("rows",rows);
  // Handle edit row
  const handleEdit = (row) => {
    setSelectedRow(row);
    setName(row.deliveryman_name);   // Pre-fill name
    setPhoneNumber(row.contact); 
    setAlternativePhoneNumber(row.alternativeNumber)  ;
    setEmail(row.email) ;// Pre-fill phone number
    setAddress(row.address);            // Pre-fill address (assuming it's city)
    setCity(row.city);               // Pre-fill city
    setDialogOpen(true);             // Open dialog form for editing
    setIsEditing(true);              // Set editing mode to true
  };

  // Handle form submission
  const handleSaveAnchor = async() => {

    try {
      const deliverymanData = {
        user_Name: name,
        mobile_Number: phoneNumber,
        alternativeNumber: alternativePhoneNumber,
        email_ID: email,
        city: city,
        address:address,
        company_Id: CompanyId, // You can set this dynamically if required
        
      };
  
      if (isEditing && selectedRow) {
        // If editing, send a PUT or PATCH request to update the deliveryman
        await axios.put(`${API_URL}/api/deliveryman/edit/${selectedRow.deliveryman_id}`, deliverymanData);
        setRows((prevRows) => 
          prevRows.map((row) => 
            row.deliveryman_id === selectedRow.deliveryman_id ? { ...row, ...deliverymanData } : row
          )
        );
      } else {
        // If adding a new deliveryman, send a POST request to create a new entry
        const response = await axios.post(`${API_URL}/api/create/deliveryman`, deliverymanData);
         navigate("/");
       
      }
  
      // Close the dialog and reset form fields after saving
      setDialogOpen(false);
      setName('');
      setPhoneNumber('');
      setAlternativePhoneNumber('');
      setEmail('');
      setAddress('');
      setCity('');
      setIsEditing(false);
      setSelectedRow(null);
   
      toast.success("Deliveryman Added successfully..!")
    } catch (error) {
     // console.error('Error saving deliveryman:', error);
      // You can also show an alert or snackbar for error feedback
    }
  
   
  
  };
  const rowsWithSno = rows.map((row, index) => ({
    ...row,
    sno: index + 1 // Adds serial number starting from 1
  }));
  
  return (
   
      <Box sx={{ height: '100vh', width: '100%', p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {/* New User Button */}
          <Button
            variant="contained"
           
            style={{ marginBottom: '20px' }}
          
            onClick={() => {
              setDialogOpen(true);
              setIsEditing(false);
            }}
          >
           Add New Anchor
          </Button>
        
        </Box>

        {/* Table */}
        <div ref={componentRef}>
          <DataGrid
            rows={rowsWithSno}
            columns={columns(handleDelete, handleEdit)} // Pass handleDelete and handleEdit to columns
            disableSelectionOnClick
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20, 50]}
            sortingOrder={['asc', 'desc']}
            getRowId={(row) => row.deliveryman_id} // Avoids "id" issue if not available
           
          />
        </div>

        {/* New User Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{isEditing ? 'Edit User' : 'New User'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              label="Alternative Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={alternativePhoneNumber}
              onChange={(e) => setAlternativePhoneNumber(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          
            <TextField
              label="city"
              variant="outlined"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
           
          </DialogContent>
          <DialogActions>
            <Button onClick={() =>{ setDialogOpen(false)

setName('');
setPhoneNumber('');
setAlternativePhoneNumber('');
setEmail('');
setAddress('');
setCity('');
            }} color="waring">
              Cancel
            </Button>
            <Button onClick={handleSaveAnchor} color="info">
              Save Anchor
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
   
  );
};

export default Anchor;
