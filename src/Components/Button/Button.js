import propTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Button;
