import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FullScreenTemplate = styled.div`
`;

class FullScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFullScreen: false,
        }
        this.fullScreenSize = 1;
        this.canvasMask = null;
        this.drawing = false;
        this.document = window.document;
        this.scale = null;
        this.drawAble = null;
    }

    componentDidMount() {
        this.watchFullScreen();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.editorHandle){ // 金融云特殊处理
            const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
            this.document = iframe.document;
            this.scale = iframe.document.body;
        } else {
            this.scale = this.refs.scale;
        }
        if(nextProps.visible){
            this.requestFullScreen();
        }
    }

    //添加监听事件
    fullScreen = () => {
        if (!this.state.isFullScreen) {
            this.requestFullScreen();
        } else {
            this.exitFullscreen();
        }
    };
    createElement = (appendDom, id, innerDom) => {
        let content = document.createElement("div");
        content.id = id;
        appendDom.appendChild(content);
        ReactDOM.render(
            innerDom,
            content
        );
    }
    changeDrawColor = (color) => {
        this.setDraw(true);
        this.canvasMask.style.display = 'block';
        this.canvasMask.getContext("2d").strokeStyle = color;
    }
    //进入全屏
    requestFullScreen = () => {
        let de = this.refs.fullScreen;
        de.style.background = '#fff';
        if(this.props.editorHandle){
            // const bodyStr = this.props.editorRef.current.editor.getData();

            // const element = window.CKEDITOR.dom.element.createFromHtml(bodyStr);
            // element.setAttribute('id', 'fullscreenRoot');
            // element.setStyles({
            //     backgroundColor: '#fff',
            //     position: 'relative'
            // });
            // window.document.body.appendChild(element.$);
            
            // de = window.document.getElementById('fullscreenRoot');
            de = document.getElementById('cke_1_contents');
        }
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
        this.addTools(de);
        this.addEvents();
        this.props.afterEnter();
        this.monitorFullScreenExit();
    };
    // 添加右键菜单功能和右上角按钮
    addTools = (de) => {
        if(!document.getElementById('fullScreenBtn')){
            this.createElement(de, 'fullScreenBtn', <ul>
                <li onClick={ () => this.changeFullScreenSize('+')}>A+</li>
                <li onClick={() => this.changeFullScreenSize('-')}>A-</li>
                <li onClick={this.exitFullscreen}>退出</li>
            </ul>)
        } else {
            document.getElementById('fullScreenBtn').style.display = 'block';
        }
        if(!document.getElementById('contextmenu')){
            this.createElement(de, 'contextmenu', <ul onClick={() => {document.getElementById('contextmenu').style.display = 'none'}}>
                <li>复制</li>
                <li>翻页设置</li>
                <li>夜间模式</li>
                <li onClick={() => this.changeDrawColor('#0088F2')}><span></span>蓝色荧光笔</li>
                <li onClick={() => this.changeDrawColor('#FF319F')}><span></span>粉色荧光笔</li>
                <li onClick={() => this.changeDrawColor('#00F46E')}><span></span>绿色荧光笔</li>
                <li onClick={() => this.changeFullScreenSize('+')}>放大</li>
                <li onClick={() => this.changeFullScreenSize('-')}>缩小</li>
                <li onClick={this.exportToPDF}>导出演示笔记为PDF</li>
                <li onClick={this.exitFullscreen}>退出演示</li>
            </ul>)
        } else {
            document.getElementById('contextmenu').style.display = 'block';
        }
        setTimeout(() => {this.draw()}, 100)
    }
    addEvents = () => {
        this.document.onmousedown = () => {
            const contextmenu = document.getElementById('contextmenu');
            if(!contextmenu) return;
            contextmenu.style.display = 'none';
        }
        this.document.oncontextmenu = (e) => {
            const x = e.pageX || e.clientX;
            const y = e.pageY || e.clientY;
            const contextmenu = document.getElementById('contextmenu');
            const scrollX = this.document.documentElement.scrollLeft || this.document.body.scrollLeft;
            const scrollY = this.document.documentElement.scrollTop || this.document.body.scrollTop;
            if(!contextmenu) return;
            contextmenu.style.display = 'block';
            contextmenu.style.left = x - scrollX + 'px';
            contextmenu.style.top = y - scrollY +'px';
        }
    }
    monitorFullScreenExit = () => {
        const contextmenu = document.getElementById('contextmenu');
        const timer = setInterval(() => {
            const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitCurrentFullScreenElement; 
            if(!fullscreenElement) {
                this.fullScreenSize = 1;
                this.scale.style.zoom = this.fullScreenSize;
                document.getElementById('fullScreenBtn').style.display = 'none';
                this.canvasMask.remove();
                contextmenu.remove();
                this.props.exit();
                this.props.afterExit();
                clearInterval(timer);
            }
        }, 200)
    }
    changeFullScreenSize = (type) => {
        let dom = this.scale;
        if(type === '+' && this.fullScreenSize < 2) {
            this.fullScreenSize += 0.25
        }
        if(type === '-' && this.fullScreenSize > 1) {
            this.fullScreenSize -= 0.25
        }
        dom.style.zoom = this.fullScreenSize;
        this.setDraw(false);
    }
    //设置画笔
    setDraw = (open) => {
        this.drawAble = open;
        this.canvasMask.style.cursor = open ? `url(${require('../../img/draw.png')}), auto` : `auto`;
        if(open) {
            this.scale.style.zoom = 1;
        }
    }
    //退出全屏
    exitFullscreen = () => {
        const de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    };
    //监听fullscreenchange事件
    watchFullScreen = () => {
        const _self = this;
        document.addEventListener(
            "webkitfullscreenchange",
            function() {
                _self.setState({
                    isFullScreen: document.webkitIsFullScreen
                });
            },
            false
        );
    };
    //荧光笔
    draw = () => {
        let dom = this.scale, document = this.document;
        dom.style.position = 'relative';
        this.canvasMask = document.createElement("canvas");
        this.canvasMask.id = 'canvas';
        this.canvasMask.width = dom.offsetWidth;
        this.canvasMask.height = dom.offsetHeight;
        this.canvasMask.style.position = 'absolute';
        this.canvasMask.style.top = '0';
        this.canvasMask.style.left = '0';
        this.canvasMask.style.display = 'none';
        this.canvasMask.style.zIndex = '1000';
        this.setDraw(true);
        let ctx = this.canvasMask.getContext("2d");
        ctx.lineWidth = 1.5;//笔触粗细
        ctx.globalAlpha = 0.8;//透明度
        ctx.strokeStyle = 'black';
        this.canvasMask.onmousedown = (e) => {
            if(!this.drawAble){
                return
            }
            const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            const ev = e || window.event;
            ctx.beginPath();
            ctx.moveTo(ev.clientX + scrollX - this.canvasMask.offsetLeft - 16, ev.clientY + scrollY - this.canvasMask.offsetTop);
            document.onmousemove = (e) => {
                const ev = e || window.event;
                ctx.lineTo(ev.clientX + scrollX - this.canvasMask.offsetLeft - 16, ev.clientY + scrollY - this.canvasMask.offsetTop);
                ctx.stroke();
            }
            document.onmouseup = (ev) => {
                document.onmousemove = document.onmouseup = null;
                ctx.closePath();
            }

        }
        dom.appendChild(this.canvasMask);
    }
    eraser = () => {
        let document = this.document;
        this.canvasMask.onmousedown = (e) => {
            const first = this.getBoundingClientRect(e.clientX, e.clientY);
            this.drawCanvas(first.x, first.y)
            this.drawing = true;
            document.onmousemove = (e) => {
                if (this.drawing) {
                    const move = this.getBoundingClientRect(e.clientX, e.clientY);
                    this.drawCanvas(move.x, move.y);
                }
            }
            document.onmouseup = function() {
                this.drawing = false;
            }
        }
    }
    getBoundingClientRect = (x, y) => {
        const box = this.canvasMask.getBoundingClientRect(); //获取canvas的距离浏览器视窗的上下左右距离
        return {
            x: x - box.left,
            y: y - box.top
        }
    }
    drawCanvas = (x, y) => {
        let ctx = this.canvasMask.getContext("2d");
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.clearRect(0, 0, this.canvasMask.width, this.canvasMask.height);
        ctx.restore();
    }
    // 导出成PDF
    exportToPDF = () => {
        const dom = this.scale;
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
            pdf.save(`${this.props.PDFTile ? this.props.PDFTile : '未命名'}.pdf`);
        })
    }

    render() {
        const { children } = this.props;
        return <FullScreenTemplate>
            <div ref='fullScreen'>

                <div ref='scale'>
                    {children}
                </div>
            </div>
        </FullScreenTemplate>
    }
}
FullScreen.propTypes = {
    visible: PropTypes.bool, //控制全屏状态
    editorHandle: PropTypes.string, // 金融云笔记特殊处理标志
    exit: PropTypes.func, //退出 () => this.setState({visible: false})
    afterEnter: PropTypes.func, //进入全屏后回调函数
    afterExit: PropTypes.func, //退出全屏后回调函数
    PDFTile: PropTypes.string, //导出PDF的名字
};
export default FullScreen;