import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

function StudentDashboard({ student, onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');
  const [applicationsSubmitted, setApplicationsSubmitted] = useState([]);
  const [applicationData, setApplicationData] = useState({
    name: student.name,
    email: student.email,
    phone: '',
    experience: '',
    resume: ''
  });
  const [assessments, setAssessments] = useState([
    { id: 1, title: 'JavaScript Fundamentals', company: 'TCS', duration: '60 mins', questions: 50 },
    { id: 2, title: 'Problem Solving', company: 'AWS', duration: '90 mins', questions: 60 },
    { id: 3, title: 'Communication Skills', company: 'HCL', duration: '45 mins', questions: 30 }
  ]);
  const [interviews, setInterviews] = useState([
    { id: 1, company: 'Dell', role: 'Software Engineer', date: '2025-02-15', time: '10:00 AM', type: 'Technical' },
    { id: 2, company: 'Accenture', role: 'Analyst', date: '2025-02-18', time: '2:00 PM', type: 'HR Round' }
  ]);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/jobs`);
      const data = await response.json();
      setJobs(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyJob = (job) => {
    setSelectedJob(job);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!applicationData.phone) {
      setError('Please fill in all fields');
      return;
    }
    
    const application = {
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      ...applicationData,
      appliedDate: new Date().toLocaleDateString(),
      status: 'Pending Review'
    };
    
    setApplicationsSubmitted([...applicationsSubmitted, application]);
    setError('');
    setSelectedJob(null);
    alert(`Successfully applied to ${selectedJob.title} at ${selectedJob.company}!`);
  };

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🎓 HireSense</h1>
          <p className="tagline">Your Placement Portal</p>
        </div>
        <div className="header-info">
          <span className="welcome">Welcome, {student.name}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          💼 Jobs
        </button>
        <button 
          className={`nav-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          📝 Applications ({applicationsSubmitted.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'assessments' ? 'active' : ''}`}
          onClick={() => setActiveTab('assessments')}
        >
          🧪 Assessments
        </button>
        <button 
          className={`nav-btn ${activeTab === 'interviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('interviews')}
        >
          📅 Interviews
        </button>
        <button 
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
      </nav>

      {/* Content */}
      <div className="dashboard-content">
        {error && <div className="error-message">{error}</div>}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="tab-content">
            <h2>📋 Available Positions</h2>
            {loading && <p className="loading">Loading jobs...</p>}
            {jobs.length === 0 && !loading && <p>No jobs available</p>}
            
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="company-badge">{job.company}</span>
                  </div>
                  <p className="tagline">"{job.tagline}"</p>
                  <p className="description">{job.description}</p>
                  <div className="requirements">
                    <strong>Requirements:</strong>
                    <p>{job.requirements}</p>
                  </div>
                  <button 
                    className="apply-btn"
                    onClick={() => handleApplyJob(job)}
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="tab-content">
            <h2>📝 Your Applications</h2>
            {applicationsSubmitted.length === 0 ? (
              <p className="no-data">You haven't applied to any jobs yet.</p>
            ) : (
              <div className="applications-list">
                {applicationsSubmitted.map((app, index) => (
                  <div key={index} className="application-card">
                    <div className="app-header">
                      <h4>{app.jobTitle}</h4>
                      <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span>
                    </div>
                    <p><strong>Company:</strong> {app.company}</p>
                    <p><strong>Applied On:</strong> {app.appliedDate}</p>
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Phone:</strong> {app.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div className="tab-content">
            <h2>🧪 Available Assessments</h2>
            <div className="assessments-list">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="assessment-card">
                  <h4>{assessment.title}</h4>
                  <p><strong>Company:</strong> {assessment.company}</p>
                  <p><strong>Duration:</strong> {assessment.duration}</p>
                  <p><strong>Questions:</strong> {assessment.questions}</p>
                  <button className="start-assessment-btn">Start Assessment</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interviews Tab */}
        {activeTab === 'interviews' && (
          <div className="tab-content">
            <h2>📅 Scheduled Interviews</h2>
            {interviews.length === 0 ? (
              <p className="no-data">No interviews scheduled yet.</p>
            ) : (
              <div className="interviews-list">
                {interviews.map((interview) => (
                  <div key={interview.id} className="interview-card">
                    <h4>{interview.company} - {interview.role}</h4>
                    <p><strong>Date:</strong> {interview.date}</p>
                    <p><strong>Time:</strong> {interview.time}</p>
                    <p><strong>Type:</strong> <span className="interview-type">{interview.type}</span></p>
                    <button className="view-details-btn">View Details</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <h2>👤 Student Profile</h2>
            <div className="profile-card">
              <h3>{student.name}</h3>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>College:</strong> CMR Engineering College</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">{applicationsSubmitted.length}</span>
                  <span className="stat-label">Applications</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{interviews.length}</span>
                  <span className="stat-label">Interviews</span>
                </div>
                <div className="stat">
                  <span className="stat-value">3.8</span>
                  <span className="stat-label">CGPA</span>
                </div>
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="application-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedJob(null)}>×</button>
            <h2>Apply for {selectedJob.title}</h2>
            <p className="modal-company">at {selectedJob.company}</p>
            
            <form onSubmit={handleSubmitApplication} className="application-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={applicationData.name}
                  onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Years of Experience</label>
                <input
                  type="number"
                  placeholder="e.g., 2"
                  value={applicationData.experience}
                  onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Cover Letter / Resume Summary</label>
                <textarea
                  placeholder="Tell us why you're a great fit for this role..."
                  rows="5"
                  value={applicationData.resume}
                  onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.value })}
                />
              </div>

              <button type="submit" className="submit-btn">Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
