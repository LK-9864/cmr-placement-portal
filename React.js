import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', company: '', description: '', requirements: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await axios.get('http://localhost:5000/api/jobs'); // Replace with deployed API URL
    setJobs(response.data);
  };

  const addJob = async () => {
    await axios.post('http://localhost:5000/api/jobs', newJob);
    setNewJob({ title: '', company: '', description: '', requirements: '' });
    fetchJobs();
  };

  return (
    <div className="App">
      <h1>Cloud Placement App</h1>
      <div>
        <input placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} />
        <input placeholder="Company" value={newJob.company} onChange={(e) => setNewJob({...newJob, company: e.target.value})} />
        <textarea placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} />
        <textarea placeholder="Requirements" value={newJob.requirements} onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} />
        <button onClick={addJob}>Add Job</button>
      </div>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <h3>{job.title} at {job.company}</h3>
            <p>{job.description}</p>
            <p>Requirements: {job.requirements}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;