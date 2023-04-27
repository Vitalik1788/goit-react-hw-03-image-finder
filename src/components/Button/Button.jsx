import { Loadmore } from "./Button.styled";
import { PropTypes } from 'prop-types';

const LoadMoreButton = ({loadMore}) => {
  return (
    <Loadmore type="button" onClick={loadMore}>Load More</Loadmore>
  )
}

export default LoadMoreButton;

LoadMoreButton.propTypes = {
  children: PropTypes.node,
  loadMore: PropTypes.func.isRequired,
};