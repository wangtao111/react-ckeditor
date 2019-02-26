import React from 'react';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/zh_cn';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import 'at.js/dist/css/jquery.atwho.css';
import 'at.js/dist/js/jquery.atwho';
import { TemplateHtmlStr } from '../../config/templateConfig';
export default class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model: TemplateHtmlStr[3]
        };
        
        this.handleModelChange = this.handleModelChange.bind(this);
    }

    handleModelChange(model) {
        this.setState({
           model
        });
    }

    initInputMentions(e, editor) {
        const $ = window.$;

        // Define data source for At.JS.
        var datasource = ["Jacob", "Isabella", "Ethan", "Emma", "Michael", "Olivia" ];

        // Build data to be used in At.JS config.
        var names = $.map(datasource, function (value, i) {
            return {
                'id': i, 'name': value, 'email': value + "@email.com"
            };
        });

        // Define config for At.JS.
        var config = {
            at: "#",
            data: names,
            displayTpl: '<li>${name} <small>${email}</small></li>',
            limit: 200
        }
        editor.$el.atwho(config);

        editor.events.on('keydown', function (e) {
            if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
                return false;
            }
        }, true);
    }

    render() {
        const config = {
            placeholderText: 'Edit Your Content Here!',
            charCounterCount: false,
            language: 'zh_cn',
            events: {
                'froalaEditor.initialized': this.initInputMentions
            }
        }
        return <div className="editor">
            <FroalaEditor
                tag='textarea'
                config={ config }
                model={ this.state.model }
                onModelChange={this.handleModelChange} />
        </div>
    }
}