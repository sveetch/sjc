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
     */
    if (location.hash) {
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
            // The fasted method is the raw way with 'scrollTo'
            window.scrollTo(0, $(location.hash).offset().top - offset);
            // For more animated and longer scroll, the 'jQuery animate'
            /*$('html, body').animate({
                scrollTop: $(location.hash).offset().top - offset
            }, 100, 'swing', function () {});*/
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

    // Reflow the 'swapImageToBackground' plugin on debounced
    // resize event to recalculate min-height for background image container
    $(window).on("debouncedresize", function( event ) {
        $("img[data-imgbg-status='processed']").swapImageToBackground('resize_height');
        // MediaQuery watcher on resize
        $('#watch-for-current-mquery').watchForCurrentMediaQuery();
    });
});
