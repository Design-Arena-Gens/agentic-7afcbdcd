"use client";
import { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Using CDN topojson to avoid bundling heavy file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function scaleValue(value, min, max) {
  if (max === min) return 0.4;
  const t = (value - min) / (max - min);
  return 0.3 + t * 0.7; // 0.3 to 1.0 opacity
}

export default memo(function GeoSalesMap({ data }) {
  const values = data.map(d => d.value);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 1;

  // country name to value map
  const map = new Map(data.map(d => [d.country, d.value]));

  return (
    <section className="container-page" aria-label="Geographical sales map">
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Geographical Sales</h2>
        <div className="h-72">
          <ComposableMap projectionConfig={{ scale: 150 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const name = geo.properties.name;
                  const value = map.get(name) || 0;
                  const opacity = scaleValue(value, min, max);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={`rgba(34,197,94,${opacity})`}
                      stroke="#0f172a"
                      aria-label={`${name} revenue ${value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </section>
  );
});
