import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (dataSubmit !== '') {
      getRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubmit, page]);

  const getRequest = async () => {
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
      setDataResult(
        prevDataResult => (prevDataResult = [...prevDataResult, ...data.hits])
      );
      setTotalImages(data.totalHits);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      toast.error(error.message);
    }
  };

  const onSubmit = onDataSubmit => {
    if (dataSubmit === onDataSubmit) {
      return;
    }
    setDataSubmit(onDataSubmit);
    setPage(1);
    setDataResult([]);
  };

  const loadMor = () => {
    setPage(page + 1);
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

// export class OldApp extends Component {
//   state = {
//     dataSubmit: '',
//     dataResult: [],
//     page: 1,
//     totalImages: 0,
//     status: 'idle', // "idle"// "pending" // "resolved" // "rejected"
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { dataSubmit, page } = this.state;
//     if (prevState.dataSubmit !== dataSubmit || prevState.page !== page) {
//       this.getRequest();
//     }
//   }

//   getRequest = async () => {
//     const { dataSubmit, page } = this.state;
//     this.setState({ status: 'pending' });

//     try {
//       const { data } = await getApiImageGallery(dataSubmit, page);
//       if (!data.totalHits) {
//         this.setState({ status: 'rejected' });
//         toast.error(
//           'Nothing was found according to your request! Please enter another request!'
//         );
//         return;
//       }
//       this.setState(prevState => ({
//         dataResult: [...prevState.dataResult, ...data.hits],
//         status: 'resolved',
//         totalImages: data.totalHits,
//       }));
//     } catch (error) {
//       this.setState({ status: 'rejected' });
//       toast.error(error.message);
//     }
//   };

//   onSubmit = dataSubmit => {
//     if (this.state.dataSubmit === dataSubmit) {
//       return;
//     }
//     this.setState({ dataSubmit, page: 1, dataResult: [] });
//   };

//   loadMor = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };

//   render() {
//     const { dataResult, status, totalImages } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.onSubmit} />

//         {dataResult.length !== 0 && <ImageGallery images={dataResult} />}

//         {totalImages !== dataResult.length && status === 'resolved' && (
//           <LoadMorButton loadMor={this.loadMor} />
//         )}

//         {status === 'pending' && (
//           <Circles
//             height="80"
//             width="80"
//             color="#4d78a9"
//             wrapperClass={css.loader}
//           />
//         )}

//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//         />
//       </>
//     );
//   }
// }
