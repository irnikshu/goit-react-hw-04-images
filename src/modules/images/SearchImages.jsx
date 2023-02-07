import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getSearchImages } from '../../shared/services/Fetch/Fetch';
import Loader from '../../shared/components/Loader/Loader';
import Modal from '../../shared/components/Modal/Modal';
import ModalDetails from '../../shared/components/Modal/ModalDetails';
import Button from '../../shared/components/Button/Button';

class SearchImages extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalHits: 0,
    showModal: false,
    modalDetails: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }
  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await getSearchImages(search, page);
      const { hits, totalHits } = data;
      if (hits.length <= 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.success(`Hooray! We found ${totalHits} images.`);
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits,
      }));
    } catch (error) {
      this.state({ error: error.massage });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImageModal = ({ largeImageURL }) => {
    this.setState({
      modalDetails: { largeImageURL },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalDetails: null,
    });
  };

  render() {
    const { items, loading, error, totalHits, showModal, modalDetails } =
      this.state;
    const { searchImages, loadMore, showImageModal, closeModal } = this;
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
  }
}
export default SearchImages;
