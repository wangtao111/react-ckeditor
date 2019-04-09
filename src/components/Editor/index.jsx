import React from 'react';
import ReactDOM from 'react-dom';
import CKEditor from 'ckeditor4-react';
import FullScreen from '../../components/FullScreen';
import Preview from '../../components/Preview';
import ShareModal from './shareModal';
import Comment from './comment';
import { inject, observer } from 'mobx-react';
import eventEmitter from '../../event';
import insertTable from '../../widgets/insertTable';
import insertTable1 from '../../widgets/insertTable1';
import insertChart from '../../widgets/insertChart';
import Highcharts from 'highcharts';
import { Template } from '../../widgets/templates';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EditorTemplate from './styled';
import { Icon, Modal } from 'antd';
import { tables, MENTIONS, commonTables} from '../../mockData/commandData';
import ChartEditor from 'abc-chart-editor';
import chartData from '../../mockData/chart';
import 'abc-chart-editor/build/lib/css/main.css';
let doing = false;

@inject('editorStore')
@inject('drawerStore')
@inject('noteStore')
@observer
export default class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            title: '',
            dropList: [
                { name: '中国平安归母公司净利润58,1545,4545元' },
                { name: '中国平安半年归母公司净利润580.95亿元' },
                { name: '归母净利润580.95亿元' }
            ],
            tools: [
                { title: '分享', img: require('../../img/share.png') },
                { title: '评论', img: require('../../img/comment.png') },
                { title: '演示模式', img: require('../../img/demo.png') },
                { title: '标签', img: require('../../img/tag.png') },
                { title: '更多', img: require('../../img/more.png') },
                { title: '文件信息', img: require('../../img/info.png') },
            ],
            moreList: [
                { name: '阅读密码' },
                { name: '查看历史版本' },
                { name: '发布到' },
                { name: '移动到' },
                { name: '导出为word' },
                { name: '导出为PDF' },
                { name: '分享统计' },
                { name: '保存为模板' },
                { name: '引用设置' },
                { name: '打印' },
                { name: '删除' }
            ],
            showMore: false,
            visible: false,
            command: false,
            chartSettingVisible: false,     // 图表配置
            layoutVisible: false,           // 布局可见
            indexConf: JSON.parse(JSON.stringify(chartData.edbIndex_format)),
            dataConf: chartData.edbChartDatas
        }

        this.editorRef = React.createRef();
        this.shareModalRef = null;
        this.commentRef = null;
        this.autocomplete = null;
        this.callbackData = [];
        this.pNode = null;
        this.tag = null;
        this.range = null;
        this.position = null;
        this.onEditorChange = this.onEditorChange.bind(this);
    }

    componentDidMount() {
        this.addEventEmitter();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                data: this.props.value,
                title: this.props.noteStore.noteList.length ? this.props.noteStore.noteList[0].title : ''
            })
        }
    }

    addEventEmitter = () => {
        // 插入图表
        eventEmitter.on('EDITOR_INSERT_CHART', (chartId) => {
            const editor = this.editorRef.current.editor;
            const chartTime = new Date().getTime();
            this.setPNodeHtml();
            insertChart(`${chartTime}`, editor, () => {
                this.setState({
                    chartSettingVisible: true
                })
            });
            const chartOption = this.props.editorStore.chartDataObj[chartId];
            const widgetInstances = editor.widgets.instances;

            editor.execCommand(`insertchart-widget${chartTime}`);
            if (widgetInstances) {
                for (let key in widgetInstances) {
                    if (widgetInstances.hasOwnProperty(key)) {
                        if (widgetInstances[key].name === `insertchart-widget${chartTime}`) {
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
            insertTable(`${tableTime}`, editor, this.pNode.innerHTML + "");
            this.setPNodeHtml();
            const widgetInstances = editor.widgets.instances;
            editor.execCommand(`inserttable-widget${tableTime}`);
            if (widgetInstances) {
                for (let key in widgetInstances) {
                    if (widgetInstances.hasOwnProperty(key)) {
                        if (widgetInstances[key].name === `inserttable-widget${tableTime}`) {
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
            this.setPNodeHtml();
            insertTable1(`${tableTime}`, editor);

            const widgetInstances = editor.widgets.instances;
            editor.execCommand(`inserttable-widget${tableTime}`);

            if (widgetInstances) {
                for (let key in widgetInstances) {
                    if (widgetInstances.hasOwnProperty(key)) {
                        if (widgetInstances[key].name === `inserttable-widget${tableTime}`) {
                            widgetInstances[key].setData('tableHtml', tableHtml);
                        }
                    }
                }
            }
        })

        // 新建文档
        eventEmitter.on('NEW_PAGE', (data) => {
            this.setState({ title: '', data: '' });
            const { name, template } = data;
            setTimeout(() => {
                this.setTemplate(template);
                this.setState({ title: name });
            }, 100)
        });
        // 浏览文章
        eventEmitter.on('SKIM_ARTICLE', (data) => {
            const valueKey = '金融';
            let arr = data.articleContent.split(valueKey);
            let content = arr.join(`<span style="color:red;">${valueKey}</span>`);
            content += `<style>
                span[name = 'select_box']:after{
                    content: url(${require('../../img/arr.png')});
                    width: 12px;
                    margin-top: 5px;
                    position: relative;
                }
                .bowen{position: relative;color: #953039;}
                    .bowen:after{
                        content: '';
                        position: absolute;
                        bottom: -2px;
                        left: 0%;
                        width: 100%;
                        height: 2px;
                        background: -webkit-linear-gradient(315deg, transparent, transparent 45%, #953039, transparent 55%, transparent 100%),-webkit-linear-gradient(45deg, transparent, transparent 45%, #953039, transparent 55%, transparent 100%); 
                        background-size: 4px 4px;
                        background-repeat: repeat-x;
                    }
            </style>`;
            this.setState({ data: content, title: data.articleTitle })
            setTimeout(() => {
                this.setEditorIframe();
            }, 100)
        });
    }
    afterEnter = () => {
        const editor = this.editorRef.current.editor;
        editor.setReadOnly(true);
        const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
        let dom = iframe.document;
        const widgets = dom.getElementsByClassName('editable-content');
        Object.keys(widgets).forEach((key) => {
            widgets[key].setAttribute('contenteditable', false);
        })
    }

    afterExit = () => {
        const editor = this.editorRef.current.editor;
        editor.setReadOnly(false);
        const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
        let dom = iframe.document;
        const widgets = dom.getElementsByClassName('editable-content')
        Object.keys(widgets).forEach((key) => {
            widgets[key].setAttribute('contenteditable', true);
        })
    }

    onEditorChange(evt) {
        this.setState({
            data: evt.editor.getData()
        });
    }

    setTemplate = (template) => {
        const editor = this.editorRef.current.editor;
        this.props.editorStore.setEditor(editor);
        editor.insertHtml(Template.generateTemplateHtml(template));
    }

    hideMoreOptions() {
        document.getElementById('checkedInput').checked = false; 
    }

    // 增加更多工具组
    addMoreToolGroup = () => {
        console.log('in');
        const ckeTop = window.CKEDITOR.document.getById('cke_1_toolbox');

        new window.CKEDITOR.dom.window( window ).$.componentClick = () => {
            this.hideMoreOptions();
            this.props.drawerStore.setComponentWidget(true);
        }

        new window.CKEDITOR.dom.window( window).$.layoutClick = () => {
            this.hideMoreOptions();
            this.setState({
                layoutVisible: true
            });
        }

        const toolGroup = window.CKEDITOR.dom.element.createFromHtml(`<span class="more-box" id="moreBox" title="更多...">
            <label for="checkedInput">
                更多<span class="cke_button_arrow"></span>
            </label>
            <input type="checkbox" id="checkedInput"/> 
            <div class="more-options">
                <a class="button" title="附件" onclick="document.getElementById('checkedInput').checked=false;"><i class="button-attachment"></i></a>
                <a class="button" title="目录" onclick="document.getElementById('checkedInput').checked=false;"><i class="button-directory"></i></a>
                <a class="button" title="笔记背景" onclick="document.getElementById('checkedInput').checked=false;"><i class="button-note-bg"></i></a>
                <a class="button" title="布局" onclick="layoutClick()"><i class="button-layout"></i></a>
                <a class="button" title="组件" onclick="componentClick()"><i class="button-puzzle"></i></a>
            </div>
        </span>`);

        ckeTop.append(toolGroup);
    }
    instanceReady = () => {
        const editor = this.editorRef.current.editor;
        // 工具栏中增加更多工具组
        this.addMoreToolGroup();
        const itemTemplate = '<li data-id="{id}"><div style="display: flex"><strong class="item-title" style="min-width: 100px">{title}</strong></div></li>';
        const outputTemplate = '{tag}';
        const that = this;
        this.autocomplete = new window.CKEDITOR
            .plugins
            .autocomplete(editor, {
                textTestCallback: this.textTestCallback,
                dataCallback: this.dataCallback,
                itemTemplate: itemTemplate,
                outputTemplate: outputTemplate
            });
        this.autocomplete.getHtmlToInsert = function (item) {
            setTimeout(() => {
                if (that.range) {
                    that.range.endContainer.$.parentNode.className = '';
                }
                if (item.endTag) {
                    that.pNode.innerHTML = item.tag;
                }
                if (item.charts) {
                    const menu = document.getElementById('charts');
                    const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                    const offset = that.getPoint(document.getElementById('cke_1_contents'));
                    const position = that.position;
                    menu.style.display = 'block';
                    let x = position.x + offset.x;
                    let y = position.y + offset.y;
                    if (x + menu.offsetWidth - scrollX >= document.body.offsetWidth) {
                        x -= menu.offsetWidth
                    }
                    // if (y + menu.offsetHeight - scrollY >= document.body.offsetHeight) {
                    //     y -= menu.offsetHeight
                    // }
                    menu.style.left = x + 'px';
                    menu.style.top = y + 20 + 'px';
                }
            });
            return this
                .outputTemplate
                .output(item);
        }
        eventEmitter.emit('SKIM_ARTICLE', this.props.noteStore.noteList[0]);
        this.setEditorIframe();
        document.getElementsByClassName('cke_autocomplete_panel')[0].style.width = 'auto';
    }
    textTestCallback = (range) => {
        if (!range.collapsed) {
            return null;
        }
        const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
        const ranges = iframe.getSelection().getRangeAt(0);
        this.position = ranges.getBoundingClientRect();
        document.getElementById('charts').style.display = 'none';
        // const editor = this.editorRef.current.editor;
        return window.CKEDITOR.plugins.textMatch.match(range, (txt, offset) => {
            let text = JSON.parse(JSON.stringify(txt));
            let currentStr = text.split('')[range.endOffset - 1];
            this.pNode = null;
            this.range = null;
            if (currentStr === '~' || currentStr === '～') {
                currentStr = '~'
            }
            if (range.startContainer.$.parentNode.getAttribute('name') === 'temporary') {　//选择公司后进入此逻辑
                const pNode = this.getParentNode(range.startContainer.$);
                const matchArr = text.split('~'), matchText = matchArr[matchArr.length - 1];
                const innertext = pNode.innerText;
                this.pNode = pNode;
                if (innertext.substr(0, 1) !== '~') {
                    return;
                }
                if (matchArr.length > 1) {
                    let data = MENTIONS.filter(function (item) {
                        const arr = item.detail.split(',');
                        let flag = false;
                        arr.forEach((val) => {
                            if (val === matchText) {
                                flag = true;
                            }
                        })
                        return item.title.indexOf(matchText) !== -1 || flag;
                    });
                    if (!matchText) {
                        this.callbackData = [];
                    } else {
                        this.callbackData = data;
                    }
                    this.autocomplete.view.itemTemplate.source = '<li data-id="{id}"><div style="display: flex"><strong class="item-title" style="min-width: 100px">{title}</strong></div></li>';
                    return {
                        start: text.lastIndexOf('~') + 1,
                        end: range.endOffset
                    };
                } else {
                    const arr = text.split('.'), lastText = arr[arr.length - 1];
                    if (text.substr(text.length - 1, 1) === '。') { //中文句号提示
                        this.callbackData = [{
                            id: 1,
                            title: '.',
                            detail: '.',
                            tag: '.'
                        }];
                        this.autocomplete.view.itemTemplate.source = '<li data-id="{id}" style="width: 100px">{title}</li>';
                        return {
                            start: text.lastIndexOf('。'),
                            end: text.length
                        };
                    }

                    let data = tables.filter(function (item) { //匹配模板
                        const arr = item.detail.split(',');
                        let flag = false;
                        arr.forEach((val) => {
                            if (val === lastText) {
                                flag = true;
                            }
                        })
                        return item.title.indexOf(lastText) !== -1 || flag;
                    });
                    this.callbackData = data;
                    this.autocomplete.view.itemTemplate.source = '<li data-id="{id}" style="width:350px"><div style="display: flex"><strong class="item-title" style="width: 240px">{title}</strong><strong style="margin-left: 10px">{source}</strong></div></li>';

                    if (!lastText) { //'.'后为空时提示三大表
                        this.callbackData = commonTables;
                    }

                    if (lastText.indexOf('归母晶') !== -1) { //智能纠错
                        this.callbackData = tables;
                        this.range = range;
                        range.endContainer.$.parentNode.className = 'bowen';
                    } else {
                        range.endContainer.$.parentNode.className = '';
                    }
                    return {
                        start: text.lastIndexOf('.') + 1,
                        end: text.length
                    };
                }
            } else {
                if (currentStr === '~') {
                    if (!doing) { // 匹配'~'进入此逻辑
                        this.callbackData = [{
                            id: 1,
                            title: '使用智能命令~',
                            detail: '~',
                            tag: '<span name="temporary" style="color: blue">~</span>'
                        }];
                        this.autocomplete.view.itemTemplate.source = '<li data-id="{id}" style="width: 100px">{title}</li>';
                        return {
                            start: text.lastIndexOf('~'),
                            end: text.lastIndexOf('~') + 1
                        };
                    }
                    return null;
                }
            }
        });
    }
    setPNodeHtml = () => {
        document.getElementById('charts').style.display = 'none';
        if (!this.pNode) return;
        this.pNode.innerHTML = '';
        // const s = this.pNode.previousSibling.textContent;
        // this.pNode.previousSibling.textContent = s.substring(0, s.length - 1);
    }
    setEditorIframe = () => {
        const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
        let dom = iframe.document;
        dom.addEventListener('compositionstart', function (e) {
            doing = true;
        }, false);
        dom.addEventListener('compositionend', function (e) {
            doing = false;
        }, false);
        document.onclick = function (e) {
            const tagMenu = document.getElementById('command_tag_pane'), commandMenu = document.getElementById('command_tag_list');
            if (tagMenu) {
                tagMenu.style.display = 'none';
            }
            if (commandMenu) {
                commandMenu.style.display = 'none';
            }
        }
        dom.onclick = (e) => {
            const tag = e.target.getAttribute('name');
            const tagMenu = document.getElementById('command_tag_pane'), commandMenu = document.getElementById('command_tag_list');
            if (tagMenu) {
                tagMenu.style.display = 'none';
            }
            if (commandMenu) {
                commandMenu.style.display = 'none';
            }
            if (tag === 'select_box') {
                const scrollX = dom.documentElement.scrollLeft || dom.body.scrollLeft;
                const scrollY = dom.documentElement.scrollTop || dom.body.scrollTop;
                const offset = this.getPoint(document.getElementById('cke_1_contents'));
                const x = e.target.offsetLeft;
                const y = e.target.offsetTop;
                const el = document.getElementById('command_tag_pane');
                el.style.display = 'block';
                el.style.left = x + offset.x - scrollX + 'px';
                el.style.top = y + offset.y - scrollY + 20 + 'px';
                document.getElementById('command_tag_pane').style.display = 'block';
                this.tag = e.target;
            }
            if(tag === 'editCommand'){
                // let content = document.createElement("span");
                // content.innerHTML = `<span name='temporary'>${e.target.lastChild.innerHTML}</span>`
                // e.target.parentNode.parentNode.parentNode.replaceChild(content, e.target.parentNode.parentNode)
            }
        }
    }
    changeSelectItem = (li) => {
        this.tag.innerHTML = li.name;
    }

    getPoint = (obj) => {
        let t = obj.offsetTop;
        let l = obj.offsetLeft;
        while (obj = obj.offsetParent) {
            t += obj.offsetTop;
            l += obj.offsetLeft;
        }
        return { x: l, y: t }
    }

    getParentNode = (node) => {
        if (node.parentNode.getAttribute('name') === 'temporary') {
            return this.getParentNode(node.parentNode)
        }
        return node;
    }

    dataCallback = (matchInfo, callback) => {
        callback(this.callbackData);
    }

    titleChange = (val) => {
        this.setState({ title: val.target.value });
    }

    toolBarCharge = (li) => {
        this.setState({ showMore: false });
        switch (li.title) {
            case '分享':
                this.shareModalRef.showModal();
                break;
            case '演示模式':
                this.setState({ visible: true });
                break;
            case '评论':
                this.commentRef.setVisible(true);
                break;
            case '更多':
                this.setState({ showMore: !this.state.showMore });
                break;
            default:
                break;
        }
    }
    moreAction = (li) => {
        switch (li.name) {
            case '导出为PDF':
                this.exportToPDF();
                this.setState({ showMore: false });
                break;
            case '导出为word':
                this.exportToWord();
                this.setState({ showMore: false });
                break;
            default:
                this.setState({ showMore: false });
                break;
        }
    }
    // 导出成word
    exportToWord = () => {
        let { title, content } = this.props.noteStore.noteList[this.props.noteStore.activeIndex];
        content = `
            <!DOCTYPE html>
            <html>
                <head>

                </head>
                <body>
                    ${content}
                </body>
            </html>
        `;
        const converted = htmlDocx.asBlob(content);
        saveAs(converted, `${title}.docx`);
    }
    // 导出成PDF
    exportToPDF = (index) => {
        const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
        let dom = iframe.document.body;
        html2canvas(dom).then((canvas) => {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 592.28 / contentWidth * contentHeight;
            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            var pdf = new jsPDF('', 'pt', 'a4');
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save(`${this.state.title}.pdf`);
        })
    }


    render() {
        const { data, title, tools, visible, dropList, moreList, showMore, chartSettingVisible, layoutVisible } = this.state;
        const contentCss = process.env.NODE_ENV === 'production' ? [`${window.origin}/static/ckeditor/contents.css`, `${window.origin}/static/ckeditor/external.css`] : ['http://localhost:5500/build/static/ckeditor/contents.css', 'http://localhost:5500/build/static/ckeditor/external.css'];
        const config = {
            extraPlugins: 'autocomplete,notification,textmatch,textwatcher,tableresizerowandcolumn,save-to-pdf,quicktable,templates,template,image2,uploadimage,uploadwidget,filebrowser',
            allowedContent: true,
            height: 800,
            toolbarGroups: [
                // {name: 'clipboard', groups: ['undo']},
                // {name: 'document', groups: ['doctools']},
                { name: 'styles', groups: ['undo', 'cleanup', 'styles'] },
                { name: 'basicstyles', groups: ['basicstyles'] },
                { name: 'colors', groups: ['colors'] },
                { name: 'editing', groups: ['selection', 'spellchecker', 'editing'] },
                { name: 'forms', groups: ['forms'] },
                { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                { name: 'links', groups: ['links'] },
                { name: 'insert', groups: ['insert'] },
                // {name: 'tools', groups: ['tools']},
                { name: 'others', groups: ['others'] },
                { name: 'about', groups: ['about'] }
            ],
            removeButtons: 'PasteFromWord,Paste,Resize,AutoSave,Clipboard,Smiley,ColorButton, Source,Templates,Chart,Source,Flash,SpecialChar,PageBreak,Iframe,ShowBlocks,About,Language,CreateDiv,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Scayt,SelectAll,BidiRtl,BidiLtr,Superscript,Subscript,Styles',
            qtCellPadding: '0',
            qtCellSpacing: '0',
            qtClass: 'editor-table-widget',
            qtStyle: 'border: 1px solid #a7a7a7;',
            contentsCss: contentCss,
            removePlugins: 'forms,bidi',
            autoParagraph: false,
            // Configure your file manager integration. This example uses CKFinder 3 for PHP.
            filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
            filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
            filebrowserUploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
            filebrowserImageUploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',

            // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
            uploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

            // Reduce the list of block elements listed in the Format drop-down to the most commonly used.
            format_tags: 'p;h1;h2;h3;pre',
            // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
            removeDialogTabs: 'image:advanced;link:advanced',
            // font_names: '宋体/SimSun;新宋体/NSimSun;仿宋/FangSong'
        };
        const EDITOR_DEV_URL = 'http://localhost:5500/build/static/ckeditor/ckeditor.js';
        const EDITOR_PRO_URL = `${window.origin}/static/ckeditor/ckeditor.js`;
        CKEditor.editorUrl = process.env.NODE_ENV === 'development' ? EDITOR_DEV_URL : EDITOR_PRO_URL;

        const onSelectDataRange = (dataRange, type)=>{ // dataRange,时间范围， type： 1-距离时间，如3M，2-时间段，【moment， moment】
            // do anything u want 
            alert(dataRange); 
            // 发请求到服务器端请求数据，然后刷新图表数据
            // this.charteditor.updateDataConf(xxx);
          };
        const simple1 = {
            id: 'chart-editor',
            dType: 'datetime',
            viewMode: 'chart', 
            chartConf: null,
            indexConf: this.state.indexConf, 
            dataConf: this.state.dataConf,
            afterSetExtremes: (e, max, min)=>{
                console.log('max: '+ max + ',min: '+ min);
              }, 
            // custDatePicker: (<RangePicker style={{ display: 'inline-block' }}
            //     onChange={(timeRange) => onSelectDataRange(timeRange, 2)} />),
            onSelectDataRange: onSelectDataRange,
            //地图配置
            mapType: '',
            highData: '',
            bubble: '', 
            //自定义配置
            customConfig: null,
            showTopToolbar: true,
            showLabel: true,
            showButtonGroup: true,
            showChartToolbar: true,
            showType: true,
            showTimeDuring: true,
            showCalendar: true,
            timeOptions: ['1W', '1M', '6M', '1Y', '3Y'],
            defaultTimeRange: null,
            showDataChart: true,
            //图表区域显示隐藏
            showChartTitle: true,
            showAbbreviatedAxis: true,
            showIndexEditor: true,
            custIndexColumns: null,
            chartWidth: null,
            chartConf_pre: null,
            chartConf_next: null,
            //高级功能
            timePlay: false,
            timeInterval: 1000,
            showIndexPanel: false,
            showEditorPanel: false
        }

        const colors = ['#DF3F2B', '#D5952C', '#8B572A', '#417505', '#7C38B8', '#4A90E2', '#9B9B9B', '#000000', '#1C5773', '#CAA260'];

        return <EditorTemplate>
            <div style={{ display: 'flex', marginBottom: '2px' }}>
                <input className='title_input' type='textarea' value={title} onChange={this.titleChange} />
                <div style={{ position: 'relative' }}>
                    <ul className='tools'>
                        {
                            tools.map((li, index) => {
                                return <li key={index} onClick={() => this.toolBarCharge(li)}><span className='tool_item' title={li.title}></span></li>
                            })
                        }
                    </ul>
                    {
                        showMore && <ul className='more-list'>
                            {
                                moreList.map((li, index) => {
                                    return <li key={index} onClick={() => this.moreAction(li)}><span>{li.name}</span></li>
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
            <FullScreen visible={visible} editorHandle={true} exit={() => this.setState({ visible: false })}
                afterEnter={this.afterEnter} afterExit={this.afterExit} PDFTile={title}>
                <CKEditor
                    ref={this.editorRef}
                    data={data}
                    config={config}
                    style={{ border: '1px solid #E1E2E6', boxShadow: 'none' }}
                    onChange={this.onEditorChange}
                    onInstanceReady={this.instanceReady}
                />
            </FullScreen>
            {/*分享弹窗*/}
            <ShareModal onRef={(ref) => this.shareModalRef = ref}></ShareModal>
            {/*评论弹窗*/}
            <Comment onRef={(ref) => this.commentRef = ref}></Comment>
            {/*智能命令简化选择右键菜单*/}
            <div id="command_tag_pane">
                <ul>
                    {
                        dropList.map((li, index) => {
                            return <li key={index} onClick={() => this.changeSelectItem(li)}>{li.name}</li>
                        })
                    }
                </ul>
            </div>
            <div id="charts">
                <p><Icon type='close' style={{ float: 'right', cursor: 'pointer' }} onClick={() => { document.getElementById('charts').style.display = 'none' }}></Icon></p>
                <Preview chartId={'intelliCharts'}></Preview>
            </div>

            <Modal width={ 800 } visible={ chartSettingVisible } title="设置图表" onCancel={ () => this.setState({ chartSettingVisible: false })}>
                {/* <ChartPanel indexConf={indexConf} dataConf={dataConf} ref={(ce)=>{this.charteditor = ce}} /> */}
                <ChartEditor id='home-demo' {...simple1}/>
            </Modal>

            <Modal width={ 600 } title="布局" wrapClassName="layout-wrapper" visible={ layoutVisible } onCancel={ () => this.setState({ layoutVisible: false })}>
                <div className="layout-box">
                    <h2>布局</h2>
                    <div className="layout-list">
                        <div className="layout-item layout-1 active">
                            <div className="top layout-block"></div>
                            <div className="bottom">
                                <div className="left layout-block"></div>
                                <div className="right layout-block"></div>
                            </div>

                            <span className="layout-name">布局1</span>
                        </div>

                        <div className="layout-item layout-2">
                            <div className="top layout-block"></div>
                            <div className="middle layout-block"></div>
                            <div className="bottom">
                                <div className="left layout-block"></div>
                                <div className="center layout-block"></div>
                                <div className="right layout-block"></div>
                            </div>

                            <span className="layout-name">布局2</span>
                        </div>

                        <div className="layout-item layout-3">
                            <div className="top layout-block"></div>
                            <div className="bottom">
                                <div className="left layout-block"></div>
                                <div className="center layout-block"></div>
                                <div className="right layout-block"></div>
                            </div>

                            <span className="layout-name">布局3</span>
                        </div>
                    </div>
                </div>
                <div className="theme-color-box">
                    <h2>主题色</h2>

                    <div className="color-list">
                        {
                            colors.map((color, index) => {
                                return <a style={{ backgroundColor: color}} key={ index }></a>
                            })
                        }
                    </div>
                    
                </div>
                <div className="other-color-box">
                    <div className="multi-colors">
                        <span style={{ backgroundColor: '#43BCFF'}}></span>
                        <span style={{ backgroundColor: '#ED3D7D'}}></span>
                        <span style={{ backgroundColor: '#4360A0'}}></span>
                    </div>
                    其它颜色
                </div>
            </Modal>
        </EditorTemplate>
    }
}
