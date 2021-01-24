import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ src, alt, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlayClick}>
      <div className={s.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};
