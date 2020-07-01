'use strict'
// Script for page routes.

// vars declaration
let myNavigtor;

// events declaration
document.addEventListener('init', function (event) {
  const page = event.target;
  myNavigtor = document.querySelector('#myNavigator');

  // === home header tabs ===
  if (page.id === 'home-arr'
    || page.id === 'home-now'
    || page.id === 'home-rcmdd')
  {
    page.querySelector('#js-home-arr-btn').onclick = () => {
      moveToHomeArrPage();
    };
    page.querySelector('#js-home-now-btn').onclick = () => {
      moveToHomeNowPage();
    };
    page.querySelector('#js-home-rcmdd-btn').onclick = () => {
      moveToHomeRcmddPage();
    };
  }

  // === home footer tabs ===
  page.querySelector("#js-group-tab").onclick = () => {
    moveToGroupPage();
  };
  page.querySelector("#js-home-tab").onclick = () => {
    moveToHomeRcmddPage();
  };
  page.querySelector("#js-match-making-tab").onclick = () => {
    moveToMatchMakingMatchedPage();
  };
  page.querySelector("#js-schedule-tab").onclick = () => {
    moveToSchedulePage();
  };
  page.querySelector("#js-topic-tab").onclick = () => {
    moveToTopicPage();
  };

  // === match-making header tabs ===
  if (page.id === 'match-making-matched'
    || page.id === 'match-making-offered-by'
    || page.id === 'match-making-offered-to')
  {
    page.querySelector("#js-matched").onclick = () => {
      moveToMatchMakingMatchedPage();
    };
    page.querySelector("#js-match-offered-by").onclick = () => {
      moveToMatchMakingOfferedByPage();
    };
    page.querySelector("#js-match-offered-to").onclick = () => {
      moveToMatchMakingOfferedToPage();
    };
  }

  // === Others ===
  // Move to goup profile page
  page.querySelector("#group-hoge").onclick = () => {
    moveToGropProfilePage();
  };
});

// methods declaration
const moveToGroupPage = (animation = 'fade') => {
  myNavigtor.pushPage('../group.html', {
    animation
  });
};

const moveToHomeArrPage = (animation = 'fade') => {
  myNavigtor.pushPage('./home-arrival-group.html', {
    animation
  });
};

const moveToHomeNowPage = (animation = 'fade') => {
  myNavigtor.pushPage('./home-now-group.html', {
    animation
  });
};

const moveToHomeRcmddPage = (animation = 'fade') => {
  myNavigtor.pushPage('./home-recommended-group.html', {
    animation
  });
};

const moveToMatchMakingOfferedByPage = (animation = 'fade') => {
  myNavigtor.pushPage('../match-making/match-making-offered-by.html', {
    animation
  });
};

const moveToMatchMakingOfferedToPage = (animation = 'fade') => {
  myNavigtor.pushPage('../match-making/match-making-offered-to.html', {
    animation
  });
};

const moveToMatchMakingMatchedPage = (animation = 'fade') => {
  myNavigtor.pushPage('../match-making/match-making-matched.html', {
    animation
  });
};

const moveToSchedulePage = (animation = 'fade') => {
  myNavigtor.pushPage('../schedule.html', {
    animation
  });
};

const moveToTopicPage = (animation = 'fade') => {
  myNavigtor.pushPage('../topic.html', {
    animation
  });
};

const moveToGropProfilePage = (animation = 'fade') => {
  // Currently, only the group that named group-hoge in recommended group page can move to it. After DB connected, parsing id that contain group name or unique id, then move the target group profile page.
  myNavigtor.pushPage('../partner-group-profile.html', {
    animation
  });
};
