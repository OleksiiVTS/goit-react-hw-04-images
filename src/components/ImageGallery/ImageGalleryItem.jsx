import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

const ImageGalleryItem = ({ tags, largeImageURL, webformatURL }) => {
  const [openModalWindow, setOpenModalWindow] = useState(false);

  const toglModalWindow = () => setOpenModalWindow(data => !data);

  return (
    <>
      <img
        onClick={toglModalWindow}
        className={css.photo}
        src={webformatURL}
        alt={tags}
      />
      {openModalWindow && (
        <Modal
          dataImage={{ largeImageURL, tags }}
          closeModalWindow={() => setOpenModalWindow(false)}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
