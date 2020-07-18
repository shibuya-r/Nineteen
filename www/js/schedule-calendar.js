// 飲み会スケジュール画面: カレンダー
document.addEventListener('init', function (event) {
  const page = event.target;
  if (page.id != "schedule-calendar") {
    return
  }
  $('#myCalendar').monthly();
});

document.addEventListener('hide', function (event) {
  const page = event.target;
  if (page.id !== "schedule-calendar") {
    return
  }
  const myCalendar = document.getElementById("myCalendar");
  if (myCalendar !== null) {
    document.getElementById("myCalendar").remove(); // [NOTE]: 2回目のinit時に前のデータが残って表示できないバグがあるので、画面消滅時に要素を明示的にリムーブ
  }
});
