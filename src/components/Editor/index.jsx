import React from 'react';
import ReactDOM from 'react-dom';
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

const temp = [
    {
        id: 1,
        title: '头部',
        detail: '<div><div style="border: 1px dashed #98BCFF; width: 100%; min-height: 100px; position: relative;margin-top: 30px;padding: 10px">' +
                '<span contenteditable="false" style="position: absolute; top: -19px; left: -1px;background: #D8E9F6;color: #98BCFF; padding: 0 15px; border: 1px solid #98BCFF; border-bottom: none; border-radius: 4px; font-size: 10px">头部</span>' +
                '<span>&nbsp;</span>' +
            '</div></div>'
    },
    {
        id: 2,
        title: '标题',
        detail: '<div><div style="border: 1px dashed #98BCFF; width: 100%; height: 100px; position: relative;margin-top: 30px;padding: 10px">' +
            '<span contenteditable="false" style="position: absolute; top: -19px; left: -1px;background: #D8E9F6;color: #98BCFF; padding: 0 15px; border: 1px solid #98BCFF; border-bottom: none; border-radius: 4px; font-size: 10px">标题</span>' +
            '<span>&nbsp;</span>' +
            '</div></div>'
    },
];
const tables = [
    {
        id: 6,
        title: '归母净利润',
        detail: '归母净利润[Q1Q2]587,415,463,762.1'
    },
    {
        id: 8,
        title: '归母净利为正',
        detail: '归母净利为正[Q1Q2]'
    },
    {
        id: 9,
        title: '归母净利为负',
        detail: '归母净利为负[Q1Q2]'
    },
    {
        id: 10,
        title: '归属于上市公司股东净利润',
        detail: '归属于上市公司股东净利润[Q1Q2]'
    },
    {
        id: 11,
        title: '利润表',
        detail: '利润表'
    },
]
const MENTIONS = [
    {
        id: 1,
        title: '中国移动',
        detail: '中国移动(601314)'
    },
    {
        id: 2,
        title: '中国平安',
        detail: `中国平安(601318)`
    },
    {
        id: 3,
        title: '中国联通',
        detail: '中国联通(601384)'
    },
    {
        id: 4,
        title: '中国银行',
        detail: '中国银行(681384)'
    },
    {
        id: 12,
        title: '宏测试',
        detail: '<div style="border: 1px solid #999;">宏测试<i style="color: #959FB1;">a</i></div>'
    }
];

