function clonar(name,id){
	$.post("/campaigns/clonar/"+id, function(data){
	        	if(data=="true")
	        		location.reload();
		    });
}

function eliminar( name, id ){ 
	bootbox.dialog({
	  message: "¿Estas seguro de querer eliminar " + name + "?",
	  title: "PELIGRO",
	  buttons: {
	    main: {
	      label: "Cancelar",
	      className: "btn-primary",
	      callback: function() {
	      }
	    },
	    danger: {
	      label: "Eliminar",
	      className: "btn-danger",
	      callback: function() {
	        $.post("/campaigns/eliminar/"+id, function(data){
	        	if(data=="true")
	        		location.reload(); 
	        	else		
		        	bootbox.alert("No se pudo eliminar la campaña " + name);
		    });
	      }
	    }
	    
	  }
	});
}