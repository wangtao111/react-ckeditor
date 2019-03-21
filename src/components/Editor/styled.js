import styled from "styled-components";

const EditorTemplate = styled.div`
    .title_input{
        flex: 1;
        font-size: 22px;
        line-height: 60px;
        color: #666;
        border: none;
        outline: none;
        padding: 0 14px;
    }
    .tool_item {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 100%;
    }
    .more-list{
        position: absolute;
        right: 40px;
        top: 50px;
        background: #fff;
        box-shadow: 0px 2px 10px 0px #bbb;
        >li{
            padding: 5px 15px;
            font-size: 12px;
            &:hover{
                color: #407CD5;
                cursor: pointer;
            }            
        }
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
             &:nth-child(5){
               >span{
                    background: url(${require('../../img/more.png')}) no-repeat;
                    &:hover{
                        background: url(${require('../../img/more1.png')}) no-repeat;
                    }
                }
            }
             &:nth-child(6){
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
export default EditorTemplate;