// ユーザープールの設定
const poolData = {
  UserPoolId: "ap-northeast-1_2eqqWU66l",
  ClientId: "1rdk2ab9ohcphbkuur0i9qqsc2"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * 画面読み込み時の処理
 */
$(document).ready(function () {

  // Amazon Cognito 認証情報プロバイダーの初期化
  AWSCognito.config.region = 'ap-northeast-1'; // リージョン
  AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-northeast-1:a6db466d-a408-4c41-98a2-165ba26d82c7"
  });

  $("#createAccount").click(function (event) {
    signUp();
  });
  $("#activationButton").click(function (event) {
    activate();
  });
  $("#signinButton").click(function (event) {
    signIn();
  });
});

/**
 * サインアップ処理。
 */
var signUp = function () {

  var username = $("#userid").val();
  var password = $("#password").val();

  // 何か1つでも未入力の項目がある場合、処理終了
  if (!username | !password) {
    return false;
  }

  // サインアップ処理
  userPool.signUp(username, password, null, null, function (err, result) {
    if (err) {
      alert(err);
      return;
    } else {
      alert(username + "さん：Nineteenへの登録が完了しました");
    }
  });
}
var activate = function () {

  var signInId = $("#activationId").val();
  var activationKey = $("#activationKey").val();

  // 何か1つでも未入力の項目がある場合、処理を中断
  if (!activationId | !activationKey) {
    return false;
  }

  var userData = {
    Username: activationId,
    Pool: userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // アクティベーション処理
  cognitoUser.confirmRegistration(activationKey, true, function (err, result) {
    if (err) {
      // アクティベーション失敗の場合、エラーメッセージを画面に表示
      if (err.message != null) {
        $("div#message span").empty();
        $("div#message span").append(err.message);
      }
    } else {
      // アクティベーション成功の場合、サインイン画面に遷移
    }
  });
}
var signIn = function () {
  var signinId = $('#signinId').val();
  var signinPassword = $('#signinPassword').val();

  // 何か1つでも未入力の項目がある場合、メッセージを表示して処理を中断
  if (!signinId | !signinPassword) {
    $("#signin div#message span").empty();
    $("#signin div#message span").append("All fields are required.");
    return false;
  }

  // 認証データの作成
  var authenticationData = {
    Username: signinId,
    Password: signinPassword
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var userData = {
    Username: signinId,
    Pool: userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  // 認証処理
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var idToken = result.getIdToken().getJwtToken(); // IDトークン
      var accessToken = result.getAccessToken().getJwtToken(); // アクセストークン
      var refreshToken = result.getRefreshToken().getToken(); // 更新トークン

      console.log("idToken : " + idToken);
      console.log("accessToken : " + accessToken);
      console.log("refreshToken : " + refreshToken);

      $(location).attr("href", "templates/home/home.html");
    },

    onFailure: function (err) {
      // サインイン失敗の場合、エラーメッセージを画面に表示
      console.log(err);
      $("div#message span").empty();
      $("div#message span").append(err.message);
    }
  });
}
