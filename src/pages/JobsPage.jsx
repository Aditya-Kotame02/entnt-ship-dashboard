import React, { useEffect, useState } from 'react';
import { getMockData } from '../utils/localStorageUtils';
import { useGlobalContext } from '../context/GlobalContext';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../components/Layout';

const JobsPage = () => {
  const { addNotification } = useGlobalContext();

  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({ shipId: '', status: '', priority: '' });

  const [formData, setFormData] = useState({
    shipId: '',
    componentId: '',
    type: '',
    priority: 'Medium',
    status: 'Open',
    assignedEngineerId: '',
    scheduledDate: ''
  });

  useEffect(() => {
    const { ships, components, users, jobs } = getMockData();
    setShips(ships);
    setComponents(components);
    setEngineers(users.filter(u => u.role === 'Engineer'));
    setJobs(jobs);
  }, []);

  const saveJobs = (updated) => {
    localStorage.setItem('jobs', JSON.stringify(updated));
    setJobs(updated);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newJob = { ...formData, id: uuidv4() };
    const updated = [...jobs, newJob];
    saveJobs(updated);
    addNotification("Job Created");
    setFormData({
      shipId: '',
      componentId: '',
      type: '',
      priority: 'Medium',
      status: 'Open',
      assignedEngineerId: '',
      scheduledDate: ''
    });
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updated = jobs.map(j =>
      j.id === id ? { ...j, status: newStatus } : j
    );
    saveJobs(updated);
    addNotification("Job Updated");
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (!filter.shipId || job.shipId === filter.shipId) &&
      (!filter.status || job.status === filter.status) &&
      (!filter.priority || job.priority === filter.priority)
    );
  });

  return (
    <Layout title="Manage Maintenance Jobs">
      <form onSubmit={handleCreate} className="grid md:grid-cols-6 gap-2 bg-white p-4 rounded shadow">
        <select required className="border p-2" value={formData.shipId}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, shipId: val, componentId: '' });
          }}>
          <option value="">Select Ship</option>
          {ships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select required className="border p-2" value={formData.componentId}
          onChange={(e) => setFormData({ ...formData, componentId: e.target.value })}>
          <option value="">Select Component</option>
          {components.filter(c => c.shipId === formData.shipId).map(c =>
            <option key={c.id} value={c.id}>{c.name}</option>
          )}
        </select>

        <input required className="border p-2" placeholder="Job Type"
          value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />

        <select className="border p-2" value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select className="border p-2" value={formData.assignedEngineerId}
          onChange={(e) => setFormData({ ...formData, assignedEngineerId: e.target.value })}>
          <option value="">Engineer</option>
          {engineers.map(e => (
            <option key={e.id} value={e.id}>{e.email}</option>
          ))}
        </select>

        <input type="date" className="border p-2" required
          value={formData.scheduledDate}
          onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })} />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-2">
          Create Job
        </button>
      </form>

      <div className="my-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Filter Jobs</h3>
        <div className="grid md:grid-cols-4 gap-2">
          <select className="border p-2" value={filter.shipId}
            onChange={(e) => setFilter({ ...filter, shipId: e.target.value })}>
            <option value="">All Ships</option>
            {ships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select className="border p-2" value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select className="border p-2" value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
            <option value="">All Priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Job Type</th>
            <th className="p-2">Ship</th>
            <th className="p-2">Component</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Status</th>
            <th className="p-2">Engineer</th>
            <th className="p-2">Scheduled</th>
            <th className="p-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map(job => {
            const ship = ships.find(s => s.id === job.shipId)?.name || 'Unknown';
            const comp = components.find(c => c.id === job.componentId)?.name || 'Unknown';
            const eng = engineers.find(e => e.id === job.assignedEngineerId)?.email || 'N/A';
            return (
              <tr key={job.id} className="border-t">
                <td className="p-2">{job.type}</td>
                <td className="p-2">{ship}</td>
                <td className="p-2">{comp}</td>
                <td className="p-2">{job.priority}</td>
                <td className="p-2">{job.status}</td>
                <td className="p-2">{eng}</td>
                <td className="p-2">{job.scheduledDate}</td>
                <td className="p-2 space-x-1">
                  {job.status === 'Open' && (
                    <button onClick={() => handleStatusUpdate(job.id, 'In Progress')}
                      className="bg-yellow-400 px-2 py-1 rounded text-sm">Start</button>
                  )}
                  {job.status === 'In Progress' && (
                    <button onClick={() => handleStatusUpdate(job.id, 'Completed')}
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm">Complete</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default JobsPage;
