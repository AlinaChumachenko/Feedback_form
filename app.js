const refs = {
  form: document.querySelector('.feedback-form'),

  name: document.querySelector('#userName'),
  tel: document.querySelector('#userNumber'),
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
  // console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  // Get form data
  var formData = new FormData(this);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'send_message.php', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Success, do something here if needed
      console.log('Message sent successfully');
    } else {
      // Error handling
      console.error('Error:', xhr.statusText);
    }
  };
  xhr.send(formData);
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
    if (savedMessage['tel']) {
      refs.tel.value = savedMessage['tel'];
    }
    if (savedMessage['email']) {
      refs.email.value = savedMessage['email'];
    }
    if (savedMessage['message']) {
      refs.textarea.value = savedMessage['message'];
    }
  }
}

// // Зняти слухача подій з форми
// refs.form.removeEventListener('submit', onFormSubmit);
// refs.form.removeEventListener('input', onTextareaInput);
