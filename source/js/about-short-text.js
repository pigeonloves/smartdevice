'use strict';

// Меняет текст в разделе "О компании"

(function () {
  var WORDS_COUNT = 21;
  var DOTS = '..';

  var tablet = window.matchMedia('(max-width: 1023px)');

  var textContainer = document.querySelector('.about p:last-of-type');

  var desktopText = textContainer.innerText;

  var shortText = desktopText.split(' ', WORDS_COUNT).join(' ').concat(DOTS);

  if (textContainer) {
    var changeTextHandler = function (evt) {
      if (evt.matches) {
        textContainer.innerText = shortText;
      } else {
        textContainer.innerText = desktopText;
      }
    };
  }

  tablet.addListener(changeTextHandler);
  changeTextHandler(tablet);

})();
