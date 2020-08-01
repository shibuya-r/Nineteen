'use strict'
// Script for page routes.

// vars declaration
let myNavigtor;

// events declaration
document.addEventListener('init', function (event) {
  const page = event.target;
  myNavigtor = document.querySelector('#myNavigator');

  // === home header tabs ===
  if (page.id === 'home-arr' ||
    page.id === 'home-now' ||
    page.id === 'home-rcmdd') {
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
  // === setting-info menu ===
  if (page.id === 'setting-info') {
    page.querySelector("#help-list").onclick = () => {
      moveToHelpListPage();
    };
    page.querySelector("#my-profile-edit").onclick = () => {
      moveToProfileEditPage();
    };
    page.querySelector("#terms-list").onclick = () => {
      moveToTermsListPage();
    };
    page.querySelector("#my-authentication-edit").onclick = () => {
      moveToEditAuthInfoPage();
    };
  }
  page.querySelector("#go-setting-info").onclick = () => {
    moveToSettingInfoPage();
  };
  // === home footer tabs ===
  if (page.id === "group"
    || page.id === "topic"
    || page.id === "home-arr"
    || page.id === "home-now"
    || page.id === "home-rcmdd"
    || page.id === "match-making-matched"
    || page.id === "match-making-offered-by"
    || page.id === "match-making-offered-to"
    || page.id === "schedule-calendar"
    || page.id === "schedule-list"
  ) {
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
      moveToScheduleListPage();
    };
    page.querySelector("#js-topic-tab").onclick = () => {
      moveToTopicPage();
    };
  }

  // === match-making header tabs ===
  if (page.id === 'match-making-matched' ||
    page.id === 'match-making-offered-by' ||
    page.id === 'match-making-offered-to') {
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

  // === match making party option on schedule-list page===
  if (page.id === "schedule-list" ||
    page.id === "schedule-calendar") {
    if (page.id === "schedule-list") {
      page.querySelector("#js-move-to-party-setting-sample").onclick = () => {
        moveToPartySettingPage();
      };
    }
    page.querySelector("#js-schedule-calendar-tab").onclick = () => {
      moveToScheduleCalendarPage();
    };
    page.querySelector("#js-schedule-list-tab").onclick = () => {
      moveToScheduleListPage();
    };
  }

  // === party　room entrance  on party setting page===
  if (page.id === "party-setting") {
    page.querySelector("#js-party-start-btn").onclick = () => {
      moveToPartyRoomPage();
    };
  }

  // === Others ===
  // Move to goup profile page
  if (page.id === "home-rcmdd") { // [DEBUG]: グループプロフィール閲覧への遷移があるページはすべて追加する
    page.querySelector("#group-hoge").onclick = () => {
      moveToGropProfilePage();
    };
  }
  // Move to member profile page
  if (page.id === "partner-group-profile" // [DEBUG]: メンバープロフィール閲覧の遷移があるページはすべて足す
    || page.id === "group-profile-edit"
  ) {
    page.querySelector("#member-hoge").onclick = () => {
      moveToMemberProfilePage();
    };
  }
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

const moveToPartySettingPage = (animation = 'fade') => {
  // Currently, only the match making party that has index 1 in schedule list page can move to it. After DB connected, parsing id, then move the target party setting page.
  myNavigtor.pushPage('../party/party-setting.html', {
    animation
  });
};

const moveToPartyRoomPage = (animation = "fade") => {
  myNavigtor.pushPage('../party/party-room.html', {
    animation
  });
}

const moveToScheduleCalendarPage = (animation = 'fade') => {
  myNavigtor.pushPage('../schedule/schedule-calendar.html', {
    animation
  });
};

const moveToScheduleListPage = (animation = 'fade') => {
  myNavigtor.pushPage('../schedule/schedule-list.html', {
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

const moveToMemberProfilePage = (animation = 'fade') => {
  // Currently, only the member that named member-hoge in group profile page can move to it. After DB connected, parsing id that contain member name or unique id, then move the target profile page.
  myNavigtor.pushPage('../profile-view.html', {
    animation
  });
};

const moveToSettingInfoPage = (animation = 'fade') => {
  myNavigtor.pushPage('../setting-info/main.html', {
    animation
  });
};

const moveToHelpListPage = (animation = 'fade') => {
  myNavigtor.pushPage('../setting-info/help-list.html', {
    animation
  });
};

const moveToProfileEditPage = (animation = 'fade') => {
  myNavigtor.pushPage('../setting-info/my-profile-edit.html', {
    animation
  });
};

const moveToTermsListPage = (animation = 'fade') => {
  myNavigtor.pushPage('../setting-info/terms-list.html', {
    animation
  });
};

const moveToEditAuthInfoPage = (animation = 'fade') => {
  myNavigtor.pushPage('../setting-info/edit-auth-info.html', {
    animation
  });
};