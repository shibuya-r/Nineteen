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
  }
});
