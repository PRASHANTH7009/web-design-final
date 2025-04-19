import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Pagination,
  Alert
} from '@mui/material';
import Likebutton from './Likebutton'; // Make sure the Likebutton is imported

const localPizzas = [
  { _id: 'local-1', name: 'Margherita', description: 'Mozzarella, tomato, basil.', price: 9.99, image: '/images/margherita.jpg', category: 'Classics' },
  { _id: 'local-2', name: 'Pepperoni', description: 'Spicy pepperoni slices.', price: 11.49, image: '/images/pepperoni.jpg', category: 'Classics' },
  { _id: 'local-3', name: 'BBQ Chicken', description: 'Sweet BBQ sauce & grilled chicken.', price: 12.99, image: '/images/bbq-chicken.jpg', category: 'Meat Lovers' },
  { _id: 'local-4', name: 'Veggie', description: 'Bell peppers, olives, onions, mushrooms.', price: 10.99, image: '/images/veggie.jpg', category: 'Veggie & Vegan' },
  { _id: 'local-5', name: 'Hawaiian', description: 'Ham & pineapple on cheese.', price: 11.99, image: '/images/hawaiian.jpg', category: 'Specials & Seasonal' },
  { _id: 'local-6', name: 'Meat Lovers', description: 'Sausage, bacon, pepperoni, beef.', price: 13.49, image: '/images/meatlovers.jpg', category: 'Meat Lovers' },
  { _id: 'local-7', name: 'Four Cheese', description: 'Blend of mozzarella, cheddar, parmesan, and gorgonzola.', price: 12.49, image: '/images/5-1.jpg', category: 'Classics' },
  { _id: 'local-8', name: 'Meat Lovers Special', description: 'Combination of sausage, bacon, pepperoni, and beef.', price: 13.49, image: '/images/6.jpg', category: 'Meat Lovers' },
  { _id: 'local-9', name: 'BBQ Chicken Deluxe', description: 'Sweet BBQ sauce and grilled chicken.', price: 12.99, image: '/images/7.jpg', category: 'Meat Lovers' },
  { _id: 'local-10', name: 'Sausage & Bacon Feast', description: 'Sausage and crispy bacon.', price: 12.49, image: '/images/8.jpg', category: 'Meat Lovers' },
  { _id: 'local-11', name: 'Veggie Supreme', description: 'Bell peppers, onions, mushrooms, and olives.', price: 10.99, image: '/images/10-1.jpg', category: 'Veggie & Vegan' },
  { _id: 'local-12', name: 'Spinach & Feta', description: 'Spinach and feta cheese combination.', price: 11.49, image: '/images/11.jpg', category: 'Veggie & Vegan' },
  { _id: 'local-13', name: 'Vegan Delight', description: 'Plant-based cheese and veggie toppings.', price: 11.99, image: '/images/12.jpg', category: 'Veggie & Vegan' },
  { _id: 'local-14', name: 'Truffle Mushroom', description: 'Fragrant truffle oil and mushroom blend.', price: 14.99, image: '/images/13.jpg', category: 'Specials & Seasonal' },
  { _id: 'local-15', name: 'Pumpkin Spice', description: 'Autumn special with pumpkin flavors.', price: 13.99, image: '/images/14.jpg', category: 'Specials & Seasonal' },
  { _id: 'local-16', name: 'Seafood Marinara', description: 'Seafood with marinara sauce.', price: 15.99, image: '/images/15.jpg', category: 'Specials & Seasonal' },
];



const categoryBackgrounds = {
  'Classics': '#f8f9fa',
  'Meat Lovers': '#f0f5f1',
  'Veggie & Vegan': '#f7f4ef',
  'Specials & Seasonal': '#f3f0f7',
  'All': '#ffffff',
};

export default function Menu() {
  const [pizzaData, setPizzaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');

  const perPage = 6;

  useEffect(() => {
    fetch('http://localhost:5050/api/pizzas')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        setPizzaData(data);
        const updatedData = data.map(pizza => ({
          ...pizza,
          category: pizza.category || 'Other',
        }));
        setPizzaData([...localPizzas, ...updatedData]);
      })
      .catch(err => {
        console.error(err);
        setPizzaData(localPizzas);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (pizza) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item._id === pizza._id);
    if (existing) existing.quantity++;
    else cart.push({ ...pizza, price: Number(pizza.price), quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    setSnackbar({ open: true, message: `${pizza.name} added to cart!`, severity: 'success' });
  };

  const handleCloseSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  const categories = ['All', ...Array.from(new Set(localPizzas.map(p => p.category)))];
  const backgroundColor = categoryBackgrounds[activeCategory] || '#ffffff';

  const filtered = pizzaData.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sorted = filtered.sort((a, b) =>
    sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price
  );
  const pageCount = Math.ceil(sorted.length / perPage);
  const paged = sorted.slice((page - 1) * perPage, page * perPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4, backgroundColor: backgroundColor, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom align="center">Our Menu</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, justifyContent: 'center' }}>
        <TextField
          label="Search pizzas"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
        />
        <FormControl variant="outlined" size="small">
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort by"
            value={sortOrder}
            onChange={e => { setSortOrder(e.target.value); setPage(1); }}
          >
            <MenuItem value="lowToHigh">Price: Low → High</MenuItem>
            <MenuItem value="highToLow">Price: High → Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'contained' : 'outlined'}
            onClick={() => { setActiveCategory(cat); setPage(1); }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      <Grid container spacing={4}>
        {paged.map(pizza => (
          <Grid item key={pizza._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  height: 200,
                  backgroundImage: `url(${pizza.image.startsWith('/images') ? pizza.image : `http://localhost:5050${pizza.image}`})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{pizza.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {pizza.description}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ${pizza.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', gap: 1 }}>
                <Button fullWidth variant="contained" onClick={() => handleAddToCart(pizza)}>
                  Add to Order
                </Button>
                <Likebutton pizzaId={pizza._id} /> {/* Use Likebutton here */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
          />
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
