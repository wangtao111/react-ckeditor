const tables = [
    {
        id: 6,
        title: '营业总收入',
        source: '数据中心',
        detail: 'y,yy,ying,yingye',
        endTag: true,
        tag: '<span>营业总收入1890.55亿元</span>'
    },
    {
        id: 2,
        title: '利润表',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        charts: true,
        tag: '<span name="temporary">利润表</span>'
    },
    {
        id: 21,
        title: '利润表[营业总收]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        charts: true,
        tag: '<span name="temporary">利润表[营业总收]</span>'
    },
    {
        id: 22,
        title: '利润表[营业总收，营业收入][2018Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        charts: true,
        tag: '<span name="temporary">利润表[营业总收，营业收入][2018Q1:Q2]</span>'
    },
    {
        id: 23,
        title: '利润表[营业总收，营业收入，营业利润][2018Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        charts: true,
        tag: '<span name="temporary">利润表[营业总收，营业收入，营业利润][2018Q1:Q2]</span>'
    },
    {
        id: 24,
        title: '利润表[营业总收，营业收入，营业利润，营业总成本][2018Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        charts: true,
        tag: '<span name="temporary" style="color: blue">利润表</span>'
    },
    {
        id: 25,
        title: '利润表[营业总收，营业收入，营业利润，营业总成本][2017Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        charts: true,
        tag: '<span name="temporary" style="color: blue">利润表[营业总收，营业收入，营业利润，营业总成本][2017Q1:Q2]</span>'
    },
    {
        id: 3,
        title: '资产负债表',
        source: '数据中心',
        detail: 'z,zc,zi,zichan',
        charts: true,
        tag: '<span name="temporary" style="color: blue">资产负债表</span>'
    },
    {
        id: 4,
        title: '现金流量表',
        source: '数据中心',
        detail: 'x,xj,xian,xianjin',
        charts: true,
        tag: '<span name="temporary" style="color: blue">现金流量表</span>'
    },
    {
        id: 5,
        title: '归母净利润',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        endTag: true,
        tag: '<span style="border: 1px dashed #999;color: blue; cursor: pointer" contenteditable="false" name="select_box">归母净利润580.95亿元</span>'
    },
    {
        id: 55,
        title: '归母净利润为正',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        endTag: true,
        tag: '<span>归母净利润580.95亿元</span>'
    },
    {
        id: 56,
        title: '归母净利润为负',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        endTag: true,
        tag: '<span>归母净利润-10.95亿元</span>'
    },
    {
        id: 57,
        title: '归属于上市公司股东净利润',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        endTag: true,
        tag: '<span>归母净利润402.95亿元</span>'
    },
];
const commonTables = [
    {
        id: 2,
        title: '利润表',
        source: '数据中心',
        detail: 'l,li,lr,lrb,li,lirun',
        charts: true,
        tag: '<span name="temporary">利润表</span>'
    },
    {
        id: 3,
        title: '资产负债表',
        source: '数据中心',
        detail: 'z,zc,zi,zichan',
        charts: true,
        tag: '<span name="temporary" style="color: blue">资产负债表</span>'
    },
    {
        id: 4,
        title: '现金流量表',
        source: '数据中心',
        detail: 'x,xj,xian,xianjin',
        charts: true,
        tag: '<span name="temporary" style="color: blue">现金流量表</span>'
    }
]
const MENTIONS = [
    {
        id: 2,
        title: '中国平安(601318)',
        detail: `z,zh,zho,zhon,zg,pa,zhong,zhongguo,pingan,601318`,
        tag: '<span name="temporary">中国平安(601318).</span>'
    },
    {
        id: 3,
        title: '贵州茅台(600519)',
        detail: `g,gz,mt,gui,guizhou,maotai,600519`,
        tag: '<span name="temporary">贵州茅台(600519).</span>'
    },
];
module.exports.tables = tables;
module.exports.MENTIONS = MENTIONS;
module.exports.commonTables = commonTables;