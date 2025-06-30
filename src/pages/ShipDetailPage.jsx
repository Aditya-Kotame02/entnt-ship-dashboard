import { useParams, useNavigate } from 'react-router-dom';
import { getMockData } from '../utils/localStorageUtils';
import React, { useEffect, useState } from 'react';
import ShipComponents from '../components/Ships/ShipComponents';
import Layout from '../components/Layout';

const ShipDetailPage = () => {
  const { id } = useParams();
  const [ship, setShip] = useState(null);
  const [componentList, setComponentList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { ships, components, jobs } = getMockData();
    const shipDetail = ships.find(s => s.id === id);
    if (!shipDetail) return;

    setShip(shipDetail);
    setComponentList(components.filter(c => c.shipId === id));
    setJobList(jobs.filter(j => j.shipId === id));
  }, [id]);

  if (!ship) return <Layout title="Ship Not Found"><div>Ship not found</div></Layout>;

  return (
    <Layout title={`${ship.name} Details`}>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back
      </button>

      <div className="space-y-2 mb-6">
        <p><strong>IMO:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Installed Components</h3>
        {componentList.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {componentList.map((c) => (
              <li key={c.id}>
                {c.name} (Serial: {c.serialNumber}) – Last Maintained: {c.lastMaintenanceDate}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No components found</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Maintenance Jobs</h3>
        {jobList.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {jobList.map((j) => (
              <li key={j.id}>
                {j.type} – Priority: {j.priority} – Status: {j.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No jobs found</p>
        )}
      </div>

      <ShipComponents shipId={ship.id} />
    </Layout>
  );
};

export default ShipDetailPage;
