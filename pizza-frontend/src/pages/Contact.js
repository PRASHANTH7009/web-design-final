// src/pages/Contact.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  name:   yup.string().required('Name is required'),
  email:  yup.string().email('Enter a valid email').required('Email is required'),
  message:yup.string().min(10, 'Minimum 10 characters').max(500, 'Max 500 characters').required('Message is required'),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [snack, setSnack] = React.useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:5050/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSnack({ open: true, severity: 'success', message: 'Message sent!' });
      reset();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, severity: 'error', message: 'Failed to send. Try again.' });
    }
  };

  const charCount = watch('message', '').length;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'grid', gap: 2 }}
      >
        <TextField
          label="Name"
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Message"
          multiline
          rows={4}
          fullWidth
          {...register('message')}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        {/* Live character counter */}
        <Typography
          variant="caption"
          color={charCount > 500 ? 'error' : 'text.secondary'}
          sx={{ textAlign: 'right' }}
        >
          {charCount}/500
        </Typography>

        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Sending…' : 'Send'}
        </Button>
      </Box>

      {/* Embedded Google Map */}
      <Box sx={{ mt: 4, borderRadius: 2, overflow: 'hidden' }}>
        <iframe
          title="PizzaTime Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0868132644643!2d-122.41941508468168!3d37.77492927975917!2m3!1f0!2f0!3f0!3m2!
            1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814d5e5a0d5b%3A0x0!2zMzfCsDQ2JzI5LjciTiAxMjLCsDI1JzAzLjciVw!5e0!3m2!
            1sen!2sus!4v1600000000000!5m2!1sen!2sus"
          width="100%"
          height="240"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          severity={snack.severity}
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
