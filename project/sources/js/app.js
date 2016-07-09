/*
 **
 ** This is the main frontend Javascript where all components will be initialized
 **
 ** WARNING: Don't enable things that you don't need, keep your frontend script
 **          clean.
 **
 */
jQuery(window).load(function () {
    /*
    * Apply the trick to swap <img> elements into their container
    * background and set a minimal height from image height
    */
    // Shortcuts using class
    $('img.auto-background-cover').swapImageToBackground({
        "position": '50% 50%',
        "repeat": 'no-repeat',
        "size": 'cover'
    });
    $('img.auto-background-auto').swapImageToBackground({
        "position": '50% 50%',
        "repeat": 'no-repeat',
        "size": 'auto'
    });
    $('img.auto-background-contain').swapImageToBackground({
        "position": '50% 50%',
        "repeat": 'no-repeat',
        "size": 'contain'
    });
    // Normal way using html attributes
    $('img.background').swapImageToBackground();

    /*
     * Restore "jump to anchor" behavior on page loaded but adding an offset
     * Only for medium screens and more
     */
    if( Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 640 && location.hash) {
        var $header = $('#header-container'),
            offset = 0;

        //console.log("From load(): Location hash detected:"+ location.hash);
        // Compute additional offset from topbar outer height but only in
        // sticky or fixed mode
        if($header.find('.fixed').length>0){
            offset = $header.find('.fixed').outerHeight(true);
        } else if($header.find('.sticky').length>0){
            offset = $header.find('.sticky').outerHeight(true);
        }
        //console.log("offset:"+offset);
        setTimeout(function() {
            if($(location.hash).length > 0){
                // The fasted method is the raw way with 'scrollTo'
                window.scrollTo(0, $(location.hash).offset().top - offset);
                // For more animated and longer scroll, the 'jQuery animate'
                /*$('html, body').animate({
                    scrollTop: $(location.hash).offset().top - offset
                }, 100, 'swing', function () {});*/
            }
        },1)
    }
});

jQuery(document).ready(function($) {
    // Init MediaQuery watcher (look into addons.js for more infos)
    $('#watch-for-current-mquery').initCurrentMediaQuery();
    $('#watch-for-current-mquery').watchForCurrentMediaQuery();

    /*
    * Initialize Foundation
    */
    $(document).foundation();

    /*
     * Naive stuff for debugging elements
     *
     * Just add element name as prefix on each element.
     */
    /*$('h1,h2,h3,h4,h5,h6,p,li,dd,dt', '.prefix-dom-items').each(function() {
        var $this = $(this),
            prefix = this.tagName;
        if( this.tagName == 'P') {
            if($this.hasClass("title-1")){
                prefix += ".title-1";
            } else if($this.hasClass("title-2")){
                prefix += ".title-2";
            } else if($this.hasClass("title-3")){
                prefix += ".title-3";
            } else if($this.hasClass("title-4")){
                prefix += ".title-4";
            } else if($this.hasClass("title-5")){
                prefix += ".title-5";
            } else if($this.hasClass("title-6")){
                prefix += ".title-6";
            }
        }

        if(prefix){ $this.html(prefix+': '+$this.html()); }
    });*/

    /*
     * Smooth scrolling to anchor when clicked
     */
    $('a[href^="#"]').click(function(){
        var $header = $('#header-container'),
            the_id = $(this).attr("href"),
            offset = 0;
        console.log("Clicked anchor detected");
        // Compute additional offset from topbar outer height but only in
        // sticky or fixed mode
        if($header.find('.fixed').length>0){
            offset = $header.find('.fixed').outerHeight(true);
        } else if($header.find('.sticky').length>0){
            offset = $header.find('.sticky').outerHeight(true);
        }
        console.log("additional offset:"+offset);
        $('html, body').animate({
            scrollTop: $(the_id).offset().top - offset
        }, 'slow');
        return true;
    });

    /*
     * Google map render using gmaps.js and styling
     */
    var map = new GMaps({
        el: '#gmap-container',
        scrollwheel: false,
        lat: 45.246480,
        lng: 0.338336,
        zoom: 10
    });

    // Add styling from JSON data https://snazzymaps.com/style/8381/even-lighter
    map.addStyle({
        styledMapName:"Styled Map",
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6195a0"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e6f3d6"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f4d2c5"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f4f4f4"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#787878"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#eaf6f8"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eaf6f8"
                    }
                ]
            }
        ],
        mapTypeId: "map_style"
    });
    map.setStyle("map_style");
    // Markers for places
    map.addMarker({
        lat: 45.246480,
        lng: 0.338336,
        title: 'SARL SJC Menuiserie',
        infoWindow: {
            content: '<p><b>SARL SJC Menuiserie</b><br>24600 Ribérac</p>'
        }
    });

    // Reflow the 'swapImageToBackground' plugin on debounced
    // resize event to recalculate min-height for background image container
    $(window).on("debouncedresize", function( event ) {
        $("img[data-imgbg-status='processed']").swapImageToBackground('resize_height');
        // MediaQuery watcher on resize
        $('#watch-for-current-mquery').watchForCurrentMediaQuery();
    });
});
