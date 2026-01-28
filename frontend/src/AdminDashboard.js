import React, { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ admin, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([
    { id: 1, name: 'Aditya', email: 'aditya@cmr.edu.in', rollNo: '22A01001', cgpa: 7.8, placed: true, company: 'TCS' },
    { id: 2, name: 'Chethen', email: 'chethen@cmr.edu.in', rollNo: '22A01002', cgpa: 7.6, placed: true, company: 'AWS' },
    { id: 3, name: 'Gobinath', email: 'gobinath@cmr.edu.in', rollNo: '22A01003', cgpa: 6.2, placed: false, company: null },
    { id: 4, name: 'Harish', email: 'harish@cmr.edu.in', rollNo: '22A01004', cgpa: 7.9, placed: true, company: 'Dell' },
    { id: 5, name: 'Lakshmikanth', email: 'lakshmikanth@cmr.edu.in', rollNo: '22A01005', cgpa: 6.1, placed: false, company: null },
    { id: 6, name: 'Albi', email: 'albi@cmr.edu.in', rollNo: '22A01006', cgpa: 7.5, placed: true, company: 'HCL' },
    { id: 7, name: 'Narendra', email: 'narendra@cmr.edu.in', rollNo: '22A01007', cgpa: 6.8, placed: false, company: null }
  ]);
  const [companies, setCompanies] = useState([
    { id: 1, name: 'TCS', recruiter: 'Arun Verma', jobsPosted: 5, applicants: 120, selected: 15 },
    { id: 2, name: 'AWS', recruiter: 'Sarah Khan', jobsPosted: 3, applicants: 85, selected: 8 },
    { id: 3, name: 'Dell', recruiter: 'Michael Chen', jobsPosted: 4, applicants: 92, selected: 10 },
    { id: 4, name: 'HCL', recruiter: 'Priya Reddy', jobsPosted: 6, applicants: 110, selected: 12 },
    { id: 5, name: 'Accenture', recruiter: 'Rohan Gupta', jobsPosted: 5, applicants: 98, selected: 11 }
  ]);
  const [analytics, setAnalytics] = useState({
    totalStudents: 125,
    placedStudents: 68,
    avgCgpa: 7.0,
    activeCompanies: 5,
    totalJobsPosted: 23,
    totalApplications: 505,
    placementRate: 54.4
  });
  const [policies, setPolicies] = useState([
    { id: 1, title: 'Minimum CGPA', value: '3.0', type: 'Eligibility' },
    { id: 2, title: 'Branch Restrictions', value: 'None', type: 'Eligibility' },
    { id: 3, title: 'Interview Process', value: '2 rounds', type: 'Process' },
    { id: 4, title: 'Offer Letter Duration', value: '5 days', type: 'Process' }
  ]);
  const [showPolicyForm, setShowPolicyForm] = useState(false);
  const [newPolicy, setNewPolicy] = useState({ title: '', value: '', type: 'Eligibility' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleAddPolicy = (e) => {
    e.preventDefault();
    setPolicies([...policies, { ...newPolicy, id: policies.length + 1 }]);
    setNewPolicy({ title: '', value: '', type: 'Eligibility' });
    setShowPolicyForm(false);
  };

  const openModal = (student, type) => {
    setSelectedStudent(student);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setModalType(null);
  };

  const handleEditStudent = (e) => {
    e.preventDefault();
    setStudents(students.map(s => s.id === selectedStudent.id ? selectedStudent : s));
    closeModal();
    alert('Student details updated successfully!');
  };

  const handleTakeAssessment = () => {
    alert(`Assessment started for ${selectedStudent.name}!`);
    closeModal();
  };

  const handleScheduleInterview = () => {
    alert(`Interview scheduled for ${selectedStudent.name}!`);
    closeModal();
  };

  const placedCount = students.filter(s => s.placed).length;
  const avgCgpaValue = (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header admin-header">
        <div className="header-content">
          <h1>⚙️ HireSense Admin</h1>
          <p className="tagline">Placement Management System</p>
        </div>
        <div className="header-info">
          <div className="admin-info">
            <span className="role">TPO Administrator</span>
            <span className="welcome">Welcome, {admin.name}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          👨‍🎓 Students ({students.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'companies' ? 'active' : ''}`}
          onClick={() => setActiveTab('companies')}
        >
          🏢 Companies ({companies.length})
        </button>
        <button 
          className={`nav-btn ${activeTab === 'policies' ? 'active' : ''}`}
          onClick={() => setActiveTab('policies')}
        >
          📋 Policies
        </button>
        <button 
          className={`nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          📈 Reports
        </button>
      </nav>

      {/* Content */}
      <div className="dashboard-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <h2>📊 Placement Overview</h2>
            
            {/* Key Metrics */}
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-icon">👨‍🎓</span>
                <h4>Total Students</h4>
                <p className="metric-value">{analytics.totalStudents}</p>
              </div>
              <div className="metric-card">
                <span className="metric-icon">✓</span>
                <h4>Placed Students</h4>
                <p className="metric-value">{analytics.placedStudents}</p>
              </div>
              <div className="metric-card">
                <span className="metric-icon">📈</span>
                <h4>Placement Rate</h4>
                <p className="metric-value">{analytics.placementRate}%</p>
              </div>
              <div className="metric-card">
                <span className="metric-icon">📊</span>
                <h4>Avg CGPA</h4>
                <p className="metric-value">{avgCgpaValue}</p>
              </div>
              <div className="metric-card">
                <span className="metric-icon">🏢</span>
                <h4>Active Companies</h4>
                <p className="metric-value">{analytics.activeCompanies}</p>
              </div>
              <div className="metric-card">
                <span className="metric-icon">💼</span>
                <h4>Total Job Posts</h4>
                <p className="metric-value">{analytics.totalJobsPosted}</p>
              </div>
            </div>

            {/* Year-wise Statistics */}
            <div className="statistics-section">
              <h3>📉 Placement Statistics</h3>
              <div className="stat-cards">
                <div className="stat-card">
                  <h4>Total Applications</h4>
                  <p className="stat-number">{analytics.totalApplications}</p>
                  <p className="stat-description">Across all job postings</p>
                </div>
                <div className="stat-card">
                  <h4>Unplaced Students</h4>
                  <p className="stat-number">{analytics.totalStudents - analytics.placedStudents}</p>
                  <p className="stat-description">Still seeking placements</p>
                </div>
                <div className="stat-card">
                  <h4>Avg Applications/Job</h4>
                  <p className="stat-number">{(analytics.totalApplications / analytics.totalJobsPosted).toFixed(1)}</p>
                  <p className="stat-description">Per job posting</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="tab-content">
            <h2>👨‍🎓 Student Management</h2>
            <div className="students-list">
              {students.map((student) => (
                <div key={student.id} className="student-card">
                  <div className="student-info">
                    <h4>{student.name}</h4>
                    <p><strong>Roll No:</strong> {student.rollNo}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>CGPA:</strong> {student.cgpa}</p>
                  </div>
                  <div className="student-status">
                    {student.placed ? (
                      <div className="placed-badge">
                        <span className="badge-icon">✓</span>
                        <div>
                          <p className="badge-label">Placed At</p>
                          <p className="badge-value">{student.company}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="unplaced-badge">
                        <span className="badge-icon">⊘</span>
                        <div>
                          <p className="badge-label">Not Placed</p>
                          <p className="badge-value">Seeking</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="student-actions">
                    <button className="view-details-btn" onClick={() => openModal(student, 'view')}>View Details</button>
                    <button className="edit-btn" onClick={() => openModal(student, 'edit')}>Edit</button>
                    <button className="assessment-btn" onClick={() => openModal(student, 'assessment')}>Take Assessment</button>
                    <button className="interview-btn" onClick={() => openModal(student, 'interview')}>Schedule Interview</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="tab-content">
            <h2>🏢 Company Management</h2>
            <div className="companies-list">
              {companies.map((company) => (
                <div key={company.id} className="company-card">
                  <div className="company-header">
                    <h4>{company.name}</h4>
                    <span className="company-badge">{company.recruiter}</span>
                  </div>
                  <div className="company-stats">
                    <div className="comp-stat">
                      <span className="stat-label">Jobs Posted</span>
                      <span className="stat-value">{company.jobsPosted}</span>
                    </div>
                    <div className="comp-stat">
                      <span className="stat-label">Applicants</span>
                      <span className="stat-value">{company.applicants}</span>
                    </div>
                    <div className="comp-stat">
                      <span className="stat-label">Selected</span>
                      <span className="stat-value">{company.selected}</span>
                    </div>
                  </div>
                  <div className="company-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="tab-content">
            <div className="policies-header">
              <h2>📋 Placement Policies</h2>
              <button 
                className="add-policy-btn"
                onClick={() => setShowPolicyForm(!showPolicyForm)}
              >
                {showPolicyForm ? '✕ Cancel' : '+ Add Policy'}
              </button>
            </div>

            {showPolicyForm && (
              <div className="policy-form-container">
                <h3>Add New Policy</h3>
                <form onSubmit={handleAddPolicy} className="policy-form">
                  <div className="form-group">
                    <label>Policy Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Minimum CGPA"
                      value={newPolicy.title}
                      onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Policy Value *</label>
                    <input
                      type="text"
                      placeholder="e.g., 3.0"
                      value={newPolicy.value}
                      onChange={(e) => setNewPolicy({ ...newPolicy, value: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Policy Type *</label>
                    <select
                      value={newPolicy.type}
                      onChange={(e) => setNewPolicy({ ...newPolicy, type: e.target.value })}
                    >
                      <option>Eligibility</option>
                      <option>Process</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button type="submit" className="submit-btn">Add Policy</button>
                </form>
              </div>
            )}

            <div className="policies-list">
              {policies.map((policy) => (
                <div key={policy.id} className="policy-card">
                  <div className="policy-info">
                    <h4>{policy.title}</h4>
                    <p><strong>Value:</strong> {policy.value}</p>
                    <span className={`type-badge ${policy.type.toLowerCase()}`}>{policy.type}</span>
                  </div>
                  <div className="policy-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="tab-content">
            <h2>📈 Reports & Analytics</h2>
            
            <div className="reports-section">
              <h3>Placement Summary Report</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Students</td>
                    <td>{analytics.totalStudents}</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>Placed Students</td>
                    <td>{analytics.placedStudents}</td>
                    <td>{analytics.placementRate}%</td>
                  </tr>
                  <tr>
                    <td>Unplaced Students</td>
                    <td>{analytics.totalStudents - analytics.placedStudents}</td>
                    <td>{(100 - analytics.placementRate).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>Total Job Postings</td>
                    <td>{analytics.totalJobsPosted}</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Total Applications</td>
                    <td>{analytics.totalApplications}</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="download-section">
              <h3>Export Reports</h3>
              <div className="download-buttons">
                <button className="export-btn">📥 Export PDF Report</button>
                <button className="export-btn">📊 Export Excel Data</button>
                <button className="export-btn">📋 Export CSV</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Student Actions */}
      {showModal && selectedStudent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            {modalType === 'view' && (
              <div>
                <h3>Student Details - {selectedStudent.name}</h3>
                <div className="modal-body">
                  <p><strong>Roll No:</strong> {selectedStudent.rollNo}</p>
                  <p><strong>Name:</strong> {selectedStudent.name}</p>
                  <p><strong>Email:</strong> {selectedStudent.email}</p>
                  <p><strong>CGPA:</strong> {selectedStudent.cgpa}</p>
                  <p><strong>Status:</strong> {selectedStudent.placed ? `Placed at ${selectedStudent.company}` : 'Not Placed'}</p>
                </div>
              </div>
            )}

            {modalType === 'edit' && (
              <div>
                <h3>Edit Student - {selectedStudent.name}</h3>
                <form onSubmit={handleEditStudent} className="modal-form">
                  <div className="form-group">
                    <label>Name:</label>
                    <input 
                      type="text" 
                      value={selectedStudent.name} 
                      onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input 
                      type="email" 
                      value={selectedStudent.email} 
                      onChange={(e) => setSelectedStudent({...selectedStudent, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>CGPA:</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={selectedStudent.cgpa} 
                      onChange={(e) => setSelectedStudent({...selectedStudent, cgpa: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company:</label>
                    <input 
                      type="text" 
                      value={selectedStudent.company || ''} 
                      onChange={(e) => setSelectedStudent({...selectedStudent, company: e.target.value || null})}
                    />
                  </div>
                  <button type="submit" className="save-btn">Save Changes</button>
                </form>
              </div>
            )}

            {modalType === 'assessment' && (
              <div>
                <h3>Assessment - {selectedStudent.name}</h3>
                <div className="modal-body">
                  <p>Assessment Details for {selectedStudent.name}</p>
                  <div className="assessment-info">
                    <p><strong>Subject:</strong> Technical Assessment</p>
                    <p><strong>Duration:</strong> 60 minutes</p>
                    <p><strong>Questions:</strong> 30</p>
                    <p><strong>Passing Score:</strong> 60%</p>
                  </div>
                  <button className="start-btn" onClick={handleTakeAssessment}>Start Assessment</button>
                </div>
              </div>
            )}

            {modalType === 'interview' && (
              <div>
                <h3>Schedule Interview - {selectedStudent.name}</h3>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Interview Date:</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Interview Time:</label>
                    <input type="time" />
                  </div>
                  <div className="form-group">
                    <label>Interviewer:</label>
                    <input type="text" placeholder="Enter interviewer name" />
                  </div>
                  <button className="schedule-btn" onClick={handleScheduleInterview}>Schedule Interview</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
