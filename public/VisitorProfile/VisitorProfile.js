$(document).ready(function() { 
          $(".action-edit").click(function(){
            $( "#about" ).focus();
            $(".action-edit").hide();
            $(".edit").show();
            if(!about)
              $("#about").text("");
          });  

      $('#about').click(function() {
          $(".action-edit").hide();
          $(".edit").show();
          if(!about)  
            $("#about").text("");
      }); 

      $(".guardar").click(function(){
        var about= $("#about").text();
        $(".action-edit").show();
        $(".edit").hide();
        $.ajax({
          url:"/visitors/seemore/GetVisitorAbout",
          data:{"about":about,
                "UserId":UserId},
          type:"POST"
        });
      });

      $(".cancelar").click(function(){
        var text = (about)? about : "Escriba informacion sobre el cliente";
        $("#about").text(text);
        $(".action-edit").show();
        $(".edit").hide();
      });
  /**
  *For the comment section
  */
  $("#SendComment").click(function(){
    $.ajax({
      url:"/visitors/seemore/AddComment",
      data:{
        "comment":$(".comment").val(),
        "User":
      }
      succes: function(data){
        $(".commentSection").after($(".comment").val());
      }
    });
  });
});