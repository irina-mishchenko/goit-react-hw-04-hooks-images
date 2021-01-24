import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function App() {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = searchValue => {
    setInputValue(searchValue);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery inputValue={inputValue} />
    </div>
  );
}
