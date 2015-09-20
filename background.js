chrome.runtime.onInstalled.addListener(function (details) {
  chrome.identity.getProfileUserInfo(function(userInfo){
    console.log(userInfo);
    var userId = userInfo.id;
    var userParam;
    if (userId) {
      userParam = userId;
    } else {
      userParam = "cookies";
    }
    console.log(userParam);
    localStorage['user'] =userParam;
  });
  console.log("INSTALLL");
});

chrome.runtime.onStartup.addListener(function () {
    chrome.identity.getProfileUserInfo(function(userInfo){
    console.log(userInfo);
    var userId = userInfo.id;
    var userParam;
    if (userId) {
      userParam = userId;
    } else {
      userParam = "cookies";
    }
    console.log(userParam);
    localStorage['user'] =userParam;
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
      console.log("hi");
      sendResponse({data: localStorage[request.key]});
    }
    else {
      console.log("hi2");
      sendResponse({}); // snub them.
    }
});