function invoke(data){
	return filterFlights(data);
}

function filterFlights(flights)
{
	var filteredFlights = [];
	for(var i = 0; i < flights.length -1; i++)
	{
		if(i % 2 == 0)
		{
			filteredFlights.push(flights[i]);
		}
	}
	return filteredFlights;
}

self.addEventListener("message", function(e) {
		// post message back to caller
		self.postMessage(invoke(e.data));
}, false);