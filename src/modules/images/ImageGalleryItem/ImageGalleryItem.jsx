import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ items, showImageModal }) => {
  return items.map(({ id, webformatURL, largeImageURL }) => (
    <li onClick={() => showImageModal({ largeImageURL })} key={id}>
      <img src={webformatURL} alt="" className={styles.imageGalleryItemImage} />
    </li>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};
ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  showImageModal: PropTypes.func,
};
