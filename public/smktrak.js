var website_id= document.currentScript.id;
	  console.log("our id is " +website_id );
	  var _paq = _paq || [];
	  var tracker;
	  var visitor_id="";
	  var _paqid; 
	  _paq.push(['enableLinkTracking']);
	  _paq.push(['setConversionAttributionFirstReferrer', true]);
	  (function() { 
	    var u="http://52.165.38.47/";
	    _paq.push([ function() {  
			visitor_id = this.getVisitorId(); 
			//Cookie do not exist create one
			var cname="smkt_"+website_id;
			var username=getCookie(cname);
			console.log(username);
			if(username == ""){  

				console.log("We require to set the cookie");
				$.ajax({
				  type: "POST",
				  url: "http://smarketeer.azurewebsites.net/GetVisitorId",
				  data: {"id":this.getVisitorId()},
				  success: function(data){
				  	console.log(data);
				  	setCookie(website_id,visitor_id,400);
				  	_paq.push(['setUserId', visitor_id]);
				  	_paq.push(['setConversionAttributionFirstReferrer', true]);
					_paq.push(['trackPageView']);   
				  }
				  });

			}
			else{ 
					console.log("HOLA");
					_paq.push(['setUserId', username]);
				  	_paq.push(['setConversionAttributionFirstReferrer', true]);
					_paq.push(['trackPageView']);  
				    
			}
			   _paq.push(['setTrackerUrl', u+'piwik.php']);
				    _paq.push(['setSiteId', website_id]); 

			}]); 
	    

	    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s); 
	    //resolve();
	  } )();

	/**
	*We set the cookie
	*/
	function setCookie(id, cvalue, exdays) {
		var cname="smkt_"+id;
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	/**
	* GET the id of the user
	*/
	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length,c.length);
	        }
	    }
	    return "";
	}
	/**
	* Delete the cookie if the user already exists
	*/
	function DeleteCookie(name) {
	    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
