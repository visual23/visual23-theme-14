if(isMobile == false || isTablet == false)
{
jQuery(document).ready(function($) {

	var controller = $.superscrollorama({
		playoutAnimations: false,
		reverse: true
	});
    
    controller.addTween(
					'#mountainSceneWrapper',
					(new TimelineLite())
						.append([
							TweenMax.from($('#mtn1'), .7, 
								{css:{backgroundPositionY: '160px'}, immediateRender:true, ease:Quad.easeOut}),
							TweenMax.from($('#mtn2'), .7, 
								{css:{backgroundPositionY: '100px'}, immediateRender:true, ease:Quad.easeOut}),
							TweenMax.from($('#mtn3'), .7, 
								{css:{backgroundPositionY: '150px'}, immediateRender:true, ease:Quad.easeOut}),
							TweenMax.from($('#mtn4'), .7, 
								{css:{backgroundPositionY: '100px'}, immediateRender:true, ease:Quad.easeOut}),
							TweenMax.from($('#mtn5'), .7, 
								{css:{backgroundPositionY: '100px'}, immediateRender:true, ease:Quad.easeOut}),
							TweenMax.from($('#mtn6'), .7, 
								{css:{backgroundPositionY: '100px'}, immediateRender:true, ease:Quad.easeOut}),
							TweenMax.from($('#mtn7'), .7, 
								{css:{backgroundPositionY: '80px'}, immediateRender:true, ease:Quad.easeOut}),
							TweenMax.from($('#mtn8'), .7, 
								{css:{backgroundPositionY: '60px'}, immediateRender:true, ease:Quad.easeOut}),
                            TweenMax.from($('#mtn9'), .7, 
								{css:{backgroundPositionY: '40px'}, immediateRender:true, ease:Quad.easeOut}),
                            TweenMax.from($('#mtn10'), .7, 
								{css:{backgroundPositionY: '40px'}, immediateRender:true, ease:Quad.easeOut})
						])
						,
					500,
					-300 // offset for better timing
				);
    
      // Contact
	controller.addTween('#contactSection h1', TweenMax.from( $('#contactSection h1'), .3, {css:{opacity: 0}, ease:Quad.easeInOut}), 0, -300, 0);
	controller.addTween('#contactSection .col-md-9', TweenMax.from( $('#contactSection .col-md-9'), .3, {css:{opacity: 0}, ease:Quad.easeInOut}), 0, -300, 0);
	controller.addTween('#contactSection .col-md-3', TweenMax.from( $('#contactSection .col-md-3'), .3, {css:{opacity: 0}, delay:.4, ease:Quad.easeInOut}), 0, -300, 0);
    
});
    
}


