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
                "userId":userId},
          type:"POST"
        });
      });

      $(".cancelar").click(function(){
        var text = (about)? about : "Escriba informacion sobre el cliente";
        $("#about").text(text);
        $(".action-edit").show();
        $(".edit").hide();
      });


  function CreateComment(comment,img,user,date){
    return '<div class="item">'+
        '<div class="item-head">'+
          '<div class="item-details">'+
            '<img src="'+img+'" class="item-pic"/>'+
              '<div class="item-name primary-link">'+user+
              '</div>'+
            '<span class="item-label">'+date+
            '</span>'+
          '</div>'+
        '</div>'+
      '<div class="item-body"></div>'+
      comment+
    '</div>';

  }
  /**
  *For the comment section
  */
  $("#SendComment").click(function(){ 
    //Create de date
    var date= new Date();
    date= date.toISOString().substr(0,  (date.toISOString().indexOf('T'))); 
    //Create de commend and append it
    var comment= CreateComment($(".comment").val(),currentUserImage,currentUserName,date); 
    $("#CommentList").append(comment); 
    //Save everything before you clean
    var text = $(".comment").val();
    $(".comment").val("");
    //Noooow you send it :D
    $("#ComentScroller").animate({ scrollTop: $(document).height() }, 1000);
    $.ajax({
      url:"/VisitorProfile/visitors/seemore/AddComment",
      data:{
        "text": text,
        "userId":  userId,
        "image": currentUserImage.toString(),
        "date": new Date(),
        "currentUser":currentUserId,
        "currentUserName":currentUserName,
        "site":idSite
      },
      type:"POST",
      success: function(data){
        console.log(data);
      }, 
      error: function(data){
        console.log(data);
      }
    });
  });
});