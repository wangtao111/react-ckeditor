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
        let de = document.getElementById('fullScreen');
        if(this.props.fullScreenId){
            de = document.getElementById(this.props.fullScreenId);
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
        this.props.afterEnter();
        const iframe = document.getElementById(this.props.fullScreenId).children[1].contentWindow;
        let dom = iframe.document.body;
        dom.oncontextmenu = function (e) {
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
                if(this.props.resizeId){
                    dom = document.getElementById(this.props.resizeId)
                }
                this.fullScreenSize = 1;
                dom.style.zoom = this.fullScreenSize;
                document.getElementById('fullScreenBtn').style.display = 'none';
                this.props.exit();
                this.props.afterExit();
                clearInterval(timer);
            }
        }, 200)
    };
    changeFullScreenSize = (type) => {
        let dom = null;
        if(!this.props.resizeId){
            const iframe = document.getElementById(this.props.fullScreenId).children[1].contentWindow;
            dom = iframe.document.body;
        } else {
            dom = document.getElementById(this.props.resizeId)
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

    render() {
        const { children } = this.props;
        return <FullScreenTemplate id='fullScreen'>
            {children}
        </FullScreenTemplate>
    }
}
FullScreen.propTypes = {
    visible: PropTypes.bool, //控制全屏状态
    fullScreenId: PropTypes.string, // 需要全屏的dom的id
    exit: PropTypes.func, //退出 () => this.setState({visible: false})
    resizeId: PropTypes.string, // 需要放大缩小的dom的Id
    afterEnter: PropTypes.func, //进入全屏后回调函数
    afterExit: PropTypes.func, //退出全屏后回调函数
};
export default FullScreen;