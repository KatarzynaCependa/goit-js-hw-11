import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// import { createGallery } from './createGallery';

const API_key = '36085372-0e054a65c2dad8200a3139bdc';
const API_URL = 'https://pixabay.com/api/';

const searchInputEl = document.querySelector('#search-form input');
const searchButtonEl = document.querySelector('#search-form button');
const galleryEl = document.querySelector('.gallery');
const loadMoreButtonEl = document.querySelector('.load-more');

const searchApi = async () => {
  const response = await axios.get(API_URL, {
    params: {
      key: API_key,
      q: searchInputEl.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response;
};

const createGallery = () => {
  searchApi()
    .then(response => {
      const totalHits = response.data.total;
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

      if (response.data.hits.length === 0) throw new Error();
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
};

searchButtonEl.addEventListener('click', event => {
  event.preventDefault();
  createGallery();
});
