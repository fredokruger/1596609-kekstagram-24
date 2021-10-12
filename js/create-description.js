//Создание объекта с описанием фотографии
import {chooseNumber} from './random-number.js';
import {createComment} from './create-comment.js';

const MIN_COMMENT_LENGTH = 1;
const MAX_COMMENT_LENGTH = 11;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

let photoOrder = 1;
const createDescription = () => {
  const descriptionInfo = {
    id: photoOrder,
    url: `photos/${  photoOrder  }.jpg`,
    description: `Описание фотографии ${  photoOrder}`,
    likes: chooseNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments : Array.from({length: chooseNumber(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH)}, createComment),
  };
  let commentOrder = 1;
  descriptionInfo.comments.forEach((value) => {
    value.id = parseInt((`${descriptionInfo.id.toString(10)  }0${  commentOrder.toString(10)}`), 10);
    commentOrder++;
  });
  photoOrder++;
  return descriptionInfo;
};

export {createDescription};
