# Traffic Analysis and Archival Management System (TAAMS)

A frontend application for visualizing and analyzing Delhi's traffic data, designed to help authorities make data-driven decisions through archived traffic records.

## Features

- **About Page**: Information about the problem statement and solution, along with quick statistics.
- **Analytics Page**: Interactive dashboard with:
  - Delhi traffic heatmap
  - Peak hour traffic analysis
  - Accident hotspot visualization
  - Busiest roads breakdown
  - Zone-based filtering

## Technology Stack

- **Frontend**: Next.js (React)
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Maps**: React Leaflet
- **Data Parsing**: PapaParse

## Project Structure

```
/
├── public/
│   └── data/          # CSV data files
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   └── utils/         # Utility functions
└── package.json
```

## Data Files

The application uses the following CSV files in the `/public/data/` directory:

- `zone_schema.csv`: Delhi's geographical zones
- `roads_schema.csv`: Road network details
- `sensor_schema.csv`: Traffic sensor information
- `reading_schema.csv`: Vehicle count and speed readings
- `incident_schema.csv`: Traffic incidents and accidents
- `violation_schema.csv`: Traffic rule violations
- `maintenance.csv`: Sensor maintenance records

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
```

## Created By

Made by Ryan & Abhijit
