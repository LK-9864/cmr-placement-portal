import React, { useState } from 'react';
import './Login.css';

const CMR_STUDENTS = [
  {
    id: 1,
    name: 'Aditya',
    email: 'aditya@cmr.edu.in',
    rollNo: 'CMR001'
  },
  {
    id: 2,
    name: 'Harish',
    email: 'harish@cmr.edu.in',
    rollNo: 'CMR002'
  },
  {
    id: 3,
    name: 'Gobinath',
    email: 'gobinath@cmr.edu.in',
    rollNo: 'CMR003'
  },
  {
    id: 4,
    name: 'Chethen',
    email: 'chethen@cmr.edu.in',
    rollNo: 'CMR004'
  },
  {
    id: 5,
    name: 'Nithish',
    email: 'nithish@cmr.edu.in',
    rollNo: 'CMR005'
  },
  {
    id: 6,
    name: 'Lakshmikanth N',
    email: 'lakshmikanth@cmr.edu.in',
    rollNo: 'CMR006'
  },
  {
    id: 7,
    name: 'Narendra',
    email: 'narendra@cmr.edu.in',
    rollNo: 'CMR007'
  },
  {
    id: 8,
    name: 'Albi',
    email: 'albi@cmr.edu.in',
    rollNo: 'CMR008'
  }
];

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    userType: 'student', // student, teacher, or other
    phone: '',
    rollNo: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    const student = CMR_STUDENTS.find(s => s.email.toLowerCase() === email.toLowerCase());
    
    if (student) {
      setError('');
      setEmail('');
      onLogin(student);
    } else {
      // Check if user is registered via signup
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      const registeredUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (registeredUser) {
        setError('');
        setEmail('');
        onLogin(registeredUser);
      } else {
        setError('Email not found. Please sign up first or use a valid CMR email.');
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!registrationData.name || !registrationData.email) {
      setError('Name and Email are required');
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Check if email already exists
    const emailExists = registeredUsers.some(u => u.email.toLowerCase() === registrationData.email.toLowerCase());
    if (emailExists) {
      setError('This email is already registered. Please login instead.');
      return;
    }

    // Add new user
    const newUser = {
      id: Date.now(),
      ...registrationData
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    setSuccess('Registration successful! You can now login.');
    setError('');
    setRegistrationData({
      name: '',
      email: '',
      userType: 'student',
      phone: '',
      rollNo: ''
    });
    
    setTimeout(() => {
      setIsLogin(true);
      setSuccess('');
    }, 2000);
  };

  const handleSelectStudent = (student) => {
    setEmail(student.email);
    setShowDropdown(false);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🎓 CMR Placement Portal</h1>
          <p>Find Your Perfect Job</p>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setSuccess('');
            }}
          >
            Login
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setSuccess('');
            }}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          // LOGIN FORM
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowDropdown(e.target.value.length > 0);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="email-input"
              />
              
              {showDropdown && email && (
                <div className="email-dropdown">
                  <p className="dropdown-title">CMR Students:</p>
                  {CMR_STUDENTS.filter(s => 
                    s.email.includes(email.toLowerCase()) || email === ''
                  ).map(student => (
                    <div
                      key={student.id}
                      className="dropdown-item"
                      onClick={() => {
                        handleSelectStudent(student);
                        setShowDropdown(false);
                      }}
                    >
                      <div className="student-name">{student.name}</div>
                      <div className="student-email">{student.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
        ) : (
          // REGISTRATION FORM
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={registrationData.name}
                onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                className="email-input"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={registrationData.email}
                onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                className="email-input"
              />
            </div>

            <div className="form-group">
              <label>User Type</label>
              <select
                value={registrationData.userType}
                onChange={(e) => setRegistrationData({...registrationData, userType: e.target.value})}
                className="email-input"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="recruiter">Recruiter</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number (Optional)</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={registrationData.phone}
                onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                className="email-input"
              />
            </div>

            <div className="form-group">
              <label>Roll Number (For CMR Students)</label>
              <input
                type="text"
                placeholder="e.g., CMR001"
                value={registrationData.rollNo}
                onChange={(e) => setRegistrationData({...registrationData, rollNo: e.target.value})}
                className="email-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="login-btn">
              Create Account
            </button>
          </form>
        )}

        {isLogin && (
          <div className="quick-access">
            <p className="quick-title">Quick Access - CMR Students:</p>
            <div className="student-list">
              {CMR_STUDENTS.map(student => (
                <button
                  key={student.id}
                  type="button"
                  className="student-quick-btn"
                  onClick={() => {
                    setEmail(student.email);
                    handleSelectStudent(student);
                  }}
                >
                  {student.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="login-footer">
          <p>Welcome to CMR College of Engineering & Technology</p>
          <p className="footer-text">Placement & Training Cell</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
