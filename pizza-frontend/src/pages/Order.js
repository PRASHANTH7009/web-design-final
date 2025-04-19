// src/pages/Order.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Button,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Order() {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });


  // Load cart & compute total
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
    recalcTotal(stored);
  }, []);

  // Recalculate total and persist cart
  const recalcTotal = (newCart) => {
    const sum = newCart.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.price || 0),
      0
    );
    setTotal(sum);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Change quantity by delta (only if result ≥1)
  const changeQuantity = (id, delta) => {
    const updated = cart.map(item => {
      if (item._id !== id) return item;
      const newQty = item.quantity + delta;
      return { ...item, quantity: newQty < 1 ? 1 : newQty };
    });
    setCart(updated);
    recalcTotal(updated);
  };

  // Remove entire line
  const removeLine = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    recalcTotal(updated);
    setSnackbar({ open: true, message: 'Removed from cart', severity: 'warning' });
  };

  const placeOrder = async () => {
    // ... your existing API logic ...
    setSnackbar({ open: true, message: 'Order placed!', severity: 'success' });
    localStorage.removeItem('cart');
    setCart([]);
    setTotal(0);
  };

  const payNow = async () => {
    // ... your existing payment logic ...
  };

  const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Order Summary</Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty. <Button href="/menu">Browse Menu</Button></Typography>
      ) : (
        <>
          <List disablePadding>
            {cart.map(item => (
              <React.Fragment key={item._id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removeLine(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={
                        item.image.startsWith('/images')
                          ? item.image
                          : `http://localhost:5050${item.image}`
                      }
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price.toFixed(2)} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`}
                  />

                  {/* Quantity Controls */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {item.quantity > 1 && (
                      <IconButton size="small" onClick={() => changeQuantity(item._id, -1)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Typography>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => changeQuantity(item._id, +1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" color="success" onClick={placeOrder}>
                Place Order
              </Button>
              <Button variant="contained" color="primary" onClick={payNow}>
                Pay with Card
              </Button>
            </Stack>
          </Box>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
