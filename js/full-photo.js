import {ESCAPE_CODE, body} from './util.js';
import {getScrollbarWidth} from './scrollbar-width.js';

//Элементы попапа с большим фото
const fullPhotoContainer = document.querySelector('.big-picture');
const fullPhotoImg = fullPhotoContainer.querySelector('.big-picture__img img');
const fullPhotoLikesCount = fullPhotoContainer.querySelector('.likes-count');
const fullPhotoCommentsCountAll = fullPhotoContainer.querySelector('.comments-count');
const fullPhotoCommentsCountCurrent = fullPhotoContainer.querySelector('.comments-count-current');
const fullPhotoCommentsCountBlock = fullPhotoContainer.querySelector('.social__comment-count');
const fullPhotoCommentsLoader = fullPhotoContainer.querySelector('.comments-loader');
const fullPhotoDescription = fullPhotoContainer.querySelector('.social__caption');
const fullPhotoCommentsList = fullPhotoContainer.querySelector('.social__comments');

//Шаблон комментария
const fullPhotoCommentsItemTemplate = fullPhotoCommentsList.querySelector('#social__comment').content.querySelector('.social__comment');
//Живая коллекция комментариев
const allFullPhotoComments = fullPhotoCommentsList.getElementsByClassName('social__comment');
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
  fullPhotoCommentsList.append(fullPhotoCommentClone);
};

//Cчетчик показываемых комментариев
let displayedCommentCount = SHOWN_COMMENTS_COUNT;
const onLoaderCommentsClick = (array) => {
  fullPhotoCommentsLoader.addEventListener('click', () => {
    //Найти текущее фото
    const currenPhotoItem = array[fullPhotoImg.dataset.indexNumber];
    //Взять следующие 5 комментариев из исходного массива
    const nextSliceComments = currenPhotoItem.comments.slice(displayedCommentCount, displayedCommentCount + SHOWN_COMMENTS_COUNT);
    nextSliceComments.forEach(fillComment);
    fullPhotoCommentsCountCurrent.textContent = allFullPhotoComments.length;
    if (allFullPhotoComments.length === currenPhotoItem.comments.length) {
      fullPhotoCommentsLoader.classList.add('hidden');
    }
    displayedCommentCount += SHOWN_COMMENTS_COUNT;
  });
};


//Функция открытия большого фото, в аргументы будут переданы текущий элемент массива и его индекс
const openFullPhoto = (item, index) => {
  fullPhotoContainer.classList.remove('hidden');
  fullPhotoImg.src = item.url;
  //создать дата-атрибут картинки с индексом
  fullPhotoImg.dataset.indexNumber = index;
  fullPhotoLikesCount.textContent = item.likes;
  fullPhotoCommentsCountAll.textContent = item.comments.length;
  fullPhotoDescription.textContent = item.description;
  body.classList.add('modal-open');
  body.style.marginRight = `${getScrollbarWidth()}px`;
  document.addEventListener('keydown', onFullPhotoKeydown);
  //Взять первые 5 комментариев из исходного массива
  const sliceComments = item.comments.slice(0, SHOWN_COMMENTS_COUNT);
  sliceComments.forEach(fillComment);
  fullPhotoCommentsCountCurrent.textContent = allFullPhotoComments.length;
  if (item.comments.length > SHOWN_COMMENTS_COUNT) {
    fullPhotoCommentsLoader.classList.remove('hidden');
    fullPhotoCommentsCountBlock.classList.remove('hidden');
  } else if (item.comments.length === 0) {
    fullPhotoCommentsCountBlock.classList.add('hidden');
    fullPhotoCommentsLoader.classList.add('hidden');
  } else {
    fullPhotoCommentsLoader.classList.add('hidden');
  }
};
//Функция закрытия большого фото
const closeFullPhoto = () => {
  //Очистить созданные до этого комментарии
  fullPhotoCommentsList.innerHTML = '';
  fullPhotoContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  body.style.marginRight = '';
  document.removeEventListener('keydown', onFullPhotoKeydown);
  //Сбросить счетчик показанных комментариев
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

export {openFullPhoto, onLoaderCommentsClick};


