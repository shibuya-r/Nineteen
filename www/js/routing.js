'use strict'
// vars declaration
let myNavigtor;

// events declaration
document.addEventListener('init', function (event) {
  const page = event.target;
  myNavigtor= document.querySelector('#myNavigator');
  if (page.id === 'entry') {
    page.querySelector('#js-move-home-btn').onclick = () => {
      moveToHomeRcmddPage();
    };
  } else if (page.id === 'home-rcmdd') {
    page.querySelector('#js-home-arr-btn').onclick = () => {
      moveToHomeArrPage();
    };
    page.querySelector('#js-home-now-btn').onclick = () => {
      moveToHomeNowPage();
    };
  } else if (page.id === 'home-arr') {
    page.querySelector('#js-home-rcmdd-btn').onclick = () => {
      moveToHomeRcmddPage();
    };
    page.querySelector('#js-home-now-btn').onclick = () => {
      moveToHomeNowPage();
    };
  } else if (page.id === 'home-now-group') {
    page.querySelector('#js-home-rcmdd-btn').onclick = () => {
      moveToHomeRcmddPage()
    };
    page.querySelector('#js-home-arr-btn').onclick = () => {
      moveToHomeArrPage();
    };
  }
});

// methods declaration
const moveToHomeArrPage = (animation = 'fade') => {
  myNavigtor.pushPage('../templates/home/home-arrival-group.html', { animation });
};

const moveToHomeNowPage = (animation = 'fade') => {
  myNavigtor.pushPage('../templates/home/home-now-group.html', { animation });
};

const moveToHomeRcmddPage = (animation = 'fade') => {
  myNavigtor.pushPage('../templates/home/home-recommended-group.html', { animation });
};
