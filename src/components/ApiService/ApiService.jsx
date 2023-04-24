
async function fetchImages(searchQuery, page) {
  return await fetch(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=34648725-bf27d478d17617710acdd3b55&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Pixabay not found foto ${searchQuery}`)
      )
    })
}

export default fetchImages;