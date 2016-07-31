$(document).ready(function(){
	$("#CrearForm").click(function(){
		bootbox.dialog({
                backdrop: true,
                onEscape: true,
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
                        		window.location.href = "/home/forms/formbuilder/"+name.split(' ').join('+')+"/?idSite="+idSite;
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

$(document).on("click",".TrackingCode", function(){ 
bootbox.dialog({ 
                backdrop: true,
                onEscape: true,
                title:"Copia y pega el siguiente codigo en el head de tu pagina web",
                message:
                '<div class="form-group">  ' +
                        '<div class="form-group"> ' + 
                            '<textarea id="name" type="text" name="name" class="form-control">'+
                            '<script src="https://app.smarketeer.io/smktrak.js" id="'+idSite+
                            '" type="application/javascript"></script>'+
                            '</textarea>'+
                        '</div> '  +
                    "</div>",
                buttons: {
                    success: {
                        label: "Aceptar",
                        className: "btn btn-sm btn-success",
                        callback: function () {}
                    }
                }
            });
});
