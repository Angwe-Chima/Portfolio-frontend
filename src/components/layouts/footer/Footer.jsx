import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/angwe-chima',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/angwe-chima-679560274/',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://x.com/angwechima',
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:angwechima@gmail.com',
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-content container-custom">
        <div className="footer-inner">
          {/* Copyright */}
          <p className="footer-copyright">
            © {currentYear} Chima Angwe. Built with ❤️ using MERN Stack
          </p>

          {/* Social Links */}
          <div className="footer-social">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={link.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;