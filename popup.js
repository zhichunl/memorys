$(function () {
  $("#filter").click(function(){
    search();
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
  console.log(uri)
  chrome.tabs.create({url: uri});
}

function dumpPics(query){
  chrome.runtime.sendMessage({method:'getLocalStorage', key:'user'},function(response){
     $.ajax({
        type: 'GET',
        url: 'http://memories-7.herokuapp.com/search?term='+query+'&user='+response.data,
      }).done(function(response) {
      var results = $.parseJSON(response);
      console.log(results);
      total = "";
      for(var x = 0; x < results.length; x++) {
        total += '<img id="pic'+x+'" width=300px src='+results[x] + ' />';
      }

      $('#pics').html(total);
      for(var x = 0; x < results.length; x++) {
        $('#pic'+x).on('click', function () {openLink(this.src)});
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', function() {
    console.log(document.getElementsByTagName('img'));
});