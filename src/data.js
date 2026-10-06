export const profile = {
  name: 'Srinivas Kanuparthi',
  email: 'srinivasdharanik@gmail.com',
  linkedin: 'https://www.linkedin.com/in/srinivas-kanuparthi/',
  resume: './srinivas-kanuparthi-resume.pdf',
};

// Add the data platform URL here when it is deployed; the card updates automatically.
export const projects = [
  {
    id: 'jarvis', number: '01', category: 'Personal AI', title: 'JARVIS',
    description: 'My local voice assistant: wake-word detection, deterministic actions, local AI model routing, and a React HUD that makes the system visible.',
    tags: ['Python', 'React', 'Ollama', 'WebSockets', 'Voice'],
    url: null, status: 'local', visual: 'jarvis', linkLabel: 'Explore the Jarvis lab',
  },
  {
    id: 'ai-academy', number: '02', category: 'Artificial intelligence', title: 'AI Academy',
    description: 'A learning platform dedicated to artificial intelligence. Built at the intersection of my curiosity about AI and my love of creating useful software.',
    tags: ['Artificial intelligence', 'Learning platform'],
    url: 'https://ai-learning-platform-3fp.pages.dev/',
    visual: 'ai', linkLabel: 'Explore AI Academy',
  },
  {
    id: 'data-platform', number: '03', category: 'Data engineering', title: 'Data Engineering Learning Platform',
    description: 'A dedicated space for learning data engineering. Exploring the systems and ideas behind how data moves, transforms, and becomes useful.',
    tags: ['Data engineering', 'Learning platform'],
    url: null,
    visual: 'data', linkLabel: 'Explore the platform',
  },
];

export const work = [
  { company: 'Airbus', value: '30', unit: '%', metric: 'lower system latency', title: 'Cloud applications, made faster.', description: 'Developed cloud-native aircraft customization applications with Node.js and AWS, reducing system latency by 30%.', tags: ['Node.js', 'AWS', 'Microservices'], detail: 'Contributed to application development and performance improvements. At Airbus, I also led five engineers designing and deploying scalable microservices.' },
  { company: 'Airbus', value: '40', unit: '%', metric: 'faster ETL job execution', title: 'Less waiting. More processing.', description: 'Optimized an AWS Glue ETL pipeline, cutting execution time by 40% and improving data-processing efficiency.', tags: ['AWS Glue', 'ETL', 'Performance'], detail: 'Focused on improving the existing pipeline’s runtime efficiency, extending my backend experience into hands-on AWS data-processing optimization.' },
  { company: 'Capgemini', value: '50', unit: '+', metric: 'microservices managed', title: 'Reliability across an ecosystem.', description: 'Managed more than 50 AWS microservices for a restaurant management platform, supporting reliable production operations.', tags: ['AWS', 'Microservices', 'Deployment'], detail: 'Worked on microservices operations and deployment improvements, with a focus on platform availability and scalability.' },
  { company: 'CGI', value: 'VB', unit: '→ AWS', metric: 'legacy to cloud', title: 'A new chapter for legacy software.', description: 'Modernized a Visual Basic healthcare application using Node.js and Angular, with serverless deployment on AWS.', tags: ['Node.js', 'Angular', 'Serverless'], detail: 'Contributed to converting the legacy application and deploying it to AWS. My work covered application development and the shift to serverless infrastructure.' },
];

export const careers = [
  { company: 'Airbus', role: 'Lead Software Engineer', dates: 'Oct 2022 — Present', year: '2022', description: 'End-to-end technical ownership of the Database Migration Accelerator: parallel migration execution, reliability, live status tracking, corporate SSO, and data-compliance and industrialization activities. Additional work includes cloud-native applications, AWS Glue optimization, and leading five engineers in microservices delivery.' },
  { company: 'Capgemini', role: 'Software Consultant', dates: 'Apr 2021 — Oct 2022', year: '2021', description: 'AWS microservices operations and deployment improvements for a restaurant management platform.' },
  { company: 'CGI Information Systems', role: 'Software Engineer', dates: 'May 2020 — Apr 2021', year: '2020', description: 'Healthcare application modernization with Node.js and Angular, followed by serverless deployment on AWS.' },
  { company: 'Anblicks Solutions', role: 'Software Engineer', dates: 'Jul 2019 — May 2020', year: '2019', description: 'Developed an AI-based image recognition service for a real estate application using Node.js and AWS.' },
  { company: 'Doche Cloud Technologies', role: 'Software Engineer', dates: 'Jun 2017 — Jul 2019', year: '2017', description: 'The start of my professional software engineering journey.' },
];

export const expertise = [
  { id: 'services', name: 'Backend', icon: 'code', title: 'The logic behind the experience.', description: 'My core focus: building services, defining clear boundaries, and making complex business logic maintainable.', tools: ['Node.js', 'TypeScript', 'JavaScript', 'Express.js', 'HapiJS', 'REST APIs', 'Microservices', 'Event-driven systems'] },
  { id: 'cloud', name: 'Cloud', icon: 'cloud', title: 'Built to run beyond localhost.', description: 'AWS infrastructure, serverless applications, and the delivery practices that connect development to production.', tools: ['AWS Lambda', 'API Gateway', 'EC2', 'IAM', 'CloudFormation', 'Docker', 'Jenkins', 'GitHub Actions', 'Terraform'] },
  { id: 'data', name: 'Data', icon: 'database', title: 'Make the data work harder.', description: 'From database modernization to pipeline performance, connecting storage, processing, and messaging.', tools: ['PostgreSQL', 'Oracle', 'MongoDB', 'DynamoDB', 'MySQL', 'RDS', 'S3', 'AWS Glue', 'SQS', 'SNS', 'Step Functions'] },
  { id: 'quality', name: 'Delivery', icon: 'layers', title: 'Ownership beyond the code.', description: 'Testing, cross-stack collaboration, and technical leadership that help teams turn ideas into reliable software.', tools: ['Jest', 'Mocha', 'Chai', 'HapiLab', 'Angular', 'React', 'Python', 'Kubernetes', 'Agile delivery', 'Team leadership'] },
];

export const systemNodes = [
  { id: 'api', label: 'APIs', caption: 'The interface', icon: 'code', x: 20, y: 24, description: 'REST APIs and integrations give applications clear, dependable ways to communicate.' },
  { id: 'cloud', label: 'AWS', caption: 'The infrastructure', icon: 'cloud', x: 80, y: 24, description: 'Serverless compute and AWS infrastructure support scalable, cloud-native applications.' },
  { id: 'services', label: 'Node.js', caption: 'The engine', icon: 'layers', x: 50, y: 49, description: 'Node.js and TypeScript sit at the heart of my backend engineering practice.' },
  { id: 'data', label: 'Data', caption: 'The foundation', icon: 'database', x: 20, y: 76, description: 'Relational databases and data pipelines turn application activity into useful, durable information.' },
  { id: 'events', label: 'Events', caption: 'The connections', icon: 'activity', x: 80, y: 76, description: 'Event-driven systems connect services through messaging and asynchronous workflows.' },
];
