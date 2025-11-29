import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllGalleryImages } from '../../../services/galleryService';
import Loader from '../../common/loader/Loader';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [dragX, setDragX] = useState(0);

  const { data: posts, loading, error, refetch } = useFetch(getAllGalleryImages);

  const openLightbox = (postId) => {
    setSelectedPostId(postId);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPostId(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const selectedPost = posts?.find((p) => p._id === selectedPostId);
  const hasMultipleImages = selectedPost && selectedPost.imageUrls.length > 1;

  const nextImage = () => {
    if (selectedPost) {
      setCurrentImageIndex((prev) =>
        prev === selectedPost.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPost) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedPost.imageUrls.length - 1 : prev - 1
      );
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    if (touchStart) {
      setDragX(e.targetTouches[0].clientX - touchStart);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();

    setTouchStart(null);
    setTouchEnd(null);
    setDragX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (selectedPostId !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [selectedPostId, selectedPost]);

  if (loading) {
    return (
      <section className="gallery-section">
        <Loader size="large" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery-section">
        <ErrorMessage message={error} onRetry={refetch} />
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="gallery-section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="gallery-section-title">Photo Gallery</h2>
        <p className="gallery-section-subtitle">
          A glimpse into my journey, work, and experiences
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div className="gallery-grid">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            className="gallery-item"
            onClick={() => openLightbox(post._id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={post.imageUrls[0]}
              alt={post.title}
              className="gallery-image"
              whileHover={{ scale: 1.1 }}
            />
            <motion.div
              className="gallery-overlay"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <h3 className="gallery-title">{post.title}</h3>
              {post.category && (
                <span className="gallery-category">{post.category}</span>
              )}
              {post.imageUrls.length > 1 && (
                <div className="gallery-badge">{post.imageUrls.length} photos</div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Card-Based Lightbox */}
      <AnimatePresence mode="wait">
        {selectedPost && (
          <motion.div
            className="gallery-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="gallery-card-container"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="card-close-btn"
                onClick={closeLightbox}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>

              {/* Image Container with Swipe */}
              <div
                className="gallery-card-image-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedPost.imageUrls[currentImageIndex]}
                    alt={selectedPost.title}
                    className="gallery-card-image"
                    initial={{ opacity: 0, x: dragX > 0 ? -100 : 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dragX > 0 ? 100 : -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <motion.button
                      className="card-nav-btn card-nav-prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaChevronLeft />
                    </motion.button>
                    <motion.button
                      className="card-nav-btn card-nav-next"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaChevronRight />
                    </motion.button>
                  </>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                  <motion.div
                    className="image-counter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {currentImageIndex + 1} / {selectedPost.imageUrls.length}
                  </motion.div>
                )}
              </div>

              {/* Content Section */}
              <motion.div
                className="gallery-card-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div>
                  <h3 className="card-title">{selectedPost.title}</h3>
                  {selectedPost.category && (
                    <span className="card-category">{selectedPost.category}</span>
                  )}
                </div>

                {selectedPost.description && (
                  <p className="card-description">{selectedPost.description}</p>
                )}

                {/* Dot Indicators */}
                {hasMultipleImages && (
                  <motion.div className="card-indicators">
                    {selectedPost.imageUrls.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`indicator-dot ${
                          index === currentImageIndex ? 'active' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        whileHover={{ scale: 1.3 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;