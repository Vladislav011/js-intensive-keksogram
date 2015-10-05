(function() {
  var filters = document.querySelector('.filters');
  filters.classList.add('hidden');

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.getElementById('picture-template');
  var picturesFragment = document.createDocumentFragment();

  pictures.forEach(function(picture, i) {
    var newPictureElement = pictureTemplate.content.children[0].cloneNode(true);

    newPictureElement.querySelector('.picture-likes').textContent = picture['llikes'];
    newPictureElement.querySelector('.picture-comments').textContent = picture['comments'];
    newPictureElement.querySelector('img').setAttribute('src', picture['url']);

    picturesFragment.appendChild(newPictureElement);
    picturesContainer.appendChild(picturesFragment);
  });
})();
