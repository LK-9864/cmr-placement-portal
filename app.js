import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional: Add CSS for styling

function App() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', company: '', description: '', requirements: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API base URL - Change to your deployed backend (e.g., 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod')
  const API_BASE = 'http://localhost:5000/api'; // For local dev

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/jobs`);
      setJobs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const addJob = async () => {
    if (!newJob.title || !newJob.company) {
      setError('Title and Company are required.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/jobs`, newJob);
      setNewJob({ title: '', company: '', description: '', requirements: '' });
      fetchJobs(); // Refresh list
      setError('');
    } catch (err) {
      setError('Failed to add job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Cloud Placement App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <div style={{ marginBottom: '20px' }}>
        <h2>Add New Job</h2>
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '300px' }}
        />
        <input
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '300px' }}
        />
        <textarea
          placeholder="Description"
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '300px', height: '60px' }}
        />
        <textarea
          placeholder="Requirements"
          value={newJob.requirements}
          onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '300px', height: '60px' }}
        />
        <button onClick={addJob} disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          Add Job
        </button>
      </div>

      <div>
        <h2>Job Listings</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {jobs.map((job) => (
            <li key={job._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <h3>{job.title} at {job.company}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Requirements:</strong> {job.requirements}</p>
            </li>
          ))}
        </ul>
        {jobs.length === 0 && !loading && <p>No jobs available.</p>}
      </div>
    </div>
  );
}

export default App;