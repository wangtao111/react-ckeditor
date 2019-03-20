CKEDITOR.plugins.add('template', {
    requires: 'widget',
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
            },
            template: `<section class="widget-component-wrapper">
                <p class="editable-content"></p>
            </section>`,
            upcast: function(element) {
                return element.name == 'section' && element.hasClass( 'widget-component-wrapper' );
            }
            
        })
    }
});