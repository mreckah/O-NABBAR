export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const TYPEWRITER_PHRASES = [
  'Data Engineer',
  'AI Systems Builder',
  'Microsoft Fabric Specialist',
  'DataOps Engineer',
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/mreckah',
  linkedin: 'https://linkedin.com/in/nabbar-oussama',
  email: 'm.reckahwalt@gmail.com',
  portfolio: 'https://mreckah.github.io',
};

export const BIO = {
  en: 'Data and AI Engineer with hands-on experience building intelligent data platforms on Microsoft Fabric. Specialized in pipeline architecture, Medallion lakehouse design, LLM integration, and DataOps automation. Passionate about combining data engineering with artificial intelligence to deliver systems that are observable, explainable, and self-monitoring.',
  fr: "Ingenieur Data et AI avec une experience pratique dans la conception de plateformes de donnees intelligentes sur Microsoft Fabric. Specialise en architecture de pipelines, lakehouse Medallion, integration LLM et automatisation DataOps. Passionne par la combinaison de l'ingenierie des donnees et de l'intelligence artificielle.",
};

export const STATS = [
  { value: '3', label: 'Internships' },
  { value: '50+', label: 'Projects' },
  { value: '18', label: 'Certifications' },
];

export const EXPERIENCES = [
  {
    company: 'SBI Africa Group',
    role: 'Data and AI Engineering Intern',
    project: 'Smart DataOps Copilot PFE',
    period: 'Feb 2026 - July 2026',
    location: 'Casablanca, On-site',
    bullets: [
      'Designed and implemented Smart DataOps Copilot, an AI-powered monitoring system for Microsoft Fabric data pipelines',
      'Medallion architecture Bronze/Silver/Gold on OneLake Lakehouse via Fabric REST API and PySpark',
      '9 Power BI dashboards covering pipelines, notebooks, storage, capacity, datasets, workspace inventory, dataset freshness',
      'AI Copilot: FastAPI + Groq LLaMA 3.3 70B + ChromaDB RAG + D3.js visualizations + runbook generation + 3-day failure forecasting',
      'Alerting system: HTML emails + Teams notifications via Power Automate + Teams Bot integration',
    ],
    tags: ['Microsoft Fabric', 'PySpark', 'FastAPI', 'LLaMA 3.3', 'ChromaDB', 'Power BI', 'D3.js', 'Power Automate', 'T-SQL'],
  },
  {
    company: 'Attijariwafa Bank',
    role: 'Data Engineering Intern',
    project: null,
    period: 'Jul 2025 - Sep 2025',
    location: 'Casablanca, On-site',
    bullets: [
      'Built complete data pipeline NiFi to HDFS to Spark to PostgreSQL to Grafana to centralize sales data',
      'Implemented Random Forest for profit prediction and Isolation Forest for anomaly detection',
      'Delivered Grafana dashboards with KPIs: sales income, units sold, customer distribution by region, age, gender, time',
    ],
    tags: ['Apache NiFi', 'HDFS', 'PySpark', 'XGBoost', 'Grafana', 'Streamlit', 'PostgreSQL', 'Random Forest', 'Isolation Forest'],
  },
  {
    company: 'Atlas Cloud Services',
    role: 'Machine Learning Intern',
    project: null,
    period: 'Jul 2024 - Aug 2024',
    location: 'Ben Guerir, Hybrid',
    bullets: [
      'Designed anomaly detection system for Fortigate network security logs',
      'Classified DDoS attacks, brute force attempts, port scanning using Isolation Forest and K-Means',
      'Gained hands-on experience with real-world network data and proactive incident response',
    ],
    tags: ['Isolation Forest', 'K-Means', 'Python', 'Network Security', 'Cybersecurity', 'ML'],
  },
];

export const FEATURED_PROJECT = {
  title: 'Smart DataOps Copilot — Microsoft Fabric',
  description:
    'Built an intelligent monitoring platform that transforms how DataOps teams understand pipeline failures. The system automatically detects issues, explains root causes using LLMs with RAG, and delivers AI-generated remediation steps through Teams and email — all within Microsoft Fabric.',
  tech: [
    'Microsoft Fabric',
    'Python',
    'PySpark',
    'T-SQL',
    'FastAPI',
    'Power BI',
    'Groq API (LLaMA 3.3)',
    'ChromaDB',
    'D3.js',
    'Power Automate',
    'Azure OpenAI',
  ],
  features: [
    '9 interactive Power BI dashboards providing continuous visibility into pipeline health, capacity usage, storage evolution, and dataset freshness',
    'Conversational DataOps Agent (FastAPI + LLaMA 3.3) that answers natural language questions, generates incident diagnoses, produces interactive D3.js charts, automated runbooks, failure forecasts, and PDF reports',
    'Intelligent alerting system with AI-enriched notifications that surfaces root cause and suggested fixes automatically',
  ],
  github: 'https://github.com/mreckah/DataOps-Agent',
  demo: null,
};

