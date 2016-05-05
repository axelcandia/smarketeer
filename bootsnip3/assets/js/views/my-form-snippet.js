define([
       "jquery", "underscore", "backbone",
       "views/snippet", "views/temp-snippet",
       "helper/pubsub"
], function(
  $, _, Backbone,
  SnippetView, TempSnippetView,
  PubSub
){
  return SnippetView.extend({
    events:{
          "click"   : "preventPropagation" //stops checkbox / radio reacting.
      , "mousedown" : "mouseDownHandler"
      , "mouseup"   : "mouseUpHandler"
    }

    , mouseDownHandler : function(mouseDownEvent){
      mouseDownEvent.stopPropagation();
      mouseDownEvent.preventDefault();
      var that = this; 
      //popover
      $(".popover").remove(); 
      if( this.model.get("title") !== "Form Name" && this.model.get("fields").id.value.indexOf("smkt") >- 1 ) { 
        this.$el.popover("hide");   
      } 
      else{
        this.$el.popover("show");  
        $('.right').addClass('left');
        $('.left').removeClass('right');  
      } 
      $(".popover #save").on("click", this.saveHandler(that));
      $(".popover #cancel").on("click", this.cancelHandler(that));
      //add drag event for all but form name
      if(this.model.get("title") !== "Form Name"){
        $("body").on("mousemove", function(mouseMoveEvent){
          if(
            Math.abs(mouseDownEvent.pageX - mouseMoveEvent.pageX) > 10 ||
            Math.abs(mouseDownEvent.pageY - mouseMoveEvent.pageY) > 10
          ){
            that.$el.popover('destroy');
            PubSub.trigger("mySnippetDrag", mouseDownEvent, that.model);
            that.mouseUpHandler();
          };
        });
      }
    }

    , preventPropagation: function(e) {
      var clase="."+this.model.get("fields").id.value;
      if(clase.indexOf("smkt") >-1 ){   
       this.model.get("fields").required.value = ! this.model.get("fields").required.value;
       this.model.trigger("change"); 
       //CHANGE HERE
       $(clase).attr('checked', this.model.get("fields").required.value); 
      }  
      else{
        e.stopPropagation();
        e.preventDefault();
      } 
      
    }

    , mouseUpHandler : function(mouseUpEvent) {
        $("body").off("mousemove");
    }

    , saveHandler : function(boundContext) {
      return function(mouseEvent) {
        mouseEvent.preventDefault();
        var fields = $(".popover .field");
        _.each(fields, function(e){ 
          var $e = $(e)
          , type = $e.attr("data-type")
          , name = $e.attr("id");  
          switch(type) { 
            case "checkbox":
              boundContext.model.setField(name, $e.is(":checked"));
              break;
            case "input":
              boundContext.model.setField(name, $e.val()); 
              break;
            case "textarea":
              boundContext.model.setField(name, $e.val());
              break;
            case "textarea-split":
              boundContext.model.setField(name,
                _.chain($e.val().split("\n"))
                  .map(function(t){return $.trim(t)})
                  .filter(function(t){return t.length > 0})
                  .value()
                  );
              break;
            case "select":
              var valarr = _.map($e.find("option"), function(e){
                return {value: e.value, selected: e.selected, label:$(e).text()};
              });
              boundContext.model.setField(name, valarr);
              break;
          }
        });
      
        boundContext.model.trigger("change");
        $(".popover").remove();
      }
    }

    , cancelHandler : function(boundContext) { 
      return function(mouseEvent) {
        mouseEvent.preventDefault();
        $(".popover").remove();
        boundContext.model.trigger("change");
      }
    }

  });
});
