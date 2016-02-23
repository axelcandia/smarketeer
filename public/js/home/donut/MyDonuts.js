if(!!(window.addEventListener)) window.addEventListener('DOMContentLoaded', main);
else window.attachEvent('onload', main);

function main() {  
    LeadsByChannel(); 
    SalesByChannel();
}
 
function LeadsByChannel() {
    var data = [
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

    var ctx = document.getElementById("LeadsByChannel").getContext("2d");
    var doughnutChart = new Chart(ctx).Doughnut(data);

    legend(document.getElementById("LeadsLegend"), data, LeadsByChannel);
}

function SalesByChannel() {
    var data = [
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

    var ctx = document.getElementById("SalesByChannel").getContext("2d");
    var doughnutChart = new Chart(ctx).Doughnut(data);

    legend(document.getElementById("SalesLegend"), data, SalesByChannel);
}

