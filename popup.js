$(function () {
  $("#filter").click(function(){
    search()
  });
  $("#search").keyup(function(event){
    if (event.keyCode == 13) {
      search();
    }
  });
});

function search() {
  $("#pics").empty();
  dumpPics($('#search').val());
}

function openLink(uri) {
  chrome.tabs.create({url: uri});
}

function dumpPics(query){
    $.ajax({
        type: 'GET',
        url: 'http://memories-7.herokuapp.com/search?term='+query,

    }).done(function(response) {
      var results = $.parseJSON(response);

      total = "";
      for(var x in results) {
        total += '<img id="pic'+x+'" width=300px src='+results[x] + '/></a>';
      }

      $('#pics').html(total);
      for(var x in results) {
        $('#pic'+x).click(function () {openLink(results[x])});
      }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    console.log(document.getElementsByTagName('img'));
});