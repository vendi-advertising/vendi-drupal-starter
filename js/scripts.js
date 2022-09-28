//(function( ) {
//    jQuery(window).scroll(function() {
//        var scroll = jQuery(window).scrollTop();
//		console.log('here');
//
//        if (scroll >= 300) {
//            jQuery('.paragraph--type--hero-image').removeClass('show').addClass('hide');
//        } else {
//            jQuery('.paragraph--type--hero-image').removeClass('hide').addClass('show');
//        }
//    });
	
	//var container = document.getElementById('container');
//	var windowHeight = window.innerHeight;
//	var windowWidth = window.innerWidth;
//	var scrollArea = windowHeight;
//	var heroimage = document.getElementsByClassName('paragraph--type--hero-image')[0];
//	//var herotext = document.getElementsByClassName('field--name-field-hero-text')[1];
//	
//	// update position of square 1 and square 2 when scroll event fires.
//	window.addEventListener('scroll', function() {
//	  var scrollTop = window.pageYOffset || window.scrollTop;
//	  var scrollPercent = scrollTop/scrollArea || 0;
//	  
//	  heroimage.style.bottom = 0 - scrollPercent*window.innerWidth + 'px';
//	  //herotext.style.opacity = 1 - scrollPercent*window.innerWidth*0.6 + 'px';
//	});
	
// })();

/*jslint browser: true, white: true*/
/*
global htmlEvents
 */
