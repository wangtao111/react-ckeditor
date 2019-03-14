import React from 'react';
import CKEditor from 'ckeditor4-react';
import FullScreen from '../../components/FullScreen';
import ShareModal from './shareModal';
import Comment from './comment';
import {inject, observer} from 'mobx-react';
import eventEmitter from '../../event';
import styled from 'styled-components';
import insertTable from '../../widgets/insertTable';
import insertTable1 from '../../widgets/insertTable1';
import insertChart from '../../widgets/insertChart';
import Highcharts from 'highcharts';

const MENTIONS = [
    {
        id: 1,
        title: '中国移动',
        detail: '<div commandTag="show_type"><strong style="color: #417CD5;">中国移动(601314)</strong><span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 2,
        title: '中国平安',
        detail: `<div commandTag="show_type"><strong style="color: #417CD5;">中国平安(601318)</strong><span style="display: inline-block;width:5px;"> </span></div>`
    },
    {
        id: 3,
        title: '中国联通',
        detail: '<div commandTag="show_type"><strong style="color: #417CD5;">中国联通(601384)</strong><span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 4,
        title: '中国银行',
        detail: '<div commandTag="show_type"><strong style="color: #417CD5;">中国银行(681384)</strong><span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 5,
        title: '中国人寿',
        detail: '<div><strong style="color: #417CD5;">中国人寿(681984)</strong><span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 6,
        title: '归母净利润',
        detail: '<div><strong style="color: #417CD5;border: 1px dashed #999">归母净利润[Q1Q2]587,415,463,762.1</strong> <span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 7,
        title: '归母公司净利润',
        detail: '<div><strong style="color: #417CD5;border: 1px dashed #999">归母公司净利润[Q1Q2]587,415,463,762.1</strong> <span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 8,
        title: '归母净利为正',
        detail: '<div><strong style="color: #417CD5;">归母净利为正[Q1Q2]</strong> <span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 9,
        title: '归母净利为负',
        detail: '<div><strong style="color: #417CD5;">归母净利为负[Q1Q2]</strong> <span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 10,
        title: '归属于上市公司股东净利润',
        detail: '<div><strong style="color: #417CD5;">归属于上市公司股东净利润[Q1Q2]</strong> <span style="display: inline-block;width:5px;"> </span></div>'
    },
    {
        id: 11,
        title: '利润表',
        detail: '<div><table contenteditable="false" style="border: 1px dashed #4A90E2">' +
                '<tr style="line-height: 30px"><td style="padding: 5px;">asdasd</td><td style="padding: 5px;">asdasdasd</td></tr>' +
            '</table><p></p></div>'
    }
];
let doing = false;
const EditorTemplate = styled.div`
    .title_input{
        flex: 1;
        font-size: 22px;
        line-height: 60px;
        color: #666;
        border: none;
        outline: none;
        padding: 0 10px;
    }
    .tools{
        float: left;
        min-width: 270px;
       >li{
            float: left;
            margin-right: 30px;
            line-height: 60px;
            cursor: pointer
       }
    }
    #fullScreenBtn>ul{
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: url(${require('../../img/cursor.png')}), auto;
        background: #a7a7a7;
        >li{
            width: 48px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            color: #fff;
            &:hover{
                background: #777777
            }
        }
    }
`;

