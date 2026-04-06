import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StatCard = ({ title, value, color, icon: Icon }) => (
  <Card elevation={2} sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color={color}>
            {value ?? '—'}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: `${color}20`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
          }}
        >
          <Icon sx={{ color, fontSize: 32 }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const cards = [
    { title: 'Total Flights', value: summary.totalFlights, color: '#1976d2', icon: FlightIcon },
    { title: 'In Flight', value: summary.inFlight, color: '#388e3c', icon: CheckCircleIcon },
    { title: 'Delayed', value: summary.delayed, color: '#f57c00', icon: WarningIcon },
    { title: 'Cancelled', value: summary.cancelled, color: '#d32f2f', icon: CancelIcon },
    {
      title: 'Avg Delay (min)',
      value: summary.averageDelayMinutes ? Math.round(summary.averageDelayMinutes) : 0,
      color: '#7b1fa2',
      icon: AccessTimeIcon,
    },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={2.4} key={card.title}>
          <StatCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
