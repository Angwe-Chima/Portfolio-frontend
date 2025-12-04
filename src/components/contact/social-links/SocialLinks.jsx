import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './SocialLinks.css';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/angwe-chima',
      color: '#181717',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/angwe-chima-679560274/',
      color: '#0A66C2',
    },
    {
      name: 'X',
      icon: FaTwitter,
      url: 'https://x.com/angwechima',
      color: '#1DA1F2',
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:angwechima@gmail.com',
      color: '#DC2626',
    },
  ];

  return (
    <motion.div
      className="social-links"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="social-links-title">Connect With Me</h3>
      <div className="social-links-grid">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-card"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Icon size={32} style={{ color: link.color }} />
              <span className="social-link-name">{link.name}</span>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SocialLinks;