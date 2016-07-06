/**
*This function
*/  
function createform(id){   
  $.ajax({
          type: "POST",
          url: "http://localhost:1337/GetFormHTML",
          data: {"id":id},
          success: function(data){ 
            document.getElementById(id).insertAdjacentHTML('afterend',data);
          }
        });
}
	//document.write("SOME SUPER CONTENT");

function Send( form_id ){   
  event.preventDefault();
  _paq.push(['trackGoal', 1, -1]);

  var values = {};
	var smkt  =  document.getElementById("form."+form_id).getElementsByClassName('SmarketeerField');
	values["pkw_id"]= visitor_id;
  values["form_id"]=form_id;i
	for(var i=0;i< smkt.length;i++){   
		var name= smkt[i].name;
		if( smkt[i].value == "-Seleccione una opcion-"){
			smkt[i].value="";
		} 
    if(smkt[i].id.indexOf("smkt_email")>-1){ 
      //ver el email
      ResetCookie(smkt[i].value,)
      SetTracker(smkt[i].value);
      console.log("email:"+smkt[i].value);
      

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
            //alert(xmlHTTP.responseText);
        }
    }

    //Serialize the data
    var queryString = JSON.stringify(values);
    xmlHTTP.open("POST", "http://localhost:1337/ReceiveForms", true); 
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

function ResetCookie(email,cvalue){
  /**
  */
  var cname="smkt_"+website_id;
  var d = new Date();
  var email= ";email="+email;
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue +email+ "; " + expires;

}

function SetTracker(email){
  _paq.push(['setCustomVariable',
        // Index, the number from 1 to 5 where this custom variable name is stored
        1,
        // Name, the name of the variable, for example: Gender, VisitorType
        "email",
        // Value, for example: "Male", "Female" or "new", "engaged", "customer"
        email,
        // Scope of the custom variable, "visit" means the custom variable applies to the current visit
        "visit"
    ]); 
      _paq.push(['trackPageView']);
}







function InspectEmail(){
      var cname="smkt_"+website_id;
      var cemail=getEmail(cname); 
      //First time he logins
      if(cemail == ""){ 
        _paq.push(['setUserId', username]);
        _paq.push(['setConversionAttributionFirstReferrer', true]);
        _paq.push(['setCustomVariable',
            // Index, the number from 1 to 5 where this custom variable name is stored
            1,
            // Name, the name of the variable, for example: Gender, VisitorType
            "email",
            // Value, for example: "Male", "Female" or "new", "engaged", "customer"
            email,
            // Scope of the custom variable, "visit" means the custom variable applies to the current visit
            "visit"
        ]); 
        _paq.push(['trackPageView']); 
      }
      else if( cemail != email ){ //Change his email
        _paq.push(['appendToTrackingUrl', 'new_visit=1']); // (1) forces a new visit 
        _paq.push(["deleteCookies"]); // (2) deletes existing tracking cookies to start the new visit
        // the two lines must be above the call to track* function 
        $.ajax({
          type: "POST",
          url: "http://smarketeer.azurewebsites.net/GetVisitorId",
          data: {"email":email},
          success: function(data){
            
            setCookie(website_id,visitor_id,400);
            _paq.push(['setUserId', visitor_id]);
            _paq.push(['setConversionAttributionFirstReferrer', true]);
          _paq.push(['trackPageView']); 
          }
          });

      } 
} 