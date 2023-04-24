import { Loadmore } from "./Button.styled";

const LoadMoreButton = ({children, loadMore = null}) => {
  return (
    <Loadmore type="button" onClick={loadMore}>{children}</Loadmore>
  )
}

export default LoadMoreButton;