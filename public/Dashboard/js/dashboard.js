$(document).ready(function(){ 

  $.get( "/analytics/visitors", function(data) {
  alert( "success" );
})
  .fail(function() {
    alert( "error" );
  });

}); 