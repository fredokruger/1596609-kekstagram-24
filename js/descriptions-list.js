//Создание массива описаний фотографий
import {createDescription} from './create-description.js';

const PHOTO_ARRAY_LENGTH = 25;

const photoDescriptions = Array.from({length:PHOTO_ARRAY_LENGTH}, createDescription);
export {photoDescriptions};
