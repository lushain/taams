'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getAccidentHotspots } from '@/utils/dataUtils';

type AccidentHotspotProps = {
  zoneId?: string | number;
};

// Fallback dummy data for accident hotspots
const dummyAccidentData = [
  { location: 'Dhaula Kuan', accidents: 37 },
  { location: 'ITO', accidents: 29 },
  { location: 'Ashram', accidents: 42 },
  { location: 'Anand Vihar', accidents: 25 },
  { location: 'Kashmere Gate', accidents: 31 }
];

export default function AccidentHotspot({ zoneId }: AccidentHotspotProps) {
  const [hotspotData, setHotspotData] = useState(dummyAccidentData);
  const [loading, setLoading] = useState(true);
  
  // Load data from CSV files based on selected zone
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAccidentHotspots(zoneId);
        if (data && data.length > 0) {
          setHotspotData(data);
        }
      } catch (error) {
        console.error('Error fetching accident hotspots:', error);
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
          <BarChart
            data={hotspotData}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="location" scale="point" padding={{ left: 10, right: 10 }} tick={{ fontSize: 10 }} stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '4px' }}
              labelStyle={{ color: 'white' }}
              itemStyle={{ color: '#EF4444' }}
            />
            <Bar dataKey="accidents" name="Accidents" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
