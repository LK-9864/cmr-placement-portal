const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration for both local and production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://cmr-placement-frontend.onrender.com',
    'https://cmr-placement-api.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// In-memory storage (replace with MongoDB when ready)
let jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Corp',
    tagline: 'Building the future of technology',
    description: 'We are looking for experienced software engineers to join our innovative team',
    requirements: 'JavaScript, Node.js, React'
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: 'Data Analytics Inc',
    tagline: 'Transforming data into insights',
    description: 'Join our data science team and work on cutting-edge analytics projects',
    requirements: 'Python, Machine Learning, SQL'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'TCS is hiring full stack developers for enterprise software development',
    requirements: 'Java, Spring Boot, React, PostgreSQL, 2+ years experience'
  },
  {
    id: 4,
    title: 'Cloud Solutions Architect',
    company: 'AWS',
    tagline: 'Powering the cloud',
    description: 'Join AWS and design scalable cloud infrastructure for global customers',
    requirements: 'AWS Services, CloudFormation, Python, System Design, 3+ years experience'
  },
  {
    id: 5,
    title: 'Systems Engineer',
    company: 'Dell Technologies',
    tagline: 'Technology that moves the world',
    description: 'Help us build reliable and innovative infrastructure solutions',
    requirements: 'Linux, Networking, C++, Hardware knowledge, 2+ years experience'
  },
  {
    id: 6,
    title: 'Senior Developer',
    company: 'HCL Technologies',
    tagline: 'Supercharging Progress',
    description: 'HCL is looking for senior developers to lead technology initiatives',
    requirements: 'Java, Microservices, Docker, Kubernetes, 5+ years experience'
  },
  {
    id: 7,
    title: 'Business Analyst',
    company: 'Accenture',
    tagline: 'Let there be change',
    description: 'Join Accenture and help clients drive digital transformation',
    requirements: 'Business Analysis, SQL, Power BI, Communication skills, 2+ years experience'
  },
  {
    id: 8,
    title: 'DevOps Engineer',
    company: 'AWS',
    tagline: 'Powering the cloud',
    description: 'Build and maintain CI/CD pipelines for global scale applications',
    requirements: 'AWS, Jenkins, Docker, Terraform, Git, 3+ years experience'
  },
  {
    id: 9,
    title: 'Database Administrator',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'Manage and optimize databases for enterprise clients worldwide',
    requirements: 'Oracle/SQL Server, Performance Tuning, Backup/Recovery, 3+ years experience'
  },
  {
    id: 10,
    title: 'QA Automation Engineer',
    company: 'HCL Technologies',
    tagline: 'Supercharging Progress',
    description: 'Create automated testing frameworks for software quality assurance',
    requirements: 'Selenium, TestNG, Java, API Testing, 2+ years experience'
  },
  {
    id: 11,
    title: 'Infrastructure Engineer',
    company: 'Dell Technologies',
    tagline: 'Technology that moves the world',
    description: 'Design and deploy enterprise infrastructure solutions',
    requirements: 'Network Administration, Virtualization, Storage Systems, 3+ years experience'
  },
  {
    id: 12,
    title: 'Management Consultant',
    company: 'Accenture',
    tagline: 'Let there be change',
    description: 'Consult with enterprises on strategy and digital transformation',
    requirements: 'Strategic Thinking, MBA preferred, Consulting background, 2+ years experience'
  },
  {
    id: 13,
    title: 'Java Developer',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'Develop enterprise Java applications for global clients',
    requirements: 'Java, Spring Framework, Hibernate, 2+ years experience'
  },
  {
    id: 14,
    title: 'Solutions Architect',
    company: 'Accenture',
    tagline: 'Let there be change',
    description: 'Design solutions for client digital transformation initiatives',
    requirements: 'System Design, Cloud Architecture, 5+ years experience'
  },
  {
    id: 15,
    title: 'Network Engineer',
    company: 'Dell Technologies',
    tagline: 'Technology that moves the world',
    description: 'Design and manage enterprise network infrastructure',
    requirements: 'Cisco/Juniper, Routing, Switching, 3+ years experience'
  },
  {
    id: 16,
    title: 'Mobile Application Developer',
    company: 'HCL Technologies',
    tagline: 'Supercharging Progress',
    description: 'Build iOS and Android applications for global clients',
    requirements: 'Swift/Kotlin, React Native, 2+ years experience'
  },
  {
    id: 17,
    title: 'Security Engineer',
    company: 'AWS',
    tagline: 'Powering the cloud',
    description: 'Implement security solutions for cloud infrastructure',
    requirements: 'AWS Security, IAM, Encryption, 3+ years experience'
  },
  {
    id: 18,
    title: 'UI/UX Designer',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'Design user-centered interfaces for digital products',
    requirements: 'Figma, Adobe XD, User Research, 2+ years experience'
  },
  {
    id: 19,
    title: 'Cybersecurity Analyst',
    company: 'HCL Technologies',
    tagline: 'Supercharging Progress',
    description: 'Protect enterprise systems from cyber threats',
    requirements: 'Network Security, Penetration Testing, CISSP, 3+ years experience'
  },
  {
    id: 20,
    title: 'Big Data Engineer',
    company: 'Accenture',
    tagline: 'Let there be change',
    description: 'Build scalable big data solutions using Hadoop/Spark',
    requirements: 'Hadoop, Spark, Scala, 3+ years experience'
  },
  {
    id: 21,
    title: 'Project Manager',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'Lead and manage enterprise software projects from conception to delivery',
    requirements: 'PMP/PRINCE2, Agile, Team Management, 5+ years experience'
  },
  {
    id: 22,
    title: 'Machine Learning Engineer',
    company: 'AWS',
    tagline: 'Powering the cloud',
    description: 'Develop and deploy ML models on AWS SageMaker for enterprise solutions',
    requirements: 'Python, TensorFlow, SageMaker, 3+ years experience'
  },
  {
    id: 23,
    title: 'Frontend Developer',
    company: 'HCL Technologies',
    tagline: 'Supercharging Progress',
    description: 'Build responsive and interactive web applications using modern frameworks',
    requirements: 'React, Vue.js, Angular, CSS, 2+ years experience'
  },
  {
    id: 24,
    title: 'Backend Developer',
    company: 'Accenture',
    tagline: 'Let there be change',
    description: 'Design and develop scalable backend systems for enterprise applications',
    requirements: 'Node.js, Python, Microservices, 2+ years experience'
  },
  {
    id: 25,
    title: 'Data Analyst',
    company: 'Dell Technologies',
    tagline: 'Technology that moves the world',
    description: 'Analyze business data and provide insights for strategic decisions',
    requirements: 'SQL, Power BI, Excel, Statistics, 2+ years experience'
  },
  {
    id: 26,
    title: 'Technical Lead',
    company: 'HCL Technologies',
    tagline: 'Supercharging Progress',
    description: 'Lead technical teams and guide architecture decisions for projects',
    requirements: 'System Design, 7+ years experience, Leadership skills'
  },
  {
    id: 27,
    title: 'Product Manager',
    company: 'AWS',
    tagline: 'Powering the cloud',
    description: 'Define and launch new AWS services and features',
    requirements: 'Product Strategy, Market Analysis, 5+ years experience'
  },
  {
    id: 28,
    title: 'Business Analyst',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'Gather and analyze business requirements for software solutions',
    requirements: 'Requirements Analysis, SQL, 2+ years experience'
  },
  {
    id: 29,
    title: 'Scrum Master',
    company: 'Accenture',
    tagline: 'Let there be change',
    description: 'Facilitate Agile processes and remove team blockers',
    requirements: 'Scrum Certification, Agile experience, 3+ years'
  },
  {
    id: 30,
    title: 'Cloud Engineer',
    company: 'AWS',
    tagline: 'Powering the cloud',
    description: 'Design and manage cloud infrastructure for clients',
    requirements: 'AWS, Infrastructure as Code, Terraform, 3+ years experience'
  },
  {
    id: 31,
    title: 'Test Automation Engineer',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'Create automation frameworks for comprehensive software testing',
    requirements: 'Selenium, Python, Test Design, 2+ years experience'
  },
  {
    id: 32,
    title: 'Senior Architect',
    company: 'Dell Technologies',
    tagline: 'Technology that moves the world',
    description: 'Design enterprise solutions and guide technical strategy',
    requirements: 'System Architecture, 10+ years experience, Leadership'
  },
  {
    id: 33,
    title: 'Blockchain Developer',
    company: 'HCL Technologies',
    tagline: 'Supercharging Progress',
    description: 'Develop blockchain-based solutions for enterprise clients',
    requirements: 'Solidity, Ethereum, Smart Contracts, 2+ years experience'
  },
  {
    id: 34,
    title: 'AI/ML Specialist',
    company: 'Accenture',
    tagline: 'Let there be change',
    description: 'Implement AI/ML solutions for business automation and insights',
    requirements: 'Deep Learning, NLP, TensorFlow, 3+ years experience'
  },
  {
    id: 35,
    title: 'DevOps Specialist',
    company: 'TCS (Tata Consultancy Services)',
    tagline: 'Building tomorrow, together',
    description: 'Manage CI/CD pipelines and infrastructure automation',
    requirements: 'Docker, Kubernetes, Jenkins, AWS/Azure, 3+ years experience'
  }
];

let nextId = 35;

// API Routes
// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'CMR Placement Portal API',
    status: 'Running',
    endpoints: {
      jobs: '/api/jobs',
      addJob: 'POST /api/jobs'
    }
  });
});

// API Routes
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: nextId++,
    ...req.body
  };
  jobs.push(newJob);
  res.json(newJob);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));