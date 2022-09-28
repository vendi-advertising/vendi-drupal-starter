jQuery( document ).ready(function() {
    jQuery('.boxes-wrap > div > div:nth-child(2)').click(function(){
        jQuery('.boxes-wrap > div > div:nth-child(2) .box-details').hide();
        jQuery('.scrollable-boxes-inner .box1').hide();
        jQuery('.scrollable-boxes-inner .box3').hide();
        jQuery('.scrollable-boxes-inner .box2').show();
    });


});
