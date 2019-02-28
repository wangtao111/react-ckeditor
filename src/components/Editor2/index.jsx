import React from 'react';
import CKEditor from 'ckeditor4-react';
import CommandPopup from '../../components/CommandPopup';
import Highcharts from 'highcharts';
import { inject, observer } from 'mobx-react';
import eventEmitter from '../../event';

const PLACEHOLDERS = [{
    id: 1,
    name: 'address',
    title: 'Address',
    description: 'Customer Support correspondence address.'
  },
  {
    id: 2,
    name: 'assignee',
    title: 'Assignee Name',
    description: 'Ticket assignee name.'
  },
  {
    id: 3,
    name: 'deadline',
    title: 'Deadline Time',
    description: 'Utmost time to which technician should handle the issue.'
  },
  {
    id: 4,
    name: 'department',
    title: 'Department Name',
    description: 'Department name responsible for servicing this ticket.'
  },
  {
    id: 5,
    name: 'caseid',
    title: 'Case ID',
    description: 'Unique case number used to distinguish tickets.'
  },
  {
    id: 6,
    name: 'casename',
    title: 'Case Name',
    description: 'Name of the ticket provided by the user.'
  },
  {
    id: 7,
    name: 'contact',
    title: 'Contact E-mail',
    description: 'Customer Support contact e-mail address.'
  },
  {
    id: 8,
    name: 'customer',
    title: 'Customer Name',
    description: 'Receipent of your response.'
  },
  {
    id: 9,
    name: 'hotline',
    title: 'Hotline Number',
    description: 'Customer Support Hotline number.'
  },
  {
    id: 10,
    name: 'technician',
    title: 'Technician Name',
    description: 'Technician which will handle this ticket.'
  }
];

const MENTIONS = [
  {
    id: 1,
    title: '中国移动',
    detail: `<div>
    <strong style="color: #417CD5;">中国平安(601318)</strong> 
    <p>
      2018年中报点评：新业务价值转正中国平安(601318) 集团净利润在市场环境承压背景下仍高速增长（寿险准备金补提影响出清），NBV 增速在销售环境承压背景下仍强势转正，基本面显著优于同业，未来代理人优势将持续保障公司利润及 EV 稳健增长，科技板块迈入盈利周期将利于提升集团整体估值。
    </p>
    </div>`
  },
  {
    id: 2,
    title: '中国平安',
    detail: '平安'
  },
  {
    id: 3,
    title: '中国联通',
    detail: '联通'
  },
  {
    id: 4,
    title: '中国银行',
    detail: '银行'
  },
  {
    id: 5,
    title: '中国人寿',
    detail: '人寿'
  }
]

@inject('editorStore')
@observer
export default class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '<p>Hello from CKEditor 4!</p>'
        }

        this.editorRef = React.createRef();
        this.onEditorChange = this.onEditorChange.bind(this);
    }

    onEditorChange(evt) {
        this.setState( {
            data: evt.editor.getData()
        });
    }

    instanceReady = () => {
        const editor = this.editorRef.current.editor;
        this.props.editorStore.setEditor(editor);
        window.CKEDITOR.plugins.addExternal('noteTemplates', 'http://localhost:5500/build/static/ckeditor/plugins/notetemplates/', 'plugin.js');

        const itemTemplate = '<li data-id="{id}"><div><strong class="item-title">{title}</strong></div></li>';
        const outputTemplate = '{detail}<span>&nbsp;</span>';

        const autocomplete = new window.CKEDITOR
            .plugins
            .autocomplete(editor, {
                textTestCallback: this.textTestCallback,
                dataCallback: this.dataCallback,
                itemTemplate: itemTemplate,
                outputTemplate: outputTemplate
            });

        // Override default getHtmlToInsert to enable rich content output.
        autocomplete.getHtmlToInsert = function (item) {
            return this
                .outputTemplate
                .output(item);
        }

        editor.execCommand('noteTemplates');
    }

    componentDidMount() {
        // 插入图表
        eventEmitter.on('EDITOR_INSERT_CHART', (chartId) => {
            const editor = this.editorRef.current.editor;
            editor.execCommand('insertchart');
            const chartOption = this.props.editorStore.chartDataObj[chartId];
            editor.widgets.instances[1].setData('chartOption', chartOption);
        });

        // 插入表格
        eventEmitter.on('EDITOR_INSERT_TABLE', (tableConfig) => {
            const editor = this.editorRef.current.editor;
            editor.execCommand('inserttable');
            const widgetInstances = editor.widgets.instances;

            if(widgetInstances) {
                for(let key in widgetInstances) {
                    if(widgetInstances.hasOwnProperty(key)) {
                      if(widgetInstances[key].name === 'inserttable') {
                          widgetInstances[key].setData('tableConfig', tableConfig);
                      }
                    }
                }
            }
            
        });
        // 新建文档
        eventEmitter.on('NEW_PAGE', (type) => {
            if(!type){
                this.editorRef.current.editor.setData(' ');
                return
            }
            this.instanceReady();
        });
    }

    textTestCallback = (range) => {
        if (!range.collapsed) {
          return null;
        }
  
        return window.CKEDITOR.plugins.textMatch.match(range, this.matchCallback);
    }

    matchCallback(text, offset) {
        var pattern = /~{1}([A-z])*$/,
          match = text.slice(0, offset)
          .match(pattern);
  
        if (!match) {
          return null;
        }
  
        return {
          start: match.index,
          end: offset
        };
    }
  
    dataCallback = (matchInfo, callback) => {
        var data = MENTIONS.filter(function(item) {
          var itemName = '~' + item.title;
          return itemName.indexOf(matchInfo.query.toLowerCase()) == 0;
        });
  
        callback(data);
    }
    
    render() {
        const { data } = this.state;
        const config = {
            extraPlugins: 'autocomplete,textmatch,noteTemplates,insertchart,inserttable,easyimage,tableresizerowandcolumn',
            allowedContent: true,
            height: 800,
            toolbarGroups: [
              { name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
              { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
              { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
              { name: 'forms', groups: [ 'forms' ] },
              { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
              { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
              { name: 'links', groups: [ 'links' ] },
              { name: 'insert', groups: [ 'insert' ] },
              { name: 'styles', groups: [ 'styles' ] },
              { name: 'colors', groups: [ 'colors' ] },
              { name: 'tools', groups: [ 'tools' ] },
              { name: 'others', groups: [ 'others' ] },
              { name: 'about', groups: [ 'about' ] }
            ],
            removeButtons: 'Source,Templates,Chart,Flash,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Language,CreateDiv,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Scayt,Print,SelectAll,BidiRtl,BidiLtr',
            // font_names: `
            //             Arial/Arial, Helvetica, sans-serif;
            //             Comic Sans MS/Comic Sans MS, cursive;
            //             Courier New/Courier New, Courier, monospace;
            //             Georgia/Georgia, serif;
            //             Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;
            //             Tahoma/Tahoma, Geneva, sans-serif;
            //             Times New Roman/Times New Roman, Times, serif;
            //             Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;
            //             Verdana/Verdana, Geneva, sans-seri;
            //             `
        };

        CKEditor.editorUrl = 'http://localhost:5500/build/static/ckeditor/ckeditor.js';
        return <div>
             <CKEditor
                ref={ this.editorRef }
                data={ data }
                config={ config }
                onChange={ this.onEditorChange }
                // onInstanceReady={ this.instanceReady }
             />
                <CommandPopup></CommandPopup>
        </div>
    }
}