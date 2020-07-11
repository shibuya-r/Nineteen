// 画像のスライダー@相手グループプロフィール閲覧画面 / マッチングリスト画面? / ??
document.addEventListener('init', function (event) {
  const page = event.target;
  if (page.id === "partner-group-profile") { // 相手グループプロフィール閲覧画面
    const swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      centeredSlides: true,
      slidesPerView: 1.2,
    });
  } else if (page.id === "profile-view") { // 個人プロフィール閲覧画面
    const swiper1 = new Swiper('.slide1', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      centeredSlides: true,
      slidesPerView: 1,
    });
    const swiper2 = new Swiper('.slide2', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      spaceBetween: 10,
      slidesPerView: 3,
    });
  }
});
