import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Tabs,
  Tab,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import GavelIcon from '@mui/icons-material/Gavel';
import FeedbackIcon from '@mui/icons-material/Feedback';

const sampleCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    feedback: 'App works well but delivery was late',
    hasDispute: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Blacklisted',
    feedback: 'Support team not responsive',
    hasDispute: false,
  },
  {
    id: 3,
    name: 'Ravi Kumar',
    email: 'ravi@sample.com',
    status: 'Active',
    feedback: 'Great service!',
    hasDispute: false,
  },
];

const CustomerOverview = () => {
  const [tab, setTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState('');

  const handleOpenFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setDialogOpen(true);
  };

  const handleClose = () => setDialogOpen(false);

  const renderStatusChip = (status) => (
    <Chip label={status} color={status === 'Blacklisted' ? 'error' : 'success'} />
  );

  return (
    <Card sx={{ m: 3, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        👥 Customer Overview
      </Typography>

      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 2 }}>
        <Tab label="All Customers" />
        <Tab label="Disputes & Complaints" />
      </Tabs>

      <Box>
        {tab === 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{renderStatusChip(customer.status)}</TableCell>
                  <TableCell>
                    <IconButton color="error" title="Blacklist">
                      <BlockIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      title="View Feedback"
                      onClick={() => handleOpenFeedback(customer.feedback)}
                    >
                      <FeedbackIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {tab === 1 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Dispute</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleCustomers
                .filter((c) => c.hasDispute)
                .map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.feedback}</TableCell>
                    <TableCell>
                      <IconButton color="secondary" title="Resolve Dispute">
                        <GavelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Customer Feedback</DialogTitle>
        <DialogContent>
          <Typography>{selectedFeedback}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CustomerOverview;
