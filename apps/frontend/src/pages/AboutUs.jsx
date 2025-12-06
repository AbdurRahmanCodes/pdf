import React from 'react';
import { Code, Brain, Database, Cpu, Github, Linkedin, Mail, Layout, Palette, BarChart3, Map, Server, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import './AboutUs.css';

const AboutUs = () => {
  const team = [
    {
      name: 'Muhammad Zain Nasir',
      role: 'Full Stack Web Developer',
      icon: <Code className="w-6 h-6" />,
      color: 'blue',
    },
    {
      name: 'Muhammad Ahsan Aftab',
      role: 'AI Engineer',
      icon: <Brain className="w-6 h-6" />,
      color: 'purple',
    },
    {
      name: 'Abdul Moeez',
      role: 'Full Stack Web Developer',
      icon: <Code className="w-6 h-6" />,
      color: 'green',
    },
    {
      name: 'Abdur Rehman',
      role: 'Data Scientist',
      icon: <Database className="w-6 h-6" />,
      color: 'orange',
    },
    {
      name: 'Qazi Tehmas',
      role: 'Full Stack Web Developer',
      icon: <Code className="w-6 h-6" />,
      color: 'cyan',
    },
    {
      name: 'Ammar Manzoor',
      role: 'AI Engineer',
      icon: <Brain className="w-6 h-6" />,
      color: 'pink',
    },
    {
      name: 'Affan Shafiq',
      role: 'AI Engineer',
      icon: <Cpu className="w-6 h-6" />,
      color: 'indigo',
    },
  ];

  const techStack = [
    { name: 'React.js', category: 'Frontend', icon: <Layout className="w-5 h-5" /> },
    { name: 'Tailwind CSS', category: 'Styling', icon: <Palette className="w-5 h-5" /> },
    { name: 'Recharts', category: 'Visualization', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Leaflet.js', category: 'Mapping', icon: <Map className="w-5 h-5" /> },
    { name: 'Python/Flask', category: 'Backend', icon: <Server className="w-5 h-5" /> },
    { name: 'Machine Learning', category: 'AI/ML', icon: <Brain className="w-5 h-5" /> },
    { name: 'PostgreSQL', category: 'Database', icon: <Database className="w-5 h-5" /> },
    { name: 'Vite', category: 'Build Tool', icon: <Wrench className="w-5 h-5" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="about-header"
        >
          <h1 className="about-title">
            About <span className="text-primary">TechXonomy</span>
          </h1>
          <p className="about-subtitle">
            A team of passionate developers and engineers building innovative solutions for
            disaster management in Pakistan.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mission-card"
        >
          <div className="mission-glow" />
          
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-content">
            <div>
              <p className="mission-text">
                The Pakistan Disaster Management Ecosystem (PDME) is our contribution to making
                Pakistan more resilient against natural disasters. We believe that technology,
                when combined with accurate data and intelligent analysis, can save lives.
              </p>
              <p className="mission-text">
                Our platform integrates decades of historical disaster data, real-time monitoring,
                climate analytics, and AI-powered predictions to provide authorities with
                actionable intelligence.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value text-primary">24/7</div>
                <div className="stat-label">Monitoring</div>
              </div>
              <div className="stat-card">
                <div className="stat-value text-secondary">100%</div>
                <div className="stat-label">Data Driven</div>
              </div>
              <div className="stat-card">
                <div className="stat-value text-risk-medium">AI</div>
                <div className="stat-label">Powered</div>
              </div>
              <div className="stat-card">
                <div className="stat-value text-risk-low">Open</div>
                <div className="stat-label">Access</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="team-grid"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="team-card"
              >
                <div className={`team-icon-wrapper bg-${member.color}-500/20`}>
                  <div className={`team-icon text-${member.color}-400`}>{member.icon}</div>
                </div>
                <h3 className="team-name">
                  {member.name}
                </h3>
                <p className="team-role">{member.role}</p>
                
                <div className="team-socials">
                  <Github className="social-icon" />
                  <Linkedin className="social-icon" />
                  <Mail className="social-icon" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack-section">
          <h2 className="section-title">
            Technology Stack
          </h2>

          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="tech-card"
              >
                <div className="tech-icon">
                  {tech.icon}
                </div>

                <div className="tech-name">
                  {tech.name}
                </div>

                <div className="tech-category">
                  {tech.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="about-footer">
          <p className="footer-text">
            Built with ❤️ by TechXonomy for a safer Pakistan
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;