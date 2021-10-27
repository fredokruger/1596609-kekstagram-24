import {createGallery, createMiniatureEvent} from './miniature-photo.js';
import {onLoaderCommentsClick} from './full-photo.js';

const getServerData = (gallery, miniatureEvent, commentsLoad) => fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(gallery);
    miniatureEvent(data);
    commentsLoad(data);
  });

getServerData(createGallery, createMiniatureEvent, onLoaderCommentsClick);

