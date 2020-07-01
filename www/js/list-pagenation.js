// マッチングリスト画面
document.addEventListener('init', function (event) {
  const page = event.target;
  // === sample data set ===
  let groupName = ""
  if (page.id === "match-making-matched") {
    groupName ="マッチング美女";
  } else if ( page.id === "match-making-offered-by") {
    groupName ="オファー来た美女";
  } else if ( page.id === "match-making-offered-to" ) {
    groupName ="オファー済み！美女";
  } else {
    groupName = "謎の美女"
  }
  const eachGroupElm = `
    <div class="container-block" >
    <div class="group-container">
    <div class='group-name'>${groupName}</div>
    <img alt="" src="../../../assets/sample/sample-girls-group1.jpg" width="100%">
    </div>
    </div>
  `
  let sampleDataSets = new Array();
  sampleDataSets = [...Array(20)].map(() => eachGroupElm);
  // =======

  $('.js-match-making-pagination-container').pagination({
    dataSource: sampleDataSets, // set sample dataset
    pageSize: 5,
    autoHidePrevious: true,
    autoHideNext: true,
    callback: function (data, pagination) {
      $(".js-matche-making-data-container").html(data);
    }
  })
});
