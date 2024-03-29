$( document ).ready(function() {  
	   

          addDates(".from");
          addDates(".to");

        function addDates(date){  
                $( date ).each(function() { 
                      $(this).daterangepicker({
                          "locale": {
                              "format": "DD/MM/YYYY",
                              "separator": " - ",
                              "applyLabel": "Aplicar",
                              "cancelLabel": "Cancelar",
                              "fromLabel": "Desde",
                              "toLabel": "Hasta",
                              "customRangeLabel": "Customizar",
                              "weekLabel": "W",
                              "daysOfWeek": [
                                  "Dom",
                                  "Lun",
                                  "Mar",
                                  "Mier",
                                  "Jue",
                                  "Vier",
                                  "Sab"
                              ],
                              "monthNames": [
                                  "Enero",
                                   "Febrero",
                                   "Marzo",
                                   "Abril",
                                   "Mayo",
                                   "Junio",
                                   "Julio",
                                   "Agosto",
                                   "Septiembre",
                                   "Octubre",
                                   "Noviembre",
                                   "Diciembre"
                              ],
                              "firstDay": 1
                          }, 
                        "singleDatePicker": true,
                        "linkedCalendars": false,
                        "startDate": $(this).val() || "07/12/2016",
                        "endDate": "07/18/2016"
                      }, function(start, end, label) { 
                  });
                });  


              } 

	$(".guardar").click(function(){ 
		event.preventDefault();
		if(!$(".campaign").val()){
			bootbox.alert("Por favor escriba un nombre para la campaña");
			return;
		}
    var from  = $(".from").val().split("/");
    var to    = $(".to").val().split("/");
				$.ajax({
					type:'POST',
					url:"/campaigns/save",
					data: {
						Data:{
							url:$(".url").val(),
							campaign :$(".campaign").val(),
							term:	    $(".term").val(),
							source:	  $( ".source option:selected" ).text(),
							medium:	  $( ".medium option:selected" ).text(),
							content:  $(".content").val(),
							from:	    new Date(from[2],from[1],from[0]),
							to :	    new Date(to[2], to[1], to[0]),
							total:	  $(".total").val(),
							idSite:   idSite
						},
						_id:	  this.id 
					},
					success: function( data ){
						if(data=="-1")
							bootbox.alert("Ocurrio un error intenta devuelta mas tarde");
						else{
							console.log("Hola que tal como te va");
							window.location.href = "/campaigns/seeall/?idSite="+idSite;
						} 
					},
					 error: function(jqXHR, exception) {
					        bootbox.alert(jqXHR.status); 
					    } 
				});  
	});

	$("#limpiar").click(function(){ 
		$('.form-control').val('');
	});  
	
});


