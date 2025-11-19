'use client';

import PageLayout from '@/components/PageLayout';
import { GiRoad, GiRadarSweep, GiWinterGloves } from 'react-icons/gi';
import { MdOutlineDirectionsCar, MdOutlineWarning } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { FaCity } from 'react-icons/fa';

export default function Home() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Traffic Analysis and Archival Management System
        </h1>
        
        {/* Problem Statement */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="text-xl mr-2">🧩</span> Problem Statement
          </h2>
          <p className="text-gray-300 mb-4">
            Delhi's traffic has grown beyond the realm of routine nuisance to a full-blown crisis.
            With over 1.4 crore vehicles and thousands being added weekly, the city's road network remains stressed.
          </p>
          <p className="text-gray-300 mb-4">
            Rush-hour junctions like Dhaula Kuan, Ashram Chowk, and ITO choke for hours.
            Rain or festivals worsen the chaos.
          </p>
          <p className="text-gray-300">
            Despite having sensors and cameras, most data is used for immediate responses and not preserved for long-term planning
            — resulting in reactive rather than data-driven decisions.
          </p>
        </div>
        
        {/* Solution */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="text-xl mr-2">💡</span> Solution — TAAMS
          </h2>
          <p className="text-gray-300 mb-4">
            TAAMS is a database-driven archival platform for organizing, storing, and analyzing Delhi's historical traffic data.
            It helps authorities make data-driven decisions by identifying trends, patterns, and hotspots using archived records.
          </p>
          
          <h3 className="text-xl font-medium mt-4 mb-2">Key Points:</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-300">
            <li>Builds a comprehensive traffic archive combining sensors, incidents, and maintenance logs.</li>
            <li>Enables smarter planning by identifying accident-prone or congested roads.</li>
            <li>Supports proactive maintenance scheduling.</li>
            <li>Facilitates research and predictive modeling using historical trends.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-4 mb-2">System Objectives:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Gather and store vehicle counts, timestamps, and speeds from sensors.</li>
            <li>Record incidents and violations with time/location data.</li>
            <li>Track maintenance for sensor reliability.</li>
            <li>Execute analytical queries like busiest roads, inactive sensors, recurring accidents.</li>
            <li>Enable future urban planning and research.</li>
          </ul>
        </div>
        
        {/* Quick Stats */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Total Vehicles */}
          <div className="stat-card bg-gradient-to-br from-card-dark to-card-dark border-t-4 border-accent-blue">
            <div className="text-4xl mb-2 text-accent-blue">
              <MdOutlineDirectionsCar />
            </div>
            <h3 className="text-xl font-medium">Total Vehicles</h3>
            <p className="text-3xl font-bold text-accent-blue">1,435,782</p>
          </div>
          
          {/* Total Incidents */}
          <div className="stat-card bg-gradient-to-br from-card-dark to-card-dark border-t-4 border-accent-red">
            <div className="text-4xl mb-2 text-accent-red">
              <MdOutlineWarning />
            </div>
            <h3 className="text-xl font-medium">Incidents Logged</h3>
            <p className="text-3xl font-bold text-accent-red">3,278</p>
          </div>
          
          {/* Sensors */}
          <div className="stat-card bg-gradient-to-br from-card-dark to-card-dark border-t-4 border-accent-green">
            <div className="text-4xl mb-2 text-accent-green">
              <IoMdSettings />
            </div>
            <h3 className="text-xl font-medium">Active Sensors</h3>
            <p className="text-3xl font-bold text-accent-green">245 / 268</p>
          </div>
          
          {/* Zones */}
          <div className="stat-card bg-gradient-to-br from-card-dark to-card-dark border-t-4 border-accent-orange">
            <div className="text-4xl mb-2 text-accent-orange">
              <FaCity />
            </div>
            <h3 className="text-xl font-medium">Total Zones</h3>
            <p className="text-3xl font-bold text-accent-orange">7</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
