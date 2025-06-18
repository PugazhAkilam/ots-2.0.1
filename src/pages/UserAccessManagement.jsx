import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const UserAccessManagement = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>👥 User & Access Management</Typography>

      {/* Roles Info */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Multi-User Support</Typography>
          <Typography variant="body2">
            Roles: <strong>Admin</strong>, <strong>Editor</strong>, <strong>Viewer</strong><br />
            Admins can manage everything. Editors can create/edit forms. Viewers have read-only access.
          </Typography>
        </CardContent>
      </Card>

      {/* Invite Collaborator */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Invite Collaborator</Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField label="Email Address" size="small" />
            <Select size="small" defaultValue="Editor">
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
            <Button variant="contained" color="primary">Send Invite</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Permissions Table */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Permission Control</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Can Edit</TableCell>
                <TableCell>Can View</TableCell>
                <TableCell>Can Manage Users</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>alice@example.com</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>✅</TableCell>
                <TableCell>✅</TableCell>
                <TableCell>✅</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>bob@example.com</TableCell>
                <TableCell>Editor</TableCell>
                <TableCell>✅</TableCell>
                <TableCell>✅</TableCell>
                <TableCell>❌</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>carol@example.com</TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell>❌</TableCell>
                <TableCell>✅</TableCell>
                <TableCell>❌</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Activity Logs */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>User Activity Logs</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Alice created a form 'Customer Feedback'" secondary="May 28, 2025 - 10:02 AM" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Bob edited 'Event Registration'" secondary="May 27, 2025 - 3:45 PM" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Carol viewed 'Survey Form'" secondary="May 27, 2025 - 2:30 PM" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserAccessManagement;
