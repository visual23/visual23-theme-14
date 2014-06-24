/*      _                 _  ____  _____ 
 __   _(_)___ _   _  __ _| ||___ \|___ / 
 \ \ / / / __| | | |/ _` | |  __) | |_ \ 
  \ V /| \__ \ |_| | (_| | | / __/ ___) |
   \_/ |_|___/\__,_|\__,_|_||_____|____/ 
 
  Robb Bennett - www.visual23.com
  
  Feel free to do whatever you want with this code. 
  
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


(function($) {

var projects;

function initMain(){
    
    if(isMobile == false || isTablet == false)
    {
        playBirds();
    }
    
    
    $('.introText div').each(function(index) {
		TweenMax.fromTo($(this), 1.5, {rotationY:-70, transformOrigin:"left top"}, {delay:index*.10, opacity:1, rotationY:0, transformOrigin:"left top"});
	});
    
    //TweenMax.fromTo(deviceDesktopHolder, 2, {marginLeft:"1000px",rotationY:70, transformOrigin:"center top"}, {marginLeft:"0px",opacity:1, rotationY:0, transformOrigin:"center top"});
    
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
    $("#preloader").animate({
            opacity: 0
        }, 300, function () {
            // Animation complete.
            $(this).hide();
            initMain();            
        });
        $('body').delay(350).css({
            'overflow': 'visible'
        });

    

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
            
            
            
            if ($(window).width() > 767  && isIE === false && is_home === true) {

                buffer_height = 0;

                if ($(window).scrollTop() > buffer_height) {

                    down_count++;
                    if (down_count == 1) {
                        first_run = false;
                        up_count = 0;
                        
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
                    lazy: false,
                    lock: false,
                    hash: false,
                    //filter: '#myCarousel',
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
    
$(window).on( 'debouncedresize', function() {

    if (Modernizr.mq('only all and (max-width: 979px)')) {
        isMobile = true;
    } else {
        isMobile = false;
    }
    
    positionLeaves();
    
    resizeContactSection();
    
    if(isMobile == false || isTablet == false)
    {
        playBirds();
    }

});

$(document).ready(function(){
	$window = $(window);
    var buffer_height = 600;
    var vertical_distance = 20;
    
    positionLeaves();
    resizeContactSection();
    
    $("#aboutText").columnize({width: 446 });
    
    Grid.init();    
    
    if(isMobile == false || isTablet == false)
    {
        var chicken_audio = $("#chickenAudio")[0];
        chicken_audio.volume=.1;

        $("#footerChickensAudio").mouseover(function() {
            chicken_audio.play();
        }); 
    }
    
    /*
    |--------------------------------------------------------------------------
    |  form placeholder for IE
    |--------------------------------------------------------------------------
    */
    if(!Modernizr.input.placeholder){

        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });

    }

});

/*
|--------------------------------------------------------------------------
| FUNCTIONS
|--------------------------------------------------------------------------
*/


function playBirds()
{
    TweenMax.killTweensOf($("#bird1"));
    TweenMax.killTweensOf($("#bird2"));
    $('#bird1').css('left', -20);
    $('#bird2').css('left', -20);
    TweenMax.to( $('#bird1'), 10, {delay: 0, css:{left: $(window).width()+24, top:'10px'}, repeat:-1, repeatDelay:8, ease:Linear.easeNone});
    TweenMax.to( $('#bird2'), 12, {delay: 1, css:{left: $(window).width()+24, top:'110px'}, repeat:-1, repeatDelay:8, ease:Linear.easeNone});
}

function positionLeaves()
{
    console.log('positionLeaves');
	// poisition top leaves
	var window_width = $(window).width();
	var wrapper_width = 990; // 1266
    var top_leaves_width = 337; // 1266
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
    console.log('left_gutter = '+left_gutter)
    if (left_gutter < 210)
	{
        console.log('here')
		var top_leaves_right = (left_gutter-320);
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

function getRandomDeviceSite(){
    var device_sites = ['king-duke', 'quick-step-style', 'st-cecilia'];
    var random_site = device_sites[Math.floor(Math.random() * device_sites.length)];
    
    $('<img src="assets/images/devices/' + random_site + '-desktop.jpg">').appendTo('#deviceDesktop .window');
    $('<img src="assets/images/devices/' + random_site + '-tablet.jpg">').appendTo('#deviceTablet .window');
    $('<img src="assets/images/devices/' + random_site + '-mobile.jpg">').appendTo('#deviceMobile .window');
}



/* CONTACT FROM */

jQuery(function() {
    "use strict";
    if( jQuery("#contactfrm").length ){

      jQuery("#contactfrm").validate({
        // debug: true,
        errorPlacement: function(error, element) {
            error.insertBefore( element );
        },
        submitHandler: function(form) {
            jQuery(form).ajaxSubmit({
              target: ".result"
          });
        },
        onkeyup: false,
        onclick: false,
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: false,
                minlength: 10,
                digits:true
            },
            comment: {
                required: true,
                minlength: 10,
                maxlength: 350
            }
        }
    });
  }  

});

    
})(jQuery);

if(isMobile == false || isTablet == false)
{
    /* Chickens animation */
var chickensStage = new swiffy.Stage(document.getElementById('footerChickens'),
                                   chickensObject);
      chickensStage.setBackground(null);
      chickensStage.start();
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
}


/*var state = {
	detail: false,
	article: 0,
	title: ""
};

var defaultTitle = "Visual23";

// Called whenever user hits browser's back or forward
window.onpopstate = function(evt) {
	
	// Grab the state from the event object
	var s = evt.state;
	
	// In webkit browsers the onpopstate event is called when page loads
	// but the event state is null at this time
	// This is also true when user hits back to page's initial state
	if (!s) {
		window.history.replaceState(state, document.title, window.location.href);
		return;
	}
	
	// Control page content based on event state
	if (s.detail) {
		//getContents(s.article);
	} else {
		//showNews();
	}
	
	// Update page title
	document.title = s.title;
}*/