const tables = [
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
    {
        id: 5,
        title: '归母净利润',
        source: '数据中心',
        detail: '归母净利润[Q1Q2]587,415,463,762.1',
        endTag: true,
        tag: '<span style="border: 1px dashed #999;color: blue; cursor: pointer" contenteditable="false" name="select_box">归母净利润580.95亿元</span>'
    },
    {
        id: 5,
        title: '归母净利润',
        source: '数据中心',
        detail: '归母净利润[Q1Q2]587,415,463,762.1',
        endTag: true,
        tag: '<span style="border: 1px dashed #999;color: blue; cursor: pointer" contenteditable="false" name="select_box">归母净利润580.95亿元</span>'
    },
    {
        id: 5,
        title: '归母净利润',
        source: '数据中心',
        detail: '归母净利润[Q1Q2]587,415,463,762.1',
        endTag: true,
        tag: '<span style="border: 1px dashed #999;color: blue; cursor: pointer" contenteditable="false" name="select_box">归母净利润580.95亿元</span>'
    },
]
const MENTIONS = [
    {
        id: 2,
        title: '中国平安(601318)',
        detail: `中,中国,平安,z,zg,pa,zhongguo,pingan,601318`,
        tag: '<span name="temporary" style="color: blue;">中国平安(601318).</span>'
    },
    {
        id: 3,
        title: '贵州茅台(600519)',
        detail: `贵,贵州,茅台,g,gz,mt,guizhou,maotai,600519`,
        tag: '<span name="temporary" style="color: blue;">贵州茅台(600519).</span>'
    },
];
module.exports.tables = tables;
module.exports.MENTIONS = MENTIONS;