import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getSearchImages } from '../../shared/services/Fetch/Fetch';
import Loader from '../../shared/components/Loader/Loader';
import Modal from '../../shared/components/Modal/Modal';
import ModalDetails from '../../shared/components/Modal/ModalDetails';
import Button from '../../shared/components/Button/Button';

const SearchImages = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErorr] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [modalDetails, setmodalDetails] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await getSearchImages(search, page);
          const { hits, totalHits } = data;
          setTotalHits(totalHits);
          if (hits.length <= 0) {
            Notify.warning(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          Notify.success(`Hooray! We found ${totalHits} images.`);
          setItems(prevItems => [...prevItems, ...hits]);
         
        } catch (error) {
          setErorr(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page, setErorr, setLoading, setItems]);

  const searchImages = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const showImageModal = useCallback(data => {
    setmodalDetails(data);
    setshowModal(true);
  }, []);

 

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setshowModal(false);
    setmodalDetails(null);
  }, []);

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      <ImageGallery items={items} showImageModal={showImageModal} />
      {error && <p>{error.massage}</p>}
      {loading && <Loader />}
      {items.length > 0 && items.length < totalHits && (
        <Button loadMore={loadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal close={closeModal}>
          <ModalDetails {...modalDetails} />
        </Modal>
      )}
    </>
  );
};

export default SearchImages;

