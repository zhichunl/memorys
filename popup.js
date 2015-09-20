$(function () {
  $("#filter").click(function(){
    $("#pics").empty();
    console.log("filter");
    dumpPics($('#search').val());
  });
});

function dumpPics(query){
    var xmlHttp = new XMLHttpRequest();
    console.log(query);
    xmlHttp.onreadystatchange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      {
        console.log(xmlHttp.responseText);
        callback(xmlHttp.responseText);
      }
    }
    var url = "https://memories-7.herokuapp.com/search?term=" + query;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}


document.addEventListener('DOMContentLoaded', function() {
    console.log(document.getElementsByTagName('img'));
});