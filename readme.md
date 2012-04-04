fPlayer
=======

Manage HTML5 Video with a fully customisible skin.
--------------------------------------------------

fPlayer does the hardwork so you dont have to, a lightweight framework that manages the tedium of 
skinning html5 videoplayer, managing file formats seek/buffer, fullscreen options, volume controls, annotations,
captions open to feature requests :)
and donations lols.

License is Creative Commons so feel free to use in your projects, commerical or otherwise.

### Fvideo is in development and should be not used in it current form.

## How to use

- $('#selector').video({ src: | track: | skin:{} | options:{}, events:{} });
- src: is an Array so you can use multiple sources for fallback, $('#selector').video({src:["link.mp4","link.ogg"]}); 
  

## How to skin

fPlayer default skin is neat and tidy and should fit in with any Design but feel free to skin it using the options below
or just edit the fVideo.css provided.

- $('#selector').video({ 
						skin:{
							seek:{
								color: #000,
								top: 250px,
								left: 250px
							},
							play:{
								image: 'css/play.png',
								width:,
								height:,
								top:,
								left:
							},
							pause:{
								image: 'css/pause.png',
								width:,
								height:,
								top:
								left:
							},
							track:{
								font-family:,
								top:,
								left:,
								font-size:
							}	
						} 
					});


Credits
-------

- Created, and still maintained, by [Jamie Fisher](http://www.linkedin.com/profile/view?id=120787111&trk=tab_pro).
- Big thanks to [madroby](https://github.com/madrobby/zepto) for the lightweight Zepto framework.
