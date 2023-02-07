import { useState, memo } from 'react';

import PropTypes from 'prop-types';

import styles from './Searchbar.module.scss';
import initialState from './InitialState';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };
  const { search } = state;

  return (
    <>
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button
            type="submit"
            className={styles.button}
            onClick={handleSubmit}
          >
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
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
