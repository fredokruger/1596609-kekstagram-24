import {ESCAPE_CODE, body} from './util.js';
import {getScrollbarWidth} from './scrollbar-width.js';

//Элементы попапа с большим фото
const fullPhotoContainer = document.querySelector('.big-picture');
const fullPhotoImg = fullPhotoContainer.querySelector('.big-picture__img img');
const fullPhotoLikesCount = fullPhotoContainer.querySelector('.likes-count');
const fullPhotoCommentsCountAll = fullPhotoContainer.querySelector('.comments-count');
const fullPhotoCommentsCountCurrent = fullPhotoContainer.querySelector('.comments-count-current');
// const fullPhotoCommentsCountBlock = fullPhotoContainer.querySelector('.social__comment-count');
const fullPhotoCommentsLoader = fullPhotoContainer.querySelector('.comments-loader');
const fullPhotoDescription = fullPhotoContainer.querySelector('.social__caption');
const fullPhotoCommentsList = fullPhotoContainer.querySelector('.social__comments');
//Шаблон комментария
const fullPhotoCommentsItemTemplate = fullPhotoCommentsList.querySelector('#social__comment').content.querySelector('.social__comment');
//Все комментарии к фото
const allFullPhotoComments = fullPhotoCommentsList.getElementsByClassName('social__comment');
//Скрытые комментарии к фото
const hiddenFullPhotoComments = fullPhotoCommentsList.getElementsByClassName('social__comment--hidden');
const fullPhotoButtonClose = document.querySelector('.big-picture__cancel');
const fullPhotoButtonOverlay = document.querySelector('.overlay');
//Количество показываемых комментариев
const SHOWN_COMMENTS_COUNT = 5;

//Функция наполнения комментария к большому фото данными
const fillComment = (comment) => {
  const fullPhotoCommentClone = fullPhotoCommentsItemTemplate.cloneNode(true);
  fullPhotoCommentClone.querySelector('.social__picture').src = comment.avatar;
  fullPhotoCommentClone.querySelector('.social__picture').alt = comment.name;
  fullPhotoCommentClone.querySelector('.social__text').textContent = comment.message;
  if (allFullPhotoComments.length >= SHOWN_COMMENTS_COUNT ) {
    fullPhotoCommentClone.classList.add('social__comment--hidden');
  }
  fullPhotoCommentsList.append(fullPhotoCommentClone);
};

//Cчетчик показываемых комментариев
let displayedCommentCount = SHOWN_COMMENTS_COUNT;
const onLoaderCommentsClick = () => {
  for (let i = displayedCommentCount; i < (displayedCommentCount + SHOWN_COMMENTS_COUNT); i++) {
    if (allFullPhotoComments[i] !== undefined) {
      allFullPhotoComments[i].classList.remove('social__comment--hidden');
    }
    if (allFullPhotoComments[i+1] === undefined) {
      fullPhotoCommentsLoader.classList.add('hidden');
    }
    fullPhotoCommentsCountCurrent.textContent = allFullPhotoComments.length - hiddenFullPhotoComments.length;
  }
  displayedCommentCount += SHOWN_COMMENTS_COUNT;
};

//Функция открытия большого фото
const openFullPhoto = (item) => {
  fullPhotoContainer.classList.remove('hidden');
  fullPhotoImg.src = item.url;
  fullPhotoLikesCount.textContent = item.likes;
  fullPhotoCommentsCountAll.textContent = item.comments.length;
  fullPhotoDescription.textContent = item.description;
  body.classList.add('modal-open');
  body.style.marginRight = `${getScrollbarWidth()}px`;
  document.addEventListener('keydown', onFullPhotoKeydown);
  //Вызов функции создания комментариев на каждом фото
  item.comments.forEach(fillComment);
  fullPhotoCommentsCountCurrent.textContent = allFullPhotoComments.length - hiddenFullPhotoComments.length;
  if (allFullPhotoComments.length > SHOWN_COMMENTS_COUNT) {
    fullPhotoCommentsLoader.classList.remove('hidden');
    fullPhotoCommentsLoader.addEventListener('click', onLoaderCommentsClick);
  } else {
    fullPhotoCommentsLoader.classList.add('hidden');
  }
};

//Функция закрытия большого фото
const closeFullPhoto = () => {
  fullPhotoCommentsList.innerHTML = ''; //очистить созданные до этого комментарии
  fullPhotoContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  body.style.marginRight = '';
  document.removeEventListener('keydown', onFullPhotoKeydown);
  fullPhotoCommentsLoader.removeEventListener('click', onLoaderCommentsClick);
  displayedCommentCount = SHOWN_COMMENTS_COUNT;
};

//Вызов функции закрытия большого фото при нажатии на крестик
fullPhotoButtonClose.addEventListener('click', () => {
  closeFullPhoto();
});

//Функция закрытия большого фото при нажатии на клавишу
function onFullPhotoKeydown (evt) {
  if (evt.key !== ESCAPE_CODE) {
    return;
  }
  evt.preventDefault();
  closeFullPhoto();
}

//Функция закрытия большого фото при нажатии вне области попапа
fullPhotoButtonOverlay.addEventListener('click', (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeFullPhoto();
  }
});

export {openFullPhoto};


