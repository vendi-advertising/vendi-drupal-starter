jQuery( document ).ready(function() {
    jQuery('#searchIcon').click(function(){
        jQuery('.region-search-dock').addClass('show');
    });

    jQuery('.search-block-form h2').click(function(){
        jQuery('.region-search-dock').addClass('close');
        jQuery('.region-search-dock').removeClass('show');
    });


    // // Scrollable Boxes
    // jQuery('.boxes-wrap > div > div:nth-child(2)').hover(function(){
    //     jQuery('.boxes-wrap > div > div:nth-child(2) .box-details').toggleClass('hide');
    //     jQuery('.boxes-wrap > div > div:nth-child(1) .box-details').toggleClass('show');
    //     jQuery('.boxes-wrap > div > div:nth-child(3) .box-details').toggleClass('show');
    //     jQuery('.scroll-boxes-inner .box1').toggleClass('hide');
    //     jQuery('.scroll-boxes-inner .box3').toggleClass('hide');
    //     jQuery('.scroll-boxes-inner .box2').toggleClass('show');
    // });

    // jQuery('.boxes-wrap > div > div:nth-child(1)').hover(function(){
    //     jQuery('.boxes-wrap > div > div:nth-child(1) .box-details').toggleClass('hide');
    //     jQuery('.boxes-wrap > div > div:nth-child(2) .box-details').toggleClass('show');
    //     jQuery('.boxes-wrap > div > div:nth-child(3) .box-details').toggleClass('show');
    //     jQuery('.scroll-boxes-inner .box2').toggleClass('hide');
    //     jQuery('.scroll-boxes-inner .box3').toggleClass('hide');
    //     jQuery('.scroll-boxes-inner .box1').toggleClass('show');
    // });

    // jQuery('.boxes-wrap > div > div:nth-child(3)').hover(function(){
    //     jQuery('.boxes-wrap > div > div:nth-child(3) .box-details').toggleClass('hide');
    //     jQuery('.boxes-wrap > div > div:nth-child(1) .box-details').toggleClass('show');
    //     jQuery('.boxes-wrap > div > div:nth-child(2) .box-details').toggleClass('show');
    //     jQuery('.scroll-boxes-inner .box1').toggleClass('hide');
    //     jQuery('.scroll-boxes-inner .box2').toggleClass('hide');
    //     jQuery('.scroll-boxes-inner .box3').toggleClass('show');
    // });

});
