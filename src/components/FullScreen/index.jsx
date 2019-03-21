import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FullScreenTemplate = styled.div`
`;

class FullScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFullScreen: false,
        }
        this.fullScreenSize = 1;
    }

    componentDidMount() {
        this.watchFullScreen()
        console.log(55, this.refs.fullScreen.offsetHeight);
    }
    componentWillReceiveProps(nextProps) {
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
    //进入全屏
    requestFullScreen = () => {
        let de = this.refs.fullScreen;
        de.style.background = '#fff';
        if(this.props.editorHandle){
            de = document.getElementById('cke_1_contents');
        }
        if(!document.getElementById('fullScreenBtn')){
            let fullScreenBtn = document.createElement("div");
            fullScreenBtn.id = 'fullScreenBtn';
            de.appendChild(fullScreenBtn);
            ReactDOM.render(
                <ul>
                    <li onClick={ () => this.changeFullScreenSize('+')}>A+</li>
                    <li onClick={() => this.changeFullScreenSize('-')}>A-</li>
                    <li onClick={this.exitFullscreen}>退出</li>
                </ul>,
                fullScreenBtn
            )
        } else {
            document.getElementById('fullScreenBtn').style.display = 'block';
        }
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
        // setTimeout(() => {
        //     this.draw();
        // }, 100)
        this.props.afterEnter();
        de.oncontextmenu = function (e) {
            // const x = e.pageX || e.clientX + scrollX ;
            // const y = e.pageY || e.clientY + scrollY ;
            // ReactDOM.render(
            //     <ul style={{position: 'absolute', top: y + 'px', left: x + 'px'}}>
            //         <li onClick={ () => this.changeFullScreenSize('+')}>A+</li>
            //         <li onClick={() => this.changeFullScreenSize('-')}>A-</li>
            //         <li onClick={this.exitFullscreen}>退出</li>
            //     </ul>,
            //     dom
            // )
        }
        const timer = setInterval(() => {
            if(!document.fullscreenElement) {
                this.fullScreenSize = 1;
                let scaleDom = this.refs.scale;
                if(this.props.editorHandle){ // 金融云特殊处理
                    const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
                    scaleDom = iframe.document.body;
                }
                scaleDom.style.zoom = this.fullScreenSize;
                document.getElementById('fullScreenBtn').style.display = 'none';
                this.props.exit();
                this.props.afterExit();
                clearInterval(timer);
            }
        }, 200)
    };
    changeFullScreenSize = (type) => {
        let dom = this.refs.scale;
        if(this.props.editorHandle){ // 金融云特殊处理
            const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
            dom = iframe.document.body;
        }
        if(type === '+' && this.fullScreenSize < 2) {
            this.fullScreenSize += 0.25
        }
        if(type === '-' && this.fullScreenSize > 1) {
            this.fullScreenSize -= 0.25
        }
        dom.style.zoom = this.fullScreenSize;
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
        let dom = this.refs.scale, document = window.document;
        if(this.props.editorHandle){ // 金融云特殊处理
            const iframe = document.getElementById('cke_1_contents').children[1].contentWindow;
            dom = iframe.document.body;
            document = iframe.document;
        }
        let canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.width = dom.offsetWidth;
        canvas.height = dom.offsetHeight;
        console.log(dom.offsetWidth, dom.offsetHeight);
        canvas.style.position = 'absolute';
        canvas.style.top = '10px';
        canvas.style.left = '10px';
        let ctx = canvas.getContext("2d");
        let drawing = false;
        ctx.lineWidth = 3.0;//笔触粗细
        ctx.globalAlpha = 0.5;//透明度
        ctx.strokeStyle = 'green';
        canvas.onmousedown = function(ev) {
            var ev = ev || window.event;
            ctx.beginPath();
            ctx.moveTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop);
            document.onmousemove = function(ev) {
                var ev = ev || window.event;
                ctx.lineTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop);
                ctx.stroke();
            }
            document.onmouseup = function(ev) {
                document.onmousemove = document.onmouseup = null;
                ctx.closePath();
            }

        }
        dom.appendChild(canvas);
        function eraser() {
            canvas.onmousedown = function(e) {
                var first = getBoundingClientRect(e.clientX, e.clientY);
                drawCanvas(first.x, first.y)
                drawing = true;


                document.onmousemove = function(e) {
                    if (drawing) {
                        var move = getBoundingClientRect(e.clientX, e.clientY);
                        drawCanvas(move.x, move.y);
                    }
                }

                document.onmouseup = function() {
                    drawing = false;
                }
            }
        }
        function getBoundingClientRect(x, y) {
            var box = canvas.getBoundingClientRect(); //获取canvas的距离浏览器视窗的上下左右距离
            return {
                x: x - box.left,
                y: y - box.top
            }
        }
        function drawCanvas(x, y) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2, false);
            ctx.clip();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
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
};
export default FullScreen;