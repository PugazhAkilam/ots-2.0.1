import React, { useState } from 'react';
import { Box,Card,CardContent,Typography,Tabs,Tab,TextField,Button,Grid,List,ListItem,ListItemText,IconButton,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BugReportIcon from '@mui/icons-material/BugReport';

const CommunicationSupport = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [notification, setNotification] = useState('');
  const [target, setTarget] = useState('Admin');

  const complaints = [
    {
      id: 1,
      user: 'John Doe',
      issue: 'Order delayed by 2 days',
      status: 'Escalated',
    },
    {
      id: 2,
      user: 'Jane Smith',
      issue: 'Payment issue not resolved',
      status: 'Pending',
    },
  ];

  const tickets = [
    { id: 101, user: 'Ravi Kumar', topic: 'Account locked', status: 'Open' },
    { id: 102, user: 'Arun Mehta', topic: 'Refund not received', status: 'Resolved' },
  ];

  const handleSendNotification = () => {
    if (notification.trim()) {
      alert(`✅ Notification sent to ${target}: ${notification}`);
      setNotification('');
    }
  };

  return (
    <Card sx={{ m: 3, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        💬 Communication & Support
      </Typography>

      <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} sx={{ mb: 2 }}>
        <Tab label="Send Notifications" />
        <Tab label="Escalated Complaints" />
        <Tab label="Support Tickets" />
      </Tabs>

      {tabIndex === 0 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Send notification to:
          </Typography>
          <Button
            variant={target === 'Admin' ? 'contained' : 'outlined'}
            onClick={() => setTarget('Admin')}
            sx={{ mr: 1 }}
          >
            Admins
          </Button>
          <Button
            variant={target === 'Customer' ? 'contained' : 'outlined'}
            onClick={() => setTarget('Customer')}
          >
            Customers
          </Button>

          <TextField
            label="Enter your message"
            fullWidth
            multiline
            minRows={3}
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendNotification}
          >
            Send Notification
          </Button>
        </Box>
      )}

      {tabIndex === 1 && (
        <List>
          {complaints.map((c) => (
            <ListItem
              key={c.id}
              secondaryAction={
                <IconButton edge="end" title="Resolve">
                  <CheckCircleIcon color="success" />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${c.user}: ${c.issue}`}
                secondary={
                  <Chip
                    label={c.status}
                    color={c.status === 'Escalated' ? 'error' : 'warning'}
                    size="small"
                  />
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {tabIndex === 2 && (
        <Grid container spacing={2}>
          {tickets.map((ticket) => (
            <Grid item xs={12} md={6} key={ticket.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1">
                    🎟️ Ticket #{ticket.id}
                  </Typography>
                  <Typography>
                    <strong>User:</strong> {ticket.user}
                  </Typography>
                  <Typography>
                    <strong>Topic:</strong> {ticket.topic}
                  </Typography>
                  <Chip
                    label={ticket.status}
                    color={ticket.status === 'Open' ? 'primary' : 'success'}
                    size="small"
                    sx={{ mt: 1 }}
                    icon={
                      ticket.status === 'Open' ? (
                        <ChatBubbleOutlineIcon fontSize="small" />
                      ) : (
                        <BugReportIcon fontSize="small" />
                      )
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Card>
  );
};

export default CommunicationSupport;
