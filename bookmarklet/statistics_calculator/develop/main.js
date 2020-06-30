main();

function main() {
  if (!location.href.startsWith("https://3594t.net/members/statistics/top")) {
    alert("三国志大戦.NETの統計情報 > TOP10情報ページを開いた状態で実行してください");
    return;
  }

  const frameList = document.getElementsByClassName("frame01");
  var generalUseCountList = getGeneralUseCountList(frameList[0]);

  if(location.search == "?type=0") {
    getGeneralUseCountFromApi().then((result) => {
      generalUseCountList = Object.assign(result, generalUseCountList)
      for(var i=1; i<frameList.length; i++) {
        if (!frameList[i].classList.contains("corp")) {
          calcCountPerUse(generalUseCountList, frameList[i]);
        }
      }
    });
  } else {
    for(var i=1; i<frameList.length; i++) {
      if (!frameList[i].classList.contains("corp")) {
        calcCountPerUse(generalUseCountList, frameList[i]);
      }
    }
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
  countElement.style.whiteSpace = "nowrap";
  const unit = frameTitle == "武将勝利数" ? "%" : "回/戦";
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

function getGeneralUseCountFromApi() {
  return Promise.all([getGeneralIndexAndUseCountListFromApi(), getGeneralBaseDataFromApi()]).then((values) => {
    const generalIndexAndUseCountList = values[0];
    const generalBaseDataList = values[1];
    const top10list = document.getElementsByClassName("top10list");
    var generalUseCountList = [];
    var avatarHash = "";
    for(var i=0; i<top10list.length; i++) {
      if (!top10list[i].parentNode.classList.contains("corp")) {
        avatarHash = getAvatarHash(top10list[i]);
        generalUseCountList[avatarHash] = getGeneralUseCountByAvatarHash(generalIndexAndUseCountList, generalBaseDataList, avatarHash);
      }
    }
    return generalUseCountList;
  })
}

function getGeneralIndexAndUseCountListFromApi() {
  return new Promise((resolve) => {
    const DATA_LIST_API_URL = "https://3594t.net/datalist/api/members/main";
    const GENERAL_USE_COUNT_INDEX = 4;
    const request = new XMLHttpRequest();
    request.open("GET", DATA_LIST_API_URL);
    request.addEventListener("load", (event) => {
      if (event.target.status !== 200) {
        alert("データ取得に失敗しました、ステータスコード：" + event.target.status);
        return;
      }
      const bodyArray = event.target.responseText.split("\n");
      resolve(bodyArray[GENERAL_USE_COUNT_INDEX].split(":"));
    });
    request.send();
  })
}

function getGeneralBaseDataFromApi() {
  return new Promise((resolve) => {
    const BASE_DATA_API_URL = "https://3594t.net/datalist/api/base";
    const GENERAL_DATA_INDEX = 6;
    const request = new XMLHttpRequest();
    request.open("GET", BASE_DATA_API_URL);
    request.addEventListener("load", (event) => {
      if (event.target.status !== 200) {
        alert("データ取得に失敗しました、ステータスコード：" + event.target.status);
        return;
      }
      const bodyArray = event.target.responseText.split("\n");
      resolve(bodyArray[GENERAL_DATA_INDEX].split(":"));
    });
    request.send();
  })
}

function getGeneralUseCountByAvatarHash(generalIndexAndUseCountList, generalBaseDataList, avatarHash) {
  const targetGeneralIndex = generalBaseDataList.findIndex((general) => {
    return general.split(",")[2] == avatarHash;
  });
  const targetGeneralIndexAndUseCount = generalIndexAndUseCountList.find((generalIndexAndUseCount) => {
    return generalIndexAndUseCount.split(",")[0] == targetGeneralIndex;
  });
  return parseInt(targetGeneralIndexAndUseCount.split(",")[1]);
}
