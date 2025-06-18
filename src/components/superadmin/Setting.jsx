// Setting.js
import React from 'react';
import {
  Box, Button, Card, CardContent, Container, Grid, TextField, Typography,
  Paper, Tabs, Tab, Alert, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@mui/material';
import useCompanySettings from '../../hooks/useCompanySettings';
import API_URL from '../../config';
import { Checkbox, FormControlLabel } from '@mui/material';

function Setting() {
  const {
    activeTab,
    handleTabChange,
    companyData,
    handleInputChange,
    logoPreview,
    handleLogoChange,
    frontPagePreview,
    handleFrontPageImageChange,
    handleSubmit,
    loading,
    message,
    menuAccessData,
    handleMenuAccessChange  // Add this line
  } = useCompanySettings();

  return (
  <Box >
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="MENU ACCESS" />
          <Tab label="COMPANY SETTINGS" />
        </Tabs>
      </Paper>

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Company Settings</Typography>
            {message.text && (
              <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Company Name" name="name" value={companyData.name} onChange={handleInputChange} margin="normal" required />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1">Company Logo</Typography>
                    <Button variant="outlined" component="label">UPLOAD LOGO
                      <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
                    </Button>
                    {(logoPreview || companyData.logo) && (
                      <Box mt={2}>
                        <img src={logoPreview || `${API_URL}/uploads/company/logo/${companyData.logo}`} alt="Logo Preview" style={{ maxWidth: 200 }} />
                      </Box>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1">Front Page Image</Typography>
                    <Button variant="outlined" component="label">UPLOAD IMAGE
                      <input type="file" hidden accept="image/*" onChange={handleFrontPageImageChange} />
                    </Button>
                    {(frontPagePreview || companyData.frontPageImage) && (
                      <Box mt={2}>
                        <img src={frontPagePreview || `${API_URL}/uploads/company/frontpage/${companyData.frontPageImage}`} alt="Front Page Preview" style={{ maxWidth: 300 }} />
                      </Box>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={4} label="Description" name="description" value={companyData.description} onChange={handleInputChange} margin="normal" />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Email" name="email" value={companyData.email} onChange={handleInputChange} type="email" margin="normal" />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Phone" name="phone" value={companyData.phone} onChange={handleInputChange} margin="normal" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="Address" name="address" value={companyData.address} onChange={handleInputChange} margin="normal" />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Website" name="website" value={companyData.website} onChange={handleInputChange} margin="normal" />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
                    SAVE COMPANY SETTINGS
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h5">Menu Access Rights</Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Menu</TableCell>
                    <TableCell>Submenu</TableCell>
                    <TableCell>List</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Anchor</TableCell>
                    <TableCell>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
  {menuAccessData.map(row => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.title}</TableCell>
      <TableCell>{row.menu}</TableCell>
      <TableCell>{row.submenu}</TableCell>
      <TableCell>{row.list}</TableCell>
      <TableCell>
        <Checkbox
          checked={row.admin}
          onChange={(e) => handleMenuAccessChange(row.id, 'admin', e.target.checked)}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={row.owner}
          onChange={(e) => handleMenuAccessChange(row.id, 'owner', e.target.checked)}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={row.anchor}
          onChange={(e) => handleMenuAccessChange(row.id, 'anchor', e.target.checked)}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={row.customer}
          onChange={(e) => handleMenuAccessChange(row.id, 'customer', e.target.checked)}
        />
      </TableCell>
    </TableRow>
  ))}
</TableBody>

              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Setting;
