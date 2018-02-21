// This plugin extends html5 video functionality by activating the right 
//text track caption within HTML document. 


(function($)
{
	$.fn.jshtml5track = function(options){ 
		var t = null;
		this.each(function(e)
		{ 
			//initialize the class
			t = new TextTrack();
		});
		return t;
	}

	//video track class
	var TextTrack = (function()
	{
		//class constructor
		function TextTrack()
		{	
			//assign elements to class property 
			this.video = $("body").find("video");
			this.source = $("body").find(".source");
			
			//generate json data from source
			this.sourcedata = this.getDataSource();

			//set track properties
			this.setTrackProperty();			
		}

		TextTrack.prototype.video = null;//video element
		TextTrack.prototype.track = null;//cue containing track
		TextTrack.prototype.source = null;//source of json data
		TextTrack.prototype.sourcedata = null;//json dat container

		//set target video track property
		TextTrack.prototype.setTrackProperty = function()
		{
			this.track = video.addTextTrack("captions", "English", "en");
			this.track.kind = "captions";
			this.track.label = "English";
			this.track.srclang = "en";
			this.track.mode = "hidden";
			for(i in this.sourcedata){
				this.track.addCue(new VTTCue(this.sourcedata[i].start, this.sourcedata[i].end, this.sourcedata[i].text));
			}

			//this link tracks to visible text on the source
			this.linkTrackToText();
		}

		TextTrack.prototype.linkTrackToText = function()
		{
			var $this = this, textTrack = this.track.cues, counter = 0;

			for(e in textTrack)
			{
				var cue = textTrack[e];
				cue.onenter = function()
				{				
					var  t = $this.source.find("span:eq("+counter+")").css({color:"#f30"});
					counter++;
				}
				cue.onexit = function(){
					$this.source.find("span").css({color:"#555"});
				}
				
			}

		}

		TextTrack.prototype.getDataSource = function()
		{
			/*
				find all span in source div, 
				set counter to track number,
				..............
				construct and return json object
			*/
			var src = this.source.find("span"), counter = 0, data = new Array();
			src.each(function()
			{
				var duration = $(this).attr("class"), text = $(this).text();
				var splitedValue = duration.split(",");
				var json = {"track":counter, "start": splitedValue[0], "end":splitedValue[1], "text": text}
				data.push(json);
				counter++;
			});

			return data;
		}

		//return class object
		return TextTrack;

	}());

})(jQuery)