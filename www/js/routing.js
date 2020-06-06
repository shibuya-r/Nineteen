'use strict'
document.addEventListener('init', function (event) {
  var page = event.target;
  if (page.id === 'entry') {
    console.log('----')
    console.log('hoge')
    page.querySelector('#js-move-home-btn').onclick = function () {
      document.querySelector('#myNavigator').pushPage('../templates/home.html');
    };
  } else if (page.id === 'home') {
    page.querySelector('ons-toolbar .center').innerHTML = "HOME";
    page.querySelector('#js-home-arr-g-btn').onclick = function () {
      document.querySelector('#myNavigator').pushPage('../templates/home/home-arrival-group.html');
    };
  } else if (page.id === 'home-arrival-group') {
    page.querySelector('ons-toolbar .center').innerHTML = "HOME";
    console.log('foooooo')
  }
});
