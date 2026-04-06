import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Tooltip, TextField, Box, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select,
  FormControl, InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

const STATUS_COLORS = {
  SCHEDULED: 'default',
  BOARDING: 'primary',
  DEPARTED: 'info',
  IN_FLIGHT: 'success',
  LANDED: 'success',
  ARRIVED: 'success',
  DELAYED: 'warning',
  CANCELLED: 'error',
};

const STATUSES = ['SCHEDULED', 'BOARDING', 'DEPARTED', 'IN_FLIGHT', 'LANDED', 'ARRIVED', 'DELAYED', 'CANCELLED'];

function formatTime(dt) {
  if (!dt) return '—';
  return format(new Date(dt), 'HH:mm MM/dd');
}

export default function FlightTable({ flights, onUpdateStatus }) {
  const [search, setSearch] = useState('');
  const [editFlight, setEditFlight] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const filtered = flights.filter(
    (f) =>
      f.flightNumber?.toLowerCase().includes(search.toLowerCase()) ||
      f.origin?.toLowerCase().includes(search.toLowerCase()) ||
      f.destination?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditOpen = (flight) => {
    setEditFlight(flight);
    setNewStatus(flight.status);
    setReason('');
  };

  const handleSave = async () => {
    if (editFlight && newStatus) {
      await onUpdateStatus(editFlight.flightNumber, newStatus, reason || undefined);
      setEditFlight(null);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Live Flight Board
        </Typography>
        <TextField
          size="small"
          placeholder="Search by flight, origin, destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              {['Flight #', 'Route', 'Gate', 'Scheduled Dep', 'Scheduled Arr', 'Actual Dep', 'Aircraft', 'Delay (min)', 'Status', 'Actions'].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 'bold' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((flight) => (
              <TableRow key={flight.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{flight.flightNumber}</TableCell>
                <TableCell>{flight.origin} → {flight.destination}</TableCell>
                <TableCell>{flight.gate}</TableCell>
                <TableCell>{formatTime(flight.scheduledDeparture)}</TableCell>
                <TableCell>{formatTime(flight.scheduledArrival)}</TableCell>
                <TableCell>{formatTime(flight.actualDeparture)}</TableCell>
                <TableCell>{flight.aircraftType}</TableCell>
                <TableCell>{flight.delayMinutes ?? '—'}</TableCell>
                <TableCell>
                  <Chip
                    label={flight.status}
                    color={STATUS_COLORS[flight.status] || 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Update Status">
                    <IconButton size="small" onClick={() => handleEditOpen(flight)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No flights found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Status Update Dialog */}
      <Dialog open={!!editFlight} onClose={() => setEditFlight(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Update Flight {editFlight?.flightNumber}</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={newStatus} label="Status" onChange={(e) => setNewStatus(e.target.value)}>
              {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          {(newStatus === 'DELAYED' || newStatus === 'CANCELLED') && (
            <TextField
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditFlight(null)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
