import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
} from '@mui/material';

const featuredPizzas = [
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'Fresh mozzarella, tomato, and basil.',
    image: '/images/margherita.jpg',
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'Spicy pepperoni slices on a classic crust.',
    image: '/images/pepperoni.jpg',
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken',
    description: 'Grilled chicken, BBQ sauce, onions, and cheese.',
    image: '/images/bbq-chicken.jpg',
  },
  {
    id: 'hawaiian',
    name: 'Hawaiian',
    description: 'Ham, pineapple, and melty mozzarella.',
    image: '/images/hawaiian.jpg',
  },
];

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [topPizzas, setTopPizzas] = useState([]);

  async function getdata() {
    try {
      const res = await axios.get('http://localhost:3000/getreviews');
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  }

  async function getTopPizzas() {
    try {
      const res = await axios.get('http://localhost:3000/top-pizzas');
      setTopPizzas(res.data);
    } catch (err) {
      console.error('Error fetching top pizzas:', err);
    }
  }

  useEffect(() => {
    getdata();
    getTopPizzas();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', pt: 4, pb: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 240, sm: 320, md: 440 },
            borderRadius: 2,
            overflow: 'hidden',
            mb: 6,
          }}
        >
          <CardMedia
            component="img"
            src="/images/pizza1.jpg"
            alt="Delicious pizza"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              color: 'common.white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              px: 2,
            }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to PizzaTime
            </Typography>
            <Typography variant="h6">
              Fresh, delicious, and made to order. Explore our menu and satisfy
              your cravings!
            </Typography>
          </Box>
        </Box>

        {/* Featured Pizzas */}
        <Typography variant="h4" gutterBottom>
          Our Favorites
        </Typography>
        <Grid container spacing={3} mb={6}>
          {featuredPizzas.map((pizza) => (
            <Grid item xs={12} sm={6} md={4} key={pizza.id}>
              <Card sx={{ borderRadius: 2, height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={pizza.image}
                  alt={pizza.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {pizza.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pizza.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Customer Reviews Section */}
        <Box mb={6}>
          <Typography variant="h4" gutterBottom>
            Customer Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography variant="body1">No reviews yet.</Typography>
          ) : (
            <Grid container spacing={3}>
              {reviews.map((review, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      borderRadius: 2,
                      height: '100%',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.n}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {review.r}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Top 3 Most Liked Pizzas Section */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Top 3 Most Liked Pizzas
          </Typography>
          {topPizzas.length === 0 ? (
            <Typography variant="body1">No pizzas yet.</Typography>
          ) : (
            <Grid container spacing={3}>
              {topPizzas.map((pizza) => (
                <Grid item xs={12} sm={6} md={4} key={pizza._id}>
                  <Card sx={{ borderRadius: 2, height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={pizza.image}
                      alt={pizza.name}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {pizza.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {pizza.description}
                      </Typography>
                      <Typography variant="body2" mt={1} color="text.primary">
                        Likes: {pizza.count}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}
