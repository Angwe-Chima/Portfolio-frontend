// ResumePreviewModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes } from 'react-icons/fa';
import Button from '../button/Button';

const ResumePreviewModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);

  // Use PUBLIC_URL to ensure compatibility with GitHub Pages
  const pdfPath = 'https://chima-angwe.github.io/resume.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="resume-modal">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="bg-gradient-to-b from-black to-neutral-900 rounded-lg p-6 
                         max-w-3xl w-full max-h-[95vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-semibold">CV Preview</h2>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close preview"
                >
                  <FaTimes size={22} />
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="bg-white rounded-lg mb-4 overflow-auto h-[80vh]">
                {loading && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                    <p className="mt-4 text-gray-600">Loading PDF...</p>
                  </div>
                )}

                <iframe
                  src={`${pdfPath}?nocache=${Date.now()}`}
                  className="w-full h-full"
                  title="Resume Preview"
                  onLoad={() => setLoading(false)}
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close
                </Button>

                <Button
                  variant="primary"
                  onClick={handleDownload}
                  className="flex-2"
                >
                  <FaDownload size={16} className="mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default ResumePreviewModal;
