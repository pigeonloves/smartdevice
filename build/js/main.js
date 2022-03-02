'use strict';
// Общие функции и переменные
(function () {
    window.utils = {
        KeyCode: {
            BACKSPACE: 'Backspace',
            ESCAPE: 'Escape'
        }
    };
}());
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
}());
// Аккордион (мобильная версия футера)
(function () {
    var navList = document.querySelector('.footer__list-wrap');
    var contactsList = document.querySelector('.footer__contacts-wrap');
    var CLOSE_MENU_LIST = 'footer__list--close';
    var CLOSE_CONTACTS_LIST = 'footer__contacts-wrap--close';
    var TOGGLE_ICON_ON = 'accordion-toggle__icon--js';
    var ACCORDION_TOGGLE_ON = 'accordion-toggle--js';
    var accordionMenuToggle = document.querySelector('.accordion-toggle--menu');
    var accordionContactsToggle = document.querySelector('.accordion-toggle--contacts');
    var accordionMenuToggleBig = document.querySelector('.accordion--menu');
    var accordionContactsToggleBig = document.querySelector('.accordion--contacts');
    var accordionMenuToggleIconOpen;
    var accordionMenuToggleIconClose;
    var accordionContactsToggleIconOpen;
    var accordionContactsToggleIconClose;
    if (accordionMenuToggle) {
        accordionMenuToggleIconOpen = accordionMenuToggle.querySelector('.accordion-toggle__icon--open');
        accordionMenuToggleIconClose = accordionMenuToggle.querySelector('.accordion-toggle__icon--close');
        accordionMenuToggle.classList.add(ACCORDION_TOGGLE_ON);
    }
    if (accordionContactsToggle) {
        accordionContactsToggleIconOpen = accordionContactsToggle.querySelector('.accordion-toggle__icon--open');
        accordionContactsToggleIconClose = accordionContactsToggle.querySelector('.accordion-toggle__icon--close');
        accordionContactsToggle.classList.add(ACCORDION_TOGGLE_ON);
    }
    if (navList) {
        navList.classList.add(CLOSE_MENU_LIST);
    }
    if (contactsList) {
        contactsList.classList.add(CLOSE_CONTACTS_LIST);
    }
    if (accordionMenuToggleIconOpen) {
        accordionMenuToggleIconOpen.classList.add(TOGGLE_ICON_ON);
    }
    if (accordionContactsToggleIconOpen) {
        accordionContactsToggleIconOpen.classList.add(TOGGLE_ICON_ON);
    }
    function toggleNavaccordionState() {
        accordionMenuToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);
        accordionMenuToggleIconClose.classList.toggle(TOGGLE_ICON_ON);
        navList.classList.toggle(CLOSE_MENU_LIST);
        if (accordionContactsToggleIconClose.classList.contains(TOGGLE_ICON_ON)) {
            accordionContactsToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);
            accordionContactsToggleIconClose.classList.toggle(TOGGLE_ICON_ON);
            contactsList.classList.toggle(CLOSE_CONTACTS_LIST);
        }
    }
    function toggleContactsaccordionState() {
        accordionContactsToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);
        accordionContactsToggleIconClose.classList.toggle(TOGGLE_ICON_ON);
        contactsList.classList.toggle(CLOSE_CONTACTS_LIST);
        if (accordionMenuToggleIconClose.classList.contains(TOGGLE_ICON_ON)) {
            accordionMenuToggleIconOpen.classList.toggle(TOGGLE_ICON_ON);
            accordionMenuToggleIconClose.classList.toggle(TOGGLE_ICON_ON);
            navList.classList.toggle(CLOSE_MENU_LIST);
        }
    }
    function toggleNavClickHandler() {
        toggleNavaccordionState();
    }
    function toggleClassListClickHandler() {
        toggleContactsaccordionState();
    }
    function activateToggleClickListener() {
        if (accordionMenuToggleBig) {
            accordionMenuToggleBig.addEventListener('click', toggleNavClickHandler);
        }
        if (accordionContactsToggleBig) {
            accordionContactsToggleBig.addEventListener('click', toggleClassListClickHandler);
        }
    }
    activateToggleClickListener();
}());
// Прокрутка до якоря
(function () {
    var links = document.querySelectorAll('[data-link]');
    if (links) {
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function (evt) {
                var target = document.querySelector('[id=' + evt.target.dataset.link + ']');
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }
}());
// Модальное окно
(function () {
    var modalOpen = document.querySelector('.modal-open');
    var modalClose = document.querySelector('.modal__close');
    var modal = document.querySelector('.modal');
    var body = document.querySelector('body');
    var name = document.querySelector('[name=modal-name]');
    var phone = document.querySelector('[name=modal-phone]');
    var comment = document.querySelector('[name=modal-comment]');
    var form = modal.querySelector('form');
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
            body.classList.add('modal-open');
            document.addEventListener('keydown', escapeClickHandler);
        } else {
            body.classList.remove('modal-open');
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
}());
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
            var reg = matrix.substr(0, input.value.length).replace(/_+/g, function (a) {
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
    });    // var phoneNumber = document.querySelectorAll('[type=tel]');
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
}());