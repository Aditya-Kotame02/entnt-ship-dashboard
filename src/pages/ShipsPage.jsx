import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMockData } from '../utils/localStorageUtils';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../components/Layout'; // ✅ Import the Layout wrapper

const ShipsPage = () => {
  const [ships, setShips] = useState([]);
  const [formData, setFormData] = useState({ name: '', imo: '', flag: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { ships } = getMockData();
    setShips(ships);
  }, []);

  const saveShips = (newShips) => {
    localStorage.setItem('ships', JSON.stringify(newShips));
    setShips(newShips);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedShips = ships.map((ship) =>
        ship.id === editingId ? { ...formData, id: editingId } : ship
      );
      saveShips(updatedShips);
      setEditingId(null);
    } else {
      const newShip = { ...formData, id: uuidv4() };
      saveShips([...ships, newShip]);
    }
    setFormData({ name: '', imo: '', flag: '', status: 'Active' });
  };

  const handleEdit = (ship) => {
    setFormData(ship);
    setEditingId(ship.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ship?")) {
      const filtered = ships.filter((ship) => ship.id !== id);
      saveShips(filtered);
    }
  };

  return (
    <Layout title="Manage Ships">
      {/* Ship Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 bg-white p-4 rounded shadow">
        <input className="border p-2 rounded" required placeholder="Ship Name"
          value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input className="border p-2 rounded" required placeholder="IMO Number"
          value={formData.imo} onChange={(e) => setFormData({ ...formData, imo: e.target.value })} />
        <input className="border p-2 rounded" required placeholder="Flag"
          value={formData.flag} onChange={(e) => setFormData({ ...formData, flag: e.target.value })} />
        <select className="border p-2 rounded"
          value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
          <option>Active</option>
          <option>Under Maintenance</option>
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded col-span-2 transition">
          {editingId ? 'Update Ship' : 'Add Ship'}
        </button>
      </form>

      {/* Ship List */}
      <div className="mt-6">
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">IMO</th>
              <th className="p-3">Flag</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ships.map((ship) => (
              <tr key={ship.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{ship.name}</td>
                <td className="p-3">{ship.imo}</td>
                <td className="p-3">{ship.flag}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    ship.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ship.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(ship)} className="bg-yellow-400 px-2 py-1 rounded text-sm">Edit</button>
                  <button onClick={() => handleDelete(ship.id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Delete</button>
                  <button onClick={() => navigate(`/ships/${ship.id}`)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">View</button>
                </td>
              </tr>
            ))}
            {ships.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">No ships available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ShipsPage;
