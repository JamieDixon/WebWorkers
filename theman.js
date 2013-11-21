var TheMan = function(workerFileLocation, undef){
	var self = this;

	self.fileLocation = null;

	self.supportsWorker = false;

	// Private methods
	function addScriptToHead(filePath)
	{
		var head = document.getElementsByTagName("head")[0];
		var firstChild = head.childNodes[0];

		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = filePath;

		head.insertBefore(script, firstChild);
	}

	// Public methods

	self.initialise = function (workerFileLocation) {
		self.fileLocation = workerFileLocation;

		self.supportsWorker = window["Worker"] != null;

		if(!self.supportsWorker)
		{
			addScriptToHead(workerFileLocation);
		}
	};

	self.workerProcess = null;

	self.spawnWorker = function (callback)
	{
		self.workerProcess = {
			worker: null,
			callback: callback
		};

		if(self.supportsWorker)
		{
			self.workerProcess.worker = new Worker(self.fileLocation);
			self.workerProcess.worker.addEventListener("message", callback);
		}		
	};

	self.postMessage = function(message, fallbackMethod){

		if(self.workerProcess.worker != null)
		{
			self.workerProcess.worker.postMessage(message);
		}
		else
		{
			var result = fallbackMethod(message);

			self.workerProcess.callback({
				data: fallbackMethod(message)
			});
		}
	};

	self.initialise(workerFileLocation);
};