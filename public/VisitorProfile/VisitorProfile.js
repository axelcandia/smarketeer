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
  function CreateComment(comment){
    '<div class="item">'+
        '<div class="item-head">'+
          '<div class="item-details">'+
            '<img src="#" class="item-pic"/>'+
              '<a href="" class="item-name primary-link">'+
              '</a>+
            <span class="item-label">'+
            '</span>'+
          '</div>'+
        '</div>'+
      '<div class="item-body"></div>'+
    '</div>';

  }
  /**
  *For the comment section
  */
  $("#SendComment").click(function(){
    $(".commentSection").after($(".comment").val());
    $.ajax({
      url:"/visitors/seemore/AddComment",
      data:{
        "text": $(".comment").val(),
        "user":  #{user.profile.name},
        "image": #{user.profile.picture},
        "date": new Date()
      },
      succes: function(data){
        console.log(data);
      }
    });
  });
});