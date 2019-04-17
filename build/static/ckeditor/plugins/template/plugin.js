var setupResizer = function( widget ) {
    var editor = widget.editor,
        editable = editor.editable(),
        doc = editor.document,

        // Store the resizer in a widget for testing (https://dev.ckeditor.com/ticket/11004).
        resizer = widget.resizer = doc.createElement( 'span' );
        leftResizer = widget.leftResizer = doc.createElement('span');
        rightResizer = widget.rightResizer = doc.createElement('span');

    resizer.addClass('cke_resizer');
    resizer.addClass('cke_right_resizer');
    resizer.setAttribute( 'title', '点击并拖拽以改变尺寸' );
    resizer.append( new window.CKEDITOR.dom.text( '\u200b', doc ) );
    widget.wrapper.append( resizer );

    leftResizer.addClass('cke_resizer');
    leftResizer.addClass('cke_left_resizer');
    leftResizer.setAttribute('title', '点击并拖拽以改变尺寸');
    leftResizer.append(new window.CKEDITOR.dom.text('\u200b', doc));
    widget.wrapper.append(leftResizer);

    var resizers = doc.find('.cke_resizer');

    if(resizers && resizers.toArray().length) {
        for(var i = 0, len = resizers.toArray().length; i < len; i++) {
            const currentResizer = resizers.getItem(i);

            // Calculate values of size variables and mouse offsets.
            currentResizer.on( 'mousedown', function( evt ) {
                // "factor" can be either 1 or -1. I.e.: For right-aligned images, we need to
                // subtract the difference to get proper width, etc. Without "factor",
                // resizer starts working the opposite way.
                var factor = widget.data.align == 'right' ? -1 : 1,
                    listeners = [],

                    // A class applied to editable during resizing.
                    cursorClass = 'cke_image_s' + ( !~factor ? 'w' : 'e' ),

                    nativeEvt, newWidth, newHeight, updateData, originalX, originalY, originalWidth, originalHeight, lastTranslateX = 0;

                    nativeEvt = evt.data.$;
                    originalX = nativeEvt.pageX;
                    originalY = nativeEvt.pageY;
                    originalWidth = widget.wrapper.$.getBoundingClientRect().width;
                    originalHeight = widget.wrapper.$.getBoundingClientRect().height;

                    if(widget.data.transform) {
                        var style = editor.window.$.getComputedStyle(widget.wrapper.$);
                        var matrix = new WebKitCSSMatrix(style.webkitTransform);
                        lastTranslateX = matrix.m41;
                    }

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
                    if(currentResizer.hasClass('cke_left_resizer')) {
                        newWidth = originalWidth - (nativeEvt.pageX - originalX);
                        newHeight = originalHeight + (nativeEvt.pageY - originalY);
                        var translateX = lastTranslateX + nativeEvt.pageX - originalX;
                     
                        if(translateX >= 0) {
                            widget.setData( { width: newWidth, height: newHeight, transform: translateX } );
                        }
                    }

                    if(currentResizer.hasClass('cke_right_resizer')) {
                        newWidth = originalWidth + (nativeEvt.pageX - originalX);
                        newHeight = originalHeight + (nativeEvt.pageY - originalY);
                        widget.setData( { width: newWidth, height: newHeight } );
                    }

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
                        // Save another undo snapshot: after resizing.
                        editor.fire( 'saveSnapshot' );
                    }
                    // Don't update data twice or more.
                    updateData = false;
                }
            });
        }
    }

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
    requires: 'widget,dialog',
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
                outline: 1px solid transparent;
                line-height: 0;
            }

            .cke_resizer:after {
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
            }

            .cke_right_resizer {
                bottom: -5px;
                right: -15px;
                cursor: se-resize;
            }

            .cke_right_resizer:after {
                border-right: 2px solid rgba(0, 0, 0, 0.8);
                border-bottom: 2px solid rgba(0, 0, 0, 0.8);
            }

            .cke_left_resizer {
                left: -2px;
                bottom: -5px;
                cursor: sw-resize;
            }

            .cke_left_resizer:after {
                border-left: 2px solid rgba(0, 0, 0, 0.8);
                border-bottom: 2px solid rgba(0, 0, 0, 0.8);
            }
        `);
    },
    init: function(editor) {
        CKEDITOR.dialog.add('template', this.path + 'dialogs/template.js' );
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
            dialog: 'template',
            init: function() {
                setupResizer(this);

                let width = this.element.getAttribute('width');

                if(width) {
                    this.setData('width', width);
                }

				if ( this.element.hasClass( 'align-left' ) )
                    this.setData( 'align', 'left' );
                if ( this.element.hasClass( 'align-right' ) )
                    this.setData( 'align', 'right' );
                if ( this.element.hasClass( 'align-center' ) )
                    this.setData( 'align', 'center' );
            },
            data: function() {
                const wrapperWidth = editor.document.getBody().$.clientWidth;

                if (!this.data.width) {
                    this.wrapper.removeStyle( 'width' );
                }else if(this.data.width.toString().endsWith('%')){
                    this.wrapper.setStyle('width', this.data.width);
                }else {
                    this.wrapper.setStyle( 'width', (Math.min(this.data.width / wrapperWidth, 1) * 100).toFixed(3) + '%' );
                }

                if(typeof this.data.transform !== 'undefined') {
                    this.wrapper.setStyle('transform', 'translateX('+  this.data.transform + 'px)');
                }

                this.element.removeClass('align-left');
                this.element.removeClass('align-right');
				this.element.removeClass('align-center');
                this.wrapper.removeClass('align-left');
				this.wrapper.removeClass('align-right');
				this.wrapper.removeClass('align-center');
				if ( this.data.align )
					this.wrapper.addClass( 'align-' + this.data.align );
            }
        });

        editor.on('paste', function(evt) {
            let widgetData = evt.data.dataTransfer.getData('widgetData');
            if (!widgetData) {
                return;
            }

            evt.data.dataValue = widgetData;
        });
    }
});