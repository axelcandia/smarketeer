$( document ).ready(function() { 

	$("#generar").click(function(){
		generateUrl();
	}); 

	$(".guardar").click(function(){
		if( generateUrl() ){ 
			$.ajax({
				type:'POST',
				url:"/campaigns/save",
				data: JSON.stringify({
					"url":$("#UrlName").val(),
					 "id":  this.id
					}),
				contentType: 'application/json',
				success: function( data ){
					if(data=="-1")
						bootbox.alert("Ocurrio un error intenta devuelta mas tarde");
					else{
						bootbox.alert("Su campaña fue guardada");
					}
						
					$('#idcampaign').attr('id',data); 
					},
				 error: function(jqXHR, exception) {
				        bootbox.alert(jqXHR.status); 
				    } 
			}); 
		} 
	});

	$("#limpiar").click(function(){ 
		$('.form-control').val('');
	}); 

	function generateUrl(){
		if(! $("#WebsiteUrl").val() ){
			bootbox.alert("Por favor escriba la URL de la pagina web");
			return false;
		}
		else if( !$("#Name").val() ){
			bootbox.alert("Por favor escriba el nombre de la campaña");
			return false;
		} 
		else{
			//write the obligatory fields
			var url=$("#WebsiteUrl").val(); 
			url += "/?utm_campaign=" + $("#Name").val(); 
			//Write the opritonal fields
			url += ( $("#KeyWord").val() ) ? "&utm_term="     + $("#KeyWord").val()  : "" ;  //Keyword with content
			url += ( $("#Source").val() )  ? "&utm_source="   + $("#Source").val()   : "" ;  //source with content
			url += ( $("#Medium").val() )  ? "&utm_medium="   + $("#Medium").val()   : "" ;  //Medium with Medium
			url += ( $("#Content").val() ) ? "&utm_content="  + $("#Content").val()  : "" ;  //Medium with Medium
			//Add the url
			url = url.replace(/\ /g, '-');
			$("#UrlName").val(url);
			$("#url").show();
			return true;
		}
	}

	
});