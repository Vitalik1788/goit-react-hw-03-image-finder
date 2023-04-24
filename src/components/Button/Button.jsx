import { Loadmore } from "./Button.styled";
import { PropTypes } from 'prop-types';

const LoadMoreButton = ({children, loadMore = null}) => {
  return (
    <Loadmore type="button" onClick={loadMore}>{children}</Loadmore>
  )
}

export default LoadMoreButton;

LoadMoreButton.propTypes = {
  children: PropTypes.node,
  loadMore: PropTypes.func.isRequired,
};