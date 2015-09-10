(function() {  
     require.config({  
          baseUrl : 'js/',
          paths : {  
               jquery : 'jquery-1.11.2.min',
               Handle:"Handle"
          }
     });  
     require(['jquery',"Handle" ], function($,Handle) {  
          Handle.init();
     });  
   
})(); 