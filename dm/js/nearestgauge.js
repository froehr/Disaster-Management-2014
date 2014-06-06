function Dist(LatA, LngA, LatB, LngB){
   
    function rad(x) {
        return x*Math.PI/180;
    }
      
    var R     = 6371;
    var dLat  = rad( LatB - LatA );
    var dLong = rad( LngB - LngA );
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(LatA)) * Math.cos(rad(LatB)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    
    //Return 3 decimals
    return d.toFixed(3);
}

showNearestGauge = function (latlng) {
	
    var station;
    var clickLat = latlng.lat;
    var clickLong = latlng.lng
    var minDist = 10000000000;
    
    $.getJSON('http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json', function (data) {
         
        // Search nearest Station   
        for (var i = 0; i < data.length; i++) {
            
            var currentDist = parseInt(Dist(clickLat, clickLong, data[i].latitude, data[i].longitude));

            if (currentDist <= minDist) {
                minDist = currentDist;
                station =  data[i].uuid;
                console.log('Bla '+ station);
            }
        }
        
        $.getJSON('http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/'+ station +'/W/measurements.json', function (dataStation) {
            console.log(station);
        });
    });
    
    
    
    
};