CKEDITOR.plugins.add('insertchart', {
    requires: 'widget',
    init: function(editor) {
        editor.widgets.add('insertchart', {
            template: '<div id="chartContainer" class="container"></div>',
            requireContent: 'div(container)',
            upcast: function(element) {
                return element.name === 'div' && element.hasClass('container')
            }
        });
    }
});