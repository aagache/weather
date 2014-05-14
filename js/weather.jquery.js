/**
	How to use:
	
	Simple: 
		$(element).weatherIn();

	Custom:
		$(element).weatherIn({
			city: "Iasi",
			refreshPeriod: 60000
		});

	------------------------------------------------------------------------------------
	Details:

	WeatherIn: 		jQuery plugin used to show weather and other details in a specified city. 
					In order to get full experience, please include the "weather.css" file
					included in the archive.
	Customizable: 	city, refreshPeriod (miliseconds)
	Features: 		chainable, customizable
	Key words: 		plugin, interval, deferreds, ajax, json
	
	Other: 			refreshPeriod
					10000 miliseconds 	= 10 seconds
					60000 miliseconds 	= 1 minute
					900000 miliseconds 	= 15 minutes
					3600000 miliseconds	= 1 hour 

	
	------------------------------------------------------------------------------------
	Last update: 21 March 2014
*/

(function ($) {
	$.fn.weatherIn = function(options) {

		var self = this,	//the container element on which the plugin is called
			k, c, json,		//kelvin, celsius, response json
		 	url = "https://api.openweathermap.org/data/2.5/weather";

		function getData(){
			var deferred = new $.Deferred();

			$.ajax({
				url: url,
				data: {q: settings.city},
				dataType: 'json',
				success: function(data){
					json = data;
					deferred.resolve();
				}
			});			

			return deferred.promise();
		}

		function refresh(){
			setInterval(function() {
				showData();
			}, settings.refreshPeriod);
		}
		
		function showData(){
			self.empty();	//clear old weather content
			getData().done(function() {
				
				k = json.main.temp;
				c = k - 273;
				var r = {
					c : Math.round(c)
				}

				//console.log(json);
				var tempText = 	"<div class='w_weatherContainer'>" + 
									"<span class='w_city'>" + json.name + "</span>: <span class='w_temp'>" + r.c +"&deg;C</span><br/>" +
									"<span class='w_humidity'>Humidity: " + json.main.humidity + "%</span>" + 
								"</div>";
				self.append(tempText);

				refresh();
			});
		}

		var settings = $.extend({
			// These are the default settings
			city: 			"Iasi",
			refreshPeriod: 	900000
		}, options );

		//Start plugin
		showData();
		
		return this;
	};
}( jQuery ));