const FileData = [
    {
        title: '欢迎使用金融云笔记',
        briefContent: '欢迎使用全新的金融云笔记--工作效率更高',
        size: '7.1MB',
        date: '2019-01-03',
        imgUrl: require('../img/welcome.png'),
        type: 1,
        content: `
                    <div>
                        <style>
                            span[name = 'select_box']{
                                display: inline-block;
                            }
                            span[name = 'select_box']:after{
                                content: url(${require('../img/arr.png')});
                                width: 12px;
                                margin-top: 5px;
                                position: relative;
                            }
                        </style>
                         <div style="background: #3b8dee; color: #fff; padding: 15px 0;text-align: center">
                             <h1>欢迎使用金融云笔记</h1>
                             <p>——— 满足金融从业人员撰写调研记录、晨会纪要等工作场景的在线工具</p>
                         </div>
                         <p style="text-align: center; color: #3b8dee;font-weight: bold;font-size: 16px">您可以在这里</p>
                         <ul style="list-style: none;background: #edf5ff;padding: 20px 50px;font-size: 15px">
                            <li style="font-weight: bold">一、 新建笔记
                                <p style="text-indent: 25px; font-weight: normal">在笔记中输入文字内容，插入图表、表格、字体样式及位置设置等</p>
                            </li>
                            <li style="font-weight: bold">二、 智能命令提示
                                <ol style="margin: 10px 0; font-weight: normal">
                                    <li>输入~会自动弹出右侧智能命令面板，默认匹配出模板</li>
                                    <li>输入~后加文字匹配后加  . （例如 '归母'）会匹配金融文字，可插入图表或表格</li>
                                    <li>输入~后加文字匹配后加  . （例如 '归母晶'）会提示纠错选项</li>
                                    <li>已生成命令可进行简化选择，例如<span style="border: 1px dashed #999;color: blue; cursor: pointer" contenteditable="false" name="select_box">归母净利润580.95亿元</span></li>
                                </ol>
                            </li>
                            <li style="font-weight: bold">三、支持模板
                            <ol style="margin: 10px 0; font-weight: normal">
                                <li>新建模板可从左上方 新文档 --> 选择 ’新建模板笔记‘ --> 选择’标准模板‘或者’我的模板‘</li>  
                                <li>选择‘标准模板’目前支持 ’晨会纪要模板‘和’研究报告模板‘</li>
                                <li>选择’我的模板‘可以通过拖放小组件自定义模板</li>
                            </ol>
                            </li>
                            <li style="font-weight: bold">四、支持预览演示 
                                <p style="text-indent: 25px; font-weight: normal">点击右上方的第三个演示模式按钮，可进入演示模式</p>
                                <ol style="margin: 10px 0; font-weight: normal">
                                <li>进入演示模式，右侧有放大缩小按钮可进行缩放，方便观看</li>  
                                <li>可右键菜单使用画笔功能，导出PDF，放大、缩小功能</li>
                            </ol>
                            </li>
                            <li style="font-weight: bold"> 五、插入表格
                                <ol style="margin: 10px 0; font-weight: normal">
                                    <li>可以从上方按钮选择行数和列数新建表格</li>
                                    <li>也可以智能命令匹配数据插入表格</li>
                                    <li>表格支持改变行列宽度，图表支持改变宽高</li>
                                </ol>
                            </li>
                            <li style="font-weight: bold"> 六、导出
                                <p style="text-indent: 25px; font-weight: normal">点击右上方倒数第二个更多按钮，可选择导出Word或PDF</p>                                
                            </ol>
                            </li>
                        </ul>
                    </div>
                   
                `
    },
    {title: '《看研报》产品分析报告', briefContent: '产品亮点1、核心能力：核心提供【搜索+订阅内容服务】，在推荐层面较弱', imgUrl: require('../img/kanyanbao.png'), size: '6.6MB', date: '2019-02-01', type: 1,
        content: '<div style="font-size: 15px;">' +
                    `<style>
                        span[name = 'select_box']:after{
                            content: url(${require('../img/arr.png')});
                            width: 12px;
                            margin-top: 5px;
                            position: relative;
                        }
                    </style>` +
                '<p style="text-align: center;font-size: 18px;font-weight: bold; color: #444;margin-bottom: 40px">产品亮点</p>' +
                '<div style="margin-bottom: 60px">' +
                    '<p style="font-weight: bold; color: #555;" ><span style="border: 1px dashed #999;color: blue; cursor: pointer" contenteditable="false" name="select_box">【金融工程】震荡调整继续， 9月低配规则、EEP因子</span></p>' +
                    '<ul style="margin: 15px 0; color: #666; list-style: none;padding: 0">' +
                        '<li>1. 择时与风格： 坚持“以金融人为本”的经营主张，致力于职业经理人的人文关怀，积极为现代金融企业职业经理人提供前沿的金融理论、独到的管理理念，成为从事金融理论与实践研究的专家学者及各界同行的交流平台</li>' +
                        '<li>2. 行业轮动： 小微企业融资一直是我国经济社会发展的重要难题，由于小微企业自身的经营风险和信用风险较高，在传统的金融资源获取方面一直处于劣势。随着互联网金融的蓬勃发展，互联网金融与小微企业融资理论和实践的研究越来越多</li>' +
                    '</ul>' +
                    '<div style="margin: 15px 0; color: #666">(刘均伟/周萧萧) 2018-09-03</div>' +
                    '<p style="color: #888">您可点击今日推送内容的第一条查看</p>' +
                '</div>' +
                '<div style="margin-bottom: 40px">' +
                    '<p style="font-weight: bold; color: #555">【策略】 G2双杀下半场：关注高股息标的 --策略前瞻之三十五</p>' +
                    '<ul style="margin: 15px 0; color: #666; list-style: none;padding: 0">' +
                        '<li>G2双杀下半场： 坚持“以金融人为本”的经营主张，致力于职业经理人的人文关怀，就必须获得外部资金的支持。小微企业的融资需求主要具有以下几个特点：首先，小微企业融资通常更倾向于小额、快捷的融资渠道;其次，贷款期限较短，主要为满足短期资金周转需要;此外，由于小微企业资本配置对流动性要求较高，固定资产较少，因此缺乏抵押物或质押物作为融资的有效担保积极为现代金融企业职业经理人提供前沿的金融理论、独到的管理理念，成为从事金融理论与实践研究的专家学者及各界同行的交流平台</li>' +
                    '</ul>' +
                    '<div style="margin: 15px 0; color: #666">(谢超) 2018-09-02</div>' +
                    '<p style="color: #888">您可点击今日推送内容的第二条查看</p>' +
                '</div>' +
                '<div style="margin-bottom: 60px">' +
                    '<p style="font-weight: bold; color: #555">【固定收益】 流动性资产的审查重点 --企业财务特征系列之三</p>' +
                    '<ul style="margin: 15px 0; color: #666; list-style: none;padding: 0">' +
                        '<li>互联网金融支持小微企业融资的模式大体可以分为两种，一种是电商模式，即电商企业利用自有平台，就必须获得外部资金的支持。小微企业的融资需求主要具有以下几个特点：首先，小微企业融资通常更倾向于小额、快捷的融资渠道;其次，贷款期限较短，主要为满足短期资金周转需要;此外，由于小微企业资本配置对流动性要求较高，固定资产较少，因此缺乏抵押物或质押物作为融资的有效担保为通过平台交易的小微企业以及具有合作关系的小微企业提供融资支持的模式。这种依托电商平台为小微企业融资的模式又叫互联网供应链融资模式</li>' +
                    '</ul>' +
                    '<div style="margin: 15px 0; color: #666">(张旭/刘琛) 2018-09-01</div>' +
                    '<p style="color: #888">您可点击今日推送内容的第三条查看</p>' +
                '</div>'+

            '</div>'},
    {title: '光大证券-【光大研究每日速递】20180904', briefContent: '【金融工程】震荡调整继续、九月低配规模、EEP因子1、择时与风格: 市场大概', imgUrl:  require('../img/guangda.png'), size: '7.13MB', date: '2018-09-03', type: 1,
        content: '<div style="font-size: 15px;">' +
            '<p style="text-align: center;font-size: 18px;font-weight: bold; color: #444;margin-bottom: 40px">今日聚焦</p>' +
                '<div style="margin-bottom: 60px">' +
                '<p style="font-weight: bold; color: #555">【金融工程】震荡调整继续， 9月低配规则、EEP因子</p>' +
                '<ul style="margin: 15px 0; color: #666; list-style: none;padding: 0">' +
                '<li>1. 择时与风格： 坚持“以金融人为本”的经营主张，致力于职业经理人的人文关怀，积极为现代金融企业职业经理人提供前沿的金融理论、独到的管理理念，成为从事金融理论与实践研究的专家学者及各界同行的交流平台</li>' +
                '<li>2. 行业轮动： 小微企业融资一直是我国经济社会发展的重要难题，由于小微企业自身的经营风险和信用风险较高，在传统的金融资源获取方面一直处于劣势。随着互联网金融的蓬勃发展，互联网金融与小微企业融资理论和实践的研究越来越多</li>' +
                '</ul>' +
                '<div style="margin: 15px 0; color: #666">(刘均伟/周萧萧) 2018-09-03</div>' +
                '<p style="color: #888">您可点击今日推送内容的第一条查看</p>' +
            '</div>' +
            '<div style="margin-bottom: 40px">' +
                '<p style="font-weight: bold; color: #555">【策略】 G2双杀下半场：关注高股息标的 --策略前瞻之三十五</p>' +
                '<ul style="margin: 15px 0; color: #666; list-style: none;padding: 0">' +
                '<li>G2双杀下半场： 坚持“以金融人为本”的经营主张，致力于职业经理人的人文关怀，就必须获得外部资金的支持。小微企业的融资需求主要具有以下几个特点：首先，小微企业融资通常更倾向于小额、快捷的融资渠道;其次，贷款期限较短，主要为满足短期资金周转需要;此外，由于小微企业资本配置对流动性要求较高，固定资产较少，因此缺乏抵押物或质押物作为融资的有效担保积极为现代金融企业职业经理人提供前沿的金融理论、独到的管理理念，成为从事金融理论与实践研究的专家学者及各界同行的交流平台</li>' +
                '</ul>' +
                '<div style="margin: 15px 0; color: #666">(谢超) 2018-09-02</div>' +
                '<p style="color: #888">您可点击今日推送内容的第二条查看</p>' +
            '</div>' +
            '<div style="margin-bottom: 40px">' +
                '<p style="font-weight: bold; color: #555">【固定收益】 流动性资产的审查重点 --企业财务特征系列之三</p>' +
                '<ul style="margin: 15px 0; color: #666; list-style: none;padding: 0">' +
                '<li>互联网金融支持小微企业融资的模式大体可以分为两种，一种是电商模式，即电商企业利用自有平台，就必须获得外部资金的支持。小微企业的融资需求主要具有以下几个特点：首先，小微企业融资通常更倾向于小额、快捷的融资渠道;其次，贷款期限较短，主要为满足短期资金周转需要;此外，由于小微企业资本配置对流动性要求较高，固定资产较少，因此缺乏抵押物或质押物作为融资的有效担保为通过平台交易的小微企业以及具有合作关系的小微企业提供融资支持的模式。这种依托电商平台为小微企业融资的模式又叫互联网供应链融资模式</li>' +
                '</ul>' +
                '<div style="margin: 15px 0; color: #666">(张旭/刘琛) 2018-09-01</div>' +
                '<p style="color: #888">您可点击今日推送内容的第三条查看</p>' +
            '</div>'+

            '</div>'}
]
export default FileData;