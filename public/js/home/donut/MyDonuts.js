if(!!(window.addEventListener)) window.addEventListener('DOMContentLoaded', main);
else window.attachEvent('onload', main);


//
function main() {  
    LeadsByChannel(); 
    SalesByChannel();
}

var sales = [
        {
            value: 10,
            color:"#F38630",
            label: 'Facebook'
        },
        {
            value : 30,
            color : "#E0E4CC",
            label: 'Twitter'
        },
        {
            value : 30,
            color : "#69D2E7",
            label: 'Instagram'
        }
    ];

 var leads = [
        {
            value: 600,
            color:"#F38630",
            label: 'Facebook'
        },
        {
            value : 300,
            color : "#E0E4CC",
            label: 'Twitter'
        },
        {
            value : 50,
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