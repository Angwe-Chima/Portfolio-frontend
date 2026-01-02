import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import Button from '../../common/button/Button';
import './Hero.css';

const Hero = () => {
  const name = 'Chima Angwe'.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="hero">
      <div className="hero-container container-custom">
        <div className="hero-content">
          {/* Animated Name */}
          <motion.h1
            className="hero-name"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {name.map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Full Stack Developer
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Building amazing web experiences with the MERN stack.
            <br />
            Passionate about creating beautiful, functional, and user-friendly
            applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link to="/projects">
              <Button variant="primary">View My Work</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Get In Touch</Button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <a
              href="https://github.com/chima-angwe"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/chima-angwe-679560274/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
            >
              <FaLinkedin size={24} />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.6,
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <FaArrowDown size={24} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
