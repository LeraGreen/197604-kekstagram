'use strict';

define(function() {
  function getLastGraceBithday() {
    var graceBirthday = new Date();
    graceBirthday.setMonth(11, 9);
    var now = new Date();

    if (graceBirthday > now) {
      return graceBirthday.setFullYear(graceBirthday.getFullYear() - 1);
    }
    return graceBirthday;
  }

  function getExpireCookiesDate() {
    var days = 24 * 60 * 60 * 1000;
    return Math.floor((new Date() - getLastGraceBithday()) / days);
  }

  function setCookie(filter) {
    window.Cookies.set('upload-filter', filter, { expires: getExpireCookiesDate() });
  }

  function getFilterNameFromCookies() {
    return window.Cookies.get('upload-filter');
  }

  function setCurrentFilterName(list, form) {
    if (getFilterNameFromCookies() === null) {
      return;
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === 'upload-' + getFilterNameFromCookies()) {
        list[i].setAttribute('checked', 'checked');
        var event = new Event('change');
        form.dispatchEvent(event);
      }
    }
  }

  return {
    setFilterName: setCurrentFilterName,
    setNewCookie: setCookie
  };
});
