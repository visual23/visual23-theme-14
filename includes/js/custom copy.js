/*      _                 _  ____  _____ 
 __   _(_)___ _   _  __ _| ||___ \|___ / 
 \ \ / / / __| | | |/ _` | |  __) | |_ \ 
  \ V /| \__ \ |_| | (_| | | / __/ ___) |
   \_/ |_|___/\__,_|\__,_|_||_____|____/ 
 
  Robb Bennett - www.visual23.com
  
  Feel free to do whatever you want with the code. 
 */


try {
    console.log('init console... done');
} catch (e) {
    console = {
        log: function () {}
    }
}

var isMobile;
var isTouch = Modernizr.touch;
var isIE = false;

if (Modernizr.mq('only all and (max-width: 979px)')) {
    isMobile = true;
} else {
    isMobile = false;
}

var ie = (function () {

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());

if (ie < 9) {
    isIE = true;

}

var projects;

function initMain(){
    
    positionLeaves();
    resizeContactSection();
    $("#aboutText").columnize({width: 446 });
    
}


/*
|--------------------------------------------------------------------------
| EVENTS TRIGGER AFTER ALL IMAGES ARE LOADED
|--------------------------------------------------------------------------
*/
$(window).load(function () {
    
    "use strict";
    /*
    |--------------------------------------------------------------------------
    | PRELOADER
    |--------------------------------------------------------------------------
    */
    /*if (is_home) {
        $("#preloader").animate({
            // opacity: 0,
            height: '498px'
        }, 800, function () {
            // Animation complete.
            $(this).fadeOut('slow');
            
        });
        $('body').delay(350).css({
            'overflow': 'visible'
        });

    }*/

    initMain();

        var down_count = 0;
        var up_count = 0;
        var first_run = true;
        var buffer_height;

        $(window).bind('scroll',function(e) {

            if (Modernizr.mq('only all and (max-width: 979px)')) {
                isMobile = true;
            } else {
                isMobile = false;
            }
            
            
            
            if ($(window).width() > 979 && isMobile === false && isTouch === false && isIE === false && is_home === true) {

                buffer_height = 80;

                if ($(window).scrollTop() > buffer_height) {

                    down_count++;
                    if (down_count == 1) {
                        first_run = false;
                        up_count = 0;
                        
                        //$('#introSection').addClass('fixedIntro');
                        //$('#aboutSection').css('margin-top', '640px');
                        if (is_home) {
                            
                            $('#mainHeader').addClass('fixedHeader');
                            
                           
                        } else {
                            $('#mainHeader').addClass('fixedHeader');
                           
                        }

                       
                    }

                } else {

                    up_count++;
                    if (up_count == 1 && first_run === false) {
                        down_count = 0;
                        
                        //$('#introSection').removeClass('fixedIntro');
                        //$('#aboutSection').css('margin-top', '0px');
                        $('#mainHeader').removeClass('fixedHeader');

                        $('body').css('margin-top', 0);
                    }
                }
            }
        });
        //END WINDOW SCROLL	
            

            var $offset = '';
            if ($(window).width() > 980) {

                $offset = 76;

            } else {

                $offset = 0;
            }

            if ($('.localscroll').length) {
                $('.localscroll').localScroll({
                    lazy: true,
                    lock: true,
                    hash: false,
                    offset: {
                        top: -($offset)
                    }
                });
            }

        var isMobile = false;

        if (Modernizr.mq('only all and (max-width: 1024px)')) {
            isMobile = true;
        }


        if (isMobile === false && is_home) {
            $(window).stellar({
                horizontalScrolling: false,
                responsive: true,
                parallaxElements: true
            });
        }


    //END WINDOW LOAD
});


/*
|--------------------------------------------------------------------------
| FUNCTIONS
|--------------------------------------------------------------------------
*/



/* MAIN MENU (submenu slide and setting up of a select box on small screen)*/
(function () {    
    "use strict";
    var $mainMenu = $('#mainMenu').children('ul');


    if ($('#resMainMenu').length) {
        responsiveNav("#resMainMenu", {
            jsClass: "jsNav"
        });

    } else {

        // ul to select
        var optionsList = '<option value="" selected>Navigate...</option>';
        $mainMenu.find('li').each(function () {
            var $this = $(this),
                $anchor = $this.children('a'),
                depth = $this.parents('ul').length - 1,
                indent = '';

            if (depth) {
                while (depth > 0) {
                    indent += ' - ';
                    depth--;
                }
            }

            optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
        }).end().after('<select class="responsive-nav">' + optionsList + '</select>');

        $('.responsive-nav').on('change', function () {
            window.location = $(this).val();
        });
    }

})();


$(window).resize(function () {

    if (Modernizr.mq('only all and (max-width: 979px)')) {
        isMobile = true;
    } else {
        isMobile = false;
    }
    
    positionLeaves();
    
    resizeContactSection();

});



function positionLeaves()
{
    console.log('positionLeaves');
	// poisition top leaves
	var window_width = $(window).width();
	var wrapper_width = 990; // 1266
    var top_leaves_width = 311; // 1266
	var left_gutter = (window_width - wrapper_width) / 2;
    console.log('left_gutter = '+left_gutter)
	
    //$("#topLeaves").css('width', top_leaves_background_x+'px 0px');
	//$("#topLeaves").css('background-position', top_leaves_background_x+'px 0px');
	
	// left leaves
	if (left_gutter < 188)
	{
		// move background position to the left
		var left_leaves_background_x = left_gutter -210;
		$("#leftLeaves").css('background-position', left_leaves_background_x+'px 0px');
	}
    
    if (left_gutter < 210)
	{
        console.log('here')
		var top_leaves_right = (left_gutter-296);
		$("#topLeaves").css('right', top_leaves_right+'px');
	}
}


function resizeContactSection(){
    // set contact section height
    if ($(window).height() > $('#contactSection').outerHeight(true))
    {
        $('#contactSection').css('height', $(window).height()-76);
    }
}

function positionWorkSlider(){
    var window_width = $(window).width();
	var wrapper_width = 960; // 1266
    var gutter = (window_width - wrapper_width) / 2;
    $('#workSlider').css('left', gutter)
}

$(document).ready(function(){
	$window = $(window);
    var buffer_height = 600;
    var vertical_distance = 20;
    
    //getAllProjects();
    
    positionWorkSlider();
    
    $window.scroll(function() {
        if ($window.scrollTop() > buffer_height)
        {           
		//animateMountains();
        }
        
      });
                
  /* $('div[data-type="background"]').each(function(index){
     var $bgobj = $(this); // assigning the object
       // set y higher
       var initY = 10 * index;
       $bgobj.css({ backgroundPosition: '50% '+ initY + 'px' });
     // console.log('to top - '+$(window).scrollTop());
    
      $window.scroll(function() {
        if ($window.scrollTop() > buffer_height)
        {           
		var yPos = (($window.scrollTop()) / $bgobj.data('speed')); 
		
		var coords = '50% '+ yPos + 'px';

		$bgobj.css({ backgroundPosition: coords });
        }
        
      }); // window scroll Ends
    
  });*/
    
    
    
  

}); 

function animateMountains(){
    $('#mtn1').animate({
      'background-position-y': '0'
    }, 1000, 'easeOutQuad');
    
    $('#mtn2').animate({
      'background-position-y': '0'
    }, 1000, 'easeOutQuad');
    
    $('#mtn3').animate({
      'background-position-y': '0'
    }, 1000, 'easeOutQuad');
    
    $('#mtn4').animate({
      'background-position-y': '0'
    }, 1000, 'easeOutQuad');
    
    $('#mtn5').animate({
      'background-position-y': '0'
    }, 1000, 'easeOutQuad');
    
     $('#mtn6').animate({
      'background-position-y': '0'
    }, 1000, 'easeOutQuad');
    
    $('#mtn7').animate({
      'background-position-y': '0'
    }, 1000, 'easeOutQuad');
}


var audioElement = document.getElementById('chickenAudio');
//audioElement.setAttribute('src', '../audio/rooster.mpg');
//audioElement.play();
//audioElement.volume=.1;
	
	$('.play').click(function() {
		audioElement.play();
		
	});
	$('.pause').click(function() {
		audioElement.pause();
	});
	$('.volumeMax').click(function() {
		audioElement.volume=1;
	});
		$('.volumestop').click(function() {
		audioElement.volume=0;
	});
	$('.playatTime').click(function() {
		audioElement.currentTime= 35;
		audioElement.play();
	});


$(document).ready(function() {
	
    Grid.init();
    
    
    //if(!isTouch)
	//{
	var controller = $.superscrollorama({
		playoutAnimations: false,
		reverse: true
	});
    
    /*$('#mtn1').css('background-position', '0 160px')
    $('#mtn2').css('background-position', '0 100px')
    $('#mtn3').css('background-position', '0 150px')
    $('#mtn4').css('background-position', '0 100px')
    $('#mtn5').css('background-position', '0 50px')
    $('#mtn6').css('background-position', '0 40px')
    $('#mtn7').css('background-position', '0 40px')*/
    
   // $('#bird1'), .7, {delay: 0, css:{right: '500px'}, ease:linear})
    
    /*var bird1tl = new TimelineLite();
bird1tl.to("#bird1", 4, {css:{left: '500px', top:'10px'}, ease:Linear.easeNone})
.to("#bird1", 5, {css:{left: $(window).width()+24, top:'13px'}, ease:Linear.easeNone});*/
   TweenMax.to( $('#bird1'), 10, {delay: 0, css:{left: $(window).width()+24, top:'10px'}, repeat:-1, repeatDelay:8, ease:Linear.easeNone});
   TweenMax.to( $('#bird2'), 12, {delay: 1, css:{left: $(window).width()+24, top:'110px'}, repeat:-1, repeatDelay:8, ease:Linear.easeNone});
   
	
	//controller.addTween('#aboutSection h1', TweenMax.from( $('#aboutSection h1'), .7, {delay: 0, css:{opacity: 0}, ease:Quad.easeOut}), 0, -200, false);
    
    controller.addTween(
					'#mountainSceneWrapper',
					(new TimelineLite())
						.append([
							TweenMax.from($('#mtn1'), .7, 
								{css:{backgroundPositionY: '160px'}, ease:Quad.easeOut}),
							TweenMax.from($('#mtn2'), .7, 
								{css:{backgroundPositionY: '100px'}, ease:Quad.easeOut}),
							TweenMax.from($('#mtn3'), .7, 
								{css:{backgroundPositionY: '150px'}, ease:Quad.easeOut}),
							TweenMax.from($('#mtn4'), .7, 
								{css:{backgroundPositionY: '100px'}, ease:Quad.easeOut}),
							TweenMax.from($('#mtn5'), .7, 
								{css:{backgroundPositionY: '100px'}, ease:Quad.easeOut}),
							TweenMax.from($('#mtn6'), .7, 
								{css:{backgroundPositionY: '100px'}, ease:Quad.easeOut}),
							TweenMax.from($('#mtn7'), .7, 
								{css:{backgroundPositionY: '80px'}, ease:Quad.easeOut}),
							TweenMax.from($('#mtn8'), .7, 
								{css:{backgroundPositionY: '60px'}, ease:Quad.easeOut}),
                            TweenMax.from($('#mtn9'), .7, 
								{css:{backgroundPositionY: '40px'}, ease:Quad.easeOut}),
                            TweenMax.from($('#mtn10'), .7, 
								{css:{backgroundPositionY: '40px'}, ease:Quad.easeOut})
						])
						,
					800,
					-800 // offset for better timing
				); 

      // Contact
	controller.addTween('#contactSection h1', TweenMax.from( $('#contactSection h1'), .3, {css:{opacity: 0}, ease:Quad.easeInOut}), 0, -300, 0);
	controller.addTween('#contactSection .col-md-9', TweenMax.from( $('#contactSection .col-md-9'), .3, {css:{opacity: 0}, ease:Quad.easeInOut}), 0, -300, 0);
	controller.addTween('#contactSection .col-md-3', TweenMax.from( $('#contactSection .col-md-3'), .3, {css:{opacity: 0}, delay:.4, ease:Quad.easeInOut}), 0, -300, 0);
}); 

/* Bird animations */
var bird1Stage = new swiffy.Stage(document.getElementById('bird1'),
                                   birdsObject);
      bird1Stage.setBackground(null);
      bird1Stage.start();

var bird2Stage = new swiffy.Stage(document.getElementById('bird2'),
                                   birdsObject);

      bird2Stage.setBackground(null);
      bird2Stage.start();
        
      function playBird1(){
        bird1Stage.setFlashVars('myresponse=play');
        return false;
      }
      function stopBird1(){
        bird1Stage.setFlashVars('myresponse=pause');
        return false;
      }
    
    function playBird2(){
        bird2Stage.setFlashVars('myresponse=play');
        return false;
      }
      function stopBird1(){
        bird2Stage.setFlashVars('myresponse=pause');
        return false;
      }

/* Chickens animation */
var chickensStage = new swiffy.Stage(document.getElementById('footerChickens'),
                                   chickensObject);
      chickensStage.setBackground(null);
      chickensStage.start();

function buildThumbnails() {
    for (var i = 0; i < projects.length; i++) {
        var thumb_set = "";
        thumb_set += '<li>';
		thumb_set += '<a href="http://www.visual23.com/" data-largesrc="' + projects[i].large_image + '" data-title="' + projects[i].name + '" data-what="' + projects[i].what_we_did + '" data-description="' + projects[i].description  + '" data-client="' + projects[i].client + '" data-agency="' + projects[i].agency + '">';
		thumb_set += '<img src="' + projects[i].large_image + '" alt="img0'+i+'"/>';
		thumb_set += '</a>';
		thumb_set += '</li>';
        var d = document.getElementById("og-grid");
        if (i != (projects.length - 1)) {
            d.innerHTML = d.innerHTML + thumb_set;
        } else {
            var clear_float = '<div class="clear_float"></div>';
            d.innerHTML = d.innerHTML + thumb_set + clear_float;
        }
        console.log('loop')
    }
    
     console.log('done')
    
}

function getAllProjects() {
    var url = "get_data2.php";
    $.ajax({
        type: "POST",
        xhr: (window.ActiveXObject) ? function () {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        } : function () {
            return new window.XMLHttpRequest();
        },
        url: url,
        beforeSend: function () {},
        success: getAllProjectsHandler
    });
}
getAllProjectsHandler = function (data) {
    projects = JSON.parse(data).projects;
    buildThumbnails();
}
errorHandler = function (data) {}