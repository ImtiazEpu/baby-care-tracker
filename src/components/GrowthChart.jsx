import { useState, useMemo } from 'react';

const GrowthChart = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [activeMetric, setActiveMetric] = useState('all');

  const metrics = [
    { key: 'weight', label: 'Weight', unit: 'kg', color: 'blue', gradient: ['#3b82f6', '#1d4ed8'] },
    { key: 'height', label: 'Height', unit: 'cm', color: 'emerald', gradient: ['#10b981', '#047857'] },
    { key: 'head', label: 'Head', unit: 'cm', color: 'amber', gradient: ['#f59e0b', '#d97706'] }
  ];

  // Chart dimensions
  const width = 100;
  const height = 50;
  const padding = { top: 5, right: 5, bottom: 8, left: 8 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales and paths
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const result = {};

    metrics.forEach(metric => {
      const values = data
        .map((d, i) => ({ value: d[metric.key], index: i, date: d.date }))
        .filter(d => d.value != null);

      if (values.length === 0) {
        result[metric.key] = null;
        return;
      }

      const minVal = Math.min(...values.map(v => v.value));
      const maxVal = Math.max(...values.map(v => v.value));
      const range = maxVal - minVal || 1;

      const points = values.map((v, i) => ({
        x: padding.left + (i / Math.max(values.length - 1, 1)) * chartWidth,
        y: padding.top + chartHeight - ((v.value - minVal) / range) * chartHeight,
        value: v.value,
        date: v.date
      }));

      // Create smooth path
      const linePath = points.length > 1
        ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
        : '';

      // Create area path
      const areaPath = points.length > 1
        ? `M ${points[0].x},${padding.top + chartHeight} L ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${points[points.length - 1].x},${padding.top + chartHeight} Z`
        : '';

      result[metric.key] = { points, linePath, areaPath, minVal, maxVal };
    });

    return result;
  }, [data]);

  if (!chartData) return null;

  const visibleMetrics = activeMetric === 'all'
    ? metrics.filter(m => chartData[m.key])
    : metrics.filter(m => m.key === activeMetric && chartData[m.key]);

  return (
    <div className="space-y-4">
      {/* Metric Toggle Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveMetric('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeMetric === 'all'
              ? 'bg-indigo-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {metrics.map(metric => chartData[metric.key] && (
          <button
            key={metric.key}
            onClick={() => setActiveMetric(metric.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              activeMetric === metric.key
                ? `bg-${metric.color}-500 text-white shadow-md`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            style={activeMetric === metric.key ? { backgroundColor: metric.gradient[0] } : {}}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: metric.gradient[0] }}
            />
            {metric.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-64"
          preserveAspectRatio="none"
        >
          <defs>
            {metrics.map(metric => (
              <linearGradient
                key={`gradient-${metric.key}`}
                id={`gradient-${metric.key}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={metric.gradient[0]} stopOpacity="0.4" />
                <stop offset="100%" stopColor={metric.gradient[1]} stopOpacity="0.05" />
              </linearGradient>
            ))}
          </defs>

          {/* Grid lines */}
          <g className="text-gray-200 dark:text-gray-700">
            {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
              <line
                key={ratio}
                x1={padding.left}
                y1={padding.top + chartHeight * ratio}
                x2={width - padding.right}
                y2={padding.top + chartHeight * ratio}
                stroke="currentColor"
                strokeWidth="0.2"
                strokeDasharray="1,1"
              />
            ))}
          </g>

          {/* Areas */}
          {visibleMetrics.map(metric => chartData[metric.key] && (
            <path
              key={`area-${metric.key}`}
              d={chartData[metric.key].areaPath}
              fill={`url(#gradient-${metric.key})`}
              className="transition-opacity duration-300"
              style={{ opacity: activeMetric === 'all' ? 0.6 : 1 }}
            />
          ))}

          {/* Lines */}
          {visibleMetrics.map(metric => chartData[metric.key] && (
            <path
              key={`line-${metric.key}`}
              d={chartData[metric.key].linePath}
              fill="none"
              stroke={metric.gradient[0]}
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
          ))}

          {/* Data points */}
          {visibleMetrics.map(metric => chartData[metric.key]?.points.map((point, i) => (
            <g key={`point-${metric.key}-${i}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint?.metric === metric.key && hoveredPoint?.index === i ? 1.5 : 0.8}
                fill={metric.gradient[0]}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredPoint({ metric: metric.key, index: i, ...point, ...metric })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* Larger invisible hit area */}
              <circle
                cx={point.x}
                cy={point.y}
                r={3}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint({ metric: metric.key, index: i, ...point, ...metric })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          )))}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-10 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
              marginTop: '-8px'
            }}
          >
            <div className="font-semibold">{new Date(hoveredPoint.date).toLocaleDateString()}</div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: hoveredPoint.gradient[0] }}
              />
              {hoveredPoint.label}: {hoveredPoint.value} {hoveredPoint.unit}
            </div>
          </div>
        )}

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
          {data.length > 0 && (
            <>
              <span>{new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              {data.length > 2 && (
                <span>{new Date(data[Math.floor(data.length / 2)].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              )}
              {data.length > 1 && (
                <span>{new Date(data[data.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Legend with latest values */}
      <div className="grid grid-cols-3 gap-3">
        {metrics.map(metric => {
          const metricData = chartData[metric.key];
          if (!metricData) return null;
          const latestValue = data.filter(d => d[metric.key] != null).pop()?.[metric.key];

          return (
            <div
              key={metric.key}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                activeMetric === metric.key || activeMetric === 'all'
                  ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md'
                  : 'bg-gray-50 dark:bg-gray-800 opacity-50'
              }`}
              onClick={() => setActiveMetric(activeMetric === metric.key ? 'all' : metric.key)}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${metric.gradient[0]}, ${metric.gradient[1]})` }}
                />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{metric.label}</span>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {latestValue ?? '-'} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GrowthChart;
