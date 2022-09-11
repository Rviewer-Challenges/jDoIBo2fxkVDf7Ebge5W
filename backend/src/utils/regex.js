const regEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const regPassword =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){5,40}$/;
const regText = /^([a-zA-Z\ñÀ-ú]+(\s?[a-zA-Z\ñÀ-ú])){2,20}$/;

const regStars = /^[1-5]$/;

const validateEmail = (value) => regEmail.test(value);

const validatePassword = (value) => regPassword.test(value);

const validateText = (value) => regText.test(value);

const validateStars = (value) => regStars.test(value);

module.exports = {
  validateEmail,
  validatePassword,
  validateText,
  validateStars,
};
