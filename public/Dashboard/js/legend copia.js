$( document ).ready({
    //AJAX the shit out of them
 $.ajax({
      url: "http://localhost:12015/myWebService.asmx/GetCategories",
      type: "POST",
      dataType: "jsonp",
      data: "{}",
      contentType: "application/jsonp; charset=utf-8",
      success: function (data) {
          var categories = data.d;
          $.each(categories, function (index, category) {
              alert(category.CategoryId);
          });
      },
      error: function (e) {
          alert(e.message);
      }
   });

}); 