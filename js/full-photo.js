const body = document.body;
//Элементы попапа с большим фото
const fullPhotoTemplate = document.querySelector('.big-picture');
const fullPhotoImg = fullPhotoTemplate.querySelector('.big-picture__img img');
const fullPhotoLikesCount = fullPhotoTemplate.querySelector('.likes-count');
const fullPhotoCommentsCount = fullPhotoTemplate.querySelector('.comments-count');
const fullPhotoCommentsCountBlock = fullPhotoTemplate.querySelector('.social__comment-count');
const fullPhotoCommentsLoader = fullPhotoTemplate.querySelector('.comments-loader');
const fullPhotoDescription = fullPhotoTemplate.querySelector('.social__caption');
const fullPhotoCommentsList = fullPhotoTemplate.querySelector('.social__comments');
const fullPhotoCommentsItem = fullPhotoCommentsList.querySelector('.social__comment');
const fullPhotoButtonClose = document.querySelector('.big-picture__cancel');
const fullPhotoButtonOverlay = document.querySelector('.overlay');
const KEY_CODE = 'Escape';


//Функция наполнения комментария данными
const fillComment = (comment) => {
  const fullPhotoCommentClone = fullPhotoCommentsItem.cloneNode(true);
  fullPhotoCommentClone.querySelector('.social__picture').src = comment.avatar;
  fullPhotoCommentClone.querySelector('.social__picture').alt = comment.name;
  fullPhotoCommentClone.querySelector('.social__text').textContent = comment.message;
  fullPhotoCommentsList.append(fullPhotoCommentClone);
};

//Функция открытия большого фото
const openFullPhoto = (item) => {
  fullPhotoCommentsList.innerHTML = ''; //очистить созданные до этого комментарии
  fullPhotoTemplate.classList.remove('hidden');
  fullPhotoImg.src = item.url;
  fullPhotoLikesCount.textContent = item.likes;
  fullPhotoCommentsCount.textContent = item.comments.length;
  fullPhotoDescription.textContent = item.description;
  fullPhotoCommentsCountBlock.classList.add('hidden');
  fullPhotoCommentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  //вызов функции создания комментариев на каждом фото
  item.comments.forEach(fillComment);
};

//Функция закрытия большого фото
const closeFullPhoto = () => {
  fullPhotoTemplate.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

//Вызов функции закрытия большого фото при нажатии на крестик
fullPhotoButtonClose.addEventListener('click', closeFullPhoto);

//Функция закрытия большого фото при нажатии на клавишу
function onDocumentKeydown (evt) {
  if (evt.key !== KEY_CODE) {
    return;
  }
  closeFullPhoto();
}

//Функция закрытия большого фото при нажатии вне области попапа
fullPhotoButtonOverlay.addEventListener('click', (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeFullPhoto();
  }
});

export {openFullPhoto, fillComment};


