define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
       , "text!data/input.json", "text!data/radio.json", "text!data/predeterminado.json"
       , "text!templates/app/render.html" 
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, MyFormView
  , inputJSON, radioJSON, predeterminadoJSON
  , renderTab
){
  return {
    initialize: function(){
      new TabView({
        title: "Predeterminado"
        , collection: new SnippetsCollection(JSON.parse(predeterminadoJSON))
      }); 
      new TabView({
        title: "Texto"
        , collection: new SnippetsCollection(JSON.parse(inputJSON))
      });
      new TabView({
        title: "Opciones"
        , collection: new SnippetsCollection(JSON.parse(radioJSON))
      });
      new TabView({
        title: "Codigo"
        , content: renderTab
      });
      //Make the first tab active!
      $("#components .tab-pane").first().addClass("active");
      $("#formtabs li").first().addClass("active"); 
      var texto = "<script src= 'http://localhost:1337/forms/4X3!.js'></script>"+ 
                  "<script id='574360ff772440a41c9252d7'>"+
                    "(createform(document.currentScript.id));"+
                  "</script>";
      $("#permanentcode").val(texto);
      // Bootstrap "My Form" with 'Form Name' snippet.
      new MyFormView({
        title: "Original"
        , collection: new MyFormSnippetsCollection([
          { "title" : "Form Name"
            , "fields": {
              "name" : {
                "label"   : "Nombre"
                , "type"  : "input"
                , "value" : "Escriba un nombre"
              }
            }
          }
        ])
      });
    }
  }
});
