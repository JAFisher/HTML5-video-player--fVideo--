(function($)
{	
	/*
		fvideo was written and designed by jamie fisher a sexy nerd for swanify development team ^_^. 
		special props to zepto for being so uber.
	*/

	var video = 
	{	
		properties: {},
		counter: 0,
		interval: [],
		mouseActivity: [],
		source:function(string)
		{
			return string;
		},
		type:function(string)
		{
			var source = string.substr(string.lastIndexOf('.') + 1);
			source = source.toUpperCase();
			switch(source)
			{
				case 'MP4':
				source = "video/mp4"
				case 'OGG':
				source = "video/ogg"
				default:
				source = "video/mp4"
			}
			return source;
		},
		trackType:function(string)
		{
			var source = string.substr(string.lastIndexOf('.') + 1);
			source = source.toLowerCase();
			switch(source)
			{
				case 'SRT':
				source = "subtitle"
				case 'TTML':
				source = "caption"
				default:
				source = "subtitle"
			}
			return source;			
		},
		bindEvents:function(selector,c)
		{
			$('#fVideoContainer_'+c).bind('mousemove',function(){
				video.mouseMovement(c);
			});

			$('#fVideoContainer_'+c).bind('mouseover',function(){
				video.showTracker(selector,c);
			});

			$('#fVideoContainer_'+c).bind('mouseout',function(){
				video.hideTracker(selector,c);
			});

			$('#fVideoPlayer_'+c+ ', #fPlayButton_'+c).bind('click',function(){
				var id = 'fVideoPlayer_'+c;
				video.togglePlay(id,c);
			});

			$('#fFullscreen_'+c).bind('click',function(){
				var id = 'fVideoContainer_'+c;	
							
				video.requestFullScreen(id,c);
			});				

			$('#fPlayButton_'+c).bind('mousedown',function(){
				$(this).addClass('down');	
			});


			$('#fPlayButton_'+c).bind('mouseup',function(){
				$(this).removeClass('down');
				$(this).toggleClass('pause');	
			});			
			
			$('#fVideoSeekScroller_'+c).bind('click',function(){
				video.scrubTo(c);
			});	
			
			$('.fAudiobar_'+c).bind('click',function(eventtarget){
				var vol = $(eventtarget.target).attr('data-volume');
				$('.fAudiobar_'+c).removeClass('active');
				video.setAudio(c,vol);
			});		
			
		//	$('fVideoPlayer_'+c).addEventListener("webkitEnterFullScreen",alert('elloworld'));					

		},
		mouseMovement:function(c,selector)
		{	
 			if(video.mouseActivity[c] == false || video.mouseActivity[c] == undefined)
			{
				video.mouseActivity[c] = true;
				setTimeout(function()
				{
 
					if(video.mouseActivity[c])
					{	
						video.hideTracker(selector, c);
					}

				}, 7000);
 			}
		},
		showTracker:function(selector,c)
		{	
			$(selector).find('#fVideoSeekScroller_'+c).removeClass('none');
			$(selector).find('#fVideoAudioScroller_'+c).removeClass('none');
			$(selector).find('#fPlayButton_'+c).removeClass('none');
			video.mouseMovement(c,selector);
 		},
		hideTracker:function(selector,c)
		{
 			$(selector).find('#fVideoSeekScroller_'+c).addClass('none');
			$(selector).find('#fVideoAudioScroller_'+c).addClass('none');
			$(selector).find('#fPlayButton_'+c).addClass('none');
			video.mouseActivity[c] = false;	
 		},		
		togglePlay:function(id,c)
		{
			var videoPlayer = document.getElementById(id);
			if(videoPlayer.paused == false)
			{
				videoPlayer.pause();
				$('#fPlayButton_'+c).removeClass('pause');
			}
			else
			{
				videoPlayer.play();	
				$('#fPlayButton_'+c).addClass('pause');			
			}
		},
		requestFullScreen:function(id,c)
		{
			var videoPlayer = document.getElementById(id);
			videoPlayer.webkitRequestFullScreen();
		},
		currentTime:function(arr)
		{
			var c = arr[0].counter;	
 			var videoPlayer = document.getElementById('fVideoPlayer_'+c);
			var tb = $('#fVideoSeekScroller_'+c).css('width');
			tb = parseInt(tb);
			var ct = videoPlayer.currentTime;
			var dur = videoPlayer.duration;
			var buf = videoPlayer.buffered.end(0);
			var buffered = buf / dur * 100;

			ct = ct / dur * 100;
			tb = tb / 100 * ct;

			$('#fVideoProgress_'+c).css('width',tb);
			$('#fVideoBuffered_'+c).css('width',buffered +'%');
		},
		scrubTo:function(c)
		{
			var st = event.offsetX;
			var tw = $('#fVideoSeekScroller_'+c).css('width');
			tw = parseInt(tw);
			var videoPlayer = document.getElementById('fVideoPlayer_'+c); 
			var dur = videoPlayer.duration;
			var scrubPosition =  st / tw * 100;
			var newtime = dur / 100 * scrubPosition;
			videoPlayer.currentTime = newtime;
		},
		setAudio:function(c,vol)
		{
			$('.fAudiobar_'+c).each(function(index,element){
				var data = $(element).attr('data-volume');
				var videoPlayer = document.getElementById('fVideoPlayer_'+c); 
				videoPlayer.volume = vol;
				if(vol >= data)
				{
					$(element).addClass('active');
					return;
				}

			});
		},
		checkAudio:function(c)
		{
			var videoPlayer = document.getElementById('fVideoPlayer_'+c);
			var vol =videoPlayer.volume;
			$('#fVideoAudioScroller_'+c+' .fAudiobar').addClass('active');
		}


	};

 	$.fn.video = function(obj)
	{	
		var o = video;
		var c = o.counter;
		var width = $(this).css('width');
		var height = $(this).css('height');
		var html  =  '<div id="fVideoContainer_'+c+'" class="fVideoContainer none">'+
					 '<div id="fPlayButton_'+c+'" class="fPlayButton none"> </div>'+
					 '<div id="fFullscreen_'+c+'" class="fFullscreen fFullscreen_'+c+'" data-fullscreen="false"> </div>'+					 
					 '<div id="fVideoSeekScroller_'+c+'" class="fVideoSeekScroller none">'+ 
					 '<div id="fVideoProgress_'+c+'" class="fVideoProgress"> </div>'+
					 '<div id="fVideoBuffered_'+c+'" class="fVideoBuffered"> </div> </div>'+
					 '<div id="fVideoAudioScroller_'+c+'" class="fVideoAudioScroller none">'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.1"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.2"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.3"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.4"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.5"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.6"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.7"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.8"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="0.9"> </div>'+
					 '<div id="fAudiobar_'+c+'" class="fAudiobar fAudiobar_'+c+'" data-volume="1"> </div>'+	
					 '</div>';

 			html  += '<video id="fVideoPlayer_'+c+'" class="fVideo" >';
 					var isArray = typeof(obj.src);

 					if(isArray == "object")
 					{
						for(i in obj.src)
						{
							html += ' <source src="'+o.source(obj.src[i])+'"'+
							' type="'+o.type(obj.src[i])+'"/>';
						}
					}
					else
					{
						html += ' <source src="'+o.source(obj.src)+'"'+
						' type="'+o.type(obj.src)+'"/>';	
					}

					if(obj.track !== undefined)
					{
						html += "<track  src='"+obj.track+"' kind='"+o.trackType(obj.track)+"' ";
						html +=		"/>";
					}

					html += '</video> </div>';
		
 		 $(this).prepend(html);
 		 video.bindEvents(this,c);
 		 video.interval.push(setInterval(video.currentTime,200,[{'counter':c}]));
 		 video.checkAudio(c);
  		 video.properties[c] = {fullscreen: false,fadeOverride: false};
 		 video.counter++;
	}	

})(Zepto);