
import React, { useState, useEffect } from 'react';
import { FaSpinner, FaCheck } from 'react-icons/fa';

import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaDownload,
  FaCopy,
  FaWhatsapp,
  FaBriefcase,
  FaClock,
  FaGlobe,FaCode,FaUserTie,FaCalendarAlt,FaCheckCircle
} from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

const Portfolio = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [copiedText, setCopiedText] = useState('');
const [submitStatus, setSubmitStatus] = useState('');
  const [isVisible, setIsVisible] = useState({
    about: false,
    skills: false,
    experience: false,
    projects: false,
    contact: false
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setNav(false);
    }
  };
  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
const copyToClipboard = (text, type) => {
  navigator.clipboard.writeText(text);
  setCopiedText(type);
  setTimeout(() => setCopiedText(''), 2000);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.message) {
    setSubmitStatus('error');
    setTimeout(() => setSubmitStatus(''), 3000);
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus('');

  try {
    // Using EmailJS service
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_portfolio', // You'll need to replace with your EmailJS service ID
        template_id: 'template_portfolio', // You'll need to replace with your EmailJS template ID
        user_id: 'your_emailjs_user_id', // You'll need to replace with your EmailJS user ID
        template_params: {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'umersoft07@gmail.com'
        }
      })
    });

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    // Fallback to mailto if EmailJS fails
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:umersoft07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(''), 5000);
  }
};


  const skills = [
    { name: 'Manual Testing', category: 'Testing', level: 90 },
    { name: 'API Testing', category: 'Testing', level: 85 },
    { name: 'Database Testing', category: 'Testing', level: 80 },
    { name: 'Selenium', category: 'Automation', level: 75 },
    { name: 'JIRA', category: 'Tools', level: 95 },
    { name: 'Postman', category: 'Tools', level: 90 },
    { name: 'Python', category: 'Programming', level: 85 },
    { name: 'SQL/MySQL', category: 'Database', level: 85 },
  ];

  const projects = [
    {
      id: 1,
      name: 'C-Holder',
      desc: 'Web and mobile application for card activity management',
      details:
        'Enables customers to view and manage their card activities, including transaction history, balance, debit, and credit amounts.',
      technologies: ['Manual Testing', 'API Testing', 'Mobile Testing', 'Database Testing'],
      type: 'Financial Application',
    },
    {
      id: 2,
      name: 'C-Manager/Admin',
      desc: 'Internal web application for card management',
      details:
        'Designed for generating client cards and configuring rules for various card types including credit, debit, and prepaid cards.',
      technologies: ['Web Testing', 'Functional Testing', 'UI Testing', 'Integration Testing'],
      type: 'Admin Dashboard',
    },
    {
      id: 3,
      name: 'C-Agent',
      desc: 'Customer support application',
      details:
        'Internal web application for Customer Support Representatives to verify, troubleshoot, and activate cards.',
      technologies: ['Manual Testing', 'UAT', 'Regression Testing', 'IVR Testing'],
      type: 'Support System',
    },
    {
      id: 4,
      name: 'Ecom FBA',
      desc: 'Amazon fulfillment system',
      details:
        'Amazon system for storing, picking, packing, shipping, and delivering products to customers.',
      technologies: ['E-commerce Testing', 'Integration Testing', 'Performance Testing'],
      type: 'E-commerce Platform',
    },
    {
      id: 5,
      name: 'QikFinds',
      desc: 'Product search extension',
      details:
        'Browser extension providing intelligence on sales and promotions from hundreds of online retailers.',
      technologies: ['Browser Testing', 'API Testing', 'Cross-platform Testing'],
      type: 'Browser Extension',
    },
    {
      id: 6,
      name: 'European Outdoor',
      desc: 'Employee management system',
      details:
        'Integrated system developed to facilitate user management for employees in outdoor industry.',
      technologies: ['System Testing', 'User Management Testing', 'Integration Testing'],
      type: 'Management System',
    },
  ];

  const experience = [
    {
      title: 'Quality Engineer',
      company: 'I2C INC',
      period: 'Feb 2024 - Present',
      achievements: [
        'Executed comprehensive test cases aligned with project requirements',
        'Conducted functional, integration, smoke, sanity, UI, regression, UAT and database testing',
        'Specialized in implementing client-specific solutions for credit, debit, and prepaid clients',
        'Performed IVR verification and testing',
        'Proficient in Linux environment including log analysis',
      ],
    },
    {
      title: 'Associate SQA Engineer',
      company: 'QBATCH',
      period: 'July 2022 - Jan 2024',
      achievements: [
        'Performed smoke, functional, and regression testing for web and mobile applications',
        'Designed and executed test cases using JIRA for issue tracking',
        'Conducted UI/UX testing across various devices and platforms',
        'Collaborated with development teams to resolve software defects efficiently',
      ],
    },
    {
      title: 'SQA Intern',
      company: 'DEVSINC',
      period: 'March 2022 - May 2022',
      achievements: [
        'Performed smoke, functional, and regression testing',
        'Conducted API Testing using Postman',
        'Performed Load and Stress Testing',
        'Gained hands-on experience in Manual Testing',
      ],
    },
  ];

  const AnimatedSection = ({ children, id, className = "" }) => (
    <section
      id={id}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible[id] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </section>
  );

  const AnimatedCard = ({ children, delay = 0 }) => (
    <div
      className="transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 8s ease infinite;
        }
        
        .animate-text-shimmer {
          background: linear-gradient(
            90deg,
            #64748b 0%,
            #06b6d4 50%,
            #64748b 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .glass-effect {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glow-effect {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
        }
        
        .skill-bar {
          position: relative;
          overflow: hidden;
        }
        
        .skill-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: skill-shine 2s ease-in-out infinite;
        }
        
        @keyframes skill-shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .typing-animation {
          overflow: hidden;
          border-right: 2px solid #06b6d4;
          white-space: nowrap;
          animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #06b6d4; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="fixed w-full h-20 glass-effect z-50 transition-all duration-300">
        <div className="flex justify-between items-center w-full h-full px-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-text-shimmer">
            Umer Owais
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={`capitalize relative group transition-all duration-300 font-medium ${
                    activeSection === item ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => setNav(!nav)}>
            {!nav ? <FaBars size={24} className="text-cyan-400" /> : <FaTimes size={24} className="text-cyan-400" />}
          </div>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`${
            !nav ? 'hidden' : 'absolute'
          } top-0 left-0 w-full h-screen glass-effect flex flex-col justify-center items-center space-y-8 md:hidden transition-all duration-500`}
        >
          {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item, index) => (
            <li key={item} className="transform transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
              <button
                onClick={() => scrollToSection(item)}
                className="text-4xl capitalize hover:text-cyan-400 transition-all duration-300 font-light tracking-wide hover:scale-110"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-gradient relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-8 mt-[100px] text-center relative z-10">
          <p className="text-cyan-400 text-xl mb-4 animate-float">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 animate-text-shimmer bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Muhammad Umer Owais
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-6 typing-animation">
            SQA Engineer
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light animate-float" style={{ animationDelay: '1s' }}>
            Dedicated and detail-oriented SQA Manual Engineer with 2.5 years of hands-on experience in
            delivering high-quality software solutions. Skilled in comprehensive manual testing processes
            to ensure software reliability and user satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold glow-effect hover:shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105"
            >
              <span className="relative z-10">View My Work</span>
              <HiArrowNarrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold hover:shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105"
            >
              <span className="relative z-10">Get In Touch</span>
              <FaEnvelope className="ml-2 text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 bg-gray-800 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedCard delay={200}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Quality Assurance Professional</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I am passionate about ensuring software quality and reliability. With expertise in manual
                  testing, API testing, and database testing, I specialize in delivering comprehensive QA
                  solutions for clients ranging from small businesses to large enterprise corporations.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  My experience spans across various domains including financial applications, e-commerce
                  platforms, and customer support systems. I am committed to continuous learning and staying
                  updated with industry trends to improve QA processes.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 transform hover:scale-105">
                    <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">2.5+</h4>
                    <p className="text-gray-300">Years Experience</p>
                  </div>
                  <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 transform hover:scale-105">
                    <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">15+</h4>
                    <p className="text-gray-300">Projects Completed</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={400}>
              <div className="space-y-6">
                <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 transform hover:scale-105">
                  <h4 className="text-xl font-bold text-cyan-400 mb-4">Education</h4>
                  <p className="text-white font-semibold">BS Computer Science</p>
                  <p className="text-gray-300">Khawaja Fareed University of Engineering and IT</p>
                  <p className="text-gray-400">January 2017 - August 2021</p>
                </div>

                <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 transform hover:scale-105">
                  <h4 className="text-xl font-bold text-cyan-400 mb-4">Location</h4>
                  <div className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="mr-2 text-cyan-400" />
                    <span>Model Town, Lahore, Pakistan</span>
                  </div>
                </div>

                <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 transform hover:scale-105">
                  <h4 className="text-xl font-bold text-cyan-400 mb-4">Availability</h4>
                  <p className="text-gray-300">Open to relocation opportunities worldwide</p>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-20 bg-gray-900 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <AnimatedCard key={skill.name} delay={index * 100}>
                <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-semibold">{skill.name}</h3>
                    <span className="text-cyan-400 text-sm bg-cyan-400/10 px-2 py-1 rounded">{skill.category}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden skill-bar">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-2000 ease-out"
                      style={{ 
                        width: `${skill.level}%`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="w-full py-20 bg-gray-800 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <AnimatedCard key={exp.title} delay={index * 200}>
                <div className="glass-effect p-8 rounded-xl border-l-4 border-cyan-400 hover:glow-effect transition-all duration-300 transform hover:scale-105">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                      <p className="text-cyan-400 text-lg font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 font-medium bg-gray-700/50 px-3 py-1 rounded-full mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <div className="space-y-3">
                    {exp.achievements.map((ach, achIndex) => (
                      <div key={achIndex} className="text-gray-300 flex items-start hover:text-white transition-colors duration-200">
                        <span className="text-cyan-400 mr-3 mt-1 text-sm">▶</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-20 bg-gray-900 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedCard key={project.id} delay={index * 150}>
                <div className="glass-effect rounded-xl overflow-hidden hover:glow-effect transition-all duration-300 transform hover:scale-105 group">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{project.name}</h3>
                      <span className="text-xs bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{project.desc}</p>
                    <p className="text-gray-400 text-sm mb-4">{project.details}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={tech} 
                          className="text-xs bg-gray-700/50 text-cyan-400 px-2 py-1 rounded-full hover:bg-cyan-400/10 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      {/* ---------------- Contact ---------------- */}
 {/* Contact Section */}
<section id="contact" className="w-full py-20 bg-gray-800 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-600/5"></div>
  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">
        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Connect</span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Ready to collaborate on your next QA project? I'm available for freelance work, 
        consulting, or full-time opportunities. Let's discuss how I can help ensure your software quality.
      </p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8 mb-16">
      {/* Direct Contact Information */}
      <div className="space-y-6">
       <AnimatedCard delay={100}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-lg mr-4">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400 text-sm">Professional correspondence</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('umersoft07@gmail.com', 'email')}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {copiedText === 'email' ? <FaCheckCircle className="text-green-400" /> : <FaCopy />}
              </button>
            </div>
            <p className="text-gray-300 mb-4">umersoft07@gmail.com</p>
            <div className="flex space-x-2">
            <a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=umersoft07@gmail.com&su=QA%20Collaboration%20Opportunity&body=Hi%20Umer,%0D%0A%0D%0AI'm%20interested%20in%20discussing%20a%20QA%20project%20opportunity.%20Could%20we%20schedule%20a%20call%20to%20discuss%20further?%0D%0A%0D%0ABest%20regards"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center"
>
  <FaEnvelope className="mr-2" />
  Compose Email
</a>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-3 rounded-lg mr-4">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">WhatsApp</h3>
                  <p className="text-gray-400 text-sm">Instant messaging</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+92 333 274 1803', 'whatsapp')}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {copiedText === 'whatsapp' ? <FaCheckCircle className="text-green-400" /> : <FaCopy />}
              </button>
            </div>
            <p className="text-gray-300 mb-4">+92 333 274 1803</p>
            <div className="flex space-x-2">
              <a 
                href="https://wa.me/923332741803?text=Hi%20Umer,%20I'm%20interested%20in%20discussing%20a%20QA%20project%20opportunity.%20When%20would%20be%20a%20good%20time%20to%20talk?"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center"
              >
                <FaWhatsapp className="mr-2" />
                Message
              </a>
              <a 
                href="tel:+923332741803"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center"
              >
                <FaPhone className="mr-2" />
                Call
              </a>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={300}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-lg mr-4">
                  <FaLinkedin className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">LinkedIn</h3>
                  <p className="text-gray-400 text-sm">Professional network</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('https://www.linkedin.com/in/umer-owais-126231211/', 'linkedin')}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {copiedText === 'linkedin' ? <FaCheckCircle className="text-green-400" /> : <FaCopy />}
              </button>
            </div>
            <p className="text-gray-300 mb-4">linkedin.com/in/umer-owais</p>
            <div className="flex space-x-2">
              <a 
                href="https://www.linkedin.com/in/umer-owais-126231211/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300 flex items-center"
              >
                <FaLinkedin className="mr-2" />
                Connect
              </a>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Business Information & Availability */}
      <div className="space-y-6">
        <AnimatedCard delay={400}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-3 rounded-lg mr-4">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Business Hours</h3>
                <p className="text-gray-400 text-sm">When I'm available</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-gray-300">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Saturday</span>
                <span className="text-gray-300">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Sunday</span>
                <span className="text-gray-300">By appointment</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                <span className="text-gray-300">Timezone</span>
                <span className="text-gray-300">PKT (UTC+5)</span>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={500}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-3 rounded-lg mr-4">
                <FaClock className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Response Time</h3>
                <p className="text-gray-400 text-sm">Communication commitment</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email</span>
                <span className="text-gray-300">Within 24 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">WhatsApp</span>
                <span className="text-gray-300">Within 24 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">LinkedIn</span>
                <span className="text-gray-300">Within 24 hours</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                <span className="text-gray-300">Current Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400 text-sm">Available</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={600}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-3 rounded-lg mr-4">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Location & Remote Work</h3>
                <p className="text-gray-400 text-sm">Based in Pakistan</p>
              </div>
            </div>
            <p className="text-gray-300 mb-2">Model Town, Lahore, Pakistan</p>
            <p className="text-gray-400 text-sm mb-4">Open to remote work & relocation opportunities worldwide</p>
            <div className="flex items-center text-sm text-gray-300">
              <FaGlobe className="mr-2 text-cyan-400" />
              <span>Available for global remote collaboration</span>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Services & Engagement Options */}
      <div className="space-y-6">
        <AnimatedCard delay={700}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-lg mr-4">
                <FaCode className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">QA Services</h3>
                <p className="text-gray-400 text-sm">What I specialize in</p>
              </div>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center">
                <span className="text-cyan-400 mr-2">✓</span>
                Manual Testing & Test Case Design
              </li>
              <li className="flex items-center">
                <span className="text-cyan-400 mr-2">✓</span>
                API Testing & Integration Testing
              </li>
              <li className="flex items-center">
                <span className="text-cyan-400 mr-2">✓</span>
                Database Testing & Validation
              </li>
              <li className="flex items-center">
                <span className="text-cyan-400 mr-2">✓</span>
                Mobile App Testing
              </li>
              <li className="flex items-center">
                <span className="text-cyan-400 mr-2">✓</span>
                Regression & UAT Testing
              </li>
            </ul>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={800}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 p-3 rounded-lg mr-4">
                <FaUserTie className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Engagement Types</h3>
                <p className="text-gray-400 text-sm">How we can work together</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">Full-time Position</span>
                <span className="text-green-400 text-sm">Available</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">Contract/Freelance</span>
                <span className="text-green-400 text-sm">Available</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">Consulting</span>
                <span className="text-green-400 text-sm">Available</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">Part-time</span>
                <span className="text-green-400 text-sm">Available</span>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={900}>
          <div className="glass-effect p-6 rounded-xl hover:glow-effect transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-3 rounded-lg mr-4">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Quick Response</h3>
                <p className="text-gray-400 text-sm">Get in touch instantly</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm">Need immediate assistance or have a quick question? I'm just a message away!</p>
            <div className="grid grid-cols-2 gap-2">
              <a 
                href="https://wa.me/923332741803?text=Hi%20Umer,%20I%20have%20a%20quick%20question%20about%20QA%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center"
              >
                <FaWhatsapp className="mr-1" />
                Quick Chat
              </a>
            <a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=umersoft07@gmail.com&su=Quick%20Question&body=Hi%20Umer,%20I%20have%20a%20quick%20question%20about%20your%20QA%20services."
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center"
>
  <FaEnvelope className="mr-1" />
  Quick Email
</a>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>

    {/* Call to Action */}
    {/* <div className="text-center">
      <AnimatedCard delay={1000}>
        <div className="glass-effect p-8 rounded-xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Next QA Project?</h3>
          <p className="text-gray-400 mb-6">
            Let's discuss how I can help ensure your software meets the highest quality standards. 
            I'm committed to delivering thorough testing solutions that give you confidence in your product.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:umersoft07@gmail.com?subject=Project%20Discussion&body=Hi%20Umer,%0D%0A%0D%0AI'd%20like%20to%20discuss%20a%20QA%20project%20opportunity.%20Here%20are%20the%20details:%0D%0A%0D%0AProject%20Type:%0D%0ATesting%20Requirements:%0D%0ATimetable:%0D%0ABudget%20Range:%0D%0A%0D%0APlease%20let%20me%20know%20when%20you're%20available%20for%20a%20call.%0D%0A%0D%0ABest%20regards"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center"
            >
              <FaEnvelope className="mr-2" />
              Start Project Discussion
            </a>
            <a 
              href="https://wa.me/923332741803?text=Hi%20Umer,%20I'm%20interested%20in%20your%20QA%20services.%20Can%20we%20schedule%20a%20call%20to%20discuss%20my%20project%20requirements?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center"
            >
              <FaWhatsapp className="mr-2" />
              Schedule Call
            </a>
          </div>
        </div>
      </AnimatedCard>
    </div> */}
  </div>
</section>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Muhammad Umer Owais. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
