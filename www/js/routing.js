'use strict'
document.addEventListener('init', function (event) {
  const page = event.target;
  if (page.id === 'entry') {
    page.querySelector('#js-move-home-btn').onclick = () => {
      moveToHomeRcmddPage();
    };

  } else if (page.id === 'home-rcmdd') {
    page.querySelector('#js-home-arr-g-btn').onclick = () => {
      moveToHomeArrPage();
    };
    page.querySelector('#js-home-now-g-btn').onclick = () => {
      moveToHomeNowPage();
    };

  } else if (page.id === 'home-arr') {
    page.querySelector('#js-home-rcmdd-g-btn').onclick = () => {
      moveToHomeRcmddPage();
    };
    page.querySelector('#js-home-now-g-btn').onclick = () => {
      moveToHomeNowPage();
    };

  } else if (page.id === 'home-now-group') {
    page.querySelector('#js-home-rcmdd-g-btn').onclick = () => {
      moveToHomeRcmddPage()
    };
    page.querySelector('#js-home-arr-g-btn').onclick = () => {
      moveToHomeArrPage();
    };
  }
});

const moveToHomeArrPage = () => {
  document.querySelector('#myNavigator').pushPage('../templates/home/home-arrival-group.html', { animation: 'fade' });
};

const moveToHomeRcmddPage = () => {
  document.querySelector('#myNavigator').pushPage('../templates/home/home-recommended-group.html', { animation: 'fade' });
};

const moveToHomeNowPage = () => {
  document.querySelector('#myNavigator').pushPage('../templates/home/home-now-group.html', { animation: 'fade' });
};

