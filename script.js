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

const lightboxActiveImg = document.getElementById('lightbox__main-img');
const lightbox = document.querySelector('.lightbox');
const addToCartBtn = document.getElementById('to-cart');
let emptyCartBtn;
const cartBtn = document.querySelector('.cart-icon--div');
const cartContent = document.querySelector('.cart-content');
let curSlide = 0;
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

// previous & next buttons functionality

function lightboxSlide(slideTo) {
  lightboxSliderThumbs.forEach((e, i) => {
    if (e.classList.contains('lightbox__thumbnails-item--active')) curSlide = i;
  });

  if (slideTo === 'next') {
    if (curSlide < lightboxSliderThumbs.length - 1) {
      lightboxSliderThumbs[curSlide].classList.remove(
        'lightbox__thumbnails-item--active'
      );
      curSlide++;
      lightboxActiveImg.setAttribute(
        'src',
        lightboxSliderThumbs[curSlide].getAttribute('data-src')
      );
      lightboxSliderThumbs[curSlide].classList.add(
        'lightbox__thumbnails-item--active'
      );
      sliderTracker(
        lightboxSliderThumbs[curSlide],
        desktopSliderThumbs,
        activeImg,
        'active-img'
      );
    }
  } else if (slideTo === 'previous') {
    if (curSlide > 0) {
      lightboxSliderThumbs[curSlide].classList.remove(
        'lightbox__thumbnails-item--active'
      );
      curSlide--;
      lightboxActiveImg.setAttribute(
        'src',
        lightboxSliderThumbs[curSlide].getAttribute('data-src')
      );
      lightboxSliderThumbs[curSlide].classList.add(
        'lightbox__thumbnails-item--active'
      );
      sliderTracker(
        lightboxSliderThumbs[curSlide],
        desktopSliderThumbs,
        activeImg,
        'active-img'
      );
    }
  }
}

nextBtn.addEventListener('click', (e) => lightboxSlide('next'));
prevBtn.addEventListener('click', (e) => lightboxSlide('previous'));

//! cart

// cartBtn.addEventListener('click', function () {
//   if (!cartContent.classList.contains('cart-content--visible')) {
//     alterClass(cartContent, 'cart-content--visible', 'add');
//   } else {
//     alterClass(cartContent, 'cart-content--visible', 'remove');
//   }
// });

cartBtn.addEventListener('click', () => {
  alterClass(cartContent, 'cart-content--visible', 'toggle');
});

// adding to cart
addToCartBtn.addEventListener('click', addToCart);

// checking if empty cart icon exists and functionality

if (emptyCartBtn) {
  emptyCartBtn.addEventListener('click', emptyCart);
}

function addToCart() {
  const cartBtn = document.querySelector('.cart-icon--div');

  const qtyDom = document.createElement('span');
  const qtyValue = Number(inpQty.value);
  if (typeof (qtyValue === 'number' && qtyValue > 0)) {
    qtyDom.innerHTML = qtyValue;
    if (cartBtn.contains(cartBtn.querySelector('span'))) {
      Array.from(cartBtn.querySelectorAll('span')).map((e) => {
        e.remove();
      });
    }
  }

  cartBtn.appendChild(qtyDom);

  cartContent.innerHTML = `<h3 class="cart-content__heading">Cart</h3>
        <div class="cart-content__full">
            <div class="cart-content__product">
                <div class="cart-content__product-img"><img src="images/image-product-1-thumbnail.jpg" alt="Product"></div>
                <div class="cart-content__product-text">
                    <h6>Autumn Limited Edition ...</h6>
                    <div class="cart-content__product-price">$125.00 * ${qtyValue} <span>$${
    125.0 * qtyValue
  }</span></div>
  </div>
  <div class="cart-content__bin-icon">
  <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill-rule="nonzero" xlink:href="#a"/></svg>
  </div>
  </div>
            <button class="cart-content__btn">Checkout</button>
        </div>`;

  emptyCartBtn = document.querySelector('.cart-content__bin-icon');
  if (emptyCartBtn) {
    emptyCartBtn.addEventListener('click', emptyCart);
  } else {
    alert(`You can't buy ${inpQty.value} products`);
  }
}
function emptyCart() {
  const cartBtn = document.querySelector('.cart-icon--div');
  if (cartBtn.contains(cartBtn.querySelector('span'))) {
    Array.from(cartBtn.querySelectorAll('span')).map((e) => {
      e.remove();
    });
  }
  cartContent.innerHTML = `

              <h3 class="cart-content__heading">Cart</h3>
              <div class="cart-content__empty">Your cart is empty.</div>
</div>
`;
  inpQty.value = 0;
  alterClass(cartContent, 'cart-content--visible', 'toggle');
}
