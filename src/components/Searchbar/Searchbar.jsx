import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleValue = evt => {
    setSearch(evt.target.value);
  };

  const handleSabmit = evt => {
    evt.preventDefault();
    if (search.trim() === '') {
      toast.warn('Please enter a request!', {
        autoClose: 1000,
        hideProgressBar: true,
        theme: 'colored',
      });
      return;
    }
    onSubmit(search.trim());
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSabmit}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          onChange={handleValue}
          value={search}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
