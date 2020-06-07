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
  } else if (page.id === 'home-arr' || 'home-now' || 'home-rcmdd') {
    // === home header tabs ===
    page.querySelector('#js-home-arr-btn').onclick = () => {
      moveToHomeArrPage();
    };
    page.querySelector('#js-home-now-btn').onclick = () => {
      moveToHomeNowPage();
    };
    page.querySelector('#js-home-rcmdd-btn').onclick = () => {
      moveToHomeRcmddPage();
    };
    
    // === home footer tabs ===
    page.querySelector("#js-group-tab").onclick = () => {
      moveToGroupPage();
    };
    page.querySelector("#js-home-tab").onclick = () => {
      moveToHomeRcmddPage();
    };
    page.querySelector("#js-match-making-tab").onclick = () => {
      moveToMatchMakingPage();
    };
    page.querySelector("#js-schedule-tab").onclick = () => {
      moveToSchedulePage();
    };
    page.querySelector("#js-topic-tab").onclick = () => {
      moveToTopicPage();
    };
  }
});

// methods declaration
const moveToGroupPage = (animation = 'fade') => {
  myNavigtor.pushPage('/templates/group.html', { animation });
};

const moveToHomeArrPage = (animation = 'fade') => {
  myNavigtor.pushPage('/templates/home/home-arrival-group.html', { animation });
};

const moveToHomeNowPage = (animation = 'fade') => {
  myNavigtor.pushPage('/templates/home/home-now-group.html', { animation });
};

const moveToHomeRcmddPage = (animation = 'fade') => {
  myNavigtor.pushPage('/templates/home/home-recommended-group.html', { animation });
};

const moveToMatchMakingPage = (animation = 'fade') => {
  myNavigtor.pushPage('/templates/match-making.html', { animation });
};

const moveToSchedulePage = (animation = 'fade') => {
  myNavigtor.pushPage('/templates/schedule.html', { animation });
};

const moveToTopicPage = (animation = 'fade') => {
  myNavigtor.pushPage('/templates/topic.html', { animation });
};
