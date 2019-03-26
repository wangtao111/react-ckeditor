import React from 'react';
import ReactDOM from 'react-dom';
import CKEditor from 'ckeditor4-react';
import FullScreen from '../../components/FullScreen';
import ShareModal from './shareModal';
import Comment from './comment';
import {inject, observer} from 'mobx-react';
import eventEmitter from '../../event';
import insertTable from '../../widgets/insertTable';
import insertTable1 from '../../widgets/insertTable1';
import insertChart from '../../widgets/insertChart';
import Highcharts from 'highcharts';
import { Template } from '../../widgets/templates';
import htmlDocx from 'html-docx-js/dist/html-docx';
import {saveAs} from 'file-saver';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EditorTemplate from './styled';
import {temp, tables, MENTIONS} from '../../mockData/commandData'
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
                {name: '中国平安Q1Q2归母公司净利润58,1545,4545元'},
                {name: '中国平安Q1Q2半年归母公司净利润580.95亿元'},
                {name: '归母净利润580.95亿元'}
            ],
            tools: [
                {title: '分享', img: require('../../img/share.png')},
                {title: '评论', img: require('../../img/comment.png')},
                {title: '演示模式', img: require('../../img/demo.png')},
                {title: '标签', img: require('../../img/tag.png')},
                {title: '更多', img: require('../../img/more.png')},
                {title: '文件信息', img: require('../../img/info.png')},
            ],
            moreList: [
                {name: '阅读密码'},
                {name: '查看历史版本'},
                {name: '发布到'},
                {name: '移动到'},
                {name: '导出为word'},
                {name: '导出为PDF'},
                {name: '分享统计'},
                {name: '保存为模板'},
                {name: '引用设置'},
                {name: '打印'},
                {name: '删除'}
            ],
            showMore: false,
            visible: false,
            command: false,
        }

        this.editorRef = React.createRef();
        this.shareModalRef = null;
        this.commentRef = null;
        this.autocomplete = null;
        this.document = document;
        this.callbackData = [];
        this.pNode = null;
        this.tag = null;
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
            this.setPNodeHtml();
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
            this.setPNodeHtml();
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
                // this.setEditorIframe();
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
        editor.insertHtml(Template.generateTemplateHtml());
    }

    instanceReady = () => {
        const editor = this.editorRef.current.editor;
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
               if(item.outSync) return;
               const inputText = document.getElementById('editable-cmd-content').innerText;
               let signal = '.';
               let symbol = inputText.split(signal);
               if(symbol.length <= 1) {
                   signal = '~';
                   if(inputText.split('~').length <= 1) {
                       signal = '～';
                   }
               }
                symbol = inputText.split(signal);
                symbol[symbol.length - 1] = item.detail;
                if(that.pNode) {
                    let str = that.pNode.previousSibling.textContent;
                    if(str.charAt(str.length - 1) === '~'){
                        str = '~';
                    }
                    if(str.charAt(str.length - 1) === '～') {
                        str = '～';
                    }
                    eventEmitter.emit('COMMAND_POPUP', str +　that.pNode.innerHTML);
                } else {
                    eventEmitter.emit('COMMAND_POPUP', signal + item.tag);
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
        // const editor = this.editorRef.current.editor;
        return window.CKEDITOR.plugins.textMatch.match(range, (txt, offset) => {
            let text = JSON.parse(JSON.stringify(txt));
            let index = text.lastIndexOf('~');
            let matchSymbol = '~';
            if(index === -1) {
                index = text.lastIndexOf('～')
                matchSymbol = '～'
            }
            this.pNode = null;
            if(range.startContainer.$.parentNode.className === 'temporary'){　//选择公司后进入此逻辑
                const pNode = this.getParentNode(range.startContainer.$);
                const str = pNode.previousSibling.textContent;
                if(str.charAt(str.length - 1) === '~' || str.charAt(str.length - 1) === '～'){
                    const arr = text.split('.');
                    const lastText = arr[arr.length - 1];
                    const lastIndex = text.lastIndexOf('.');
                    eventEmitter.emit('COMMAND_POPUP', matchSymbol +　pNode.innerHTML);
                    let data = tables.filter(function (item) {
                        return item.title.indexOf(lastText) !== -1;
                    });
                    this.callbackData = data;
                    this.autocomplete.view.itemTemplate.source = '<li data-id="{id}"><div style="display: flex"><strong class="item-title" style="width: 150px">{title}</strong><strong style="margin-left: 10px">{source}</strong></div></li>';
                    this.pNode = pNode;
                    return {
                        start: lastIndex + 1,
                        end: text.length
                    };
                }
            } else {
                this.autocomplete.view.itemTemplate.source = '<li data-id="{id}"><div style="display: flex"><strong class="item-title" style="min-width: 100px">{title}</strong></div></li>';
            }
            if(!doing && index !== -1) { // 匹配'~'进入此逻辑
                const matchArr = text.split(matchSymbol);
                const matchText = matchArr[matchArr.length - 1]
                eventEmitter.emit('COMMAND_POPUP', matchSymbol + matchText);
                if(!matchArr[matchArr.length - 1]) {
                    this.callbackData = temp;
                    // range.setStart(range.endContainer, index - 1);
                    // editor.getSelection().selectRanges( [ range ] );
                    // editor.insertHtml( `<span class="temporary">${'~' + matchArr[matchArr.length - 1]}</span>` );
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
                    }
                }
            }
            return null;
        });
    }
    setPNodeHtml = () => {
        if(!this.pNode) return;
        this.pNode.innerHTML = '';
        const s = this.pNode.previousSibling.textContent;
        this.pNode.previousSibling.textContent = s.substring(0, s.length - 1);
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
            // document.getElementById('command_tag_list').style.display = 'none';
        }
        dom.onclick = (e) => {
            const tag = e.target.getAttribute('name');
            document.getElementById('command_tag_pane').style.display = 'none';
            if(tag === 'select_box') {
                const document = this.document;
                // const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                // const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                const offset = this.getPoint(document.getElementById('cke_1_contents'));
                const x = e.target.offsetLeft ;
                const y = e.target.offsetTop ;
                const el = document.getElementById('command_tag_pane');
                el.style.display = 'block';
                el.style.left = x + offset.x + 'px';
                el.style.top = y + offset.y + 20 +'px';
                document.getElementById('command_tag_pane').style.display = 'block';
                this.tag = e.target;
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

    getParentNode = (node) => {
        if(node.parentNode.className === 'temporary') {
            return this.getParentNode(node.parentNode)
        }
        return node;
    }

    dataCallback = (matchInfo, callback) => {
        callback(this.callbackData);
    }

    titleChange = (val) => {
        this.setState({title: val.target.value});
    }

    toolBarCharge = (li) => {
        this.setState({showMore: false});
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
            case '更多':
                this.setState({showMore: !this.state.showMore});
                break;
            default:
                break;
        }
    }
    moreAction = (li) => {
        switch (li.name) {
            case '导出为PDF':
                this.exportToPDF();
                this.setState({showMore: false});
                break;
            case '导出为word':
                this.exportToWord();
                this.setState({showMore: false});
                break;
            default:
                this.setState({showMore: false});
                break;
        }
    }
    // 导出成word
    exportToWord = () => {
        let {title, content} = this.props.noteStore.noteList[this.props.noteStore.activeIndex];
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
        html2canvas(dom).then((canvas) =>  {
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
            var imgHeight = 592.28/contentWidth * contentHeight;
            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            var pdf = new jsPDF('', 'pt', 'a4');
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
            } else {
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save(`${this.state.title}.pdf`);
        })
    }


    render() {
        const {data, title, tools, visible, dropList, moreList, showMore} = this.state;
        const contentCss = process.env.NODE_ENV === 'production' ? [`${window.origin}/static/ckeditor/contents.css`, `${window.origin}/static/ckeditor/external.css`] : ['http://localhost:5500/build/static/ckeditor/contents.css', 'http://localhost:5500/build/static/ckeditor/external.css' ];
        const config = {
            extraPlugins: 'autocomplete,notification,textmatch,textwatcher,easyimage,tableresizerowandcolumn,save-to-pdf,quicktable,templates, template',
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
            contentsCss: contentCss,
            removePlugins: 'forms,bidi'
        };
        const EDITOR_DEV_URL = 'http://localhost:5500/build/static/ckeditor/ckeditor.js';
        const EDITOR_PRO_URL = `${window.origin}/static/ckeditor/ckeditor.js`;
        CKEditor.editorUrl = process.env.NODE_ENV === 'development' ? EDITOR_DEV_URL : EDITOR_PRO_URL;
        return <EditorTemplate>
            <div style={{display: 'flex', marginBottom: '2px'}}>
                <input className='title_input' type='textarea' value={title} onChange={this.titleChange}/>
                <div style={{position: 'relative'}}>
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
            <FullScreen visible={visible} editorHandle={true} exit={() => this.setState({visible: false})}
                        afterEnter={this.afterEnter} afterExit={this.afterExit} PDFTile={title}>
                <CKEditor
                    ref={this.editorRef}
                    data={data}
                    config={config}
                    style={{border: '1px solid #E1E2E6', boxShadow: 'none'}}
                    onChange={this.onEditorChange}
                    onInstanceReady={this.instanceReady}
                />
            </FullScreen>
            {/*分享弹窗*/}
            <ShareModal onRef={(ref) => this.shareModalRef = ref}></ShareModal>
            <Comment onRef={(ref) => this.commentRef = ref}></Comment>
            <div id="command_tag_pane">
                <ul>
                    {
                        dropList.map((li, index) => {
                            return <li key={index} onClick={() => this.changeSelectItem(li)}>{li.name}</li>
                        })
                    }
                </ul>
            </div>
        </EditorTemplate>
    }
}
