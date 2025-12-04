import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import ContactForm from '../../components/contact/contact-form/ContactForm';
import SocialLinks from '../../components/contact/social-links/SocialLinks';
import './Contact.css';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Lagos, Nigeria',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'angwechima@gmail.com',
      link: 'mailto:angwechima@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+234 915 846 8602',
      link: 'tel:+2349158468602',
    },
  ];

  return (
    <div className="contact-page">
      <div className="container-custom section-padding">
        {/* Page Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hi? Feel free to reach out!
            <br />
            I'm always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="contact-info-title">Contact Information</h2>
            <p className="contact-info-description">
              You can also reach me through the following channels:
            </p>

            <div className="contact-info-list">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="contact-info-item">
                    <div className="contact-info-icon">
                      <Icon size={24} />
                    </div>
                    <div className="contact-info-text">
                      <p className="contact-info-label">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="contact-info-value contact-info-link"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="contact-info-value">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Availability */}
            <div className="contact-availability">
              <h3 className="contact-availability-title">Availability</h3>
              <p className="contact-availability-text">
                I typically respond within 24 hours on business days.
                <br />
                For urgent matters, please mention it in your message.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <SocialLinks />z
      </div>
    </div>
  );
};

export default Contact;