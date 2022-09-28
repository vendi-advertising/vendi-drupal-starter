(function( ) {
    jQuery('faq-set').scroll(function() {
        var scroll = jQuery(window).scrollTop();
		// console.log('here');

        if (scroll >= 75) {
			jQuery('.site-header').removeClass('header-transparent').addClass('header-white');
        } else {
			jQuery('.site-header').removeClass('header-white').addClass('header-transparent');
        }
    });
})();