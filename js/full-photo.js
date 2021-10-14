const fullPhotoTemplate = document.querySelector('.big-picture');
const fullPhotoCommentsList = fullPhotoTemplate.querySelector('.social__comments');
const fullPhotoCommentsItem = fullPhotoCommentsList.querySelector('.social__comment');
fullPhotoCommentsList.innerHTML = '';

////Функция открытия большого фото
const openFullPhoto = (maxPhoto) => {
  fullPhotoTemplate.classList.remove('hidden');
  fullPhotoTemplate.querySelector('.big-picture__img img').src = maxPhoto.url;
  fullPhotoTemplate.querySelector('.likes-count').textContent = maxPhoto.likes;
  fullPhotoTemplate.querySelector('.comments-count').textContent = maxPhoto.comments.length;
  fullPhotoTemplate.querySelector('.social__caption').textContent = maxPhoto.description;
  fullPhotoTemplate.querySelector('.social__comment-count').classList.add('hidden');
  fullPhotoTemplate.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
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
  document.body.classList.remove('modal-open');
};
//Вызов функции закрытия большого фото при нажатии на крестик
document.querySelector('.big-picture__cancel').addEventListener('click', closeFullPhoto);
//Вызов функции закрытия большого фото при нажатии на клавишу
if (fullPhotoTemplate.classList.contains('hidden')) {
  document.addEventListener('keydown', (evt) => {
    (evt.key === 'Escape') ? closeFullPhoto() : undefined;
  });
}

document.querySelector('.overlay').addEventListener('click', (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeFullPhoto();
  }
});

export {openFullPhoto, createComment};


