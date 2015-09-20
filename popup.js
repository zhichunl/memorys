$(function () {
  $("#filter").click(function(){
    $("#pics").empty();
    console.log("filter");
    dumpPics($('#search').val());
  });
});

function dumpPics(query){
    $.ajax({
        type: 'GET',
        url: 'http://memories-7.herokuapp.com/search?term='+query,
        
    }).done(function(response) {
      console.log($.parseJSON(response));  
    });
}


document.addEventListener('DOMContentLoaded', function() {
    console.log(document.getElementsByTagName('img'));
});