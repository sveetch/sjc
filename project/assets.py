# -*- coding: utf-8 -*-
"""
Assets bundles
"""
from webassets import Bundle

"""
BASE BUNDLES, contains common app/components bundles, do not register your
main bundles here. However you can comment/uncomment some app files for your
needs.
"""
AVALAIBLE_BUNDLES = {
    # App bundle for Modernizr, compatible for all Foundation releases
    'app_modernizr_js': Bundle(
        "js/foundation5/vendor/modernizr.js",
        filters='yui_js',
        output='js/modernizr.min.js'
    ),

    # App bundle for Foundation5
    'app_foundation5_js': Bundle(
        "js/foundation5/vendor/jquery.js",
        "js/foundation5/vendor/jquery.cookie.js",
        "js/foundation5/foundation/foundation.js",
        "js/foundation5/foundation/foundation.abide.js",
        "js/foundation5/foundation/foundation.accordion.js",
        "js/foundation5/foundation/foundation.alert.js",
        "js/foundation5/foundation/foundation.clearing.js",
        "js/foundation5/foundation/foundation.dropdown.js",
        #"js/foundation5/foundation/foundation.equalizer.js",
        "js/foundation5/foundation/foundation.interchange.js",
        "js/foundation5/foundation/foundation.joyride.js",
        "js/foundation5/foundation/foundation.magellan.js",
        "js/foundation5/foundation/foundation.offcanvas.js",
        "js/foundation5/foundation/foundation.reveal.js",
        "js/foundation5/foundation/foundation.slider.js",
        "js/foundation5/foundation/foundation.tab.js",
        "js/foundation5/foundation/foundation.tooltip.js",
        "js/foundation5/foundation/foundation.topbar.js",
        filters='yui_js',
        output='js/app_foundation5.min.js'
    ),
}


"""
MAIN AVAILABLE BUNDLES, this is where you will register your main Asset bundles
"""
AVALAIBLE_BUNDLES.update({
    # Main CSS bundle
    'main_css': Bundle(
        # Main CSS
        'css/app.css',

        filters='yui_css',
        output='css/app.min.css'
    ),

    'notecard_css': Bundle(
        # Main CSS
        'css/notecard.css',

        filters='yui_css',
        output='css/notecard.min.css'
    ),

    # JAVASCRIPT bundle common main frontend script
    'main_js': Bundle(
        # Foundation5 bundle
        AVALAIBLE_BUNDLES['app_foundation5_js'],

        ## Debounce event from jquery-smartresize
        #"js/jquery/jquery.debouncedresize.js",

        ## Throttling event from jquery-smartresize
        #"js/jquery/jquery.throttledresize.js",

        # Image swapping plugin
        "js/jquery/jquery.image-swapper.js",

        # Some common various addons you can use
        "js/jquery/addons.js",

        # Main frontend script where you should launch/init/configure all used
        # libraries from bundles
        "js/app.js",

        filters='yui_js',
        output='js/app.min.js'
    ),
})


"""
ENABLE NEEDED BUNDLE HERE, only these bundles will be used
"""
ENABLED_BUNDLES = [
    'app_modernizr_js',
    'main_css',
    'notecard_css',
    'main_js',
]
# Build a new dict of enabled bundles
PUBLISHED_BUNDLES = {k:AVALAIBLE_BUNDLES[k] for k in ENABLED_BUNDLES}