'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPeakHourData } from '@/utils/dataUtils';

type PeakHourAnalysisProps = {
  zoneId?: string | number;
};

// Fallback dummy data for peak hour analysis
const dummyPeakHourData = [
  { hour: '00:00', vehicles: 1250 },
  { hour: '01:00', vehicles: 850 },
  { hour: '02:00', vehicles: 650 },
  { hour: '03:00', vehicles: 450 },
  { hour: '04:00', vehicles: 550 },
  { hour: '05:00', vehicles: 750 },
  { hour: '06:00', vehicles: 2100 },
  { hour: '07:00', vehicles: 3850 },
  { hour: '08:00', vehicles: 5200 },
  { hour: '09:00', vehicles: 6300 },
  { hour: '10:00', vehicles: 5500 },
  { hour: '11:00', vehicles: 5100 },
  { hour: '12:00', vehicles: 5400 },
  { hour: '13:00', vehicles: 5800 },
  { hour: '14:00', vehicles: 5200 },
  { hour: '15:00', vehicles: 5600 },
  { hour: '16:00', vehicles: 6100 },
  { hour: '17:00', vehicles: 6700 },
  { hour: '18:00', vehicles: 7100 }, // Evening peak
  { hour: '19:00', vehicles: 6500 },
  { hour: '20:00', vehicles: 5400 },
  { hour: '21:00', vehicles: 4200 },
  { hour: '22:00', vehicles: 2800 },
  { hour: '23:00', vehicles: 1800 }
];

export default function PeakHourAnalysis({ zoneId }: PeakHourAnalysisProps) {
  const [hourlyData, setHourlyData] = useState(dummyPeakHourData);
  const [loading, setLoading] = useState(true);
  
  // Load data from CSV files based on selected zone
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPeakHourData(zoneId);
        if (data && data.length > 0) {
          setHourlyData(data);
        }
      } catch (error) {
        console.error('Error fetching hourly data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [zoneId]);
  
  return (
    <div className="h-full w-full">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">Loading data...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={hourlyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="hour" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: 'white' }}
              itemStyle={{ color: '#3B82F6' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="vehicles"
              name="Number of Vehicles"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
