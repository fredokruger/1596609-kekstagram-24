import {getServerData} from'./api.js';
import {createGallery, createMiniatureEvent} from './miniature-photo.js';
import {loadArrayData} from './full-photo.js';
import {showAlert} from './util.js';
import './photo-editing.js';
import './form-validation.js';
import './filter-photo.js';

getServerData(showAlert, createGallery, createMiniatureEvent, loadArrayData);
