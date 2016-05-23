define([
       "jquery", "underscore", "backbone"
      , "views/temp-snippet"
      , "helper/pubsub"
      , "text!templates/app/renderform.html"
], function(
  $, _, Backbone
  , TempSnippetView
  , PubSub
  , _renderForm
){
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function(){
      this.collection.on("add", this.render, this);
      this.collection.on("remove", this.render, this);
      this.collection.on("change", this.render, this);
      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");
      this.renderForm = _.template(_renderForm);
      this.render();
    }

    , render: function(){ 
      this.$el.empty(); 
      if(LoadOldData){
        this.collection.reset(col);
        LoadOldData=false;
      }
      else{
          //Send the new data
          $.ajax({
            type:'POST',
                url:"/ReceiveForms",
                data: JSON.stringify({
                  "builderCode":JSON.stringify(this.collection),//$("#UrlName").val(),
                   "id":  formId
                  }),
                contentType: 'application/json',
              }); 
        } 

      var that = this;
      var containsFile = false;
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });  
      $("#render").val(that.renderForm({
        multipart: this.collection.containsFileType(),
        text: _.map(this.collection.renderAllClean(), function(e){return e.html()}).join("\n")
      }));  
      this.$el.appendTo("#build form"); 
      this.delegateEvents(); 
    }

    , getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY  - 190) {
          return true;
        }
        else {
          return false;
        }
      });
      if (topelement){
        return topelement;
      } else {
        return myFormBits[0];
      }
    }

    , handleSnippetDrag: function(mouseEvent, snippetModel) {
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }
    , handleTempMove: function(mouseEvent){ 
        $(".target").removeClass("target");
        if(mouseEvent.pageX >= this.$build.position().left &&
            mouseEvent.pageX < (this.$build.width() + this.$build.position().left)){
          //if it is below everyhing put it below
          console.log(mouseEvent.pageY);
          //it if is up put it up(dah)
          $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
        } else {
          $(".target").removeClass("target");
        } 
      
    }
    , handleTempDrop: function(mouseEvent, model, index){ 
        if(mouseEvent.pageX >= this.$build.position().left &&
           mouseEvent.pageX < (this.$build.width() + this.$build.position().left) ) {
            var index = $(".target").index();
          $(".target").removeClass("target");   
           this.collection.add(model,{at: index+1}); 
          
        } 
         else {
          $(".target").removeClass("target");
        }
      } 
  })
});

