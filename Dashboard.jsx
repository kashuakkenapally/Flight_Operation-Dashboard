import React from 'react';
import { Container, Box, Typography, Alert, CircularProgress, Grid, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useFlights } from '../hooks/useFlights';
import SummaryCards from '../components/SummaryCards';
import FlightTable from '../components/FlightTable';
import StatusChart from '../components/StatusChart';

export default function Dashboard() {
  const { flights, summary, loading, error, refetch, updateStatus } = useFlights();

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <FlightTakeoffIcon sx={{ fontSize: 36, color: '#1976d2' }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Flight Operations Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time flight monitoring & operations control
              </Typography>
            </Box>
          </Box>
          <Button
            startIcon={<RefreshIcon />}
            onClick={refetch}
            disabled={loading}
            variant="outlined"
          >
            Refresh
          </Button>
        </Box>

        {/* Error banner */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error} — Make sure the Spring Boot backend is running on port 8080.
          </Alert>
        )}

        {/* Loading */}
        {loading && !flights.length && (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        )}

        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Chart + Table */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StatusChart summary={summary} />
          </Grid>
          <Grid item xs={12} md={8}>
            <FlightTable flights={flights} onUpdateStatus={updateStatus} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
