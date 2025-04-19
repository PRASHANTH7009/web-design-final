import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent
} from '@mui/material';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Admin Control Panel
      </Typography>

      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Welcome, Admin. You have full access to manage users, orders, and inventory.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Overview Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6" color="primary">Users</Typography>
              <Typography variant="h4">102</Typography>
              <Typography variant="body2">Total Registered</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#fce4ec' }}>
            <CardContent>
              <Typography variant="h6" color="secondary">Orders Today</Typography>
              <Typography variant="h4">15</Typography>
              <Typography variant="body2">Pending + Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6" color="success.main">Pizzas in Stock</Typography>
              <Typography variant="h4">12</Typography>
              <Typography variant="body2">Available Varieties</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#fff3e0' }}>
            <CardContent>
              <Typography variant="h6" color="warning.main">Weekly Revenue</Typography>
              <Typography variant="h4">$1,530</Typography>
              <Typography variant="body2">Last 7 Days</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ mt: 4, p: 4, borderRadius: 3, bgcolor: '#fafafa' }}>
        <Typography variant="h5" gutterBottom color="text.primary">
          Administrative Tasks
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Review new user signups and manage roles.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Track order trends and resolve delivery issues.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Monitor inventory and update pizza availability.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Access transaction logs and reports.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Send announcements or system-wide notifications.
        </Typography>
      </Paper>

      <Paper elevation={1} sx={{ mt: 3, p: 3, borderRadius: 2, bgcolor: '#f1f8e9' }}>
        <Typography variant="h6" gutterBottom color="success.dark">
          System Status
        </Typography>
        <Typography variant="body2">
          ✅ No alerts. All microservices and the database are functioning normally.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Dashboard;
