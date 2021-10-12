//Создание объекта с данными о комментарии
import {chooseNumber} from './random-number.js';

const COMMENT_NAME = {
  1 : 'Артем',
  2 : 'Дмитрий',
  3 : 'Елена',
  4 : 'Игорь',
  5 : 'Олег',
  6 :'Анастасия',
};

const COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createComment = () => {
  const commentPerson = chooseNumber(1, Object.keys(COMMENT_NAME).length);
  const commentInfo = {
    avatar: `img/avatar-${  commentPerson  }.svg`,
    name: COMMENT_NAME[commentPerson],
    message: COMMENT_TEXT[chooseNumber(0,(COMMENT_TEXT.length-1))],
  };
  return commentInfo;
};

export {createComment};
