/**
 * @author Nourhan
 */

function readAllMessages() {
	
//set filtervalues and type later 
var Action;

jQuery.ajax({
    type: "POST",
    url: 'php/getMsgConnection.php',
    dataType: 'json',
    data: {Action:'GetAll'},
    success: function(data) {
    	console.log(data);
    },
    error: function(textStatus){
    	console.log("textStatus");
    }
        
});
}

function getMessagesbyExtent(Pointlow,PointUp) {
	
//set filtervalues and type later 
var Action,Argument1, Argument2;

jQuery.ajax({
    type: "POST",
    url: 'php/getMsgConnection.php',
    dataType: 'json',
    data: {Action:'ByExtent', Argument1:Pointlow, Argument2:PointUp},
    success: function(data) {
    	console.log(data);
    },
    error: function(textStatus){
    	console.log("textStatus");
    }
        
});


