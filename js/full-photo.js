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
const KEY_CODE = 'Escape';

fullPhotoCommentsList.innerHTML = '';

////Функция открытия большого фото
const openFullPhoto = (maxPhoto) => {
  fullPhotoTemplate.classList.remove('hidden');
  fullPhotoImg.src = maxPhoto.url;
  fullPhotoLikesCount.textContent = maxPhoto.likes;
  fullPhotoCommentsCount.textContent = maxPhoto.comments.length;
  fullPhotoDescription.textContent = maxPhoto.description;
  fullPhotoCommentsCountBlock.classList.add('hidden');
  fullPhotoCommentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', closeFullPhotoOnKey);
};

//Функция создания комментария
const createComment = (comment) => {
  const fullPhotoCommentClone = fullPhotoCommentsItem.cloneNode(true);
  fullPhotoCommentClone.querySelector('.social__picture').src = comment.avatar;
  fullPhotoCommentClone.querySelector('.social__picture').alt = comment.name;
  fullPhotoCommentClone.querySelector('.social__text').textContent = comment.message;
  fullPhotoCommentsList.appendChild(fullPhotoCommentClone);
};

//Функция закрытия большого фото
const closeFullPhoto = () => {
  fullPhotoTemplate.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFullPhotoOnKey);
};

//Вызов функции закрытия большого фото при нажатии на крестик
fullPhotoButtonClose.addEventListener('click', closeFullPhoto);

//Вызов функции закрытия большого фото при нажатии на клавишу
function closeFullPhotoOnKey (evt) {
  if (evt.key !== KEY_CODE) {
    return;
  }
  closeFullPhoto();
}

document.querySelector('.overlay').addEventListener('click', (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeFullPhoto();
  }
});

export {openFullPhoto, createComment};


