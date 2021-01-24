import { useState } from 'react';
import propTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInput = event => {
    setInputValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      alert('Enter the query!');
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          onChange={handleInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