var VendiGeneralUtils =
{
    readyTags : {},
    ready: false,

    TrackGoogleAnalyticsHit: function( obj, command )
    {
        if( typeof window.__gaTracker === 'undefined' )
        {
            console.log( 'Could not find global GA tracker code... exiting' );
            return;
        }

        command = command || 'send';

        window.__gaTracker( command, obj );
    },

    TrackError: function( exDescription, exFatal )
    {
        var
            obj = { hitType: 'exception' }
        ;

        if( ! exDescription )
        {
            console.log( 'No description found... not logging exception' );
            return;
        }

        obj.exDescription = exDescription;

        obj.exFatal = typeof exFatal !== 'undefined' ? exFatal === true : false;

        VendiGeneralUtils.TrackGoogleAnalyticsHit( obj );
    },

    TrackEvent : function( nonInteractive, eventCategory, eventAction, eventLabel, eventValue )
    {
        var
            obj = { hitType: 'event' }
        ;

        if( ! eventCategory )
        {
            console.log( 'No category found... not logging event' );
            return;
        }

        if( ! eventAction )
        {
            console.log( 'No action found... not logging event' );
            return;
        }

        obj.eventCategory = eventCategory;
        obj.eventAction = eventAction;

        if( eventLabel )
        {
            obj.eventLabel = eventLabel;
        }

        if( eventValue )
        {
            obj.eventValue = eventValue;
        }

        obj.nonInteractive = typeof nonInteractive !== 'undefined' ? nonInteractive === true : true;

        VendiGeneralUtils.TrackGoogleAnalyticsHit( obj );
    },

    GetEventTarget : function( e )
    {
        var targ;

        if( ! e )
        {
            e = window.event;
        }

        if( e.target )
        {
            targ = e.target;
        }
        else if( e.srcElement )
        {
            targ = e.srcElement;
        }

        return targ;
    },

    /**
     * Legacy-safe isArray implementation
     */
    IsArray : function( obj )
    {
        return obj && obj.isArray ? obj.isArray() : Object.prototype.toString.call( obj ) === '[object Array]';
    },

    DetectTouch : function()
    {
        return false;//Disabled for now
    },

    TriggerEvent: function( name, obj )
    {
        var
            event
        ;

        if( ! obj )
        {
            obj = window;
        }

        
        if( document.createEvent )
        {
            event = document.createEvent( 'HTMLEvents' );
            event.initEvent( name, true, true );
        }
        else if( document.createEventObject )
        {
            event = document.createEventObject();
            event.eventType = name;
        }
        else
        {
            console.log( 'Trigger event could create an event...exiting' );
            return;
        }

        event.eventName = name;

        if( obj.dispatchEvent )
        {
            obj.dispatchEvent( event );
        }
        else if( obj.fireEvent && htmlEvents[ 'on' + name ] )
        {
            obj.fireEvent( 'on' + event.eventType, event );
        }
        else if( obj[ name ] )
        {
            obj[ name ]();
        }
        else if( obj[ 'on' + name ] )
        {
            obj[ 'on' + name ]();
        }
        else
        {
            console.log( 'Trigger event could not find a valid way to invoke the event...exiting' );
        }
    },

    /**
     * Cross browser event handler.
     */
    AddEvent : window.addEventListener ?
              function (elem, type, method)
              {
                type = 'clickortap' === type ? ( VendiGeneralUtils.DetectTouch() ? 'touchend' : 'click' ) : type;
                elem.addEventListener(type, method, false);
              }
              :
              function (elem, type, method)
              {
                type = 'clickortap' === type ? ( VendiGeneralUtils.DetectTouch() ? 'touchend' : 'click' ) : type;
                elem.attachEvent('on' + type, method);
              },

    /**
     * Detects whether the HTML node has the supplied CSS class.
     * 
     * @param  {Object}  element   The HTML node to test.
     * @param  {String}  className The class to look for.
     * @return {Boolean}           True if the element is valid and the class is found, otherwise false.
     */
    HasClass : function( element, className )
    {
        if( ! element || ! element.className )
        {
            return false;
        }

        //Trick for handling missing classes or just single classes, just surround everything with whitespace
        return ( ' ' + element.className + ' ' ).indexOf( ' ' + className + ' ' ) > -1;
    },

    /**
     * Remove the supplied CSS class from the given HTML node.
     * @param  {Object} element   The HTML node to test.
     * @param  {String} className The class to look for.
     */
    RemoveClass : function( element, className )
    {
        if( ! element || ! VendiGeneralUtils.HasClass( element, className ) )
        {
            return;
        }

        element.className = ( ' ' + element.className + ' ' ).replace( ' ' + className + ' ', ' ' ).replace( /\s+/g, ' ' );
    },

    /**
     * Add the supplied CSS class to the given HTML node.
     * 
     * @param {Object} element   The HTML node to test.
     * @param {String} className The class to look for.
     */
    AddClass : function( element, className )
    {
        if( ! element || VendiGeneralUtils.HasClass( element, className ) )
        {
            return;
        }

        //Append the class and remove any extra whitespace
        element.className += ' ' + className;
        element.className = element.className.replace( /\s+/g, ' ' );
    },

    FindParentNodeByClassName : function( obj, className )
    {
        if( VendiGeneralUtils.HasClass( obj, className ) )
        {
            return obj;
        }

        if( ! obj.parentNode )
        {
            return null;
        }

        return VendiGeneralUtils.FindParentNodeByClassName( obj.parentNode, className );
    },

    CreateElementWithClassAndInnerHtml : function( ele, classNames, htmlOrChildNodes )
    {
        var
            node = document.createElement( ele ),
            htmlOrChildNode,
            i
        ;

        //Potentially add classes names if supplied
        if( undefined !== classNames && null !== classNames )
        {
            if( ! VendiGeneralUtils.IsArray( classNames ) )
            {
                classNames = [ classNames ];
            }

            for( i = 0; i < classNames.length; i++ )
            {
                //IE7 doesn't register classes added via attributes, need to use className
                VendiGeneralUtils.AddClass( node, classNames[ i ] );
            }
        }

        //If the last parameter isn't an array, turn it into one
        //TODO: Browser test isArray()
        if( ! VendiGeneralUtils.IsArray( htmlOrChildNodes ) )
        {
            htmlOrChildNodes = [ htmlOrChildNodes ];
        }

        //Loop through each object in the child array
        for( i = 0; i < htmlOrChildNodes.length; i++ )
        {

            //Shortcut access to the specific child object
            htmlOrChildNode = htmlOrChildNodes[ i ];

            //Sanity check that we've got something
            //TODO: This should probably be moved up higher before the isArray() call
            if( undefined !== htmlOrChildNode && null !== htmlOrChildNode )
            {
                //If we've got an object then this should be a browser node object (hopefully)
                if( 'object' === typeof htmlOrChildNode )
                {
                    node.appendChild( htmlOrChildNode );
                }
                else if( 'string' === typeof htmlOrChildNode && '' !== htmlOrChildNode )
                {
                    node.innerHTML = htmlOrChildNode;
                }
            }
        }

        return node;
    },

    /*!
     * contentloaded.js
     *
     * Author: Diego Perini (diego.perini at gmail.com)
     * Summary: cross-browser wrapper for DOMContentLoaded
     * Updated: 20101020
     * License: MIT
     * Version: 1.2
     *
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     *
     * //From: https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
     *
     */
    CreateOnReadyEvent: function( fn, win  )
    {
        win = win || window;

        var
            done = false,
            top = true,

            doc = win.document,
            root = doc.documentElement,
            modern = doc.addEventListener,

            add = modern ? 'addEventListener' : 'attachEvent',
            rem = modern ? 'removeEventListener' : 'detachEvent',
            pre = modern ? '' : 'on',

            init = function( e )
            {
                if ( e.type == 'readystatechange' && doc.readyState != 'complete' )
                {
                    return;
                }

                (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);

                if (!done && (done = true)) fn.call(win, e.type || e);
            },

            poll = function()
            {
                try
                {
                    root.doScroll( 'left' );
                }
                catch( e )
                {
                    setTimeout( poll, 50 );
                    return;
                }

                init( 'poll' );
            };

            if ( doc.readyState == 'complete' )
            {
                fn.call( win, 'lazy' );
            }
            else
            {
                if ( ! modern && root.doScroll )
                {
                    try
                    {
                        top = ! win.frameElement;
                    }
                    catch( e )
                    {
                        //NOOP
                    }

                    if (top)
                    {
                        poll();
                    }
                }

                doc[add](pre + 'DOMContentLoaded', init, false);
                doc[add](pre + 'readystatechange', init, false);
                win[add](pre + 'load', init, false);
            }



        // //If we are already ready then just call our callback and exit
        // if( VendiGeneralUtils.ready )
        // {
        //     callback();
        //     return;
        // }

        // //If we weren't passed a unique tag then create a random one
        // tag = tag || VendiGeneralUtils.RandomString();

        // //Flag that specific tag as not run yet
        // VendiGeneralUtils.readyTags[ tag ] = false;

        // //Bind a bunch of handler
        // document.addEventListener( 'DOMContentLoaded', 
        //                             function()
        //                             {
        //                                 VendiGeneralUtils.HandleOnReadyEvent( callback, tag, 'DOMContentLoaded' );
        //                             }
        //                         );

        // document.onreadystatechange =   function()
        //                                 {
        //                                     VendiGeneralUtils.HandleOnReadyEvent( callback, tag, 'onreadystatechange' );
        //                                 };

        // document.addEventListener(  'load',
        //                             function()
        //                             {
        //                                 VendiGeneralUtils.HandleOnReadyEvent( callback, tag, 'load' );
        //                             }
        //                         );
    }
};

AOS.init();
