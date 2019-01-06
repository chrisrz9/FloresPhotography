var request;                        // latest image To Be Pulled / requested
var $current;                       // Image currently being shown
var cache = {};                     // Cache object
var $frame = $('#photo-viewer');   // Container For Image
var $thumbs = $('.thumb');        // Container For Thumbs

// Cache Object
var cache = {
    "../images/galleryContent/valblackwhite_jcp.jpg": {
        "$img": jQuery Object,
        "isLoading": false
    },
	"../images/galleryContent/pines_jcp.jpg": {
		"img": jQuery Object,
		"isLoading": false
	}
}

function crossFade($img)    {       // Function to fade between images
                                    // Pass in new image as parameter
    if ($current)   {               // If there is currently an image showing
        $current.stop().fadeOut('slow');    // Stop animation and fade it out
    }
    
    $img.css({                      // Set the CSS margins for the image
        marginLeft: -$img.width() / 2,  // Negative margin of half image's width
        marginTop: -$img.height() / 2   // Negative margin of half image's height
    });
    
    $img.stop().fadeTo('slow', 1);      // Stop animation on new image & fade in
    
    $current = $img;                    // New image becomes current image
    
}

$(document).on('click', 'thumb', function(e){	// When a thumb is clicked on
	var $img;									// Create local variable called $img
	var src = this.href:						// Store path to image
	request = src;								// Store path again in request
	
	e.preventDefault();	// Stop default behavior
	
	$thumbs.removeClass('active');	// Remove active from all thumbs
	$(this).addClass('active');	// Add active to clicked thumb
	
	if (cache.hasOwnProperty(src)) {	// If cache contains this image
		if (cache[src].isLoading === false) { // And if isLoading is false
			crossFadeade(cache[src].$img);	// Call crossfade function
	}
} else {
	$img = $('<img/>');
	cache[src] = {
		$img: $img,
		isLoading: true
	};
	
	// Next few lines will run when image has loaded but are prepared first
	$img.on('load', function() {	// When image has loaded
		$imf.hide();	// Hide it
		// Remove is-loading class from frame & append new image to it
		$frame.removeClass('is-loading').append($img);
		cache[src].isLoading = false; // Update isLoading in cache
		// If still most recently requested image then
		if (request === src) {
			crossFade($img);	// Call crossfade() function
		}	// Solves asynchronous loading issue
	});
	
	$frame.addClass('is-loading');	// Add is-loading class to frame
	
	$img.attr({	// Set attributes on <img> element
		'src': src,	// Add src attribute to load image
		'alt': this.title || ''	// Add title if one was given in link
	});
}
});

// Last line runs once (when rest of script has loaded) to show the first image
$('.thumb').eq(0).click();	// Simulate click on first thumbnail