export const PROJECTS = [
  {
    title: 'Remedy — AI Healthcare Assistant',
    description:
      'Developed an AI-powered healthcare application that provides personalized skin health analysis through natural conversation. The system combines computer vision, language models, and voice interaction to deliver accessible medical insights and automated report generation.',
    tags: ['ResNet50', 'Llama-3.3-70b', 'Whisper AI', 'ChromaDB', 'FastAPI', 'Python'],
    github: 'https://github.com/mreckah/medical-assistant',
  },
  {
    title: 'Attijariwafa Bank Data Pipeline & Analytics',
    description:
      'Built a comprehensive data pipeline centralizing sales data across the organization. Implemented anomaly detection and interactive dashboards to surface marketing insights and operational patterns.',
    tags: ['NiFi', 'HDFS', 'Spark', 'PostgreSQL', 'Grafana', 'Random Forest', 'Anomaly Detection'],
    github: 'https://github.com/mreckah/EcomPipeline',
  },
  {
    title: 'Amazon Delivery Data Pipeline',
    description:
      'Developed a distributed data pipeline processing millions of delivery records. Implemented a predictive model for delivery time estimation and built comprehensive dashboards for performance analysis across agents and traffic patterns.',
    tags: ['HDFS', 'Spark', 'PostgreSQL', 'Grafana', 'Logistics', 'ML'],
    github: 'https://github.com/mreckah/DeliveryPipeline',
  },
  {
    title: 'Network Anomaly Detection System',
    description:
      'Machine learning system detecting and classifying network anomalies using Isolation Forest and K-Means algorithms. Identifies DDoS attacks, brute force attempts, and port scanning activities in real-time.',
    tags: ['Isolation Forest', 'K-Means', 'Network Security', 'Python', 'Anomaly Detection'],
    github: 'https://github.com/mreckah',
  },
  {
    title: 'Souk Platform (Hackathon — 3rd Place)',
    description:
      'Inclusive e-commerce platform integrating AI chatbot functionality with accessibility-focused navigation design, making online shopping accessible to all users.',
    tags: ['Accessibility', 'AI Chatbot', 'E-commerce', 'Hackathon'],
    github: 'https://github.com/mreckah',
  },
];

export const SKILL_CATEGORIES = [
  {
    label: 'Microsoft Fabric',
    skills: [
      'Lakehouse', 'Warehouse', 'Eventhouse', 'Eventstreams', 'Pipelines',
      'Copy Jobs', 'Data Activator', 'KQL', 'Semantic Models',
      'Power BI Dashboards', 'Real-Time Intelligence', 'OneLake',
    ],
  },
  {
    label: 'Data Engineering',
    skills: [
      'PySpark', 'Spark', 'Hadoop', 'Kafka', 'Apache NiFi', 'ETL/ELT',
      'Medallion Architecture', 'Great Expectations', 'Delta Lake', 'Fabric REST API',
    ],
  },
  {
    label: 'AI and LLM',
    skills: [
      'Groq API', 'LLaMA 3.3', 'Azure OpenAI', 'OpenRouter', 'FastAPI',
      'ChromaDB', 'RAG', 'Prompt Engineering', 'LangChain', 'Agents',
    ],
  },
  {
    label: 'Machine Learning',
    skills: [
      'XGBoost', 'Isolation Forest', 'Random Forest', 'K-Means',
      'Classification', 'Clustering', 'Anomaly Detection', 'Scikit-learn',
    ],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'T-SQL', 'SQLite', 'Elasticsearch'],
  },
  {
    label: 'Visualization',
    skills: ['Power BI', 'Grafana', 'D3.js', 'Streamlit', 'Tableau', 'Kibana', 'Matplotlib', 'Seaborn'],
  },
  {
    label: 'Programming',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Java', 'C'],
  },
  {
    label: 'DevOps',
    skills: ['Git', 'GitHub', 'Docker', 'Linux', 'Agile Scrum', 'Jira', 'ngrok', 'Vercel'],
  },
];

export const CERTIFICATIONS = [
  {
    name: 'AWS Academy Graduate - Data Engineering',
    issuer: 'Amazon Web Services',
    date: 'Jan 2026',
    link: 'https://www.credly.com/badges/2e2c6aff-9211-4872-8095-50deae9c6407',
  },
  {
    name: 'AWS Academy Graduate - Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'Jan 2026',
    link: 'https://www.credly.com/badges/9f997453-12aa-448a-893c-0057e1b5875e',
  },
  {
    name: 'Cisco CyberOps Associate',
    issuer: 'Cisco',
    date: 'Jan 2026',
    link: 'https://www.credly.com/badges/a9f36067-5966-42cb-b847-c4208c494190',
  },
  {
    name: 'Databricks AI Agent Fundamentals',
    issuer: 'Databricks',
    date: 'May 2026',
    link: 'https://credentials.databricks.com/7d69f3b1-6159-4e7c-ab21-bd9719638316',
  },
  {
    name: 'Databricks Generative AI Fundamentals',
    issuer: 'Databricks',
    date: 'May 2026',
    link: 'https://credentials.databricks.com/e170b0be-7a2c-4326-938f-bec191afd91a',
  },
  {
    name: 'Databricks Fundamentals',
    issuer: 'Databricks',
    date: 'May 2026',
    link: 'https://credentials.databricks.com/45515025-3ee2-43e7-8ae3-43b8e5282f45',
  },
];
