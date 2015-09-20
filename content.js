MutationObserver = window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer){
  console.log("hi");
  //var img_blocks = document.getElementsByClassName('post-image');
  var regEx = new RegExp("[^\s]+(\.jpg$)");
  var srcList = [];
  console.log("getting images");
  var imgs = document.getElementsByTagName('img');
  console.log(imgs);
  for (var i in imgs) {
    if (regEx.test(imgs[i].src)) {
      srcList.push(imgs[i]);
      console.log(imgs[i].src);
    }
  }

  chrome.runtime.sendMessage({method: 'getLocalStorage', key: 'user'}, function(response) {
   for (var k in srcList) {
    console.log(k)
    var height = srcList[k].height;
    var width = srcList[k].width;
    console.log(height);
    console.log(width);
    if (height >= 200 && width >= 200) {
        var xmlHttp = new XMLHttpRequest();
        var url = "https://memories-7.herokuapp.com/add?imageURL=" + srcList[k].src+"&user=" + response.data;
        console.log(url);
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
      }
   }
  });

});

observer.observe(document.body, {
  childList:true,
  subtree:true
});