import React, { useState, useEffect } from 'react';
import './RecruiterDashboard.css';

function RecruiterDashboard({ recruiter, onLogout }) {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Senior Software Engineer', company: 'TCS', postedDate: '2025-01-10', applicants: 45, status: 'Active' },
    { id: 2, title: 'Data Scientist', company: 'TCS', postedDate: '2025-01-15', applicants: 32, status: 'Active' },
    { id: 3, title: 'Cloud Architect', company: 'TCS', postedDate: '2025-01-20', applicants: 18, status: 'Active' }
  ]);
  const [activeTab, setActiveTab] = useState('jobs');
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: 'Full-time'
  });
  const [applicants, setApplicants] = useState([
    { id: 1, jobId: 1, name: 'Rahul Kumar', email: 'rahul@cmr.edu.in', status: 'New', appliedDate: '2025-02-10' },
    { id: 2, jobId: 1, name: 'Priya Singh', email: 'priya@cmr.edu.in', status: 'Shortlisted', appliedDate: '2025-02-09' },
    { id: 3, jobId: 1, name: 'Amit Patel', email: 'amit@cmr.edu.in', status: 'Rejected', appliedDate: '2025-02-08' },
    { id: 4, jobId: 2, name: 'Sneha Gupta', email: 'sneha@cmr.edu.in', status: 'New', appliedDate: '2025-02-07' },
    { id: 5, jobId: 2, name: 'Rajesh Sharma', email: 'rajesh@cmr.edu.in', status: 'Interview Scheduled', appliedDate: '2025-02-06' }
  ]);
  const [tests, setTests] = useState([
    { id: 1, title: 'JavaScript Fundamentals', jobId: 1, duration: 60, questions: 50, passingScore: 70 },
    { id: 2, title: 'Problem Solving', jobId: 2, duration: 90, questions: 60, passingScore: 75 }
  ]);
  const [analytics, setAnalytics] = useState({
    totalApplications: 95,
    shortlisted: 23,
    interviewed: 8,
    selected: 3,
    conversionRate: 3.2
  });

  const handlePostJob = (e) => {
    e.preventDefault();
    const newJobData = {
      id: jobs.length + 1,
      ...newJob,
      company: recruiter.company,
      postedDate: new Date().toLocaleDateString(),
      applicants: 0,
      status: 'Active'
    };
    setJobs([...jobs, newJobData]);
    setNewJob({ title: '', description: '', requirements: '', salary: '', location: '', jobType: 'Full-time' });
    setShowNewJobForm(false);
    alert('Job posted successfully!');
  };

  const handleAddTest = (jobId) => {
    alert(`Create test for Job ID: ${jobId}`);
  };

  const updateApplicantStatus = (applicantId, newStatus) => {
    setApplicants(applicants.map(app => 
      app.id === applicantId ? { ...app, status: newStatus } : app
    ));
  };

  const handleViewApplicants = (jobId) => {
    setSelectedJobApplicants(jobId);
  };

  const jobApplicants = selectedJobApplicants 
    ? applicants.filter(app => app.jobId === selectedJobApplicants)
    : [];

  return (
    <div className="recruiter-dashboard">
      {/* Header */}
      <header className="dashboard-header recruiter-header">
        <div className="header-content">
          <h1>🏢 HireSense Recruiter</h1>
          <p className="tagline">Recruitment Management Portal</p>
        </div>
        <div className="header-info">
          <div className="recruiter-info">
            <span className="company">{recruiter.company}</span>
            <span className="welcome">Welcome, {recruiter.name}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          📋 Jobs ({jobs.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'applicants' ? 'active' : ''}`}
          onClick={() => setActiveTab('applicants')}
        >
          👥 Applicants ({applicants.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          🧪 Tests ({tests.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
      </nav>

      {/* Content */}
      <div className="dashboard-content">
        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2>📋 Job Postings</h2>
              <button 
                className="primary-btn"
                onClick={() => setShowNewJobForm(!showNewJobForm)}
              >
                {showNewJobForm ? '✕ Cancel' : '+ Post New Job'}
              </button>
            </div>

            {showNewJobForm && (
              <div className="form-container">
                <h3>Post a New Job</h3>
                <form onSubmit={handlePostJob} className="new-job-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Job Title *</label>
                      <input
                        type="text"
                        placeholder="e.g., Senior Software Engineer"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Job Type *</label>
                      <select
                        value={newJob.jobType}
                        onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        placeholder="e.g., Bangalore, India"
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Salary Range (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g., 5-8 LPA"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Job Description *</label>
                    <textarea
                      placeholder="Describe the job role and responsibilities..."
                      rows="4"
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Requirements *</label>
                    <textarea
                      placeholder="List required skills and qualifications..."
                      rows="4"
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">Post Job</button>
                </form>
              </div>
            )}

            <div className="jobs-list">
              {jobs.map((job) => (
                <div key={job.id} className="job-item">
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p><strong>Posted:</strong> {job.postedDate}</p>
                    <p><strong>Status:</strong> <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span></p>
                  </div>
                  <div className="job-stats">
                    <div className="stat">
                      <span className="number">{job.applicants}</span>
                      <span className="label">Applicants</span>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button className="action-btn" onClick={() => handleViewApplicants(job.id)}>
                      View Applicants
                    </button>
                    <button className="action-btn" onClick={() => handleAddTest(job.id)}>
                      Create Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === 'applicants' && (
          <div className="tab-content">
            <h2>👥 All Applicants</h2>
            {selectedJobApplicants && (
              <button className="back-btn" onClick={() => setSelectedJobApplicants(null)}>
                ← Back to All Applicants
              </button>
            )}
            
            <div className="applicants-list">
              {jobApplicants.length > 0 ? jobApplicants.map((applicant) => (
                <div key={applicant.id} className="applicant-card">
                  <div className="applicant-info">
                    <h4>{applicant.name}</h4>
                    <p><strong>Email:</strong> {applicant.email}</p>
                    <p><strong>Applied:</strong> {applicant.appliedDate}</p>
                  </div>
                  <div className="applicant-status">
                    <span className={`status-badge ${applicant.status.toLowerCase().replace(/ /g, '-')}`}>
                      {applicant.status}
                    </span>
                  </div>
                  <div className="applicant-actions">
                    <select 
                      value={applicant.status}
                      onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                      className="status-select"
                    >
                      <option>New</option>
                      <option>Shortlisted</option>
                      <option>Interview Scheduled</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                    <button className="view-btn">View Profile</button>
                  </div>
                </div>
              )) : applicants.map((applicant) => (
                <div key={applicant.id} className="applicant-card">
                  <div className="applicant-info">
                    <h4>{applicant.name}</h4>
                    <p><strong>Email:</strong> {applicant.email}</p>
                    <p><strong>Applied:</strong> {applicant.appliedDate}</p>
                  </div>
                  <div className="applicant-status">
                    <span className={`status-badge ${applicant.status.toLowerCase().replace(/ /g, '-')}`}>
                      {applicant.status}
                    </span>
                  </div>
                  <div className="applicant-actions">
                    <select 
                      value={applicant.status}
                      onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                      className="status-select"
                    >
                      <option>New</option>
                      <option>Shortlisted</option>
                      <option>Interview Scheduled</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                    <button className="view-btn">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <div className="tab-content">
            <h2>🧪 Assessment Tests</h2>
            <div className="tests-list">
              {tests.map((test) => (
                <div key={test.id} className="test-card">
                  <h4>{test.title}</h4>
                  <p><strong>Job ID:</strong> {test.jobId}</p>
                  <p><strong>Duration:</strong> {test.duration} minutes</p>
                  <p><strong>Questions:</strong> {test.questions}</p>
                  <p><strong>Passing Score:</strong> {test.passingScore}%</p>
                  <div className="test-actions">
                    <button className="edit-btn">Edit Test</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="tab-content">
            <h2>📊 Recruitment Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <span className="analytics-icon">📊</span>
                <h4>Total Applications</h4>
                <p className="analytics-number">{analytics.totalApplications}</p>
              </div>
              <div className="analytics-card">
                <span className="analytics-icon">✓</span>
                <h4>Shortlisted</h4>
                <p className="analytics-number">{analytics.shortlisted}</p>
              </div>
              <div className="analytics-card">
                <span className="analytics-icon">🎤</span>
                <h4>Interviewed</h4>
                <p className="analytics-number">{analytics.interviewed}</p>
              </div>
              <div className="analytics-card">
                <span className="analytics-icon">🎯</span>
                <h4>Selected</h4>
                <p className="analytics-number">{analytics.selected}</p>
              </div>
            </div>
            
            <div className="analytics-summary">
              <h3>Conversion Metrics</h3>
              <div className="metric">
                <span>Conversion Rate (Applied to Selected):</span>
                <strong>{analytics.conversionRate}%</strong>
              </div>
              <div className="metric">
                <span>Shortlist Rate:</span>
                <strong>{((analytics.shortlisted / analytics.totalApplications) * 100).toFixed(1)}%</strong>
              </div>
              <div className="metric">
                <span>Interview-to-Selection:</span>
                <strong>{((analytics.selected / analytics.interviewed) * 100).toFixed(1)}%</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
