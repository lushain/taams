'use client';

import { Suspense, useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import dynamic from 'next/dynamic';
import { getZones } from '@/utils/dataUtils';

// Dynamically import components that use browser APIs
const DelhiMap = dynamic(() => import('@/components/analytics/DelhiMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center">Loading map...</div>
});
const PeakHourAnalysis = dynamic(() => import('@/components/analytics/PeakHourAnalysis'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full flex items-center justify-center">Loading chart...</div>
});
const AccidentHotspot = dynamic(() => import('@/components/analytics/AccidentHotspot'), { 
  ssr: false,
  loading: () => <div className="h-48 w-full flex items-center justify-center">Loading data...</div>
});
const RoadTrafficChart = dynamic(() => import('@/components/analytics/RoadTrafficChart'), { 
  ssr: false,
  loading: () => <div className="h-48 w-full flex items-center justify-center">Loading data...</div>
});

export default function AnalyticsPage() {
  const [selectedZone, setSelectedZone] = useState<string | number>('all');
  const [zones, setZones] = useState<Array<{id: number | string, name: string}>>([]);
  
  // Fetch zones when component mounts
  useEffect(() => {
    const fetchZones = async () => {
      const zonesData = await getZones();
      setZones(zonesData);
    };
    fetchZones();
  }, []);
  
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Zone Selector */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Select Zone</h2>
            <div className="relative">
              <select 
                className="w-full bg-card-dark border border-gray-700 rounded-md py-2 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-accent-blue"
                value={selectedZone.toString()}
                onChange={(e) => setSelectedZone(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              >
                <option value="all">All Zones</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Peak Hour Analysis */}
          <div className="card h-64">
            <h2 className="text-xl font-semibold mb-4">Peak Hour Analysis</h2>
            <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading chart...</div>}>
              <PeakHourAnalysis zoneId={selectedZone === 'all' ? undefined : selectedZone} />
            </Suspense>
          </div>
          
          {/* Bottom Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Accident Hotspot */}
            <div className="card h-48">
              <h2 className="text-lg font-semibold mb-2">Accident Hotspot</h2>
              <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading data...</div>}>
                <AccidentHotspot zoneId={selectedZone === 'all' ? undefined : selectedZone} />
              </Suspense>
            </div>
            
            {/* Busiest Road */}
            <div className="card h-48">
              <h2 className="text-lg font-semibold mb-2">Busiest Road</h2>
              <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading data...</div>}>
                <RoadTrafficChart zoneId={selectedZone === 'all' ? undefined : selectedZone} />
              </Suspense>
            </div>
          </div>
        </div>
        
        {/* Right Column - Delhi Map */}
        <div className="card h-[600px]">
          <h2 className="text-xl font-semibold mb-4">Delhi Traffic Heatmap</h2>
          <div className="h-[540px] w-full">
            <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading map...</div>}>
              <DelhiMap />
            </Suspense>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
