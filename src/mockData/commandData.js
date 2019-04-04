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
        id: 1,
        title: '归母净利润',
        source: '数据中心',
        detail: '归母净利润[Q1Q2]587,415,463,762.1',
        tag: '<span name="temporary" style="color: blue">归母净利润[Q1Q2]587,415,463,762.1</span>'
    },
    {
        id: 2,
        title: '利润表',
        source: '数据中心',
        detail: '利润表',
        charts: true,
        tag: '<span name="temporary" style="color: blue">利润表</span>'
    },
    {
        id: 3,
        title: '资产负债表',
        source: '数据中心',
        detail: '资产负债表',
        charts: true,
        tag: '<span name="temporary" style="color: blue">资产负债表</span>'
    },
    {
        id: 4,
        title: '现金流量表',
        source: '数据中心',
        detail: '现金流量表',
        charts: true,
        tag: '<span name="temporary" style="color: blue">现金流量表</span>'
    },
]
const MENTIONS = [
    {
        id: 2,
        title: '中国平安(601318)',
        detail: `中国,平安,z,zg,pa,zhongguo,pingan,601318`,
        tag: '<span name="temporary" style="color: blue;">中国平安(601318).</span>'
    },
    {
        id: 3,
        title: '贵州茅台(600519)',
        detail: `贵州,茅台,g,gz,mt,guizhou,maotai,600519`,
        tag: '<span name="temporary" style="color: blue;">贵州茅台(600519).</span>'
    },
];
module.exports.temp = temp;
module.exports.tables = tables;
module.exports.MENTIONS = MENTIONS;
// export default {temp, tables, MENTIONS}
