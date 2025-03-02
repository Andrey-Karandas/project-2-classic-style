const forms = () => {
  const form = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input')

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо, скоро з вами звяжется менеджер',
    failure: 'Что-то пошло не так',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  };

  const path = {
    designer: 'assets/server.php',
    questions: 'assets/questions.php',
  };

  Array.from(inputs)
    .filter(item => item.getAttribute('name') === 'upload')
    .forEach(item => {
      item.addEventListener('input', () => {
        let dots;
        const arr = item.files[0].name.split('.');
        arr[0].length > 5 ? dots = '...' : dots = '.';
        const name = arr[0].substring(0, 5) + dots + arr[1];
        item.previousElementSibling.textContent = name;
      });
    });

  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      body: data
    })

    return await response.text();
  };

  function clearInputs() {
    inputs.forEach(input => {
      input.value = '';
      if (input.getAttribute('name') === 'upload') {
        input.previousElementSibling.textContent = 'Файл не выбран';
      }
    })
  }

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(item);

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('animated', 'fadeInUp', 'center');
      item.parentNode.appendChild(statusMessage);

      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400)

      const statusImage = document.createElement('img');
      statusImage.setAttribute('src', message.spinner);
      statusMessage.appendChild(statusImage);

      const textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      let api;
      switch (item.getAttribute('data-type')) {
        case 'file':
          api = path.designer;
          break;
        case 'text':
          api = path.questions;
          break;
      }

      postData(api, formData)
        .then(() => {
          statusImage.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImage.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp');
            item.classList.add('fadeInDown');
          }, 5000)
        })
    })
  })

};

export default forms;