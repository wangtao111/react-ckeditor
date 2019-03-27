var setupResizer = function( widget ) {
    var editor = widget.editor,
        editable = editor.editable(),
        doc = editor.document,

        // Store the resizer in a widget for testing (https://dev.ckeditor.com/ticket/11004).
        resizer = widget.resizer = doc.createElement( 'span' );
        topResizer = widget.topResizer = doc.createElement('span');
        bottomResizer = widget.bottomResizer = doc.createElement('span');
        leftResizer = widget.leftResizer = doc.createElement('span');
        rightResizer = widget.rightResizer = doc.createElement('span');

    resizer.addClass( 'cke_resizer' );
    resizer.setAttribute( 'title', '点击并拖拽以改变尺寸' );
    resizer.append( new window.CKEDITOR.dom.text( '\u200b', doc ) );
    widget.wrapper.append( resizer );

    // topResizer.addClass('cke_top_resizer');
    // bottomResizer.addClass('cke_bottom_resizer');
    // leftResizer.addClass('cke_left_resizer');
    // rightResizer.addClass('cke_right_resizer');

    // widget.wrapper.append(topResizer);
    // widget.wrapper.append(bottomResizer);
    // widget.wrapper.append(leftResizer);
    // widget.wrapper.append(rightResizer);


    // topResizer.on('mousedown', function(evt) {
    //     bindEvent('vertical');
    // });

    // bottomResizer.on('mousedown', function(evt) {
    //     bindEvent('vertical');
    // });

    // leftResizer.on('mousedown', function(evt) {
    //     var startX = evt.data.$.target.offsetLeft;
    //     bindEvent('horizontal', startX);
    // });

    // rightResizer.on('mousedown', function(evt) {
    //     var startX = evt.data.$.target.offsetLeft;
    //     bindEvent('horizontal', startX);
    // });


    // Calculate values of size variables and mouse offsets.
    resizer.on( 'mousedown', function( evt ) {
            // "factor" can be either 1 or -1. I.e.: For right-aligned images, we need to
            // subtract the difference to get proper width, etc. Without "factor",
            // resizer starts working the opposite way.
        var factor = widget.data.align == 'right' ? -1 : 1,
            listeners = [],

            // A class applied to editable during resizing.
            cursorClass = 'cke_image_s' + ( !~factor ? 'w' : 'e' ),

            nativeEvt, newWidth, newHeight, updateData;

        // Save the undo snapshot first: before resizing.
        editor.fire( 'saveSnapshot' );

        // Mousemove listeners are removed on mouseup.
        attachToDocuments( 'mousemove', onMouseMove, listeners );

        // Clean up the mousemove listener. Update widget data if valid.
        attachToDocuments( 'mouseup', onMouseUp, listeners );

        // The entire editable will have the special cursor while resizing goes on.
        editable.addClass( cursorClass );

        // This is to always keep the resizer element visible while resizing.
        resizer.addClass( 'cke_image_resizing' );

       
        function onMouseMove( evt ) {
            nativeEvt = evt.data.$;
            const { offsetLeft, offsetTop } = widget.wrapper.$;
            newWidth = nativeEvt.pageX - offsetLeft;
            newHeight = nativeEvt.pageY - offsetTop;
            updateData = true;
        }

        function onMouseUp() {
            var l;

            while ( ( l = listeners.pop() ) )
                l.removeListener();

            // Restore default cursor by removing special class.
            editable.removeClass( cursorClass );

            // This is to bring back the regular behaviour of the resizer.
            resizer.removeClass( 'cke_image_resizing' );

            if ( updateData ) {
                widget.setData( { width: newWidth, height: newHeight } );

                // Save another undo snapshot: after resizing.
                editor.fire( 'saveSnapshot' );
            }

            // Don't update data twice or more.
            updateData = false;
        }
    } );

     // Attaches an event to a global document if inline editor.
    // Additionally, if classic (`iframe`-based) editor, also attaches the same event to `iframe`'s document.
    function attachToDocuments( name, callback, collection ) {
        var globalDoc = CKEDITOR.document,
            listeners = [];

        if ( !doc.equals( globalDoc ) )
            listeners.push( globalDoc.on( name, callback ) );

        listeners.push( doc.on( name, callback ) );

        if ( collection ) {
            for ( var i = listeners.length; i--; )
                collection.push( listeners.pop() );
        }
    }

    // Change the position of the widget resizer when data changes.
    widget.on( 'data', function() {
        resizer[ widget.data.align == 'right' ? 'addClass' : 'removeClass' ]( 'cke_image_resizer_left' );
    } );
}  
CKEDITOR.plugins.add('template', {
    requires: 'widget',
    onLoad: function() {
        CKEDITOR.addCss(`
            .cke_widget_template {
                display: inline-block;
                width: 100%;
                vertical-align: top;
            }

            .cke_widget_template:hover > .cke_resizer {
                display: block;
            }

            .cke_resizer {
                display: none;
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                bottom: -4px;
                right: -4px;
                outline: 1px solid #fff;
                line-height: 0;
                cursor: se-resize;
            }

            .cke_resizer:after {
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                border-right: 2px solid rgba(0, 0, 0, 0.8);
                border-bottom: 2px solid rgba(0, 0, 0, 0.8);
            }

            .cke_top_resizer,
            .cke_bottom_resizer {
                position: absolute;
                height: 1px;
                left: 10px;
                right: 10px;
                cursor: row-resize;
            }

            .cke_left_resizer,
            .cke_right_resizer {
                position: absolute;
                width: 1px;
                top: 10px;
                bottom: 10px;
                cursor: col-resize;
            }

            .cke_top_resizer {
                top: 10px;
            }

            .cke_bottom_resizer {
                bottom: 10px;
            }

            .cke_left_resizer {
                left: 10px;
            }

            .cke_right_resizer {
                right: 10px;
            }
        `);
    },
    init: function(editor) {
        editor.addContentsCss(this.path + 'content.css' );
        editor.widgets.add('template', {
            allowedContent: 'section(!widget-component-wrapper);select',
            requiredContent: 'section(widget-component-wrapper)',
            editables: {
                title: {
                    selector: '.summary-title'
                },
				content: {
					selector: '.editable-content'
                },
                editableInline: {
                    selector: '.editable-inline'
                },
                editableImg: {
                    selector: '.editable-img'
                }
            },
            template: `<section class="widget-component-wrapper">
                <p class="editable-content"></p>
            </section>`,
            upcast: function(element) {
                return element.name == 'section' && element.hasClass( 'widget-component-wrapper' );
            },
            init: function() {
                setupResizer(this);
            },
            data: function() {
                const wrapperWidth = editor.document.getBody().$.clientWidth;

                if ( !this.data.width ) {
                    this.wrapper.removeStyle( 'width' );
                }else {
                    this.wrapper.setStyle( 'width', (Math.min(this.data.width / wrapperWidth, 1) * 100).toFixed(3) + '%' );
                }

                // if ( !this.data.height ) {
                //     this.element.removeStyle( 'height' );
                // }else {
                //     this.element.setStyle( 'height', this.data.height + 'px' );
                // }
            }
        })
    }
});