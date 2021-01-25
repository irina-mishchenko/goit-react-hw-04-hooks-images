import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './../Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

const baseUrl = 'https://pixabay.com/api/';
const key = '16370030-8b42ef581aeaa0cd943bdfd1a';

export default function ImageGallery({ inputValue }) {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (inputValue === '') {
      return;
    }

    setImages([]);
    setPage(1);

    fetchImages();
  }, [inputValue]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    fetchImages(images, page);
  }, [page]);

  const fetchImages = (prevImages = [], page = 1) => {
    setLoader(true);
    fetch(
      `${baseUrl}?q=${inputValue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => res.json())
      .then(images => {
        setImages([...prevImages, ...images.hits]);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .finally(() => setLoader(false));
  };

  const handleBtnClick = () => {
    setPage(page => page + 1);
  };

  return (
    <div className={s.ImageGalleryContainer}>
      <ul className={s.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            littlePicture={image.webformatURL}
            largePicture={image.largeImageURL}
            name={image.tags}
            id={image.id}
          />
        ))}
      </ul>
      {loader && (
        <Loader
          type="Puff"
          color="#3f51b5"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {images.length > 0 && !loader && <Button onClick={handleBtnClick} />}
    </div>
  );
}

ImageGallery.propTypes = {
  inputValue: propTypes.string.isRequired,
};
