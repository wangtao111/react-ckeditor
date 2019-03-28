import TEMPLATES from './templates';
import logo from '../../img/temp_title.png';
import researchReportLogo from '../../theme/images/research_report_logo.png';
import moment from 'moment';

// 晨会纪要
const morningNote = [
    {
        widget: '头部',
        template: {
            headerLogo: logo,
            headerTitle: '嘉实基金',
            templateType: '晨会纪要',
            date: moment().format('YYYY年MM月DD日')
        }
    },
    {
        widget: '标题',
        template: {
            titleName: '晨会纪要标题'
        }
    },
    {
        widget: '声明',
        template: {
            widgetTitle: '特别声明'
        }
    },
    {
        widget: '栏目',
        template: {
            widgetTitle: '个股点评及推荐'
        }
    },
    {
        widget: '公司股票'
    },
    {
        widget: '栏目',
        template: {
            widgetTitle: '早报快讯'
        }
    }
];

// 研究报告
const researchReport = [
    {
        widget: '头部',
        template: {
            headerLogo: researchReportLogo,
            headerTitle: '华泰证券',
            templateType: '研究类别',
            date: moment().format('YYYY年MM月DD日')
        }
    },
    {
        widget: '标题',
        template: {
            titleName: '研报标题',
            width: '65%',
            className: 'align-left',
        }
    },
    {
        widget: '股价',
        template: {
            titleName: '股价表现',
            width: '33%',
            className: 'align-right',
        }
    },
    {
        widget: '摘要',
        template: {
            titleName: '核心观点',
            width: '65%',
            className: 'align-left',
        }
    },
    {
        widget: '作者',
        template: {
            titleName: '分析师',
            width: '33%',
            className: 'align-right',
        }
    }
];


export { morningNote, researchReport };
export const Template = {
    generateTemplateHtml: (templateNote) => {
        let resultHtml = '';
        templateNote.forEach(item => {
            TEMPLATES.forEach(template => {
                if(template.id === item.widget) {
                    resultHtml += new window.CKEDITOR.template(template.html).output(item.template);
                }
            });
        });

        return resultHtml;
    }
}

