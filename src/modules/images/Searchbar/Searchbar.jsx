import { Component } from 'react';

import PropTypes from 'prop-types';

import styles from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <header className={styles.searchbar}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <button type="submit" className={styles.button}>
              <span className={styles.buttonLabel}>Search</span>
            </button>

            <input
              value={search}
              onChange={handleChange}
              className={styles.input}
              name="search"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              required
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
