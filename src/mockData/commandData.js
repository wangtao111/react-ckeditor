const temp = [
    {
        id: 1,
        title: '头部',
        outSync: true,
        tag: '<div><div style="border: 1px dashed #98BCFF; width: 100%; min-height: 100px; position: relative;margin-top: 30px;padding: 10px">' +
            '<span contenteditable="false" style="position: absolute; top: -19px; left: -1px;background: #D8E9F6;color: #98BCFF; padding: 0 15px; border: 1px solid #98BCFF; border-bottom: none; border-radius: 4px; font-size: 10px">头部</span>' +
            '<span>&nbsp;</span>' +
            '</div></div>'
    },
    {
        id: 2,
        title: '标题',
        outSync: true,
        tag: '<div><div style="border: 1px dashed #98BCFF; width: 100%; height: 100px; position: relative;margin-top: 30px;padding: 10px">' +
            '<span contenteditable="false" style="position: absolute; top: -19px; left: -1px;background: #D8E9F6;color: #98BCFF; padding: 0 15px; border: 1px solid #98BCFF; border-bottom: none; border-radius: 4px; font-size: 10px">标题</span>' +
            '<span>&nbsp;</span>' +
            '</div></div>'
    },
];
const tables = [
    {
        id: 6,
        title: '归母净利润',
        source: '数据中心',
        detail: '归母净利润[Q1Q2]587,415,463,762.1',
        tag: '<span class="temporary" style="color: blue">归母净利润[Q1Q2]587,415,463,762.1</span>'
    },
    {
        id: 8,
        title: '归母净利为正',
        source: '平台',
        detail: '归母净利为正[Q1Q2]',
        tag: '<span class="temporary" style="color: blue">归母净利为正[Q1Q2]</span>'
    },
    {
        id: 9,
        title: '归母净利为负',
        source: 'windows',
        detail: '归母净利为负[Q1Q2]',
        tag: '<span class="temporary" style="color: blue">归母净利为负[Q1Q2]</span>'
    },
    {
        id: 10,
        title: '归属于上市公司股东净利润',
        source: '数据中心',
        detail: '归属于上市公司股东净利润[Q1Q2]',
        tag: '<span class="temporary" style="color: blue">归属于上市公司股东净利润[Q1Q2]</span>'
    },
    {
        id: 11,
        title: '利润表',
        source: '数据中心',
        detail: '利润表',
        tag: '<span class="temporary" style="color: blue">利润表</span>'
    },
]
const MENTIONS = [
    {
        id: 1,
        title: '中国移动',
        detail: '中国移动(601314)',
        tag: '<span class="temporary" style="color: blue;">中国移动(601314)</span>'
    },
    {
        id: 2,
        title: '中国平安',
        detail: `中国平安(601318)`,
        tag: '<span class="temporary">中国平安(601318)</span>'
    },
    {
        id: 3,
        title: '中国联通',
        detail: '中国联通(601384)',
        tag: '<span class="temporary">中国联通(601384)</span>'
    },
    {
        id: 4,
        title: '中国银行',
        detail: '中国银行(681384)',
        tag: '<span class="temporary">中国银行(681384)</span>'
    }
];
module.exports.temp = temp;
module.exports.tables = tables;
module.exports.MENTIONS = MENTIONS;
// export default {temp, tables, MENTIONS}
