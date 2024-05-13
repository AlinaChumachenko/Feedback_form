const refs = {
  form: document.querySelector('.feedback-form'),

  name: document.querySelector('#userName'),
  phone: document.querySelector('#userNumber'),
  email: document.querySelector('#userEmail'),

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
  //   console.log(evt.target.value);
  //   console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// функція отримуємо дані сховища, якщо(if) - в DOM
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    if (savedMessage['name']) {
      refs.name.value = savedMessage['name'];
    }
    if (savedMessage['phone']) {
      refs.phone.value = savedMessage['phone'];
    }
    if (savedMessage['email']) {
      refs.email.value = savedMessage['email'];
    }
    if (savedMessage['message']) {
      refs.textarea.value = savedMessage['message'];
    }
  }
}
