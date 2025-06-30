import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { getMockData } from '../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const { user } = useGlobalContext();
  const [summary, setSummary] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
    const { ships, components, jobs } = getMockData();

    const overdueComponents = components.filter(c => {
      const last = new Date(c.lastMaintenanceDate);
      const today = new Date();
      const diff = (today - last) / (1000 * 3600 * 24);
      return diff > 180; // Over 6 months
    });

    setSummary({
      totalShips: ships.length,
      overdueComponents: overdueComponents.length,
      jobsInProgress: jobs.filter(j => j.status === 'In Progress').length,
      jobsCompleted: jobs.filter(j => j.status === 'Completed').length,
    });
  }, [user, navigate]);

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Ships" value={summary.totalShips} color="bg-blue-100" />
        <Card title="Overdue Components" value={summary.overdueComponents} color="bg-red-100" />
        <Card title="Jobs In Progress" value={summary.jobsInProgress} color="bg-yellow-100" />
        <Card title="Jobs Completed" value={summary.jobsCompleted} color="bg-green-100" />
      </div>
    </Layout>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-4 shadow rounded ${color}`}>
    <h2 className="text-lg font-medium text-gray-700">{title}</h2>
    <p className="text-2xl font-bold mt-2 text-gray-900">{value ?? 0}</p>
  </div>
);

export default DashboardPage;
