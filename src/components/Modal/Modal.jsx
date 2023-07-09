import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ dataImage, closeModalWindow }) => {
  useEffect(() => {
    const closeEscape = evt => {
      if (evt.code === 'Escape') {
        closeModalWindow();
      }
    };

    document.addEventListener('keydown', closeEscape);
    document.body.classList.toggle('overflow');

    return () => {
      document.removeEventListener('keydown', closeEscape);
      document.body.classList.toggle('overflow');
    };
  }, [closeModalWindow]);

  const closeOverlay = evt => {
    if (evt.target.nodeName === 'DIV') {
      closeModalWindow();
    }
  };

  return (
    <div className={css.overlay} onClick={closeOverlay}>
      <div>
        <img src={dataImage.largeImageURL} alt={dataImage.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  dataImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  closeModalWindow: PropTypes.func.isRequired,
};

export default Modal;
