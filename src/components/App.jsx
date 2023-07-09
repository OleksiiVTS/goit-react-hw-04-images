import React, { useState, useEffect, useCallback } from 'react';
import { getApiImageGallery } from './Services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMorButton from './LoadMorButton/LoadMorButton';
import { Circles } from 'react-loader-spinner';
import css from './Loader/Loader.module.css';

export const App = () => {
  const [dataSubmit, setDataSubmit] = useState('');
  const [dataResult, setDataResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle'); // "idle"// "pending" // "resolved" // "rejected"

  const getRequest = useCallback(async () => {
    setStatus('pending');

    try {
      const { data } = await getApiImageGallery(dataSubmit, page);
      if (!data.totalHits) {
        setStatus('rejected');
        toast.error(
          'Nothing was found according to your request! Please enter another request!'
        );
        return;
      }
      // const normalized = data.hits.map(
      //   ({ id, tags, webformatURL, largeImageURL }) => ({
      //     id,
      //     tags,
      //     largeImageURL,
      //     webformatURL,
      //   })
      // );
      setDataResult(prevDataResult => [...prevDataResult, ...data.hits]);
      setTotalImages(data.totalHits);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      toast.error(error.message);
    }
  }, [dataSubmit, page]);

  useEffect(() => {
    if (!dataSubmit) return;
    getRequest();
  }, [dataSubmit, getRequest]);

  const onSubmit = onDataSubmit => {
    if (dataSubmit === onDataSubmit) {
      return;
    }
    setDataSubmit(onDataSubmit);
    setPage(1);
    setDataResult([]);
  };

  const loadMor = () => {
    setPage(pPage => pPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />

      {dataResult.length !== 0 && <ImageGallery images={dataResult} />}

      {totalImages !== dataResult.length && status === 'resolved' && (
        <LoadMorButton loadMor={loadMor} />
      )}

      {status === 'pending' && (
        <Circles
          height="80"
          width="80"
          color="#4d78a9"
          wrapperClass={css.loader}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
