main();

function main() {
  if (location.host != "3594t.net") {
    alert("三国志大戦.NETのページを開いた状態で実行してください");
    return;
  }
  const DATA_LIST_API_URL = "https://3594t.net/datalist/api/members/main";
  const request = new XMLHttpRequest();
  request.open("GET", DATA_LIST_API_URL);
  request.addEventListener("load", (event) => {
    if (event.target.status !== 200) {
      alert("データ取得に失敗しました、ステータスコード：" + event.target.status);
      return;
    }
    myCardList = parseMyCardList(event.target.responseText);
    if (myCardList.length > 0) {
      appendCopyButton(myCardList);
    }
  });
  request.send();
}

function parseMyCardList(responseBody) {
  const CARD_LIST_INDEX = 2;

  const bodyArray = responseBody.split("\n");
  if (bodyArray[CARD_LIST_INDEX] == undefined ) {
    alert("データ取得に失敗しました、.netにログインしていることを確認してください");
    return [];
  }
  return bodyArray[CARD_LIST_INDEX]
}

function appendCopyButton(cardList) {
  const appendedButton = document.createElement("div");
  appendedButton.innerHTML = "登用掲示板に登録する";
  appendedButton.id = "appendedButton";
  appendedButton.style = "width:50%;height:auto;margin:10px 25%;padding:10px;border:solid;background-color:#fff;";
  appendedButton.addEventListener('click', function() {
    copyTextToClipboard(cardList);
    bodyElm.removeChild(appendedButton);
    window.open("http://3594tapp.webcrow.jp/board_registration.php");
  });

  const bodyElm = document.getElementsByTagName("div")[0];
  const tmp = document.getElementById("appendedButton");
  if (tmp != undefined) {
    tmp.parentNode.removeChild(tmp);
  }
  bodyElm.appendChild(appendedButton);
}

function copyTextToClipboard(text){
  const tmpForm = document.createElement("textarea");
  tmpForm.textContent = text;

  const bodyElm = document.getElementsByTagName("div")[0];
  bodyElm.appendChild(tmpForm);

  if (isIos()) {
    tmpForm.selectionStart = 0;
    tmpForm.selectionEnd  = tmpForm.value.length;
  } else {
    tmpForm.select();
  }

  const result = document.execCommand('copy');

  bodyElm.removeChild(tmpForm);
  return result;
}

function isIos() {
  const ua = navigator.userAgent;
  return ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0 || navigator.userAgent.indexOf("iPod") >= 0
}
