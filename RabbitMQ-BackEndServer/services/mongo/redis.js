//var redis = require('redis');
//var client = redis.createClient();

function addDriverLocation(driver,callback){
	var driver_id=driver.driver_id;
	var lat=driver.driverLat;
	var long=driver.driverLong;
	 var client = redis.createClient()
	    client.incr("idCounter", function(err, id) {
	        if (err) return callback(err, data)
	        console.log(id);
	        client.sadd("driverIds", id, function (err, data) {
	            if (err) return callback(err, data)
	            var key = "driver:"+id
	            console.log(key);
	            client.hmset(key, "driverID", driver_id, "driver_lat", lat, "driver_long",long,callback);
	        });
	    });
	
}
function getDrivers(msg,callback){conosle.log("bhai redis mein a rahai kya");
var driversList=[];
	client.smembers ("driverIds", function (err, id) {
		if(err) return 
		id.forEach(function(driver){
			var key= "driver:" +driver;
			console.log(key);
			client.hmget(key,"driverID","driver_lat","driver_long",function(err,reply){
				console.log(reply.toString());
				driversList.push(reply);
			});
		});
		callback(driversList);
	});
	
}
exports.addDriverLocation=addDriverLocation;
exports.getDrivers=getDrivers;