'use strict';

// Валидация номера телефона

(function () {
  [].forEach.call(document.querySelectorAll('[type=tel]'), function (input) {
    var keyCode;
    function mask(evt) {
      // evt.keyCode && (keyCode = evt.keyCode);
      var pos = input.selectionStart;
      if (pos < 3) {
        evt.preventDefault();
      }
      var matrix = '+7(___)_______';
      var i = 0;
      var def = matrix.replace(/\D/g, '');
      var val = input.value.replace(/\D/g, '');
      var newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        // i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      var reg = matrix.substr(0, input.value.length).replace(/_+/g,
          function (a) {
            return '\\d{1,' + a.length + '}';
          }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
        input.value = newValue;
      }
      if (evt.type === 'blur' && input.value.length < 5) {
        input.value = '';
      }
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
  });


  // var phoneNumber = document.querySelectorAll('[type=tel]');

  // var setMask = function (input) {
  //   input.addEventListener('focus', function (evt) {
  //     if (!input.value && evt.key !== window.utils.KeyCode.BACKSPACE) {
  //       input.value = '+7(';
  //     } else {
  //       return;
  //     }
  //   });

  //   input.addEventListener('keydown', function (evt) {
  //     var numberLength = input.value.length;

  //     if (numberLength === 6 && evt.key !== window.utils.KeyCode.BACKSPACE) {
  //       input.value = input.value + ')';
  //     }
  //   });

  //   input.addEventListener('keypress', function (evt) {
  //     if (!/\d/.test(evt.key)) {
  //       evt.preventDefault();
  //     }
  //   });
  // };

  // if (phoneNumber) {
  //   for (var i = 0; i < phoneNumber.length; i++) {
  //     setMask(phoneNumber[i]);
  //   }
  // }
})();
