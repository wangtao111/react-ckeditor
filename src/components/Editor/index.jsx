import React from 'react';
import ReactUeditor from 'ifanrx-react-ueditor';
import $ from 'jquery';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mentionSelectedIndex: 0,        // 默认选中下标
        }
    }

    updateEditorContent = (content) => {
        this.calculatePosition();
    }

    handleReady = () => {
        this.editorRef.setHeight(400);

        this.props.setEditor && this.props.setEditor(this.editorRef);

        this.editorRef.addListener('keydown', function(editor, e) {
            if($('.editor-drop-mention:visible').length) {
                console.log('e: ', e);
                
                if(e.code === 'ArrowUp') {

                }

                if(e.code === 'ArrowDown') {

                }
            }
        });
    }

    getUeditorContent = ref => {
        this.setState({
            content: this.editorRef.getContent(),
        })
    }

    getAllHtmlContent = () => {
        this.setState({
            allHtmlContent: this.editorRef.getAllHtml()
        })
    }

    // 计算位置
    calculatePosition() {
        this.selection = this.editorRef.selection.getNative();

        if(this.selection.rangeCount) {
            this.range = this.selection.getRangeAt(0);
            let x = 0, y = 0;

            if(this.range.collapsed) {
                console.log('position: ', this.range.getBoundingClientRect());
                const clientRect = this.range.getBoundingClientRect();
                x = clientRect.x;
                y = clientRect.y + clientRect.height;
            }

            const relativeViewport = window.UE.dom.domUtils.getXY(this.editorRef.iframe);
            console.log('relative Position: ', window.UE.dom.domUtils.getXY(this.editorRef.iframe))

            console.log('startContainer:', this.range.startContainer);
            // new ABC({
            //     trigger: '@',
            //     capture: /@([\w]*)/,
            //     suggestions
            // })
            // 当trigger输入时，则显示下拉提示,当符合capture则保持下拉提示，否则关闭
            this.range.setStart(this.range.startContainer, 0);
            const text = this.selection.toString();
            this.range.collapse();

            const $dropMention = $('.editor-drop-mention');

            if(!$dropMention.length && text[0] === '@') {
                // 生成下拉
                let mentions = [
                    {
                        value: '小明'
                    },
                    {
                        value: '小红'
                    },
                    {
                        value: '小张'
                    }
                ]
                this.generateDropDown(mentions, { x: x + relativeViewport.x, y: y + relativeViewport.y });
            }else if(text[0] !== '@'){
                $dropMention.hide();                
            }else if($dropMention.length){
                $dropMention.show();
                $dropMention.css({
                    left: x + relativeViewport.x + 'px',
                    top: y + relativeViewport.y + 'px'
                });
            }
        }
    }

    // 选择提示项
    chooseMentionItem(value) {
        this.range.setStart(this.range.startContainer, 1);
        this.range.deleteContents();
        this.range.insertNode(window.document.createTextNode(value));
        $('.editor-drop-mention').hide();
    }

    // 生成下拉菜单
    generateDropDown(mentions, position) {
        const _this = this;
        const { mentionSelectedIndex } = this.state;
        const mentionItems = mentions.map((mention, index) => `<li key={index}><a class="mention-item ${ index === mentionSelectedIndex ? 'active': undefined }">${ mention.value }</a></li>`).join('')
        const mentionMenu = `<div class="editor-drop-mention" style="position:absolute; left: ${position.x}px; top: ${position.y}px;"><ul>${ mentionItems }</ul></div>`;
        $('body').append(mentionMenu);

        $('.mention-item').on('click', function() {
            _this.chooseMentionItem($(this).text());
        });
    }

    render() {
        const config = {
            initialFrameWidth: (window.innerWidth || document.body.clientWidth) - 580 + 'px',
            allowDivTransToP: false,
            toolbars: [
                [
                    'anchor', //锚点
                    'undo', //撤销
                    'redo', //重做
                    'bold', //加粗
                    'indent', //首行缩进
                    'snapscreen', //截图
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    'subscript', //下标
                    'fontborder', //字符边框
                    'superscript', //上标
                    'formatmatch', //格式刷
                    'source', //源代码
                    'blockquote', //引用
                    'pasteplain', //纯文本粘贴模式
                    'selectall', //全选
                    'print', //打印
                    'preview', //预览
                    'horizontal', //分隔线
                    'removeformat', //清除格式
                    'time', //时间
                    'date', //日期
                    'unlink', //取消链接
                    'insertrow', //前插入行
                    'insertcol', //前插入列
                    'mergeright', //右合并单元格
                    'mergedown', //下合并单元格
                    'deleterow', //删除行
                    'deletecol', //删除列
                    'splittorows', //拆分成行
                    'splittocols', //拆分成列
                    'splittocells', //完全拆分单元格
                    'deletecaption', //删除表格标题
                    'inserttitle', //插入标题
                    'mergecells', //合并多个单元格
                    'deletetable', //删除表格
                    'cleardoc', //清空文档
                    'insertparagraphbeforetable', //"表格前插入行"
                    'insertcode', //代码语言
                    'fontfamily', //字体
                    'fontsize', //字号
                    'paragraph', //段落格式
                    'simpleupload', //单图上传
                    'insertimage', //多图上传
                    'edittable', //表格属性
                    'edittd', //单元格属性
                    'link', //超链接
                    'emotion', //表情
                    'spechars', //特殊字符
                    'searchreplace', //查询替换
                    'map', //Baidu地图
                    'gmap', //Google地图
                    'insertvideo', //视频
                    'help', //帮助
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                    'fullscreen', //全屏
                    'directionalityltr', //从左向右输入
                    'directionalityrtl', //从右向左输入
                    'rowspacingtop', //段前距
                    'rowspacingbottom', //段后距
                    'pagebreak', //分页
                    'insertframe', //插入Iframe
                    'imagenone', //默认
                    'imageleft', //左浮动
                    'imageright', //右浮动
                    'attachment', //附件
                    'imagecenter', //居中
                    'wordimage', //图片转存
                    'lineheight', //行间距
                    'edittip ', //编辑提示
                    'customstyle', //自定义标题
                    'autotypeset', //自动排版
                    'webapp', //百度应用
                    'touppercase', //字母大写
                    'tolowercase', //字母小写
                    'background', //背景
                    'template', //模板
                    'scrawl', //涂鸦
                    'music', //音乐
                    'inserttable', //插入表格
                    'drafts', // 从草稿箱加载
                    'charts', // 图表
                ]
            ]
        }
        return <div>
                <ReactUeditor
                    debug
                    config={ config }
                    ueditorPath="http://127.0.0.1:5500/build/static/ueditor"
                    getRef={ ref => this.editorRef = ref }
                    onChange={this.updateEditorContent}
                    onReady={this.handleReady}>
                </ReactUeditor>
        </div>
    }
}