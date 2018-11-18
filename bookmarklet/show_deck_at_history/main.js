main();

function main() {
  const SHOW_DECK_BATTLE_TYPE = ["全国対戦", "戦友対戦", "店内イベント", "天下統一戦"];

  if (!location.href.startsWith("https://3594t.net/members/history/daily")) {
    alert("三国志大戦.NETの対戦履歴ページを開いた状態で実行してください");
    return;
  }

  const blockBattleList = document.getElementsByClassName("block_battle_list");

  [].forEach.call(blockBattleList, (battleBlock) => {
    var battleType = battleBlock.getElementsByClassName("battle_list_type")[0];
    if (SHOW_DECK_BATTLE_TYPE.includes(battleType.textContent)) {
      showDeckAtHistory(battleBlock.getElementsByClassName("battle_list_base")[0])
    }
  });
}

function showDeckAtHistory(historyBlock){
  appendDeckArea(historyBlock);
  appendDeck(historyBlock)
}

function appendDeckArea(historyBlock){
  historyBlock.style.height = "128px";
  historyBlock.target = "_blank";

  const myDeckDiv = document.createElement("div")
  myDeckDiv.style.position = "relative";
  myDeckDiv.style.left = "-98px";
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
  enemyDeckDiv.style.left = "-8px";
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
  cardTd.style.overflow = "hidden";

  card.style.width = "30px";
  card.style.height = "64px";
  card.firstElementChild.style.width = "30px";

  deckArea.insertBefore(cardTd, deckArea.firstChild).appendChild(card);

}
