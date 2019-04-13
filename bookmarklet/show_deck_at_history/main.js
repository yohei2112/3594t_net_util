main();

function main() {
  const SHOW_DECK_BATTLE_TYPE = ["全国対戦", "戦友対戦", "店内対戦", "店内イベント", "天下統一戦"];

  if (!location.href.startsWith("https://3594t.net/members/history/daily")) {
    alert("三国志大戦.NETの対戦履歴ページを開いた状態で実行してください");
    return;
  }

  removeAppendedElements();
  const blockBattleList = document.getElementsByClassName("block_battle_list");

  [].forEach.call(blockBattleList, (battleBlock) => {
    var battleType = battleBlock.getElementsByClassName("battle_list_type")[0];
    if (SHOW_DECK_BATTLE_TYPE.includes(battleType.textContent)) {
      showDeckAtHistory(battleBlock.getElementsByClassName("battle_list_base")[0])
    }
  });
  appendToggleNameButton();
}

function showDeckAtHistory(historyBlock){
  appendDeckArea(historyBlock);
  appendDeck(historyBlock)
}

function removeAppendedElements(){
  const appendedElementList = document.getElementsByClassName("appended-class");
  for ( var i = appendedElementList.length - 1; i >= 0 ; i--) {
    appendedElementList[i].remove();
  };
}

function appendDeckArea(historyBlock){
  historyBlock.style.height = "158px";
  historyBlock.target = "_blank";

  const myDeckDiv = document.createElement("div");
  myDeckDiv.style.position = "relative";
  myDeckDiv.style.top = "30px";
  myDeckDiv.style.left = "-98px";
  myDeckDiv.style.margin = "8px 0";
  myDeckDiv.style.width = "260px";
  myDeckDiv.classList.add("appended-class");

  const myGageDiv = document.createElement("div");
  myGageDiv.style.position = "relative";
  myGageDiv.classList.add("my-gage");
  myDeckDiv.appendChild(myGageDiv);

  const myCardTable = document.createElement("table");
  myCardTable.style.border = "solid 1px #fff";
  myCardTable.style.borderCollapse = "separate";
  myCardTable.style.borderSpacing = "2px";
  myCardTable.style.position = "absolute";
  const myCardTr = document.createElement("tr");
  myCardTr.id = historyBlock.href + "_mydata";
  myCardTable.appendChild(myCardTr);
  myDeckDiv.appendChild(myCardTable);

  const enemyDeckDiv = document.createElement("div")
  enemyDeckDiv.style.position = "relative";
  enemyDeckDiv.style.top = "30px";
  enemyDeckDiv.style.left = "-8px";
  enemyDeckDiv.style.margin = "8px 0";
  enemyDeckDiv.style.width = "260px";
  enemyDeckDiv.classList.add("appended-class");

  const enemyGageDiv = document.createElement("div");
  enemyGageDiv.style.position = "relative";
  enemyGageDiv.classList.add("enemy-gage");
  enemyDeckDiv.appendChild(enemyGageDiv);

  const enemyCardTable = document.createElement("table");
  enemyCardTable.style.border = "solid 1px #fff";
  enemyCardTable.style.borderCollapse = "separate";
  enemyCardTable.style.borderSpacing = "2px";
  enemyCardTable.style.position = "absolute";
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
    var myGage = event.target.responseXML.getElementsByClassName("battledetail_graph_own")[0]
    historyBlock.getElementsByClassName("my-gage")[0].appendChild(myGage);
    var myCardList = event.target.responseXML.getElementsByClassName("frame_red")[0].getElementsByClassName("data_deck_cardblock_card");
    var myCardCount = myCardList.length;
    for ( var i = myCardCount - 1; i >= 0 ; i--) {
      addCardToDeckArea(myDeckArea, myCardList[i]);
    };
    adjustMyDeckTablePosition(myDeckArea.parentElement, myCardCount);
    var enemyGage = event.target.responseXML.getElementsByClassName("battledetail_graph_enemy")[0]
    historyBlock.getElementsByClassName("enemy-gage")[0].appendChild(enemyGage);
    var enemyCardList = event.target.responseXML.getElementsByClassName("frame_blue")[0].getElementsByClassName("data_deck_cardblock_card");
    var enemyCardCount = enemyCardList.length;
    for ( var i = enemyCardCount - 1; i >= 0 ; i--) {
      addCardToDeckArea(enemyDeckArea, enemyCardList[i]);
    };
    adjustEnemyDeckTablePosition(enemyDeckArea.parentElement, enemyCardCount);
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

function adjustMyDeckTablePosition(table, count) {
  const adjustValue = 130 - (count * 15);
  table.style.left = adjustValue + "px";
}

function adjustEnemyDeckTablePosition(table, count) {
  const adjustValue = 120 - (count * 15);
  table.style.left = adjustValue + "px";
}

function toggleMyName() {
  [].forEach.call(document.getElementsByClassName("battle_list_mydata"), (mydata) => {
      toggleVisibility(mydata.getElementsByClassName("battle_list_name")[0])
    }
  );
}

function toggleEnemyName() {
  [].forEach.call(document.getElementsByClassName("battle_list_enemydata"), (mydata) => {
      toggleVisibility(mydata.getElementsByClassName("battle_list_name")[0])
    }
  );
}

function toggleResult() {
  toggleElemetnsVisibility(document.getElementsByClassName("battle_list_result"));
}

function toggleElemetnsVisibility(elements) {
  [].forEach.call(elements, (element) => {
    toggleVisibility(element);
  });
}

function toggleVisibility(target) {
  if (target.style.visibility != "hidden") {
    target.style.visibility = "hidden";
  } else {
    target.style.visibility = "visible"
  }
}

function appendToggleNameButton() {
  const toggleMyNameButton = document.createElement("button");
  toggleMyNameButton.addEventListener('click', function () {
    toggleMyName()
  });
  toggleMyNameButton.innerHTML = "自軍名 on/off";
  toggleMyNameButton.classList.add("appended-class");
  toggleMyNameButton.style.display = "inline-block";
  toggleMyNameButton.style.margin = "0 5px";
  toggleMyNameButton.style.padding = "6px";
  toggleMyNameButton.style.fontWeight = "bold";

  const toggleEnemyNameButton = document.createElement("button");
  toggleEnemyNameButton.addEventListener('click', function () {
    toggleEnemyName()
  });
  toggleEnemyNameButton.innerHTML = "敵軍名 on/off";
  toggleEnemyNameButton.classList.add("appended-class");
  toggleEnemyNameButton.style.display = "inline-block";
  toggleEnemyNameButton.style.margin = "0 5px";
  toggleEnemyNameButton.style.padding = "6px";
  toggleEnemyNameButton.style.fontWeight = "bold";

  const targetElement = document.getElementsByClassName("text_pager")[0];
  targetElement.insertBefore(toggleMyNameButton, targetElement.firstChild);
  targetElement.appendChild(toggleEnemyNameButton);
}
