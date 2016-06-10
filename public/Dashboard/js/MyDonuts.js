if(!!(window.addEventListener)) window.addEventListener('DOMContentLoaded', main);
else window.attachEvent('onload', main);

var sSles = 30;
var Sleads = 100;
var state1  = 1;
var state2  =1;
var state3  =1;
//
 

function main() {  
    LeadsByChannel(); 
    SalesByChannel();
}
 


$('input[name="chk[]"]:checked')(function() {
    sSles = 60;
     Sleads = 90;
     state1  = 1;
     state2  = 3;
     state3     = 1/2;
});
$( ".linear" ).click(function() {
     sSles = 30;
     Sleads = 100; 
     state1  = 1;
     state2  = 1;
     state3     = 1;
};
$( ".last" ).click(function() {
     sSles = 7;
     Sleads = 80; 
     state1  = 10;
     state2  = 7;
     state3     = 5;
};


    var sales = [
        {
            value: sSles/3 * state1,
            color:"#F38630",
            label: 'Facebook'
        },
        {
            value : sSles * state2,
            color : "#E0E4CC",
            label: 'Twitter'
        },
        {
            value : sSles * state3,
            color : "#69D2E7",
            label: 'Instagram'
        }
    ];
var Sleads=600;
 var leads = [
        {
            value: Sleads * state1,
            color:"#F38630",
            label: 'Facebook'
        },
        {
            value : Sleads/2 * state2,
            color : "#E0E4CC",
            label: 'Twitter'
        },
        {
            value : Sleads/80 * state3,
            color : "#69D2E7",
            label: 'Instagram'
        }
    ];
 
function LeadsByChannel() {
    var data = leads;

    var ctx = document.getElementById("LeadsByChannel").getContext("2d");
    var doughnutChart = new Chart(ctx).Doughnut(data);

    legend(document.getElementById("LeadsLegend"), data, LeadsByChannel);
}

function SalesByChannel() {
    var data= sales;

    var ctx = document.getElementById("SalesByChannel").getContext("2d");
    var doughnutChart = new Chart(ctx).Doughnut(data);

    legend(document.getElementById("SalesLegend"), data, SalesByChannel);
}

 

/*
ESTO TIENE QUE SER CAMBIADO TAN PRONTO COMO TENGAMOS UNA BASE DE DATOS FUNCIONAL POR UN AJAX
*/ 