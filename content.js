MutationObserver = window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer){
  console.log("hi");
  var img_blocks = document.getElementsByClassName('post-image');
  var regEx = new RegExp("[^\s]+(\.jpg$)");
  var srcList = [];
  console.log("getting images");
  for (var i = 0; i < img_blocks.length; i++) {
    imgs = img_blocks[i].getElementsByTagName('img');
    for (var j = 0; j < imgs.length; j++) {
      if (regEx.test(imgs[j].src)){
        srcList.push(imgs[j].src);
        console.log(imgs[j].src);
      }
    }
  }

  for (var i = 0; i < srcList.length; i++){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatchange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    var url = "http://memories-7.herokuapp.com/add?imageURL=" + srcList[i];
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  }
});

observer.observe(document.body, {
  childList:true,
  subtree:true
});