@inject('editorStore')
@observer
export default class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            title: '',
            tools: [
                {title: '分享', img: require('../../img/share.png')},
                {title: '演示模式', img: require('../../img/demo.png')},
                {title: '评论', img: require('../../img/comment.png')},
                {title: '标签', img: require('../../img/tag.png')},
                {title: '更多', img: require('../../img/more.png')},
                {title: '文件信息', img: require('../../img/info.png')},
            ],
            visible: false,
            templateHtml: `<div>
                    <div class="select1">
                        <select style="-webkit-appearance: menulist" onmousedown="javascript:return true;">
                            <option value="头部" selected="selected">头部</option>
                        </select>
                    </div>
                    <div style="border: 1px dashed #98BCFF;overflow: hidden" class="content1">
                        <img src=${require('../../img/temp_title.png')} alt="" style="float: left; width: 130px;height: 60px;margin-left: 20px">
                        <div style="float: right;margin-right: 20px;margin-top: 10px">
                            <div style="font-size: 20px">晨会纪要</div>
                            <p style="margin: 0"><span>2018年9月6日</span></p>
                        </div>
                        <div style="float: left;width: 100%; border-bottom: 3px solid #666;margin-bottom: 5px;"></div>
                    </div>
                    <div class="select1">
                        <select style="-webkit-appearance: menulist">
                            <option value="头部">头部</option>
                        </select>
                        <div style="border: 1px dashed #98BCFF;overflow: hidden" class="summary-title">
                            <h1>晨会纪要标题</h1>
                        </div>
                </div>

                <div class="select1">
                    <select style="-webkit-appearance: menulist">
                        <option value="头部">头部</option>
                        <option value="标题">标题</option>
                        <option value="摘要">摘要</option>
                        <option value="声明">声明</option>
                        <option value="栏目" selected="selected">栏目</option>
                        <option value="公司股票">公司股票</option>
                        <option value="结束语">结束语</option>
                        <option value="尾部">尾部</option>
                    </select>

                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <h2 class="section-title">特别声明</h2>
                        <div class="divider-line"></div>
                        <div style="margin: 15px;" class="editable-content content2">
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="select1">
                    <select style="-webkit-appearance: menulist">
                        <option value="头部">头部</option>
                        <option value="标题">标题</option>
                        <option value="摘要">摘要</option>
                        <option value="声明">声明</option>
                        <option value="栏目" selected="selected">栏目</option>
                        <option value="公司股票">公司股票</option>
                        <option value="结束语">结束语</option>
                        <option value="尾部">尾部</option>
                    </select>

                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <h2 class="section-title">个股点评及推荐</h2>
                        <div class="divider-line"></div>
                        <div style="margin: 15px;" class="editable-content content3">
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="select1">
                    <select style="-webkit-appearance: menulist">
                        <option value="尾部">尾部</option>
                    </select>
                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <div style="margin: 15px;" class="editable-content content4">
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="select1">
                    <select style="-webkit-appearance: menulist">
                        <option value="尾部">尾部</option>
                    </select>

                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <h2 class="section-title">早报快讯</h2>
                        <div class="divider-line"></div>
                        <div style="margin: 15px;" class="editable-content content5">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>`
        }

        this.editorRef = React.createRef();
        this.shareModalRef = null;
        this.commentRef = null;
        this.autocomplete = null;
        this.onEditorChange = this.onEditorChange.bind(this);
    }

    componentDidMount() {
        this.addEventEmitter();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                data: this.props.value
            })
        }
    }

    addEventEmitter = () => {
        // 插入图表
        eventEmitter.on('EDITOR_INSERT_CHART', (chartId) => {
            const editor = this.editorRef.current.editor;
            const chartTime = new Date().getTime();

            insertChart(`${ chartTime }`, editor);

            const chartOption = this.props.editorStore.chartDataObj[chartId];
            const widgetInstances = editor.widgets.instances;

            editor.execCommand(`insertchart-widget${ chartTime }`);
            if (widgetInstances) {
                for (let key in widgetInstances) {
                    if (widgetInstances.hasOwnProperty(key)) {
                        if (widgetInstances[key].name === `insertchart-widget${ chartTime }`) {
                            editor.widgets.instances[key].setData('chartOption', chartOption, Highcharts);
                        }
                    }
                }
            }
        });

        // 插入表格
        eventEmitter.on('EDITOR_INSERT_TABLE', (tableConfig) => {
            // 调用插入表格的widget
            const editor = this.editorRef.current.editor;
            const tableTime = new Date().getTime();
            insertTable(`${ tableTime }`, editor);

            const widgetInstances = editor.widgets.instances;
            editor.execCommand(`inserttable-widget${ tableTime }`);

            if (widgetInstances) {
                for (let key in widgetInstances) {
                    if (widgetInstances.hasOwnProperty(key)) {
                        if (widgetInstances[key].name === `inserttable-widget${ tableTime }`) {
                            widgetInstances[key].setData('tableConfig', tableConfig);
                        }
                    }
                }
            }
        });

        // 插入表格的HTML代码
        eventEmitter.on('EDITOR_INSERT_TABLE_CODE', (tableHtml) => {
            // 调用插入表格的widget
            const editor = this.editorRef.current.editor;
            const tableTime = new Date().getTime();
            insertTable1(`${ tableTime }`, editor);

            const widgetInstances = editor.widgets.instances;
            editor.execCommand(`inserttable-widget${ tableTime }`);

            if (widgetInstances) {
                for (let key in widgetInstances) {
                    if (widgetInstances.hasOwnProperty(key)) {
                        if (widgetInstances[key].name === `inserttable-widget${ tableTime }`) {
                            widgetInstances[key].setData('tableHtml', tableHtml);
                        }
                    }
                }
            }
        })

        // 新建文档
        eventEmitter.on('NEW_PAGE', (type) => {
            this.editorRef.current.editor.setData(' ');
            this.setState({title: ''});
            if (!type) {
                return
            }
            setTimeout(() => {
                this.setTemplate();
                this.setState({title: '晨会纪要模板'});
            }, 100)
        });
        // 浏览文章
        eventEmitter.on('SKIM_ARTICLE', (data) => {
            this.editorRef.current.editor.setData(data.content);
            this.setState({title: data.title})
        });
    }
    afterEnter = () => {
        const editor = this.editorRef.current.editor;
        editor.setReadOnly(true);
    }
    afterExit = () => {
        const editor = this.editorRef.current.editor;
        editor.setReadOnly(false);
    }

    onEditorChange(evt) {
        this.setState({
            data: evt.editor.getData()
        });
    }

    setTemplate = () => {
        const editor = this.editorRef.current.editor;
        this.props.editorStore.setEditor(editor);
        editor.widgets.add('notetemplates', {
            template: this.state.templateHtml,
            editables: {
                summaryTitle: {
                    selector: '.summary-title'
                },
                content1: {
                    selector: '.content1'
                },
                content2: {
                    selector: '.content2'
                },
                content3: {
                    selector: '.content3'
                },
                content4: {
                    selector: '.content4'
                },
                content5: {
                    selector: '.content5'
                }
            },
            // allowedContent: 'div(!template-box); div(!template-box-content); h2(!template-box-title); div(!template-section); select;option;',
            // requiredContent: 'div(template-box)',
            // upcast: function( element ) {
            //     return element.name == 'div' && element.hasClass( 'template-box' );
            // }
        })
        editor.execCommand('notetemplates');
    }

    instanceReady = () => {
        
        const editor = this.editorRef.current.editor;
        const itemTemplate = '<li data-id="{id}"><div><strong class="item-title">{title}</strong></div></li>';
        const outputTemplate = '{detail}';
        this.autocomplete = new window.CKEDITOR
            .plugins
            .autocomplete(editor, {
                textTestCallback: this.textTestCallback,
                dataCallback: this.dataCallback,
                itemTemplate: itemTemplate,
                outputTemplate: outputTemplate
            });
        this.autocomplete.getHtmlToInsert = function (item) {
            return this
                .outputTemplate
                .output(item);
        }
        const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
        let dom = iframe.document.body;
        dom.addEventListener('compositionstart',function(e){
            doing = true;
        },false);
        dom.addEventListener('compositionend',function(e){
            doing = false;
        },false);
        dom.onclick = function (e) {
            console.log(888, e.target.getAttribute('commandTag'));
        }
    }

    textTestCallback = (range) => {
        range.startOffset = 0;
        if (!range.collapsed) {
            return null;
        }
        const editor = this.editorRef.current.editor;
        return window.CKEDITOR.plugins.textMatch.match(range, (text, offset) => {
            let match = text.match(/~\.([a-zA-Z0-9_\u4e00-\u9fa5])*$/);
            if(!doing && match && (match.index || match.index === 0)) {
                const txt = text.toLowerCase().split('~.');
                let data = MENTIONS.filter(function (item) {
                    if(!txt[txt.length - 1]) {
                        return null;
                    }
                    return item.title.indexOf(txt[txt.length - 1]) !== -1;
                });
                // this.autocomplete.view.itemTemplate.source = '<li data-id="{id}"><div><strong class="item-title">{title}sssss</strong></div></li>';
                // console.log(22, match, data, range.startOffset, range.endOffset, text, offset)
                if (!data.length) {
                    if(txt[txt.length - 1].indexOf('归母') !== -1 || txt[txt.length - 1].indexOf('中国') !== -1) {
                        range.startOffset = match.index + 2;
                        editor.getSelection().selectRanges( [ range ] );
                        // editor.insertHtml( `<span style="color: red; text-decoration: underline">${txt[txt.length - 1]}</span>` );
                        return {
                            start: match ? match.index : 0,
                            end: range.endOffset
                        };
                    }
                } else {
                    return {
                        start: match ? match.index : 0,
                        end: range.endOffset
                    };
                }
            }
            return null;
        });
    }

    dataCallback = (matchInfo, callback) => {
        const data = MENTIONS.filter(function (item) {
            const txt = matchInfo.query.toLowerCase().split('~.');
            let test = txt[txt.length - 1];
            if(!txt[txt.length - 1]) {
                return null;
            }
            if(test.indexOf('归母') !== -1) {
                test = '归母';
            }
            if(test.indexOf('中国') !== -1) {
                test = '中国';
            }
            return item.title.indexOf(test) !== -1;
        });
        callback(data);
    }

    titleChange = (val) => {
        this.setState({title: val.target.value});
    }

    toolBarCharge = (li) => {
        switch (li.title) {
            case '分享':
                this.shareModalRef.showModal();
                break;
            case '演示模式':
                this.setState({visible: true});
                break;
            case '评论':
                this.commentRef.setVisible(true);
                break;
            default:
                break;
        }
    }


    render() {
        const {data, title, tools, visible} = this.state;
        const config = {
            extraPlugins: 'autocomplete,notification,textmatch,textwatcher,easyimage,tableresizerowandcolumn,save-to-pdf,quicktable',
            allowedContent: true,
            pdfHandler: 'http://www.baidu.com', // 下载pdf的地址
            height: 800,
            toolbarGroups: [
                // {name: 'clipboard', groups: ['undo']},
                // {name: 'document', groups: ['doctools']},
                {name: 'styles', groups: ['undo', 'cleanup', 'styles']},
                {name: 'colors', groups: ['colors']},
                {name: 'editing', groups: ['selection', 'spellchecker', 'editing']},
                {name: 'forms', groups: ['forms']},
                // {name: 'basicstyles', groups: ['basicstyles']},
                {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
                {name: 'links', groups: ['links']},
                {name: 'insert', groups: ['insert']},
                // {name: 'tools', groups: ['tools']},
                {name: 'others', groups: ['others']},
                {name: 'about', groups: ['about']}
            ],
            removeButtons: 'PasteFromWord,Paste,Resize,AutoSave,Clipboard,Smiley,ColorButton, Source,Templates,Chart,Source,Flash,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Language,CreateDiv,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Scayt,SelectAll,BidiRtl,BidiLtr',
            qtCellPadding: '0',
            qtCellSpacing: '0',
            qtClass: 'editor-table-widget',
            qtStyle: 'border: 1px solid #a7a7a7;',
            contentsCss: ['http://localhost:5500/build/static/ckeditor/contents.css', 'http://localhost:5500/build/static/ckeditor/external.css' ]
        };

        const EDITOR_DEV_URL = 'http://localhost:5500/build/static/ckeditor/ckeditor.js';
        const EDITOR_PRO_URL = `${window.origin}/static/ckeditor/ckeditor.js`;

        CKEditor.editorUrl = process.env.NODE_ENV === 'development' ? EDITOR_DEV_URL : EDITOR_PRO_URL;
        return <EditorTemplate>
            <div style={{display: 'flex', marginBottom: '2px'}}>
                <input className='title_input' type='textarea' value={title} onChange={this.titleChange}/>
                <ul className='tools'>
                    {
                        tools.map((li, index) => {
                            return <li key={index} onClick={() => this.toolBarCharge(li)}><img src={li.img}
                                                                                               alt={li.title}
                                                                                               title={li.title}/></li>
                        })
                    }
                </ul>
            </div>
            <FullScreen editorRef={ this.editorRef.current } visible={visible} fullScreenId={'cke_1_contents'} exit={() => this.setState({visible: false})}
                        afterEnter={this.afterEnter} afterExit={this.afterExit}>
                <CKEditor
                    ref={this.editorRef}
                    data={data}
                    config={config}
                    style={{border: 'none'}}
                    onChange={this.onEditorChange}
                    onInstanceReady={this.instanceReady}
                />
            </FullScreen>
            {/*分享弹窗*/}
            <ShareModal onRef={(ref) => this.shareModalRef = ref}></ShareModal>
            <Comment onRef={(ref) => this.commentRef = ref}></Comment>

        </EditorTemplate>
    }
}
