import axios from "axios";


axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (searchQuery, page) => {
  const API_KEY = '34648725-bf27d478d17617710acdd3b55';
  const response = await axios.get(
    `/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}


export default fetchImages;