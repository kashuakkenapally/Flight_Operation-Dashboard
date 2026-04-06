import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const COLORS = {
  scheduled: '#1976d2',
  inFlight: '#388e3c',
  delayed: '#f57c00',
  cancelled: '#d32f2f',
  arrived: '#7b1fa2',
};

export default function StatusChart({ summary }) {
  if (!summary) return null;

  const data = [
    { name: 'Scheduled', value: summary.scheduled || 0, color: COLORS.scheduled },
    { name: 'In Flight', value: summary.inFlight || 0, color: COLORS.inFlight },
    { name: 'Delayed', value: summary.delayed || 0, color: COLORS.delayed },
    { name: 'Cancelled', value: summary.cancelled || 0, color: COLORS.cancelled },
    { name: 'Arrived', value: summary.arrived || 0, color: COLORS.arrived },
  ].filter(d => d.value > 0);

  return (
    <Card elevation={2} sx={{ height: 320 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Flight Status Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
