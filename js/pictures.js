(function() {
  var ReadyState = {
    'UNSENT': 0,
    'OPENED': 1,
    'HEADERS_RECEIVED': 2,
    'LOADING': 3,
    'DONE': 4,
  };

  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');

  var REQUEST_FAILURE_TIMEOUT = 10000;

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.getElementById('picture-template');
  var picturesFragment = document.createDocumentFragment();

  function renderPictures(pictures) {
    pictures.forEach(function(picture, i) {
      var newPictureElement = pictureTemplate.content.children[0].cloneNode(true);

      newPictureElement.querySelector('.picture-likes').textContent = picture['likes'];
      newPictureElement.querySelector('.picture-comments').textContent = picture['comments'];

      picturesFragment.appendChild(newPictureElement);

      if (picture['url']) {
        var photo = new Image();
        photo.src = picture['url'];

        var imageLoadTimeout = setTimeout(function() {
          newPictureElement.classList.add('pictures-failure');
        }, REQUEST_FAILURE_TIMEOUT);

        photo.onload = function() {
          var imgElement = document.createElement('img');
          imgElement.setAttribute('src', picture['url']);
          imgElement.setAttribute('width', 182);
          imgElement.setAttribute('height', 182);
          newPictureElement.replaceChild(imgElement, newPictureElement.querySelector('img'));
          clearTimeout(imageLoadTimeout);
        }

        photo.onerror = function(evt) {
          newPictureElement.classList.add('pictures-failure');
        };
      };

      picturesContainer.appendChild(picturesFragment);
    });
  }

  function showLoadFailure() {
    newPictureElement.classList.add('pictures-failure');
  }

  function loadPicturesData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = REQUEST_FAILURE_TIMEOUT;
    xhr.open('get', 'data/pictures.json', true);
    xhr.send();

    xhr.onreadystatechange = function(evt) {
      var loadedXhr = evt.target;

      switch (loadedXhr.readyState) {
        case ReadyState.OPENED:
        case ReadyState.HEADERS_RECEIVED:
        case ReadyState.LOADING:
          picturesContainer.classList.add('pictures-loading');
          break;
        case ReadyState.DONE:
        default:
          if (xhr.status == 200) {
            var data = loadedXhr.response;
            picturesContainer.classList.remove('pictures-loading');
            callback(JSON.parse(data));
          }

          if (xhr.status > 400) {
            showLoadFailure();
          }
          break;
      }
    };

    xhr.ontimeout = function() {
      showLoadFailure();
    }
  }

  loadPicturesData(renderPictures);

  filters.classList.remove('hidden');
})();
