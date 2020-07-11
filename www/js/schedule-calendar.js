// 飲み会スケジュール画面: カレンダー
document.addEventListener('init', function (event) {
  const page = event.target;
  // === sample data set ===
  if (page.id != "schedule-calendar") {
    return
  }
  $('#mycalendar').monthly();
});
