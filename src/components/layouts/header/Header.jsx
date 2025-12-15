import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMenu,
  HiX,
  HiHome,
  HiUser,
  HiShoppingBag,
  HiDocument,
} from 'react-icons/hi';
import { FaEnvelope } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: HiHome },
    { name: 'About', path: '/about', icon: HiUser },
    { name: 'Projects', path: '/projects', icon: HiShoppingBag },
    { name: 'Blog', path: '/blog', icon: HiDocument },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
  ];

  return (
    <header className="header">
      {/* Pill-shaped nav container */}
      <nav className="nav-pill">
        {/* Logo */}
        <Link to="/" className="logo">
          &lt;/MA&gt;
        </Link>

        {/* Desktop Icon Navigation */}
        <div className="nav-icons">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end
                data-label={link.name}
                className={({ isActive }) =>
                  `nav-icon ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={20} />
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>

        {/* Hire Me Button */}
        <button className="hire-btn"><Link to="/contact" >Start a Project</Link></button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-menu-content">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `mobile-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
