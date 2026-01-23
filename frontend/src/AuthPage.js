import React, { useState } from 'react';
import './AuthPage.css';

const STUDENTS = [
  { id: 1, name: 'Aditya', email: 'aditya@cmr.edu.in', role: 'student', rollNo: 'CMR001' },
  { id: 2, name: 'Harish', email: 'harish@cmr.edu.in', role: 'student', rollNo: 'CMR002' },
  { id: 3, name: 'Gobinath', email: 'gobinath@cmr.edu.in', role: 'student', rollNo: 'CMR003' },
  { id: 4, name: 'Chethen', email: 'chethen@cmr.edu.in', role: 'student', rollNo: 'CMR004' },
  { id: 5, name: 'Nithish', email: 'nithish@cmr.edu.in', role: 'student', rollNo: 'CMR005' },
  { id: 6, name: 'Lakshmikanth N', email: 'lakshmikanth@cmr.edu.in', role: 'student', rollNo: 'CMR006' },
  { id: 7, name: 'Narendra', email: 'narendra@cmr.edu.in', role: 'student', rollNo: 'CMR007' },
  { id: 8, name: 'Albi', email: 'albi@cmr.edu.in', role: 'student', rollNo: 'CMR008' }
];

const RECRUITERS = [
  { id: 101, company: 'TCS', email: 'hr@tcs.com', role: 'recruiter' },
  { id: 102, company: 'AWS', email: 'hiring@aws.com', role: 'recruiter' },
  { id: 103, company: 'Dell', email: 'careers@dell.com', role: 'recruiter' },
  { id: 104, company: 'HCL', email: 'recruitment@hcl.com', role: 'recruiter' },
  { id: 105, company: 'Accenture', email: 'jobs@accenture.com', role: 'recruiter' }
];

const ADMINS = [
  { id: 201, name: 'TPO Admin', email: 'admin@cmr.edu.in', role: 'admin' },
  { id: 202, name: 'Placement Officer', email: 'tpo@cmr.edu.in', role: 'admin' }
];

function AuthPage({ onLogin }) {
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const getUserList = () => {
    switch (userType) {
      case 'student':
        return STUDENTS;
      case 'recruiter':
        return RECRUITERS;
      case 'admin':
        return ADMINS;
      default:
        return [];
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userList = getUserList();
    const user = userList.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError(`Invalid ${userType} email`);
    }
  };

  const handleSelectUser = (user) => {
    setEmail(user.email);
    setShowDropdown(false);
    setError('');
  };

  const filteredUsers = getUserList().filter(u => 
    u.email.includes(email.toLowerCase()) || email === ''
  );

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🚀 HireSense</h1>
          <p>AI-Powered Placement Portal</p>
        </div>

        {/* User Type Selector */}
        <div className="user-type-selector">
          <button
            className={`type-btn ${userType === 'student' ? 'active' : ''}`}
            onClick={() => { setUserType('student'); setEmail(''); setError(''); }}
          >
            👨‍🎓 Student
          </button>
          <button
            className={`type-btn ${userType === 'recruiter' ? 'active' : ''}`}
            onClick={() => { setUserType('recruiter'); setEmail(''); setError(''); }}
          >
            💼 Recruiter
          </button>
          <button
            className={`type-btn ${userType === 'admin' ? 'active' : ''}`}
            onClick={() => { setUserType('admin'); setEmail(''); setError(''); }}
          >
            👨‍💼 Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              onFocus={() => setShowDropdown(true)}
              className="email-input"
            />
            
            {showDropdown && filteredUsers.length > 0 && (
              <div className="email-dropdown">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="dropdown-item"
                    onClick={() => handleSelectUser(user)}
                  >
                    {userType === 'student' && (
                      <>
                        <div className="user-info">{user.name}</div>
                        <div className="user-sub">{user.email} • {user.rollNo}</div>
                      </>
                    )}
                    {userType === 'recruiter' && (
                      <>
                        <div className="user-info">{user.company}</div>
                        <div className="user-sub">{user.email}</div>
                      </>
                    )}
                    {userType === 'admin' && (
                      <>
                        <div className="user-info">{user.name}</div>
                        <div className="user-sub">{user.email}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Sign In as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </button>
        </form>

        {/* Quick Access */}
        <div className="quick-access">
          <p className="quick-title">Quick Access:</p>
          <div className="quick-list">
            {getUserList().slice(0, 4).map(user => (
              <button
                key={user.id}
                type="button"
                className="quick-btn"
                onClick={() => handleSelectUser(user)}
              >
                {userType === 'student' && user.name.split(' ')[0]}
                {userType === 'recruiter' && user.company}
                {userType === 'admin' && user.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="auth-footer">
          <p>Demo Credentials for Testing</p>
          <p className="footer-text">HireSense v1.0</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
