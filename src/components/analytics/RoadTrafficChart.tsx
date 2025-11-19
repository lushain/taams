'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getBusiestRoads } from '@/utils/dataUtils';

type RoadTrafficChartProps = {
  zoneId?: string | number;
};

// Fallback dummy data for busiest roads
const dummyBusiestRoads = [
  { name: 'Ring Road', vehicles: 125000, percentage: 22 },
  { name: 'Outer Ring Road', vehicles: 112000, percentage: 20 },
  { name: 'NH-48', vehicles: 98000, percentage: 17 },
  { name: 'Mathura Road', vehicles: 87000, percentage: 16 },
  { name: 'Loni Road', vehicles: 71000, percentage: 13 },
  { name: 'Others', vehicles: 67000, percentage: 12 }
];

const COLORS = ['#3B82F6', '#F97316', '#10B981', '#A855F7', '#F59E0B', '#64748B'];

export default function RoadTrafficChart({ zoneId }: RoadTrafficChartProps) {
  const [roadData, setRoadData] = useState(dummyBusiestRoads);
  const [loading, setLoading] = useState(true);
  
  // Load data from CSV files based on selected zone
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getBusiestRoads(zoneId);
        if (data && data.length > 0) {
          setRoadData(data);
        }
      } catch (error) {
        console.error('Error fetching busiest roads:', error);
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
          <PieChart>
            <Pie
              data={roadData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={50}
              dataKey="percentage"
              nameKey="name"
            >
              {roadData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Traffic Share']}
              contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333', borderRadius: '4px' }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ fontSize: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
