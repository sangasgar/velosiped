/* eslint-disable no-undef */
const formGrade = document.querySelector('#grade');
const voice = document.querySelector('.voice');
const postId = document.querySelector('.post_id');

async function mainGrade(value, post_id) {
  try {
    response = await fetch('/posts', {
      method: 'POST', // или 'PUT'
      body: JSON.stringify({ value, post_id }), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('Успех');
      voice.remove();
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

formGrade.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event.target.value);
  const valVoice = event.target.value;
  console.log('----', postId.value);
  if (valVoice > 0) {
    console.log('-----------------', valVoice);
    mainGrade(valVoice, postId.value);
  }
});
