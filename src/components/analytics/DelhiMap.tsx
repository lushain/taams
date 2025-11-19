'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data for traffic density hotspots
const trafficHotspots = [
  { id: 1, name: 'Dhaula Kuan', lat: 28.5923, lng: 77.1661, intensity: 90 },
  { id: 2, name: 'ITO', lat: 28.6258, lng: 77.2417, intensity: 85 },
  { id: 3, name: 'Ashram Chowk', lat: 28.5795, lng: 77.2575, intensity: 92 },
  { id: 4, name: 'Connaught Place', lat: 28.6315, lng: 77.2167, intensity: 80 },
  { id: 5, name: 'Nehru Place', lat: 28.5491, lng: 77.2540, intensity: 78 },
  { id: 6, name: 'Lajpat Nagar', lat: 28.5700, lng: 77.2400, intensity: 75 },
  { id: 7, name: 'Anand Vihar', lat: 28.6472, lng: 77.3159, intensity: 79 },
  { id: 8, name: 'Rajouri Garden', lat: 28.6473, lng: 77.1183, intensity: 72 },
  { id: 9, name: 'Akshardham', lat: 28.6180, lng: 77.2773, intensity: 82 },
  { id: 10, name: 'Karol Bagh', lat: 28.6526, lng: 77.1906, intensity: 77 }
];

// Function to map intensity to circle radius and color
const getCircleProps = (intensity: number) => {
  // Radius scales with intensity
  const radius = 300 + (intensity * 5);
  
  // Color based on intensity (red for high, yellow for medium, green for low)
  let color;
  if (intensity > 85) {
    color = '#EF4444'; // Red
  } else if (intensity > 75) {
    color = '#F97316'; // Orange
  } else {
    color = '#10B981'; // Green
  }
  
  return { radius, color };
};

export default function DelhiMap() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Initialize Leaflet only on client-side
    if (typeof window !== 'undefined') {
      // We don't need to set up the default icons for this particular component
      // since we're only using Circle, not Markers
    }
    
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return <div>Loading map...</div>;
  
  return (
    <MapContainer
      center={[28.6139, 77.2090]} // Delhi center coordinates
      zoom={11}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tiles"
      />
      
      {trafficHotspots.map(hotspot => {
        const { radius, color } = getCircleProps(hotspot.intensity);
        return (
          <Circle
            key={hotspot.id}
            center={[hotspot.lat, hotspot.lng]}
            radius={radius}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.4
            }}
          >
            <Tooltip direction="top" offset={[0, -radius/2]} opacity={1} permanent>
              <div className="font-semibold">{hotspot.name}</div>
              <div>Traffic Intensity: {hotspot.intensity}%</div>
            </Tooltip>
          </Circle>
        );
      })}
    </MapContainer>
  );
}
