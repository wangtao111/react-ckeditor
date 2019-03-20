import TEMPLATES from './templates';
import logo from '../../img/temp_title.png';
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

export const Template = {
    generateTemplateHtml: () => {
        let resultHtml = '';
        morningNote.forEach(item => {
            TEMPLATES.forEach(template => {
                if(template.id === item.widget) {
                    resultHtml += new window.CKEDITOR.template(template.html).output(item.template);
                }
            });
        });

        return resultHtml;
    }
}

