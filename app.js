const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

let formData = {};
// слухачі
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onTextareaInput);
// виклик функції
populateTextarea();

// функція відправки форми
function onFormSubmit(evt) {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
// функція запису localStorage, щоб під час перезагрузки браузера не пропадав техт textarea
function onTextareaInput(evt) {
  // const message = evt.target.value;
  formData[evt.target.name] = evt.target.value;
  //   console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// функція отримуємо дані сховища, якщо(if) - в DOM
function populateTextarea() {
  const savedMassege = JSON.parse(localStorage.getItem(STORAGE_KEY));
  //   console.log(savedMassege);
  if (savedMassege) {
    refs.input.value = savedMassege[`name`];
    refs.input.value = savedMassege[`phone`];
    refs.input.value = savedMassege[`email`];
    refs.textarea.value = savedMassege[`message`];
  }
}
