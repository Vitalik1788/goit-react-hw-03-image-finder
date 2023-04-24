import { ThreeDots } from "react-loader-spinner";
import { LoaderContainer } from "./Loader.styled";

function Loader(event) {
  return (
    <LoaderContainer>
      <ThreeDots
        height="180"
        width="180"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderContainer>)
}

export default Loader; 