// 纠错信息
const RECTIFY_MENTION = {
    status: 0,          // 1 为正确, 0 为错误
    mentions: [
        {
            title: '归母净利润'
        },
        {
            title: '归母公司净利润'
        },
        {
            title: '归母净利为正'
        },
        {
            title: '归母净利为负'
        },
        {
            title: '归属于上市公司股东净利润'
        }
    ]
}
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
    .tool_item {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-size: 100%;
    }
    .tools{
        float: left;
        min-width: 270px;
       >li{
            float: left;
            margin-right: 30px;
            line-height: 60px;
            cursor: pointer;
            >span{
            }
            &:nth-child(1){
               >span{
                    background: url(${require('../../img/share.png')}) no-repeat;
                    &:hover{
                        background: url(${require('../../img/share1.png')}) no-repeat;
                    }
                }
            }
            &:nth-child(2){
               >span{
                    background: url(${require('../../img/comment.png')}) no-repeat;
                    &:hover{
                        background: url(${require('../../img/comment1.png')}) no-repeat;
                    }
                }
            }
             &:nth-child(3){
               >span{
                    background: url(${require('../../img/demo.png')}) no-repeat;
                    &:hover{
                        background: url(${require('../../img/demo1.png')}) no-repeat;
                    }
                }
            }
             &:nth-child(4){
               >span{
                    background: url(${require('../../img/tag.png')}) no-repeat;
                    &:hover{
                        background: url(${require('../../img/tag1.png')}) no-repeat;
                    }
                }
            }
             &:nth-child(4){
               >span{
                    background: url(${require('../../img/more.png')}) no-repeat;
                    &:hover{
                        background: url(${require('../../img/more1.png')}) no-repeat;
                    }
                }
            }
             &:nth-child(5){
               >span{
                    background: url(${require('../../img/info.png')}) no-repeat;
                }
            }
       }
    }
    #command_tag_pane{
        display: none;
        position: absolute;
        border: 1px solid #ddd;
        border-radius: 2px;
        background: #fff;
        font-size: 12px;
        >ul>li{
            padding: 3px 20px;
            cursor: pointer;
            &:hover{
                background: #dbe9f9;
                color: #82abe5;
            }
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
@inject('drawerStore')
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
            command: false,
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
        this.document = document;
        this.callbackData = [];
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
            this.setState({title: '', data: ''});
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
            this.setState({data: data.content, title: data.title})
            setTimeout(() => {
                this.setEditorIframe();
            }, 100)
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
        this.setEditorIframe();
    }

    setEditorIframe = () => {
        const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
        let dom = iframe.document;
        dom.addEventListener('compositionstart',function(e){
            doing = true;
        },false);
        dom.addEventListener('compositionend',function(e){
            doing = false;
        },false);
        document.onclick = function(e) {
            document.getElementById('command_tag_pane').style.display = 'none';
        }
        dom.onclick = (e) => {
            const tag = e.target.getAttribute('commandTag');
            document.getElementById('command_tag_pane').style.display = 'none';
            if(tag === 'show_type') {
                const document = this.document;
                const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                const offset = this.getPoint(document.getElementById('cke_1_contents'));
                const x = e.pageX || e.clientX + scrollX ;
                const y = e.pageY || e.clientY + scrollY ;
                const el = document.getElementById('command_tag_pane');
                el.style.display = 'block';
                el.style.left = x + offset.x + 'px';
                el.style.top = y + offset.y + 20 +'px';
                document.getElementById('command_tag_pane').style.display = 'block';
            }
        }
    }
    getPoint = (obj) => {
        let t = obj.offsetTop;
        let l = obj.offsetLeft;
        while (obj = obj.offsetParent) {
            t += obj.offsetTop;
            l += obj.offsetLeft;
        }
        return {x: l, y: t}
    }

    // 创建动态菜单节点
    createDropMenu(posX, posY, selectCallback) {
        var divEle = document.createElement('div');
        divEle.setAttribute('id', 'dropdownMenu');
        divEle.setAttribute('style', `position: absolute; left: ${posX}px; top: ${ posY + 15 }px`);

        window.document.body.appendChild(divEle);

        ReactDOM.render(<ul>
            <li onClick={ () => selectCallback('哈哈金融云笔记') }>哈哈金融云笔记</li>
            <li onClick={ () => selectCallback('哈哈笔记') }>哈哈笔记</li>
            <li onClick={ () => selectCallback('哈哈记') }>哈哈记</li>
        </ul>, document.getElementById('dropdownMenu'));
    }

    // 替换文字
    replaceText = (range) => {
        return (value) => {
            const dropDownMenu = document.getElementById('dropdownMenu');
            dropDownMenu.parentNode.removeChild(dropDownMenu);

            const editor = this.editorRef.current.editor;

            if(editor) {
                // range.deleteContents();
            }
        }
    }

    textTestCallback = (range) => {
        if (!range.collapsed) {
            return null;
        }

        // const editor = this.editorRef.current.editor;
        // const text = range.startContainer.$.data;

        // if(text === '~哈哈') {
        //     range.setStart(range.startContainer, 0);
        //     editor.getSelection().selectRanges([ range ]);
        //     editor.document.$.execCommand('delete');
            
        //     editor.insertHtml(`<span class="text-hover">${ text }<i class="arrow-down" id="arrowDownHover">${ window.CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE}</i></span>`);

        //     editor.document.getById('arrowDownHover').on('click', (e) => {
        //         const { pageX, pageY } = e.data.$;
        //         const clientRect = document.getElementsByTagName("iframe")[0].getBoundingClientRect();

        //         if(clientRect) {
        //             const { left, top } = clientRect;
        //             this.createDropMenu(left + pageX, top + pageY, this.replaceText() );
        //         }
        //     });
        // }

        return window.CKEDITOR.plugins.textMatch.match(range, (txt, offset) => {
            let text = JSON.parse(JSON.stringify(txt));
            let index = text.lastIndexOf('~');

            if(!doing && index !== -1) {
                const matchArr = text.split('~');
                const matchText = matchArr[matchArr.length - 1]
                eventEmitter.emit('COMMAND_POPUP', '~' + matchText);
                this.command = true;
                if(!matchArr[matchArr.length - 1]) {
                    this.callbackData = temp;
                    return {
                        start: index,
                        end: range.endOffset
                    };
                } else {
                    const arr = matchText.split('.');
                    if(arr.length === 1){
                        let data = MENTIONS.filter(function (item) {
                            return item.title.indexOf(matchText) !== -1;
                        });
                        this.callbackData = data;
                        return {
                            start: index + 1,
                            end: range.endOffset
                        };
                    } else {
                        const lastText = arr[arr.length - 1];
                        const lastIndex = text.lastIndexOf('.');
                        let data = tables.filter(function (item) {
                            return item.title.indexOf(lastText) !== -1;
                        });
                        this.callbackData = data;
                        return {
                            start: lastIndex + 1,
                            end: text.length
                        };
                    }
                }
                // this.autocomplete.view.itemTemplate.source = '<li data-id="{id}"><div><strong class="item-title">{title}sssss</strong></div></li>';
                // console.log(22, match, range.startOffset, range.endOffset, text, offset)
                // editor.getSelection().selectRanges( [ range ] );
                // editor.insertHtml( `<span id="temporary">${'~' + matchArr[matchArr.length - 1]}</span>` );
            }
            return null;
        });
    }

    // textTestCallback = (range) => {
    //     if (!range.collapsed) {
    //         return null;
    //     }

    //     // 如果是归母晶
    //     return window.CKEDITOR.plugins.textMatch.match(range, (text, offset) => {

    //         if(!text || text === '') return null;

    //         if(text !== '~.归母晶') {
    //             return this.matchCallback(text, offset);
    //         }else {
    //             // 错误
    //             if(RECTIFY_MENTION.status === 0) {
    //                 const editor = this.editorRef.current.editor;
    //                 const selection = editor.getSelection();
    //                 // 下划线
    //                 range.setStart(range.startContainer, 2);
    //                 selection.selectRanges([range]);
    //                 editor.document.$.execCommand('delete');

    //                 const newRange = selection.getRanges()[0];
    //                 const textNode = new window.CKEDITOR.dom.element('span');
    //                 textNode.setStyle('border-bottom', '1px dashed #CE5542');
    //                 textNode.appendText('归母晶');

    //                 newRange.insertNode(textNode);
    //                 newRange.moveToPosition(textNode, window.CKEDITOR.POSITION_AFTER_END);
    //                 newRange.select();
    //                 // debugger;
    //                 // newRange.setStart(newRange.startContainer, 0);
    //                 // newRange.setEnd(newRange.endContainer, 5);
    //                 // debugger;
    //                 // newRange.collapse();
    //                 // range = newRange;   

    //                 // this.matchCallback(newRange.endContainer.$.innerText, newRange.endOffset);
    //                 return { 
    //                     start: 0,
    //                     end: 2
    //                 }
    //             }
    //         }
    //     });
    // }

    matchCallback(text, offset) {
        const editor = this.editorRef.current.editor;
        const match = text.slice(0, offset)
                .match(/~([a-zA-Z0-9_\u4e00-\u9fa5])*$/);
        const data = MENTIONS.filter(function (item) {
            const txt = text.toLowerCase().split('~.');
            if(!txt[txt.length - 1]) {
                return null;
            }
            return item.title.indexOf(txt[txt.length - 1]) !== -1;
        });
        if (!data.length) {
            return null;
        }
        return {
            start: match ? match.index : 0,
            end: offset
        };
    }

    dataCallback = (matchInfo, callback) => {
        callback(this.callbackData);
        // callback(RECTIFY_MENTION.mentions);
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
        const contentCss = process.env.NODE_ENV === 'production' ? [`${window.origin}/static/ckeditor/contents.css`, `${window.origin}/static/ckeditor/external.css`] : ['http://localhost:5500/build/static/ckeditor/contents.css', 'http://localhost:5500/build/static/ckeditor/external.css' ];

        const config = {
            extraPlugins: 'autocomplete,notification,textmatch,textwatcher,easyimage,tableresizerowandcolumn,save-to-pdf,quicktable',
            allowedContent: true,
            pdfHandler: 'http://www.baidu.com', // 下载pdf的地址
            height: 800,
            toolbarGroups: [
                // {name: 'clipboard', groups: ['undo']},
                // {name: 'document', groups: ['doctools']},
                {name: 'styles', groups: ['undo', 'cleanup', 'styles']},
                {name: 'basicstyles', groups: ['basicstyles']},
                {name: 'colors', groups: ['colors']},
                {name: 'editing', groups: ['selection', 'spellchecker', 'editing']},
                {name: 'forms', groups: ['forms']},
                {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
                {name: 'links', groups: ['links']},
                {name: 'insert', groups: ['insert']},
                // {name: 'tools', groups: ['tools']},
                {name: 'others', groups: ['others']},
                {name: 'about', groups: ['about']}
            ],
            removeButtons: 'PasteFromWord,Paste,Resize,AutoSave,Clipboard,Smiley,ColorButton, Source,Templates,Chart,Source,Flash,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Language,CreateDiv,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Scayt,SelectAll,BidiRtl,BidiLtr,Superscript,Subscript,Styles',
            qtCellPadding: '0',
            qtCellSpacing: '0',
            qtClass: 'editor-table-widget',
            qtStyle: 'border: 1px solid #a7a7a7;',
            contentsCss: contentCss
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
            <div id="command_tag_pane">
                <ul>
                    <li>中国平安Q1Q2归母公司净利润58,1545,4545元</li>
                    <li>中国平安Q1Q2半年归母公司净利润580.95亿元</li>
                    <li>归母净利润580.95亿元</li>
                </ul>
            </div>
        </EditorTemplate>
    }
}
