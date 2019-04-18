const tables = [
    {
        id: 6,
        title: '营业总收入',
        source: '数据中心',
        detail: 'y,yy,ying,yingye',
        name: 'number',
        endTag: true,
        tag: '营业总收入1890.55亿元'
    },
    {
        id: 2,
        title: '利润表',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        name: 'charts',
        tag: '利润表'
    },
    {
        id: 21,
        title: '利润表[营业总收]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        name: 'charts',
        tag: '利润表[营业总收]'
    },
    {
        id: 22,
        title: '利润表[营业总收，营业收入][2018Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        name: 'charts',
        tag: '利润表[营业总收，营业收入][2018Q1:Q2]'
    },
    {
        id: 23,
        title: '利润表[营业总收，营业收入，营业利润][2018Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        name: 'charts',
        tag: '利润表[营业总收，营业收入，营业利润][2018Q1:Q2]'
    },
    {
        id: 24,
        title: '利润表[营业总收，营业收入，营业利润，营业总成本][2018Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        name: 'charts',
        tag: '利润表'
    },
    {
        id: 25,
        title: '利润表[营业总收，营业收入，营业利润，营业总成本][2017Q1:Q2]',
        source: '数据中心',
        detail: 'l,li,lr,lrb,lirun',
        name: 'charts',
        tag: '利润表[营业总收，营业收入，营业利润，营业总成本][2017Q1:Q2]'
    },
    {
        id: 3,
        title: '资产负债表',
        source: '数据中心',
        detail: 'z,zc,zi,zichan',
        name: 'charts',
        tag: '资产负债表'
    },
    {
        id: 4,
        title: '现金流量表',
        source: '数据中心',
        detail: 'x,xj,xian,xianjin',
        name: 'charts',
        tag: '现金流量表'
    },
    {
        id: 5,
        title: '归母净利润',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        name: "select_box",
        endTag: true,
        tag: '归母净利润580.95亿元'
    },
    {
        id: 55,
        title: '归母净利润为正',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        name: 'number',
        endTag: true,
        tag: '归母净利润580.95亿元'
    },
    {
        id: 56,
        title: '归母净利润为负',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        name: 'number',
        endTag: true,
        tag: '归母净利润-10.95亿元'
    },
    {
        id: 57,
        title: '归属于上市公司股东净利润',
        source: '数据中心',
        detail: 'g,gm,gmj,gui,guimu',
        name: 'number',
        endTag: true,
        tag: '归母净利润402.95亿元'
    },
];
const commonTables = [
    {
        id: 2,
        title: '利润表',
        source: '数据中心',
        detail: 'l,li,lr,lrb,li,lirun',
        charts: true,
        name: 'charts',
        tag: '利润表'
    },
    {
        id: 3,
        title: '资产负债表',
        source: '数据中心',
        detail: 'z,zc,zi,zichan',
        charts: true,
        name: 'charts',
        tag: '资产负债表'
    },
    {
        id: 4,
        title: '现金流量表',
        source: '数据中心',
        name: 'charts',
        detail: 'x,xj,xian,xianjin',
        charts: true,
        tag: '现金流量表'
    }
]
const MENTIONS = [
    {
        id: 2,
        title: '中国平安(601318)',
        name: 'company',
        detail: `z,zh,zho,zhon,zg,pa,zhong,zhongguo,pingan,601318`,
        tag: '中国平安(601318)'
    },
    {
        id: 3,
        title: '贵州茅台(600519)',
        name: 'company',
        detail: `g,gz,mt,gui,guizhou,maotai,600519`,
        tag: '贵州茅台(600519)'
    },
];
module.exports.tables = tables;
module.exports.MENTIONS = MENTIONS;
module.exports.commonTables = commonTables;