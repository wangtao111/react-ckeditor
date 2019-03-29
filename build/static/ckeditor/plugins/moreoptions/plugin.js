CKEDITOR.plugins.add('moreoptions', {
    requires: 'menubutton',
    init : function( editor ) {
		editor.ui.add('MoreOptions', CKEDITOR.UI_MENUBUTTON, {
			label: '更多',
			// MenuButtons do not (yet) has toFeature method, so we cannot do this:
			// toFeature: function( editor ) { return editor.getCommand( 'language' ); }
			// Set feature's properties directly on button.
			// allowedContent: allowedContent,
			// requiredContent: requiredContent,
			command: 'moreoptions',
			// onMenu: function() {
			// 	debugger;
			// 	var activeItems = {},
			// 		currentLanguagedElement = plugin.getCurrentLangElement( editor );

			// 	for ( var prop in items )
			// 		activeItems[ prop ] = CKEDITOR.TRISTATE_OFF;

			// 	activeItems.language_remove = currentLanguagedElement ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;

			// 	if ( currentLanguagedElement )
			// 		activeItems[ 'language_' + currentLanguagedElement.getAttribute( 'lang' ) ] = CKEDITOR.TRISTATE_ON;

			// 	return activeItems;
			// }
		} );
		
	}
});


// //  array of placeholders to choose from that'll be inserted into the editor
// var placeholders = [];
		
// // init the default config - empty placeholders
// var defaultConfig = {
// 	format: '[[%placeholder%]]',
// 	placeholders : []
// };

// // merge defaults with the passed in items		
// var config = CKEDITOR.tools.extend(defaultConfig, editor.config.placeholder_select || {}, true);

// // run through an create the set of items to use
// for (var i = 0; i < config.placeholders.length; i++) {
// 	// get our potentially custom placeholder format
// 	var placeholder = config.format.replace('%placeholder%', config.placeholders[i]);			
// 	placeholders.push([placeholder, config.placeholders[i], config.placeholders[i]]);
// }

// // add the menu to the editor
// editor.ui.addRichCombo('moreoptions',
// {
// 	label: 		'更多',
// 	title: 		'Insert placeholder',
// 	voiceLabel: 'Insert placeholder',
// 	className: 	'cke_format',
// 	multiSelect:false,
// 	panel:
// 	{
// 		css: [ editor.config.contentsCss, CKEDITOR.skin.getPath('editor') ],
// 		voiceLabel: editor.lang.panelVoiceLabel
// 	},

// 	init: function()
// 	{
// 		this.startGroup( "Insert placeholder" );
// 		for (var i in placeholders)
// 		{
// 			this.add(placeholders[i][0], placeholders[i][1], placeholders[i][2]);
// 		}
// 	},

// 	onClick: function( value )
// 	{
// 		editor.focus();
// 		editor.fire( 'saveSnapshot' );
// 		editor.insertHtml(value);
// 		editor.fire( 'saveSnapshot' );
// 	}
// });