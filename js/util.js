const ESCAPE_CODE = 'Escape';
const body = document.body;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const alertBlock = document.querySelector('#alert').content.querySelector('.alert');

const showAlert = (message) => {
  alertBlock.textContent = message;
  body.append(alertBlock);
  setTimeout(() => alertBlock.remove(), 5000);
};

export {ESCAPE_CODE, body, showAlert, FILE_TYPES};
