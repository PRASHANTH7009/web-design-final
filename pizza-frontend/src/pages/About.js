// src/pages/About.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Button,
  useTheme,
  Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import PeopleIcon from '@mui/icons-material/People';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StarIcon from '@mui/icons-material/Star';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { motion } from 'framer-motion';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Create a motion‑wrapped MUI Button
const MotionButton = motion(Button);

const story = [
  { year: "1970s", text: 'Family pizza recipe born in Naples kitchens.' },
  { year: '1995', text: 'Passed down and perfected by our founders’ grandparents.' },
  { year: '2005', text: 'Small pop‑up in downtown inspired community gatherings.' },
  { year: '2015', text: 'Opened first brick‑and‑mortar PizzaTime location.' },
  { year: '2025', text: 'We now serve thousands of happy customers daily!' },
];

const values = [
  {
    icon: <LocalPizzaIcon fontSize="large" color="primary" />,
    title: 'Handmade Crusts',
    desc: 'Dough is hand‑stretched and slow‑fermented for depth of flavor.',
  },
  {
    icon: <LocalFloristIcon fontSize="large" color="success" />,
    title: 'Fresh Ingredients',
    desc: 'Sourced from local farms at peak ripeness.',
  },
  {
    icon: <PeopleIcon fontSize="large" color="secondary" />,
    title: 'Community First',
    desc: 'Giving back through food drives & school fundraisers.',
  },
  {
    icon: <FastfoodIcon fontSize="large" color="warning" />,
    title: 'Innovative Flavors',
    desc: 'Seasonal and global twists keep our menu exciting.',
  },
];

const team = [
  {
    name: 'Alice Johnson',
    role: 'Head Chef',
    img: '/images/chef-alice.jpg',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Marco Rossi',
    role: 'Co‑Founder',
    img: '/images/marco-rossi.jpg',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Jasmine Lee',
    role: 'Operations Manager',
    img: '/images/jasmine-lee.jpg',
    twitter: '#',
    linkedin: '#',
  },
];

const testimonials = [
  {
    name: 'S. Kumar',
    quote: 'Best pizza in town—crispy, fresh, and delivered hot!',
    rating: 5,
  },
  {
    name: 'L. Nguyen',
    quote: 'Love the handmade crusts and community vibes.',
    rating: 4,
  },
  {
    name: 'A. Patel',
    quote: 'Fast delivery and amazing toppings every time.',
    rating: 5,
  },
];

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          height: 300,
          position: 'relative',
          backgroundImage: `url(/images/pizza-hero.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 4,
        }}
      >
        <Box
          sx={{
            inset: 0,
            position: 'absolute',
            backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
          }}
        />
        <Typography
          variant="h2"
          sx={{
            position: 'relative',
            color: isDark ? '#fff' : '#000',
            textAlign: 'center',
            top: '50%',
            transform: 'translateY(-50%)',
            fontWeight: 700,
            textShadow: isDark
              ? '0 2px 8px rgba(0,0,0,0.8)'
              : '0 2px 8px rgba(255,255,255,0.8)',
          }}
        >
          About PizzaTime
        </Typography>
      </Box>

      <Container maxWidth="lg">
        {/* Our Story */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          <Timeline position="alternate">
            {story.map((step, i) => (
              <TimelineItem key={i}>
                <TimelineSeparator>
                  <TimelineDot color={isDark ? 'secondary' : 'primary'} />
                  {i < story.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">{step.year}</Typography>
                  <Typography>{step.text}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        {/* What We Value */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            What We Value
          </Typography>
          <Grid container spacing={4}>
            {values.map((v, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      height: '100%',
                      backgroundColor: isDark ? 'background.paper' : '#fafafa',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{v.icon}</Box>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {v.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {v.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Meet the Team */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Meet the Team
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            {team.map((m) => (
              <Grid item xs={12} sm={6} md={4} key={m.name}>
                <Stack alignItems="center" spacing={2}>
                  <Avatar
                    src={m.img}
                    alt={m.name}
                    sx={{
                      width: 160,
                      height: 160,
                      border: `4px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <Typography variant="h6">{m.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {m.role}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <MuiLink href={m.twitter} target="_blank" aria-label="Twitter">
                      <TwitterIcon color="action" />
                    </MuiLink>
                    <MuiLink href={m.linkedin} target="_blank" aria-label="LinkedIn">
                      <LinkedInIcon color="action" />
                    </MuiLink>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ height: '100%', p: 2 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={0.5}>
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <StarIcon key={idx} color="warning" fontSize="small" />
                      ))}
                    </Stack>
                    <Typography variant="body1">“{t.quote}”</Typography>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      — {t.name}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" gutterBottom>
            Craving a slice right now?
          </Typography>
          <MotionButton
            component={RouterLink}
            to="/menu"
            whileHover={{ scale: 1.05 }}
            variant="contained"
            size="large"
            sx={{ backgroundColor: theme.palette.primary.main }}
          >
            View Our Menu
          </MotionButton>
        </Box>
      </Container>
    </Box>
  );
}