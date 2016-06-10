$(document).ready(function(){
	$("#CrearForm").click(function(){
		bootbox.dialog({
                title: "Cree un nuevo formulario",
                message:
                 	'<div class="form-group">  ' +
                 		'<div class="form-group"> ' +
                 			'<label >Nombre</label> ' + 
                 			'<input id="name" type="text" name="name" class="form-control" placeholder="Nombre del formulario">'+
                    	'</div> '  +
                    "</div>",
                buttons: {
                    success: {
                        label: "Crear",
                        className: "btn btn-sm btn-success",
                        callback: function () {
                        	var name=$('#name').val();
                        	if( name !=null )
                        		window.location.href = "/home/forms/formbuilder/"+name.split(' ').join('+');
                        }
                    },
                    danger: {
				      label: "Cancelar",
				      className: "btn pull-right red btn-sm",
				      callback: function() { 
				      }
				    }
                }
            }
        );
	});
});