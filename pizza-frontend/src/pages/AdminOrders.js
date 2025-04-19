import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  CircularProgress,
  Alert
} from '@mui/material';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    // 🔒 Redirect if not admin
    if (userType !== 'admin') {
      alert('Access denied. Admins only.');
      navigate('/');
      return;
    }

    // 🔄 Fetch orders
    fetch('http://localhost:5050/api/orders/all', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
    }
    })
      .then(res => res.json())
      .then(data => {
        console.log('📦 Orders from backend:', data);
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('❌ Unexpected response:', data);
          alert(data.error || 'Unexpected response from server');
        }
      })
      .catch(err => {
        console.error('❌ Error fetching orders:', err);
        alert('Could not load orders.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#d84315' }}>
        📋 All Orders (Admin View)
      </Typography>

      {loading ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading orders...
          </Typography>
        </Paper>
      ) : orders.length === 0 ? (
        <Alert severity="info">No orders found.</Alert>
      ) : (
        <Paper elevation={3} sx={{ mt: 3, borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#424242' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>User Email</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Items</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Ordered At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>{order.user?.email || 'Unknown'}</TableCell>
                    <TableCell>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.pizzaId?.name || 'Pizza'} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}

export default AdminOrders;