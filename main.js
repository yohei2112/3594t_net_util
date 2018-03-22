main();

function main() {
  const DATA_LIST_API_URL = "https://3594t.net/datalist/api/members/main";
  const request = new XMLHttpRequest();
  request.open("GET", DATA_LIST_API_URL);
  request.addEventListener("load", (event) => {
    if (event.target.status !== 200) {
      alert("データ取得に失敗しました、ステータスコード：" + event.target.status);
      return;
    }
    myCardList = parseMyCardList(event.target.responseText);
    appendCopyButton(myCardList);
//    appendSendForm(myCardList);
  });
  request.send();
}

function parseMyCardList(responseBody) {
  const CARD_LIST_INDEX = 2;

  const bodyArray = responseBody.split("\n");
  if (bodyArray[CARD_LIST_INDEX] == undefined ) {
    alert("データ取得に失敗しました、.netにログインしていることを確認してください");
    return;
  }
  return bodyArray[CARD_LIST_INDEX]
}

function appendSendForm(cardList) {
    const form = document.createElement('form');
    form.action = 'http://3594tapp.webcrow.jp/registration.php';
    form.method = 'post';

    const tmpInput = document.createElement('input');
    tmpInput.value = cardList;
    tmpInput.name = 'list';
    tmpInput.type = "hidden";

    form.appendChild(tmpInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "submit";
    submitButton.type = "submit";

    submitButton.addEventListener('click', function() {
      form.submit();
    });

    const bodyElm = document.getElementsByTagName("div")[0];

    bodyElm.appendChild(form);
    bodyElm.appendChild(submitButton);
}

function appendCopyButton(cardList) {
  const copyButton = document.createElement("button");
  copyButton.textContent = "copy";
  copyButton.id = "appendedButton";

  const bodyElm = document.getElementsByTagName("div")[0];
  const tmp = document.getElementById("appendedButton");
  if (tmp != undefined) {
    bodyElm.removeChild(tmp);
  }
  bodyElm.appendChild(copyButton);

  copyButton.addEventListener('click', function() {
    copyTextToClipboard(cardList);
    bodyElm.removeChild(copyButton);
  });
}

function copyTextToClipboard(text){
  const tmpForm = document.createElement("textarea");
  tmpForm.textContent = text;

  const bodyElm = document.getElementsByTagName("div")[0];
  bodyElm.appendChild(tmpForm);

  tmpForm.select();

  document.execCommand('copy');

  bodyElm.removeChild(tmpForm);
}
