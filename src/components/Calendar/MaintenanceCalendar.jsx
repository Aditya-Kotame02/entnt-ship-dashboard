import React, { useEffect, useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import { createContext, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { getMockData } from '../../utils/localStorageUtils';

const MaintenanceCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const filterJobsForDate = useCallback((date) => {
    const selectedDate = date.toISOString().split('T')[0];
    const filtered = jobs.filter(job => job.scheduledDate === selectedDate);
    setSelectedJobs(filtered);
  }, [jobs]);

  useEffect(() => {
    const { jobs } = getMockData();
    setJobs(jobs);
    filterJobsForDate(new Date());
  }, [filterJobsForDate]);

  const handleDateChange = (date) => {
    setValue(date);
    filterJobsForDate(date);
  };

  const getTileContent = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    const hasJob = jobs.some(job => job.scheduledDate === dateStr);
    return hasJob ? <div className="text-red-600 text-sm text-center">*</div> : null;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Maintenance Calendar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Calendar
          onChange={handleDateChange}
          value={value}
          tileContent={getTileContent}
        />

        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Jobs on {value.toDateString()}</h3>
          {selectedJobs.length > 0 ? (
            <ul className="list-disc pl-4">
              {selectedJobs.map(job => (
                <li key={job.id}>
                  <strong>{job.type}</strong> – Ship: {job.shipId}, Component: {job.componentId}, Engineer: {job.assignedEngineerId}, Status: {job.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No jobs scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCalendar;
