const refs = {
  form: document.querySelector('.feedback-form'),

  name: document.querySelector('#userName'),
  tel: document.querySelector('#userNumber'),
  email: document.querySelector('#userEmail'),

  textarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onTextareaInput);

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();

  localStorage.removeItem(STORAGE_KEY);

  var formData = new FormData(refs.form);

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

  evt.currentTarget.reset();
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

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

refs.form.removeEventListener('submit', onFormSubmit);
refs.form.removeEventListener('input', onTextareaInput);
