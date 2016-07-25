$( document ).ready(function() {  
	   

          addDates(".FechaInicio");
          addDates(".FechaCierre");

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

	$(document).on("click",".guardar",function(){ 
		event.preventDefault();
				alert("SAVE THIS");
				$.ajax({
					type:'POST',
					url:"/campaigns/save",
					data: {
						url:$(".url").val(),
						campaign :$(".campaign").val(),
						term:	  $(".term").val(),
						source:	  $(".source").val(),
						medium:	  $(".medium").val(),
						content:  $(".content").val(),
						from:	  $(".from").val(),
						to :	  $(".to").val(),
						total:	  $(".total").val(),
						idSite:   idSite,
						_id:	  this.id 
						},
					dataType: 'json',
					contentType: 'application/json',
					success: function( data ){
						if(data=="-1")
							bootbox.alert("Ocurrio un error intenta devuelta mas tarde");
						else{
							//window.location.href = "/campaigns/seeall/?idSite="+idSite;
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


