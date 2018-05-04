main();

function main() {
  if (location.href != "https://3594t.net/datalist/") {
    alert("三国志大戦.NETのデータリストページを開いた状態で実行してください");
    return;
  }

  var firedCardList = [];
  member_data.CARD.forEach(function(card){
    if (card.fire_date != "") {
      firedCardList.push(buildFiredCardText(card));
    }
  });
  appendCopyButton(firedCardList.join('\n'));
}

function buildFiredCardText(card) {
  const majorVersionText = `第${base_data.GENERAL[card.idx].major_version}弾`;
  const minorVersionText = base_data.GENERAL[card.idx].add_version > 0 ? `-${base_data.GENERAL[card.idx].add_version}` : "";
  const rarityText = base_data.GENERAL[card.idx].rarity;
  const generalNameText = base_data.PERSONAL[base_data.GENERAL[card.idx].personal].name;
  const genMainText = convertGenMain(card.gen_main);
  const genSubText = convertGenSub(card.gen_sub0, card.gen_sub1, card.gen_sub2);
  const numberText = card.number;
  const hireLimitDateText = card.hire_limit_date;
  const hirePageLinkText = `<a href="https://3594t.net/datalist/?v=GENERAL&s=POPUP_GENERAL&c=${base_data.GENERAL[card.idx].code}" target="_blank">登用</a>`

  return `${majorVersionText}${minorVersionText} ${rarityText}${generalNameText} ${genMainText} ${genSubText} ${numberText} ${hirePageLinkText}<br>`;
}

function convertGenMain(key) {
  var result = "";
  base_data.GEN_MAIN.forEach((genMain)=>{
    if (genMain.key == key) result = genMain.name_short;
  });
  return result;
}

function convertGenSub(sub0, sub1, sub2) {
  const genSubTextList = {
    "攻城": "攻",
    "速度": "速",
    "復活": "活",
    "兵力": "兵",
  };

  const sub0Text = genSubTextList[base_data.GEN_SUB[sub0].name_short];
  const sub1Text = genSubTextList[base_data.GEN_SUB[sub1].name_short];
  const sub2Text = sub2 != "" ? genSubTextList[base_data.GEN_SUB[sub2].name_short] : "";
  return `${sub0Text}${sub1Text}${sub2Text}`;
}

function appendCopyButton(cardList) {
  const appendedButton = document.createElement("div");
  appendedButton.innerHTML = "桃園に解任武将データを登録";
  appendedButton.id = "appendedButton";
  appendedButton.style = "width:50%;height:auto;margin:10px 25%;padding:10px;border:solid;background-color:#fff;";
  appendedButton.addEventListener('click', function() {
    copyTextToClipboard(cardList);
    bodyElm.removeChild(appendedButton);
    window.open("https://3594t-touen.jp/recruitments/new");
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
  return ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0 || ua.indexOf("iPod") >= 0
}
