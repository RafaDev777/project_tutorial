document.addEventListener("DOMContentLoaded", () => {
  const _defaults = {
    carousel: ".js-carousel",
    bgImg: ".js-carousel-bg-img",
    list: ".js-carousel-list",
    listItem: ".js-carousel-list-item",
  };

  const options = {}; // any custom options can be added here
  const settings = Object.assign({}, _defaults, options);

  const posY = { value: 0 };

  const getElements = (selector) => document.querySelectorAll(selector);
  const getElement = (selector) => document.querySelector(selector);

  const getBgImgs = () => getElements(settings.bgImg);
  const getListItems = () => getElements(settings.listItem);
  const getList = () => getElement(settings.list);
  const getCarousel = () => getElement(settings.carousel);

  const init = () => {
    const bgImgs = getBgImgs();
    TweenMax.set(bgImgs, {
      autoAlpha: 0,
      scale: 1.05,
    });

    if (bgImgs[0]) {
      TweenMax.set(bgImgs[0], {
        autoAlpha: 1,
        scale: 1,
      });
    }

    const listItemsLength = getListItems().length - 1;
    listOpacityController(0, listItemsLength);
  };

  const initCursor = (posY) => {
    const list = getList();
    const carousel = getCarousel();

    if (!carousel || !list) return;

    const listHeight = list.clientHeight;
    const carouselHeight = carousel.clientHeight;

    carousel.addEventListener(
      "mousemove",
      (event) => {
        posY.value = event.pageY - carousel.offsetTop;
        let offset = (-posY.value / carouselHeight) * listHeight;

        TweenMax.to(list, 0.3, {
          y: offset,
          ease: Power4.easeOut,
        });
      },
      false,
    );
  };

  const listOpacityController = (id, listItemsLength) => {
    id = parseInt(id);
    let aboveCurrent = listItemsLength - id;
    let belowCurrent = parseInt(id);

    if (aboveCurrent > 0) {
      for (let i = 1; i <= aboveCurrent; i++) {
        let opacity = 0.5 / i;
        let offset = 5 * i;
        TweenMax.to(getListItems()[id + i], 0.5, {
          autoAlpha: opacity,
          x: offset,
          ease: Power3.easeOut,
        });
      }
    }

    if (belowCurrent > 0) {
      for (let i = 0; i <= belowCurrent; i++) {
        let opacity = 0.5 / i;
        let offset = 5 * i;
        TweenMax.to(getListItems()[id - i], 0.5, {
          autoAlpha: opacity,
          x: offset,
          ease: Power3.easeOut,
        });
      }
    }
  };

  const bgImgController = (listItemsLength) => {
    const listItems = getListItems();

    listItems.forEach((link) => {
      link.addEventListener("mouseenter", (ev) => {
        let currentId = ev.currentTarget.dataset.itemId;

        listOpacityController(currentId, listItemsLength);

        TweenMax.to(ev.currentTarget, 0.3, {
          autoAlpha: 1,
        });

        TweenMax.to(".is-visible", 0.2, {
          autoAlpha: 0,
          scale: 1.05,
        });

        const bgImgs = getBgImgs();
        if (!bgImgs[currentId].classList.contains("is-visible")) {
          bgImgs[currentId].classList.add("is-visible");
        }

        TweenMax.to(bgImgs[currentId], 0.6, {
          autoAlpha: 1,
          scale: 1,
        });
      });
    });
  };

  // Initialize the carousel
  init();
  initCursor(posY);
  bgImgController(getListItems().length - 1);
});
