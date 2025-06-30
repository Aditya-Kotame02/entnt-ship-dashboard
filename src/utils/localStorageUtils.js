const defaultUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
  { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" }
];

export function getMockUsers() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
  return JSON.parse(localStorage.getItem('users'));
}

export function getMockData() {
  return {
    users: getMockUsers(),
    ships: JSON.parse(localStorage.getItem('ships')) || [],
    components: JSON.parse(localStorage.getItem('components')) || [],
    jobs: JSON.parse(localStorage.getItem('jobs')) || [],
  };
}

(function initMockData() {
  if (!localStorage.getItem('ships')) {
    localStorage.setItem('ships', JSON.stringify([
      { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
      { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" }
    ]));
  }

  if (!localStorage.getItem('components')) {
    localStorage.setItem('components', JSON.stringify([
      { id: "c1", shipId: "s1", name: "Main Engine", serialNumber: "ME-1234", installDate: "2020-01-10", lastMaintenanceDate: "2023-10-12" },
      { id: "c2", shipId: "s2", name: "Radar", serialNumber: "RAD-5678", installDate: "2021-07-18", lastMaintenanceDate: "2022-11-01" }
    ]));
  }

  if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify([
      { id: "j1", componentId: "c1", shipId: "s1", type: "Inspection", priority: "High", status: "In Progress", assignedEngineerId: "3", scheduledDate: "2025-05-05" },
      { id: "j2", componentId: "c2", shipId: "s2", type: "Repair", priority: "Low", status: "Completed", assignedEngineerId: "3", scheduledDate: "2025-04-01" }
    ]));
  }
})();

