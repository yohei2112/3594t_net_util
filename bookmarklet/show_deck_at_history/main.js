main();

function main() {
  if (!location.href.startsWith("https://3594t.net/members/history/daily")) {
    alert("三国志大戦.NETの対戦履歴ページを開いた状態で実行してください");
    return;
  }

  const historyBlockList = document.getElementsByClassName("battle_list_base");

  [].forEach.call(historyBlockList, (historyBlock) => {
     historyBlock.style.height = "128px";
     showDeckAtHistory(historyBlock)
  });
}

function showDeckAtHistory(historyBlock){
  appendDeckArea(historyBlock);
  appendDeck(historyBlock)
}

function appendDeckArea(historyBlock){
  const myDeckDiv = document.createElement("div")
  myDeckDiv.style.position = "relative";
  myDeckDiv.style.overflow = "hidden";
  myDeckDiv.style.height = "64px";
  myDeckDiv.style.left = "-90px";
  myDeckDiv.style.margin = "8px 0";
  myDeckDiv.style.width = "260px";
  const myCardTable = document.createElement("table");
  myCardTable.style.border = "solid 1px #fff";
  myCardTable.style.borderCollapse = "separate";
  myCardTable.style.borderSpacing = "2px";
  const myCardTr = document.createElement("tr");
  myCardTr.id = historyBlock.href + "_mydata";
  myCardTable.appendChild(myCardTr);
  myDeckDiv.appendChild(myCardTable);

  const enemyDeckDiv = document.createElement("div")
  enemyDeckDiv.style.position = "relative";
  enemyDeckDiv.style.overflow = "hidden";
  enemyDeckDiv.style.height = "64px";
  enemyDeckDiv.style.margin = "8px 0";
  enemyDeckDiv.style.width = "260px";
  const enemyCardTable = document.createElement("table");
  enemyCardTable.style.border = "solid 1px #fff";
  enemyCardTable.style.borderCollapse = "separate";
  enemyCardTable.style.borderSpacing = "2px";
  const enemyCardTr = document.createElement("tr");
  enemyCardTr.id = historyBlock.href + "_enemydata";
  enemyCardTable.appendChild(enemyCardTr);
  enemyDeckDiv.appendChild(enemyCardTable);

  historyBlock.getElementsByClassName("battle_list_mydata")[0].appendChild(myDeckDiv)
  historyBlock.getElementsByClassName("battle_list_enemydata")[0].appendChild(enemyDeckDiv)
}

function appendDeck(historyBlock){
  const myDeckArea = document.getElementById(historyBlock.href + "_mydata");
  const enemyDeckArea = document.getElementById(historyBlock.href + "_enemydata");

  const request = new XMLHttpRequest();
  request.open("GET", historyBlock.href);
  request.responseType = "document";
  request.addEventListener("load", (event) => {
    if (event.target.status !== 200) {
      alert("データ取得に失敗しました、ステータスコード：" + event.target.status);
      return;
    }
    var myCardList = event.target.responseXML.getElementsByClassName("frame_red")[0].getElementsByClassName("data_deck_cardblock_card");
    for ( var i = myCardList.length - 1; i >= 0 ; i--) {
      addCardToDeckArea(myDeckArea, myCardList[i]);
    };
    var enemyCardList = event.target.responseXML.getElementsByClassName("frame_blue")[0].getElementsByClassName("data_deck_cardblock_card");
    for ( var i = enemyCardList.length - 1; i >= 0 ; i--) {
      addCardToDeckArea(enemyDeckArea, enemyCardList[i]);
    };
  });
  request.send();
}

function addCardToDeckArea(deckArea, card) {
  var cardTd = document.createElement("td");
  cardTd.style.position = "relative";
  cardTd.style.width = "30px";
  cardTd.style.height = "64px";
  cardTd.style.backgroundColor = "#000";
  card.style.width = "30px";
  card.firstElementChild.style.width = "30px";

  deckArea.insertBefore(cardTd, deckArea.firstChild).appendChild(card);

}
