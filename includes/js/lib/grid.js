
// ======================= imagesLoaded Plugin ===============================
// https://github.com/desandro/imagesloaded

// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// callback function gets image collection as argument
//  this is the container

// original: MIT license. Paul Irish. 2010.
// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

(function($) {
    
jQuery.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};
})(jQuery);

var Grid = (function($) {

		// list of items
	var $grid = $( '#og-grid' ),
		// the items
		$items = $grid.children( 'li' ),
		// current expanded item's index
		current = -1,
		// position (top) of the expanded item
		// used to know if the preview will expand in a different row
		previewPos = -1,
		// extra amount of pixels to scroll the window
		scrollExtra = 0,
		// extra margin when expanded (between preview overlay and the next items)
		marginExpanded = 10,
		$window = $( window ), winsize,
		$body = $( 'html, body' ),
		// transitionend events
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support for csstransitions
		support = Modernizr.csstransitions,
		// default settings
		settings = {
			minHeight : 500,
			speed : 350,
			easing : 'ease'
		};
    

	function init( config ) {
		//console.log('init grid called')
		// the settings..
		settings = $.extend( true, {}, settings, config );

		// preload all images
		$grid.imagesLoaded( function() {

			// save item´s size and offset
			saveItemInfo( true );
			// get window´s size
			getWinSize();
			// initialize some events
			initEvents();

		} );

	}

	// add more items to the grid.
	// the new items need to appended to the grid.
	// after that call Grid.addItems(theItems);
	function addItems( $newitems ) {

		$items = $items.add( $newitems );

		$newitems.each( function() {
			var $item = $( this );
			$item.data( {
				offsetTop : $item.offset().top,
				height : $item.height()
			} );
		} );

		initItemsEvents( $newitems );

	}

	// saves the item´s offset top and height (if saveheight is true)
	function saveItemInfo( saveheight ) {
		$items.each( function() {
            
			var $item = $( this );
			$item.data( 'offsetTop', $item.offset().top );
			if( saveheight ) {
				$item.data( 'height', $item.height() );
			}
		} );
	}
    
    function fadeOutItems() {
		$items.each( function(index) {
            console.log('fadeOutItems')
            console.log('current = '+current)
			var $item = $( this );
            if(current != index )
            {
			$item.find('.workThumbnail').fadeTo( "fast" , 0.3, function() {
    // Animation complete.
  });
            }
			
		} );
	}

	function initEvents() {
		
		// when clicking an item, show the preview with the item´s info and large image.
		// close the item if already expanded.
		// also close if clicking on the item´s cross
		initItemsEvents( $items );
		
		// on window resize get the window´s size again
		// reset some values..
		$window.on( 'debouncedresize', function() {
			
			scrollExtra = 0;
			previewPos = -1;
			// save item´s offset
			saveItemInfo();
			getWinSize();
			var preview = $.data( this, 'preview' );
			if( typeof preview != 'undefined' ) {
				hidePreview();
			}

		} );

	}

	function initItemsEvents( $items ) {
        //console.log('length - '+$items.length)
		$items.on( 'click', 'span.og-close', function() {
			hidePreview();
			return false;
		} ).children( 'a.thumbnailLink' ).on( 'click', function(e) {

			var $item = $( this ).parent();
			
            var href = $(this).data( 'slug' );
            // Update state
           // state.detail = true;
            //state.article = article;
           // state.title = $(this).data( 'title' );

            // Update page title
           // document.title = state.title;

            // Push state into history
           // window.history.pushState(state, state.title, "http://127.0.0.1/v23_wp/work/" + href);
            
			current === $item.index() ? hidePreview() : showPreview( $item );
			return false;

		} );
	}

	function getWinSize() {
		winsize = { width : $window.width(), height : $window.height() };
	}

	function showPreview( $item ) {

		var preview = $.data( this, 'preview' ),
			// item´s offset top
			position = $item.data( 'offsetTop' );

		scrollExtra = 0;

		// if a preview exists and previewPos is different (different row) from item´s top then close it
		if( typeof preview != 'undefined' ) {

			// not in the same row
			if( previewPos !== position ) {
				// if position > previewPos then we need to take te current preview´s height in consideration when scrolling the window
				if( position > previewPos ) {
					scrollExtra = preview.height;
				}
				hidePreview();
			}
			// same row
			else {
				preview.update( $item );
				return false;
			}
			
		}

		// update previewPos
		previewPos = position;
		// initialize new preview for the clicked item
		preview = $.data( this, 'preview', new Preview( $item ) );
		// expand preview overlay
		preview.open();

	}

	function hidePreview() {
		current = -1;
		var preview = $.data( this, 'preview' );
		preview.close();
		$.removeData( this, 'preview' );
	}

	// the preview obj / overlay
	function Preview( $item ) {
		this.$item = $item;
		this.expandedIdx = this.$item.index();
		this.create();
		this.update();
	}

	Preview.prototype = {
		create : function() {
			// create Preview structure:
             console.log('create')
            this.$closePreview = $( '<span class="og-close"></span>' );
            this.$title = $( '<div class="work_title"></div>' );
            this.$what = $( '<div class="work_we_did"></div>' );
            this.$description = $( '<div class="work_content"></div>' );
            this.$clientTitle = $( '<div id="client_title" class="work_client_agency"></div>' );
            this.$agencyTitle = $( '<div id="agency_title" class="work_client_agency"></div>' );      
            this.$href = $( '<a href="#" class="work_view_project" target="_blank">LAUNCH PROJECT</a>' );
			this.$details = $( '<div class="og-details"></div>' ).append(this.$closePreview, this.$title, this.$what, this.$description, this.$clientTitle, this.$agencyTitle,  this.$href );
			this.$loading = $( '<div class="og-loading"></div>' );
            this.$carousel = $( '<div id="myCarousel" class="carousel slide" data-ride="carousel"><div class="carousel-inner"></div><a href="#myCarousel" class="left carousel-control" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a href="#myCarousel" class="right carousel-control" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a></div>' );
			this.$fullimage = $( '<div class="og-fullimg"></div>' ).append( this.$loading, this.$carousel );
			
			this.$previewInner = $( '<div class="og-expander-inner"></div>' ).append( this.$fullimage, this.$details );
			this.$previewEl = $( '<div class="og-expander"></div>' ).append( this.$previewInner );
			// append preview element to the item
			this.$item.append( this.getEl() );
			// set the transitions for the preview and the item
			if( support ) {
				this.setTransition();
			}
		},
		update : function( $item ) {

			if( $item ) {
				this.$item = $item;
			}
			
			// if already expanded remove class "og-expanded" from current item and add it to new item
			if( current !== -1 ) {
				var $currentItem = $items.eq( current );
				$currentItem.removeClass( 'og-expanded' );
				this.$item.addClass( 'og-expanded' );
				// position the preview correctly
				this.positionPreview();
			}

			// update current value
			current = this.$item.index();

			// update preview´s content
			var $itemEl = this.$item.children( 'a' ),
				eldata = {
					href : $itemEl.attr( 'href' ),
                    slug : $itemEl.data( 'slug' ),
					largesrc : $itemEl.data( 'largesrc' ),
					title : $itemEl.data( 'title' ),
                    client : $itemEl.data( 'client' ),
                    agency : $itemEl.data( 'agency' ),
                    what : $itemEl.data( 'what' ),
					description : $itemEl.data( 'description' )
				};

			this.$title.html( eldata.title );
            this.$clientTitle.html( 'Client: <span>'+eldata.client+'</span>' );
            if(eldata.agency)
            {
                $('#agency_title').show();
                this.$agencyTitle.html( 'Agency: <span>'+eldata.agency+'</span>' );
            }
            else
            {
                $('#agency_title').hide();
            }
            this.$what.html( eldata.what );
			this.$description.html( eldata.description );
            this.$href.attr( 'href', eldata.href );

			var self = this;
			
			// remove the current image in the preview
			if( typeof self.$largeImg != 'undefined' ) {
				self.$largeImg.remove();
			}

            // remove old items
            $( ".carousel-inner .item" ).remove();
            
            $( ".carousel-indicators" ).remove();
            
			// preload large image and add it to the preview
			// for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
			if( self.$fullimage.is( ':visible' ) ) {
				this.$loading.show();
				
                var large_image_array = eldata.largesrc.split(',');
                var item_count = large_image_array.length; 
                
                if(item_count > 1)
                {
                    // Build indicators
                    var indicators = '<ol class="carousel-indicators">';
                    $.each( large_image_array, function( key, value ) {                 
                        if (key == 0)
                        {
                            indicators += '<li data-target="#myCarousel" data-slide-to="'+key+'" class="active"></li>';
                        }
                        else
                        {
                            indicators += '<li data-target="#myCarousel" data-slide-to="'+key+'"></li>';
                        }
                    });

                    indicators += '</ol>';
                    $( "#myCarousel" ).append( indicators );
                }
                else
                {
                    $('.carousel-control').hide();
                }
                
               // build items
                var large_images = "";
                $.each( large_image_array, function( key, value ) {
                  console.log( key + ": " + value );
                    if (key == 0)
                    {
                        large_images += '<div class="item active"><img src="'+value+'" alt="'+self.title+'"></div>';
                    }
                    else
                    {
                        large_images += '<div class="item"><img src="'+value+'" alt="'+self.title+'"></div>';
                    }
                });

                $( ".carousel-inner" ).append( large_images );
               
                $('#myCarousel').carousel({
                    interval: 1000,
                    pause: "false"
                });
                $('#myCarousel').carousel(0)
                $('#myCarousel').carousel('pause');
                
                $("#myCarousel").swiperight(function() {  
                  $(this).carousel('prev');  
                });  
               $("#myCarousel").swipeleft(function() {  
                  $(this).carousel('next');
               }); 
                
                
                $( '.carousel-inner .active img' ).load( function() {
                    console.log('loaded')
					self.$loading.hide();
                    
                    setTimeout(function(){                        
                        $('.carousel-inner .active img').addClass("loaded");
                        if(item_count > 1)
                        {
                            $('.carousel-indicators').delay(2000).fadeIn();
                            $('.carousel-control').delay(2000).fadeIn();
                        }
                       
                    }, 100);
				} );
                
                console.log('array = '+large_image_array[0])
			}

		},
		open : function() {
            console.log('open')

			setTimeout( $.proxy( function() {	
				// set the height for the preview and the item
				this.setHeights();
                
                // fade out thumbnails
                //fadeOutItems();
                
				// scroll to position the preview in the right place
				this.positionPreview();
			}, this ), 25 );

		},
		close : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						$( this ).off( transEndEventName );
					}
					self.$item.removeClass( 'og-expanded' );
					self.$previewEl.remove();
				};

			setTimeout( $.proxy( function() {

				if( typeof this.$largeImg !== 'undefined' ) {
					this.$largeImg.fadeOut( 'fast' );
				}
				this.$previewEl.css( 'height', 0 );
				// the current expanded item (might be different from this.$item)
				var $expandedItem = $items.eq( this.expandedIdx );
				$expandedItem.css( 'height', $expandedItem.data( 'height' ) ).on( transEndEventName, onEndFn );

				if( !support ) {
					onEndFn.call();
				}

			}, this ), 25 );
			
			return false;

		},
		calcHeight : function() {
//console.log('winsize.height - '+winsize.height);
//console.log('this.$item.height = '+this.$item.data( 'height' ));
            var imgContainerHeight = this.$item.find('.og-fullimg').height()+18;
            //console.log('imgContainerHeight - '+imgContainerHeight)
            //var heightPreview = winsize.height - this.$item.data( 'height' ) - marginExpanded,
			var heightPreview = imgContainerHeight - marginExpanded,
				itemHeight = imgContainerHeight + this.$item.data( 'height' )-3 ;
            //console.log('heightPreview - '+heightPreview)
            //var heightPreview = winsize.height - this.$item.data( 'height' ) - marginExpanded,
				//itemHeight = winsize.height;

			/*if( heightPreview < settings.minHeight ) {
				heightPreview = settings.minHeight;
				itemHeight = settings.minHeight + this.$item.data( 'height' ) + marginExpanded;
			}*/

			this.height = heightPreview;
			this.itemHeight = itemHeight;

		},
		setHeights : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						self.$item.off( transEndEventName );
					}
					self.$item.addClass( 'og-expanded' );
				};

			this.calcHeight();
			this.$previewEl.css( 'height', this.height );
			this.$item.css( 'height', this.itemHeight ).on( transEndEventName, onEndFn );

			if( !support ) {
				onEndFn.call();
			}

		},
        
		positionPreview : function() {

			// scroll page
			// case 1 : preview height + item height fits in window´s height
			// case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
			// case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
			var position = this.$item.data( 'offsetTop' ),
				previewOffsetT = this.$previewEl.offset().top - scrollExtra,
				scrollVal = this.height + this.$item.data( 'height' ) + marginExpanded <= winsize.height ? position : this.height < winsize.height ? previewOffsetT - ( winsize.height - this.height ) : previewOffsetT;
			$body.animate( { scrollTop : (scrollVal-76) }, settings.speed );

		},
		setTransition  : function() {
			this.$previewEl.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
			this.$item.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
		},
		getEl : function() {
			return this.$previewEl;
		}
	}

	return { 
		init : init,
		addItems : addItems
	};

})(jQuery);