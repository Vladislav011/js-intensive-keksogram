(function() {
  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');

  var IMAGE_FAILURE_TIMEOUT = 10000;

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.getElementById('picture-template');
  var picturesFragment = document.createDocumentFragment();

  pictures.forEach(function(picture, i) {
    var newPictureElement = pictureTemplate.content.children[0].cloneNode(true);

    newPictureElement.querySelector('.picture-likes').textContent = picture['llikes'];
    newPictureElement.querySelector('.picture-comments').textContent = picture['comments'];

    picturesFragment.appendChild(newPictureElement);

    if (picture['url']) {
      var photo = new Image();
      photo.src = picture['url'];

      var imageLoadTimeout = setTimeout(function() {
        newPictureElement.classList.add('picture-load-failure');
      }, IMAGE_FAILURE_TIMEOUT);

      photo.onload = function() {
        var imgElement = document.createElement('img');
        imgElement.setAttribute('src', picture['url']);
        imgElement.setAttribute('width', 182);
        imgElement.setAttribute('height', 182);
        newPictureElement.replaceChild(imgElement, newPictureElement.querySelector('img'));
        clearTimeout(imageLoadTimeout);
      }

      photo.onerror = function(evt) {
        newPictureElement.classList.add('picture-load-failure');
      };
    };

    picturesContainer.appendChild(picturesFragment);
  });
})();
