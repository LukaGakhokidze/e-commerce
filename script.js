'use strict';

const desktopSliderThumbs = Array.from(
  document.querySelectorAll('.thumbnails-list__item')
);

const activeImg = document.getElementById('main-img');
const incQtyBtn = document.getElementById('item-counter__plus');
const decQtyBtn = document.getElementById('item-counter__minus');
let inpQty = document.getElementById('item-counter__input');
const closeLightbox = document.getElementById('lightbox__close-btn');
const prevBtn = document.getElementById('lightbox__prev-btn');
const nextBtn = document.getElementById('lightbox__next-btn');
const lightboxSliderThumbs = Array.from(
  document.querySelectorAll('.lightbox__thumbnails-item')
);
console.log(lightboxSliderThumbs);

const lightboxActiveImg = document.getElementById('lightbox__main-img');
const lightbox = document.querySelector('.lightbox');

// thumbnail functionality

// function for classes
function alterClass(element, class_name, processName) {
  if (processName === 'add') {
    element.classList.add(class_name);
  } else if (processName === 'remove') {
    if (element.classList.contains(class_name)) {
      element.classList.remove(class_name);
    }
  } else if (processName === 'toggle') {
    element.classList.toggle(class_name);
  }
}

function showClickedPhoto(element, siblings, visibleImg, class_name) {
  const srcImg = element.getAttribute('data-src');
  visibleImg.setAttribute('src', srcImg);
  siblings.forEach((e) => {
    if (e.classList.contains(class_name)) {
      e.classList.remove(class_name);
    }
  });
  element.classList.add(class_name);
}

function sliderTracker(element, siblings, visibleImg, class_name) {
  const srcImg = element.getAttribute('data-src');
  visibleImg.setAttribute('src', srcImg);
  siblings.forEach((e) => {
    alterClass(e, class_name, 'remove');
    if (element.getAttribute('data-src') === e.getAttribute('data-src')) {
      alterClass(e, class_name, 'add');
    }
  });
}
desktopSliderThumbs.forEach((element) => {
  element.addEventListener('click', function () {
    showClickedPhoto(element, desktopSliderThumbs, activeImg, 'active-img');
    sliderTracker(
      element,
      lightboxSliderThumbs,
      lightboxActiveImg,
      'lightbox__thumbnails-item--active'
    );
  });
});

// item quantity

incQtyBtn.addEventListener('click', incQty);
decQtyBtn.addEventListener('click', decQty);

function incQty() {
  console.log(inpQty.value);

  inpQty.value++;
}
function decQty() {
  if (inpQty.value > 0) {
    inpQty.value--;
  }
}

// overlay and lightbox open & close

function addOverlay() {
  if (!document.body.contains(document.querySelector('.overlay'))) {
    const overlayEl = document.createElement('div');
    overlayEl.classList.add('overlay');
    document.body.append(overlayEl);
  }
}

function removeOverlay() {
  if (document.body.contains(document.querySelector('.overlay'))) {
    document.querySelector('.overlay').remove();
  }
}

closeLightbox.addEventListener('click', function () {
  alterClass(lightbox, 'lightbox--visible', 'remove');
  removeOverlay();
});

activeImg.addEventListener('click', function () {
  alterClass(lightbox, 'lightbox--visible', 'add');
  addOverlay();
});

lightboxSliderThumbs.forEach((element) => {
  element.addEventListener('click', function () {
    showClickedPhoto(
      element,
      lightboxSliderThumbs,
      lightboxActiveImg,
      'lightbox__thumbnails-item--active'
    );

    sliderTracker(element, desktopSliderThumbs, activeImg, 'active-img');
  });
});
