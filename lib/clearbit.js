const form = document.querySelector('#clearbitForm');
const authorization = 'Bearer sk_29221b150bf36ba81bf34fe7d6f5f8a2';
const URL = 'https://person.clearbit.com/v2/people/find?email='; // GET
const button = document.querySelector('#clearbitSubmit');
const emailInput = document.querySelector('#clearbitEmail');

const addCard = (userInfo) => {
  form.reset();

  if (!userInfo.name) {
    return;
  }

  const avatarURL = userInfo.avatar;
  const name = userInfo.name.fullName;
  const email = userInfo.email;
  const bio = userInfo.bio;

  const wrapper = document.querySelector('#info-cards');
  const html = `<div class="card mr-4" style="width: 15rem">
          <img src="${avatarURL}" class="card-img-top" alt="${name}" />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
              ${bio}
            </p>
            <a href="mailto:${email}" class="btn btn-primary">${email}</a>
          </div>
        </div>`;
  wrapper.insertAdjacentHTML('afterbegin', html);
};

const getInfoForEmail = (email) => {
  button.disabled = true;
  emailInput.disabled = true;

  button.innerHTML = `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  <span class="visually-hidden">Loading...</span>`;

  fetch(`${URL}${email}`, { headers: { Authorization: authorization } })
    .then((response) => response.json())
    .then((json) => {
      button.disabled = false;
      emailInput.disabled = false;
      button.innerHTML = 'Search';
      addCard(json);
    });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getInfoForEmail(emailInput.value);
});
