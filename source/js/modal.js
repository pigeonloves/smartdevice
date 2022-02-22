'use strict';

// Модальное окно

(function () {
  var modalOpen = document.querySelector('.modal--open');
  var modalClose = document.querySelector('.modal__close');
  var modal = document.querySelector('.modal');
  var body = document.querySelector('body');

  var name = document.querySelector('[name=modal-name]');
  var phone = document.querySelector('[name=modal-phone]');
  var comment = document.querySelector('[name=modal-comment]');
  var form = document.querySelector('.form--modal');

  var isStorage = true;
  var nameStorage = '';
  var phoneStorage = '';
  var commentStorage = '';

  try {
    nameStorage = localStorage.getItem('nameStorage');
    phoneStorage = localStorage.getItem('phoneStorage');
    commentStorage = localStorage.getItem('commentStorage');
  } catch (err) {
    isStorage = false;
  }

  var setVisible = function (visible) {
    if (visible) {
      body.classList.add('modal--open');
      document.addEventListener('keydown', escapeClickHandler);
    } else {
      body.classList.remove('modal--open');
      modal.classList.remove('modal--show');
      document.removeEventListener('keydown', escapeClickHandler);
    }
  };

  var escapeClickHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      setVisible(false);
    }
  };

  if (modal) {
    modal.addEventListener('click', function (evt) {
      if (evt.target === modal && evt.target !== form) {
        setVisible(false);
      }
    });
  }

  if (modalOpen) {
    modalOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (modal) {
        modal.classList.add('modal--show');
        setVisible(true);
        name.focus();
      }

      if (nameStorage && phoneStorage) {
        name.value = nameStorage;
        phone.value = phoneStorage;
        comment.value = commentStorage;
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      modal.classList.remove('modal--show');
      setVisible(false);
    });
  }

  if (form) {
    form.addEventListener('submit', function (evt) {
      if (!name.value || !phone.value) {
        evt.preventDefault();
      } else {
        if (isStorage) {
          localStorage.setItem('nameStorage', name.value);
          localStorage.setItem('phoneStorage', phone.value);
          localStorage.setItem('commentStorage', comment.value);
        }
      }
    });
  }

})();
