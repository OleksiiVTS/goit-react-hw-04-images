import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

const ImageGalleryItem = ({ tags, largeImageURL, webformatURL }) => {
  const [dataImage, setDataImage] = useState({});
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (dataImage !== {}) {
      setOpenModalWindow(openModalWindow => !openModalWindow);
    }
  }, [dataImage]);

  const showModalWindow = () => {
    const data = { largeImageURL, tags };
    setDataImage(data);
  };

  // const closeModalWindow = () => {
  //   setOpenModalWindow(false);
  // };

  return (
    <>
      <img
        onClick={showModalWindow}
        className={css.photo}
        src={webformatURL}
        alt={tags}
      />
      {openModalWindow && (
        <Modal
          dataImage={dataImage}
          closeModalWindow={() => setOpenModalWindow(false)}
        />
      )}
    </>
  );
};

// export default class OldImageGalleryItem extends Component {
//   state = {
//     dataImage: {},
//     openModalWindow: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.dataImage !== this.state.dataImage) {
//       this.setState(prevState => ({ openModalWindow: true }));
//     }
//   }

//   showModalWindow = () => {
//     const { tags, largeImageURL } = this.props;
//     const data = { largeImageURL, tags };
//     this.setState(prevState => ({ dataImage: data }));
//   };

//   closeModalWindow = () => {
//     this.setState(prevState => ({ openModalWindow: false }));
//   };

//   render() {
//     const { tags, webformatURL } = this.props;
//     return (
//       <>
//         <img
//           onClick={this.showModalWindow}
//           className={css.photo}
//           src={webformatURL}
//           alt={tags}
//         />
//         {this.state.openModalWindow === true && (
//           <Modal
//             dataImage={this.state.dataImage}
//             closeModalWindow={this.closeModalWindow}
//           />
//         )}
//       </>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
