import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ChartContainer, StatCard } from '../../components/UI';
import { useMultipleData } from '../../hooks/useData';
import { loadFloodHistory, loadProvincialVictims } from '../../services/dataLoader';
import { Calendar, Users, DollarSign, Activity } from 'lucide-react';
import './FloodsHistory.css';

const FloodsHistory = () => {
  const { data, loading, error } = useMultipleData({
    floodHistory: loadFloodHistory,
    provincialVictims: loadProvincialVictims
  });

  const { floodHistory, provincialVictims } = data;

  if (loading) {
    return <div className="floods-loading">Loading history data...</div>;
  }

  if (error) {
    return <div className="floods-error">Error loading data: {error}</div>;
  }

  // Prepare provincial data for chart
  const provincialChartData = provincialVictims?.provinces
    ? Object.entries(provincialVictims.provinces).map(([province, stats]) => ({
        province,
        affected: stats.total_affected / 1000000, // in millions
        deaths: stats.deaths
      }))
    : [];

  return (
    <div className="floods-history-page">
      <div className="floods-container">
        <div className="floods-header">
          <h1 className="floods-title">Floods History</h1>
          <p className="floods-subtitle">Comprehensive timeline of major flood events in Pakistan</p>
        </div>

        {/* Major Events Timeline */}
        <div className="timeline-section">
          <h2 className="section-heading">
            <Calendar className="section-icon" /> Major Events Timeline
          </h2>
          <div className="timeline-events">
            {floodHistory?.major_events?.map((event) => (
              <div key={event.year} className="event-card">
                <div className="event-header">
                  <div>
                    <div className="event-year">{event.year} Flood</div>
                    <div className="event-affected">{event.affected.toLocaleString()} People Affected</div>
                  </div>
                  <div className="event-stats">
                    <div className="stat-box">
                      <div className="stat-value stat-deaths">{event.deaths.toLocaleString()}</div>
                      <div className="stat-label">Deaths</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-value stat-loss">${event.economic_loss_billion}B</div>
                      <div className="stat-label">Loss</div>
                    </div>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Provincial Breakdown */}
        <div className="charts-grid">
          <ChartContainer title="Provincial Impact (Deaths)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={provincialChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="province" type="category" stroke="#94a3b8" width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="deaths" fill="#EF4444" name="Deaths" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Affected Population (Millions)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={provincialChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="province" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="affected" fill="#3B82F6" name="Affected (M)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Economic Loss Analysis */}
        <div className="economic-analysis">
          <h2 className="section-heading">
            <DollarSign className="section-icon-green" /> Economic Impact Analysis
          </h2>
          <div className="economic-stats">
            <StatCard
              value="$35B+"
              label="Total Economic Loss (2010-2022)"
              icon={<DollarSign />}
              color="red"
            />
            <StatCard
              value="10.5M"
              label="Houses Damaged"
              icon={<Users />}
              color="orange"
            />
            <StatCard
              value="22,000+"
              label="Schools Destroyed"
              icon={<Activity />}
              color="yellow"
            />
          </div>
          <div className="economic-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={floodHistory?.major_events || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="economic_loss_billion"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  name="Economic Loss ($ Billion)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodsHistory;