'use strict';

function getMessage(a, b) {

  var amountOfRedPoints = 0;
  var artifactsSquare = 0;

  if (a === true) {

    return ('Переданное GIF-изображение анимировано и содержит ' + [b] + ' кадров');
  }


  if (a === false) {

    return ('Переданное GIF-изображение не анимировано');
  }


  if (typeof a === 'number') {

    return ('Переданное SVG-изображение содержит ' + [a] + ' объектов и ' + [b * 4] + ' атрибутов');
  }


  if (a instanceof Array && !(b instanceof Array)) {

    for ( var i = 0; i < a.length; i++ ) {

      amountOfRedPoints += a[i];

    }

    return ('Количество красных точек во всех строчках изображения: ' + [amountOfRedPoints]);
  }


  if (a instanceof Array && b instanceof Array) {

    var minLength = Math.max(a.length, b.length);

    for ( var j = 0; j < minLength; j++ ) {

      artifactsSquare += a[j] * b[j];

    }

    return ('Общая площадь артефактов сжатия: ' + [artifactsSquare] + ' пикселей');
  }


  return ('Переданы некорректные данные');
}



getMessage();

