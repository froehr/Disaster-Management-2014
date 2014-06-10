/**
 * @author Nourhan
 */

function readAllMessages() {
	
//set filtervalues and type later 
var filterValue, filterType;

jQuery.ajax({
    type: "POST",
    url: 'php/get_msg_connection.php',
    dataType: 'json',
    data: {filterValue: filterValue, filterType: filterType},
    success: function(data) {
    	console.log(data);
    },
    error: function(textStatus){
    	console.log("textStatus");
    }
        
});
}


