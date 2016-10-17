$(document).on('ready', function(){ 
              $("#importar").click(function(){ 
                 bootbox.dialog({ 
                  message:' <form enctype="multipart/form-data">'+  
                              '<input id="file-es" name="file-es" type="file" multiple="multiple">'+ 
                          '</form>',
                  onEscape: function() {},
                  backdrop: true, 
                  });  
                  $('#file-es').fileinput({
                    language: 'es',
                    uploadUrl: uploadUrl,
                    allowedFileExtensions : ['xls', 'xlsx','csv'],
                }); 
           });
        });