 
      $( document ).ready(function(){
            var newColumn= 
            "<tr>"+
                '<td>'+
                  '<input placeholder="Gasto Publicitario" type="text" class="categoria"/>'+
                '</td>'+
                '<td>'+
                  '<input placeholder="Facebook Ads" type="text" class="fuente"/>'+
                '</td>'+
                '<td>'+
                  '<input placeholder="CPC" type="text" class="medio"/>'+
                '</td>'+
                '<td>'+
                  '<input placeholder="Anuncio-1" type="text" class="contenido"/>'+
                '</td>'+
                '<td>'+
                  '<input placeholder="testing.com/lp1" type="text" class="destino"/>'+
                '</td>'+
                '<td>'+
                  '<input placeholder="Final" type="text" class="FechaInicio"/>'+
                '</td>'+
                '<td>'+
                  '<input placeholder="Salida" type="text" class="FechaCierre"/>'+
                '</td>'+
                '<td>'+
                  '<input placeholder="$5000" type="number" class="categoria"/>'+
                '</td>'+
                '<td class="btn red eliminar">'+
                  'Eliminar'+
                '</td>'+
              "</tr>";
              addDates();
            //Add a new column
            $("#Add").click(function(){
              $("tbody").append(newColumn);
              addDates();
            });
            //Recome a column
            $("#Costs").on("click",".eliminar",function(){
                 console.log("eliminar");
                $(this).closest("tr").remove();

            });
            //Save everything
            $("#Save").click(function(){ 
              var myRows = [];
                          var headersText = [];
                          var $headers = $("#Costs thead th");

                          // Loop through grabbing everything
                          var $rows = $("#Costs tbody tr").each(function(index) {
                            $cells = $(this).find("td");
                            myRows[index] = {}; 
                            $cells.each(function(cellIndex) {

                              if( $($headers[cellIndex]).text() !="Eliminar" ){
                                    // Set the header text
                                  if(headersText[cellIndex] === undefined) {
                                    headersText[cellIndex] = $($headers[cellIndex]).text();
                                  }
                                  var child = $(this).children().val();
                                  // Update the row object with the header/cell combo
                                  myRows[index][headersText[cellIndex]] =  (child) ? child : $(this).text();

                              }
                              
                            });    
                          });

                $.ajax({
                  url:"/home/SetAdvertisingCosts",
                  data:{
                    fields: myRows,
                    idSite:idSite
                  },
                  type:"POST",
                  success:function(data){
                    alert("saved!");

                  },
                  error: function(data){
                    alert("error");

                  }
                }); 

            });
            //Pick a date
            function addDates(){ 
              $('.FechaInicio').daterangepicker({
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
                "startDate": "07/12/2016",
                "endDate": "07/18/2016"
              }, function(start, end, label) {  
          });


          //Pick a date
              $('.FechaCierre').daterangepicker({
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
                "startDate": "07/12/2016",
                "endDate": "07/18/2016"
              }, function(start, end, label) { 
                  
          });
        }


      });