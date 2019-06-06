main();

function main() {
  if (!location.href.startsWith("https://3594t.net/members/statistics/top")) {
    alert("三国志大戦.NETの統計情報 > TOP10情報ページを開いた状態で実行してください");
    return;
  }

  const frameList = document.getElementsByClassName("frame01");
  const generalUseCountList = getGeneralUseCountList(frameList[0]);
  for(var i=1; i<frameList.length; i++) {
    calcCountPerUse(generalUseCountList, frameList[i]);
  }
}

function calcCountPerUse(generalUseCountList, frameElement) {
  const frameTitle = getFrameTitle(frameElement);
  const top10list = frameElement.getElementsByClassName("top10list");
  for(var i=0; i<top10list.length; i++) {
    if(generalUseCountList[getAvatarHash(top10list[i])]) {
      expandListElement(top10list[i]);
      updateCountText(frameTitle, top10list[i].getElementsByClassName("top10list_count")[0], generalUseCountList[getAvatarHash(top10list[i])]);
    }
  }
}

function expandListElement(listElement) {
  listElement.style.height = "68px";
  listElement.style.backgroundRepeat = "repeat";
}

function updateCountText(frameTitle, countElement, generalUseCount) {
  const orgCount = getCount(countElement);
  const calclatedCount = frameTitle == "勝利数" ? (100 * orgCount / generalUseCount).toFixed(3) : (orgCount / generalUseCount).toFixed(3);
  countElement.style.lineHeight = "32px";
  countElement.style.paddingTop = "4px";
  const unit = frameTitle == "勝利数" ? "%" : "回/戦";
  countElement.innerHTML = countElement.innerHTML + "<br>" + calclatedCount + "<span class='font_80 ml_5'>" + unit + "</span>";
}

function getFrameTitle(frameElement) {
  return frameElement.getElementsByClassName("title2")[0].textContent;
}

function getGeneralUseCountList(frameElement) {
  const list = frameElement.getElementsByClassName("top10list");
  var generalUseCountList = [];
  for(var i=0; i<list.length; i++) {
    generalUseCountList[getAvatarHash(list[i])] = getCount(list[i].getElementsByClassName("top10list_count")[0]);
  }
  return generalUseCountList;
}

function getAvatarHash(listElement) {
  const src = listElement.getElementsByClassName("top10list_avatar")[0].firstChild.getAttribute("src");
  return src.split("/")[3].split(".")[0];
}

function getCount(countElement) {
  return parseInt(countElement.textContent.split("回")[0]);
}
