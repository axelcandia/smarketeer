/**
*This function
*/  
function createform(id){
  var data={};
  data["id"]=id;   
  
	var xmlHTTP;
	if(window.XMLHttpRequest){
		xmlHTTP = new XMLHttpRequest();
	}else{
		xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            // do whatever it is you want to do
            document.write(xmlHTTP.responseText);
        }
    } 
    xmlHTTP.open("POST", "http:localhost:1337/GetFormHTML", true); 
    xmlHTTP.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHTTP.send(JSON.stringify(data));//We need the data that has this id 

}
	//document.write("SOME SUPER CONTENT");

function Send(form_id){ 
	console.log(this);
	var values = {};
	var smkt  =  document.getElementById(form_id).getElementsByClassName('SmarketeerField');
	values["pkw_id"]= visitor_id;
	for(var i=0;i< smkt.length;i++){ 
		var name= smkt[i].name;
		if( smkt[i].value == "-Seleccione una opcion-"){
			smkt[i].value="";
		} 
		if( (smkt[i].type=="checkbox" || smkt[i].type=="radio") ){
			if(smkt[i].checked) 
				values[name]=smkt[i].value;  
		}
		else if(smkt[i].tagName == "SELECT"){
			values[name]=getSelectValues(smkt[i]);  
		}
		else{
			values[name]=smkt[i].value; 
		}
			
	}
	console.log(values);
	ajax(values); 
}  


function ajax(values) { 
    var xmlHTTP;

    if (window.XMLHttpRequest) { 
        xmlHTTP = new XMLHttpRequest();
    } else { 
        xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            // do whatever it is you want to do
        }
    }

    //Serialize the data
    var queryString = JSON.stringify(values);
    console.log(queryString);

    xmlHTTP.open("POST", "http:localhost:1337/ReceiveForms", true); 
    xmlHTTP.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHTTP.send(queryString);
}


/**
* GEt the selected values from a list.
*/
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

function Array2Arg() {
  var args = arguments;
  for(var i = 0; i < args; ++i) {
    var argument = args[i]; 
  }
}