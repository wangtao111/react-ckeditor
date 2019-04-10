import styled from "styled-components";

const EditorTemplate = styled.div`
    #charts{
        max-width: 400px;
        background: #fff;
        padding: 10px;
        position: absolute;
        overflow: auto;
        display: none;
        box-shadow: 0px 2px 10px 0px #bbb;
        z-index: 10000;
    }
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
    #scalePicture{
        position: absolute;
        right: 10px;
        top: 0;
        margin: 0 15px;
        background: rgba(0,0,0,.5);
        box-sizing: border-box;
        padding: 15px;
        >div{
            width: 200px;
            overflow-x: hidden;
            >img{
                width: 350px;
            }
        }
    }
     #contextmenu{
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        background: #fff;
        width: 150px;
        padding: 5px;
        box-shadow: 0px 2px 10px 0px #bbb;
        display: none;
        > ul{
            >li{
                padding: 5px 15px;
                font-size: 12px;
                &:hover{
                    color: #407CD5;
                    cursor: pointer;
                }
                &:nth-child(1), &:nth-child(3), &:nth-child(6), &:nth-child(8), &:nth-child(9){
                    border-bottom: 1px solid #ddd;
                }   
                >span{
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background: #999;
                    border-radius: 5px;
                    margin-right: 5px;
                }
                &:nth-child(4)>span, &:nth-child(5)>span, &:nth-child(6)>span{
                   background: #0088F2;
                }    
                &:nth-child(5)>span{
                   background: #FF319F;
                }    
                &:nth-child(6)>span{
                   background: #00F46E;
                }            
            }
         } 
     }
`;
export default EditorTemplate;
