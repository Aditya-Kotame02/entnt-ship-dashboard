import React, { useEffect, useState } from 'react';
import { getMockData } from '../../utils/localStorageUtils';
import { v4 as uuidv4 } from 'uuid';

const ShipComponents = ({ shipId }) => {
  const [components, setComponents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const { components } = getMockData();
    const filtered = components.filter(c => c.shipId === shipId);
    setComponents(filtered);
  }, [shipId]);

  const saveComponents = (newData) => {
    const { components } = getMockData();
    const others = components.filter(c => c.shipId !== shipId);
    const updated = [...others, ...newData];
    localStorage.setItem('components', JSON.stringify(updated));
    setComponents(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.serialNumber) return;

    if (editId) {
      const updated = components.map((c) =>
        c.id === editId ? { ...formData, id: editId, shipId } : c
      );
      saveComponents(updated);
      setEditId(null);
    } else {
      const newComp = {
        ...formData,
        id: uuidv4(),
        shipId
      };
      saveComponents([...components, newComp]);
    }

    setFormData({
      name: '',
      serialNumber: '',
      installDate: '',
      lastMaintenanceDate: ''
    });
  };

  const handleEdit = (comp) => {
    setFormData(comp);
    setEditId(comp.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this component?")) {
      const filtered = components.filter(c => c.id !== id);
      saveComponents(filtered);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Manage Components</h3>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-2 bg-white p-4 rounded shadow">
        <input className="border p-2" placeholder="Name" required
          value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input className="border p-2" placeholder="Serial No." required
          value={formData.serialNumber} onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })} />
        <input className="border p-2" type="date" placeholder="Install Date"
          value={formData.installDate} onChange={(e) => setFormData({ ...formData, installDate: e.target.value })} />
        <input className="border p-2" type="date" placeholder="Last Maint. Date"
          value={formData.lastMaintenanceDate} onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-1">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="min-w-full bg-white mt-4 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Serial</th>
            <th className="p-2">Install</th>
            <th className="p-2">Last Maint.</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.length > 0 ? components.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.serialNumber}</td>
              <td className="p-2">{c.installDate}</td>
              <td className="p-2">{c.lastMaintenanceDate}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(c)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center p-3">No components found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShipComponents;
